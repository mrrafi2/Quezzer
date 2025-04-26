import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { ref, set } from "firebase/database";
import { db } from "../firebaseInt/firebase";
import { useAuth } from "../contexts/AuthContext";
import classes from "../style/result.module.css";

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { results, score, label, category } = state || {};

  const getMedalName = (score) => {
    const s = parseInt(score, 10);
    if (isNaN(s)) return "";
    if (s >= 10 && s <= 20) return "Bronze";
    else if (s >= 30 && s <= 50) return "Silver";
    else if (s >= 60 && s <= 80) return "Gold";
    else if (s >= 90 && s <= 100) return "Diamond";
    return "";
  };

  const medalName = getMedalName(score);
  const medalMessage = medalName
    ? `Congratulations! You have earned the ${medalName} medal!`
    : "No medal was earned.";

  const motivationalMessage =
    score < 60
      ? "Keep pushing forward! Each mistake is a stepping stone toward success."
      : "Outstanding performance! You're well on your way to mastery!";

  const analysisStyle =
    score < 50
      ? { background: "linear-gradient(135deg, #ff7675, #fd9644)" }
      : { background: "linear-gradient(135deg, #74b9ff, #a29bfe)" };

  useEffect(() => {
    if (label && score !== undefined && currentUser) {
      const userId = currentUser.uid;
      set(ref(db, `users/${userId}/badges/${category}/${label}`), score)
        .then(() => {
          console.log("Score saved successfully!");
        })
        .catch((error) => console.error("Error saving score: ", error));
    }
  }, [label, score, currentUser, category]);

  if (!state) {
    return <div>No result data available.</div>;
  }

  const currentLabelNumber = parseInt(label.replace(/[^0-9]/g, ""), 10);
  const nextLabel =
    currentLabelNumber < 32 ? `label${currentLabelNumber + 1}` : null;

  return (
    <motion.div
      className={classes.resultPage}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.h2
        className={classes.label}
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 50 }}
      >
        {label.toUpperCase()}
      </motion.h2>

      <motion.div
        className={classes.summary}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h3>Your Score</h3>
        <motion.p
          className={classes.score}
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 50 }}
        >
          {score} / 100
        </motion.p>
      </motion.div>

      {/* Medal Message Box */}
      <motion.div
        className={classes.msg}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <p style={{ fontWeight: 700, position: "relative", top: "5px" }}>
          {medalMessage}
        </p>
      </motion.div>

      {/* Quiz Details */}
      <div className={classes.quizDetails}>
        {results.map((res, index) => (
          <motion.div
            key={index}
            className={classes.quizItem}
            whileHover={{ rotateY: 10 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <p className={classes.question}>
              {index + 1}. {res.question}
            </p>
            <div className={classes.answers}>
              <motion.p
                className={classes.userAnswer}
                whileHover={{ scale: 1.03 }}
              >
                <span>
                  {res.correct ? (
                    <FaCheckCircle className={classes.correctIcon} />
                  ) : (
                    <FaTimesCircle className={classes.wrongIcon} />
                  )}
                </span>
                <span style={{ position: "relative", top: "1.4px" }}>
                  Your Answer:
                </span>{" "}
                <span
                  className={
                    res.correct ? classes.correct : classes.wrong
                  }
                >
                  {res.userAnswer}
                </span>
              </motion.p>
              <motion.p
                className={classes.correctAnswer}
                whileHover={{ scale: 1.03 }}
              >
                Correct Answer:{" "}
                <span className="fw-bold">{res.correctAnswer}</span>
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Motivational Analysis Section */}
      <motion.div
        className={classes.analysis}
        style={analysisStyle}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <p>{motivationalMessage}</p>
      </motion.div>

      <br />

      {/* Navigation Buttons */}
      <div className={classes.buttons}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={classes.backButton}
          onClick={() => navigate(`/labels/${encodeURIComponent(category)}`)}
        >
          Back to Labels
        </motion.button>
        {nextLabel && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={classes.nextButton}
            onClick={() =>
              navigate(
                `/quiz/${encodeURIComponent(category)}/${encodeURIComponent(
                  nextLabel
                )}`
              )
            }
          >
            Next Label
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
