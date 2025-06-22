import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { ref, set, update, onValue, push as firebasePush } from "firebase/database"; 
import { db } from "../firebaseInt/firebase"; 
import { useNavigate } from "react-router-dom"; 

const AuthContext = React.createContext();
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {

  const [loading, setLoading]  = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [sessionStart, setSessionStart] = useState(null);
  const navigate = useNavigate(); 
  const adminEmails = import.meta.env.VITE_ADMIN_EMAIL?.split(",") || [];

  useEffect(() => {
    const auth = getAuth();
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setSessionStart( Date.now( ) );
        const userRef = ref(db, `users/${user.uid}`);
        const unsubDb = onValue(userRef, (snap) => {
          const p = snap.val() || {};
          setCurrentUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            totalScore: p.totalScore,
            avatarIcon: p.avatarIcon,
            avatarBgColor: p.avatarBgColor,
            isAdmin: p.isAdmin || false,
          });
          setLoading(false);
        });
        return () => unsubDb();
      } else {
        setCurrentUser(null);
        setLoading(false);
      }
    });
    return () => unsubAuth();
  }, []);

  async function signup(email, password, username) {
    const auth = getAuth();
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, { displayName: username });

    const isAdmin = adminEmails.includes(email);
    const now = new Date().toISOString(); 

    await set(ref(db, `users/${user.uid}`), {
      displayName: username,
      email: user.email,
      totalScore: 0,
      avatarIcon: null,
      avatarBgColor: null,
      isAdmin,
      lastActive: now,            
    });

    await logSession(user.uid, 0); 

    navigate(isAdmin ? "/admin" : "/"); 
  }

  async function login(email, password) {
    const auth = getAuth();
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const uid = cred.user.uid;
    const now = new Date().toISOString(); 
  
    setSessionStart(Date.now());
    await update(ref(db, `users/${uid}`), { lastActive: now }); 
                                  
    return cred;
  }

  useEffect(() => {
       function handleBeforeUnload() {
         if (currentUser && sessionStart) {
           const durationSec = Math.round((Date.now() - sessionStart) / 1000);
           logSession(currentUser.uid, durationSec);
          }
       }
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => window.removeEventListener('beforeunload', handleBeforeUnload);
     }, [currentUser, sessionStart]);
    

  function logout() {
    if (sessionStart && currentUser) {
           const durationSec = Math.round((Date.now() - sessionStart) / 1000);
           logSession(currentUser.uid, durationSec);
         }
         return signOut(getAuth());
  }

  async function updateUser(newDisplayName, newAvatarIcon, newAvatarBgColor) {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    await updateProfile(user, {
      displayName: newDisplayName,
      photoURL: JSON.stringify({ avatarIcon: newAvatarIcon, avatarBgColor: newAvatarBgColor }),
    });
    await update(ref(db, `users/${user.uid}`), {
      displayName: newDisplayName,
      avatarIcon: newAvatarIcon,
      avatarBgColor: newAvatarBgColor,
    });
  }

  async function logSession(uid, durationInSeconds) {
    const now = new Date().toISOString();
    const sessionsRef = ref(db, `users/${uid}/sessions`);
    const newSessRef  = firebasePush(sessionsRef);
    await set(newSessRef, { timestamp: now, duration: durationInSeconds });
    await update(ref(db, `users/${uid}`), { lastActive: now });
  }

  async function logQuiz(uid, quizId, score) {
    const now = new Date().toISOString();
    await set(ref(db, `users/${uid}/quizzes/${quizId}`), { timestamp: now, score });
    await update(ref(db, `users/${uid}`), { lastActive: now });
  }

  const value = {
    currentUser,
    signup,
    login,
    logout,
    updateUser,
    logSession, 
    logQuiz,    
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
