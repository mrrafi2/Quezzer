import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebaseInt/firebase";
import { useNavigate, Link } from "react-router-dom";
import classes from "../style/ranking.module.css";

function calculateTotalScore(badges) {
  let total = 0;
  if (badges) {
    Object.values(badges).forEach((category) => {
      Object.values(category).forEach((score) => {
        total += parseInt(score, 10) || 0;
      });
    });
  }
  return total;
}

function getMedal(totalScore) {
  const percentage = (totalScore / 153600) * 100;
  if (percentage >= 85)
    return { medal: "Crown", iconClass: "fa-crown", color: "#ff9800" };
  if (percentage >= 50)
    return { medal: "Star", iconClass: "fa-star", color: "#ffeb3b" };
  if (percentage >= 20)
    return { medal: "Ribbon", iconClass: "fa-ribbon", color: "#ff4081" };
  return { medal: "No Medal", iconClass: "fa-medal", color: "#95a5a6" };
}

function defaultStringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 70%, 60%)`;
}

function getAvatarDataFromUser(user) {
  if (user.avatarIcon) {
    return {
      type: "icon",
      icon: user.avatarIcon,
      bgColor: user.avatarBgColor || defaultStringToColor(user.displayName),
    };
  }
  if (user.photoURL) {
    try {
      const data = JSON.parse(user.photoURL);
      return {
        type: "icon",
        icon: data.avatarIcon,
        bgColor: data.avatarBgColor || defaultStringToColor(user.displayName),
      };
    } catch (e) {
      return { type: "image", url: user.photoURL };
    }
  }
  const initials = user.displayName
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase())
    .join("");
  return { type: "initials", initials, bgColor: defaultStringToColor(user.displayName) };
}

export default function Ranking() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const usersRef = ref(db, "users");
    const unsubscribe = onValue(usersRef, (snapshot) => {
      let rankingData = [];
      if (snapshot.exists()) {
        const data = snapshot.val();
        rankingData = Object.keys(data).map((userId) => {
          const userData = data[userId];
          const name =
            userData.displayName ||
            (userData.email ? userData.email.split("@")[0] : "Anonymous");
          const totalScore = calculateTotalScore(userData.badges);
          return {
            uid: userId,
            displayName: name,
            email: userData.email,
            avatarData: getAvatarDataFromUser({ ...userData, displayName: name }),
            totalScore,
            medal: getMedal(totalScore),
          };
        });
      }
      rankingData.sort((a, b) => b.totalScore - a.totalScore);
      setUsers(rankingData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className={classes.loadingContainer}>
        <div className={classes.spinner}></div>
      </div>
    );
  }

  return (
    <div className={classes.rankingContainer}>
      {/* Back button */}
      <div className={classes.backBtn}>
        <Link to="/">
          <button className={classes.backButton}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
        </Link>
      </div>
      <h1 className={classes.title}>Rankings</h1>
      <ol className={classes.rankingList}>
        {users.map((user, index) => (
          <li
            key={user.uid}
            className={`${classes.rankingItem} ${index < 3 ? classes.topRank : ""}`}
          >
            <div className={classes.rankNumber}>{index + 1}</div>

            {user.avatarData.type === "image" ? (
              <img
                src={user.avatarData.url}
                alt={user.displayName}
                className={classes.avatar}
              />
            ) : (
              <div
                className={classes.avatar}
                style={{ backgroundColor: user.avatarData.bgColor }}
                title={user.displayName}
              >
                {user.avatarData.type === "icon" ? (
                  <i className={user.avatarData.icon}></i>
                ) : (
                  user.avatarData.initials
                )}
              </div>
            )}

            <div className={classes.userInfo}>
              <div className={classes.username} style={{fontWeight:"bold"}}>{user.displayName}</div>
            </div>

            <div className={classes.userInfo}>
              <div className={classes.score}>Score: {user.totalScore}</div>
            </div>

            {/* "Show Progress" Button */}
            <button
              className={classes.progressButton}
              onClick={(event) => {
                event.stopPropagation();
                navigate(`/user-category-progress/${user.uid}`);
              }}
            >
              Show Progress
            </button>

            <div className={classes.medal}>
              <i
                className={`fa-solid ${user.medal.iconClass}`}
                style={{ color: user.medal.color }}
                title={user.medal.medal}
              ></i>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
