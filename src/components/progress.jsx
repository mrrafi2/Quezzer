import React, { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { db } from "./firebaseInt/firebase";
import { useAuth } from "./contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {useDarkMode} from "./contexts/DarkMode";
import classes from "./style/progress.module.css";

export default function TotalProgress() {
  const { currentUser } = useAuth();
  const [totalScore, setTotalScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [myRank, setMyRank] = useState(null);
  const maxScore = 153600;
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();


  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }
    const userId = currentUser.uid;
    const badgesRef = ref(db, `users/${userId}/badges`);
    get(badgesRef)
      .then((snapshot) => {
        let scoreSum = 0;
        if (snapshot.exists()) {
          const data = snapshot.val();
          Object.keys(data).forEach((category) => {
            const categoryData = data[category];
            Object.keys(categoryData).forEach((label) => {
              const score = parseInt(categoryData[label], 10) || 0;
              scoreSum += score;
            });
          });
        }
        setTotalScore(scoreSum);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching badge data: ", error);
        setLoading(false);
      });
  }, [currentUser]);

  const progressPercentage = (totalScore / maxScore) * 100;

  useEffect(() => {
    if (!currentUser) return;
    const usersRef = ref(db, "users");
    get(usersRef)
      .then((snapshot) => {
        let rankingData = [];
        if (snapshot.exists()) {
          const data = snapshot.val();
          rankingData = Object.keys(data).map((userId) => {
            const userData = data[userId];
            let scoreSum = 0;
            if (userData.badges) {
              Object.keys(userData.badges).forEach((category) => {
                const catData = userData.badges[category];
                Object.keys(catData).forEach((label) => {
                  scoreSum += parseInt(catData[label], 10) || 0;
                });
              });
            }
            return { uid: userId, totalScore: scoreSum };
          });
        }
        rankingData.sort((a, b) => b.totalScore - a.totalScore);
        const rank = rankingData.findIndex((u) => u.uid === currentUser.uid) + 1;
        setMyRank(rank);
      })
      .catch((error) => console.error("Error fetching ranking data: ", error));
  }, [currentUser]);

  if (loading) {
    return (
      <div className="align-items-center justify-content-center d-flex">
        <span className="spinner-grow text-info"></span>
      </div>
    );
  }

  return (
    <motion.div
    className={`${classes.totalProgressContainer} ${darkMode ? classes.darkContainer : ""}`}
    initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.h5
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 70 }}
      >
        Your Total Score: {totalScore}
      </motion.h5>
      <div className={classes.progressWrapper}>
        {/* Medal icons */}
        <div className={classes.medalIcon} style={{ left: "20%" }}>
          <i
            className="fa-solid fa-ribbon"
            style={{ color: progressPercentage >= 20 ? "#ff4081" : "#333" }}
          ></i>
        </div>
        <div className={classes.medalIcon} style={{ left: "50%" }}>
          <i
            className="fa-solid fa-star"
            style={{ color: progressPercentage >= 50 ? "#ffeb3b" : "#333" }}
          ></i>
        </div>
        <div className={classes.medalIcon} style={{ left: "85%" }}>
          <i
            className="fa-solid fa-crown"
            style={{ color: progressPercentage >= 85 ? "#ff9800" : "#333" }}
          ></i>
        </div>
        <motion.div
          className={classes.progressBar}
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        ></motion.div>
      </div>
      <motion.p
        className={classes.percentageText}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        {progressPercentage.toFixed(2)}% Completed
      </motion.p>
      <br />
      <motion.button
        className={`${classes.viewCategoryProgress} `}
        onClick={() => navigate("/category-progress")}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.85 }}
        title="View per-category progress"
      >
        Show all
      </motion.button>

      {/* New Section: Rank Box */}
      <div className={classes.rankBox}>
        <div className={classes.rankText}>Your Rank: {myRank ? myRank : "N/A"}</div>
        <button
          className={classes.rankButton}
          onClick={() => navigate("/ranking")}
        >
          <i className="fa-solid fa-ranking-star"></i> View Rankings
        </button>
      </div>
    </motion.div>
  );
}
