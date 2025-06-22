import React, { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { db } from "../firebaseInt/firebase";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import classes from "../style/catProgress.module.css"

export default function CategoryProgress() {
  const { currentUser } = useAuth();
  const [categoryScores, setCategoryScores] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const categoryThemes = {
    "Arts & Culture": "linear-gradient(45deg, #ff9a9e, #fad0c4)",
    "History": "linear-gradient(45deg, #a18cd1, #fbc2eb)",
    "Science & Nature": "linear-gradient(45deg, #fad0c4, #ffd1ff)",
    "Geography": "linear-gradient(45deg, #ffecd2, #fcb69f)",
    "Literature": "linear-gradient(45deg, #ff9a9e, #fecfef)",
    "Movies & TV Shows": "linear-gradient(45deg, #a1c4fd, #c2e9fb)",
    "Sports": "linear-gradient(45deg, #fbc2eb, #a6c1ee)",
    "Technology": "linear-gradient(45deg, #fbc2eb, #fad0c4)",
    "Food & Drink": "linear-gradient(45deg, #fda085, #f6d365)",
    "General Knowledge": "linear-gradient(45deg, #84fab0, #8fd3f4)",
    "Mythology": "linear-gradient(45deg, #cfd9df, #e2ebf0)",
    "Language & Vocabulary": "linear-gradient(45deg, #a1c4fd, #c2e9fb)",
    "Health & Wellness": "linear-gradient(45deg, #fccb90, #d57eeb)",
    "World Religions": "linear-gradient(45deg, #f6d365, #fda085)",
    "Space & Astronomy": "linear-gradient(45deg, #a18cd1, #fbc2eb)",
    "Animals & Wildlife": "linear-gradient(45deg, #fddb92, #d1fdff)"
  };

  const maxCategoryScore = 9600; 

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }
    const userId = currentUser.uid;
    const badgesRef = ref(db, `users/${userId}/badges`);
    get(badgesRef)
      .then((snapshot) => {
        let scores = {};
        if (snapshot.exists()) {
          const data = snapshot.val();

          Object.keys(categoryThemes).forEach((cat) => {
            let catScore = 0;
            if (data[cat]) {
              const catData = data[cat];
              Object.keys(catData).forEach((label) => {
                const score = parseInt(catData[label], 10) || 0;
                catScore += score;
              });
            }
            scores[cat] = catScore;
          });
        } else {
          Object.keys(categoryThemes).forEach((cat) => {
            scores[cat] = 0;
          });
        }
        setCategoryScores(scores);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching category badge data: ", error);
        setLoading(false);
      });
  }, [currentUser]);

  if (loading) {
    return <div className="d-flex justify-content-center align-items-center vh-100 ">
    <span className="spinner-border text-primary " ></span>
     </div>;
  }

  return (
    <motion.div
      className={classes.categoryProgressContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.h3
        initial={{ x: -50 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 70 }}
      >
        Category Progress
      </motion.h3>
      {Object.keys(categoryThemes).map((cat, index) => {
        const score = categoryScores[cat] || 0;
        const percentage = (score / maxCategoryScore) * 100;
        return (
          <motion.div
            key={cat}
            className={classes.categoryItem}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <h6>{cat}: {score} / {maxCategoryScore}</h6>
            <div className={classes.progressBarContainer}>
              <div
                className={classes.progressBar}
                style={{
                  width: `${percentage}%`,
                  background: categoryThemes[cat],
                }}
              ></div>
            </div>
            <p>{percentage.toFixed(2)}% Completed</p>
          </motion.div>
        );
      })}
      <motion.button
        className={classes.backButton}
        onClick={() => navigate(-1)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Back
      </motion.button>
    </motion.div>
  );
}
