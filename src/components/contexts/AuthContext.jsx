import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
  } from "firebase/auth";
  import React, { useContext, useEffect, useState } from "react";
  import "../firebaseInt/firebase";
  import { ref, set, update } from "firebase/database"; 
  import { db } from "../firebaseInt/firebase";
  
  const AuthContext = React.createContext();
  
  export function useAuth() {
    return useContext(AuthContext);
  }
  
  export function AuthProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState();
  
    useEffect(() => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setLoading(false);
      });
  
      return unsubscribe;
    }, []);
  
    async function signup(email, password, username) {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      await updateProfile(user, {
        displayName: username,
      });
      
      await set(ref(db, `users/${user.uid}`), {
        displayName: username,
        email: email,
        totalScore: 0,          
        avatarIcon: null,       
        avatarBgColor: null,
      });
      
      setCurrentUser({ ...user });
    }
  
    // Login function 
    function login(email, password) {
      const auth = getAuth();
      return signInWithEmailAndPassword(auth, email, password);
    }
  
    // Logout function 
    function logout() {
      const auth = getAuth();
      return signOut(auth);
    }
  
    async function updateUser(newDisplayName, newAvatarIcon, newAvatarBgColor) {
      const auth = getAuth();
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: newDisplayName,
          photoURL: JSON.stringify({
            avatarIcon: newAvatarIcon,
            avatarBgColor: newAvatarBgColor,
          }),
        });
        
      
        await update(ref(db, `users/${auth.currentUser.uid}`), {
          displayName: newDisplayName,
          avatarIcon: newAvatarIcon,
          avatarBgColor: newAvatarBgColor,
        });
        
        // Update currentUser state to reflect changes.
        setCurrentUser({ ...auth.currentUser });
      }
    }
  
    const value = {
      currentUser,
      signup,
      login,
      logout,
      updateUser,
    };
  
    return (
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    );
  }
  