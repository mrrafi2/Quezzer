import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ref, get } from "firebase/database";
import { db } from "../firebaseInt/firebase";
import classes from "../style/QuizRunner.module.css";

export default function Quizzes() {
  const { category, label } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState([]);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  const themes = {
    "Arts & Culture": {
      pageBg: "linear-gradient(45deg, #FFFAF0, #FFE4E1)",
      quizCardBg: "linear-gradient(45deg, #8E2DE2, #4A00E0)",
      optionBg: "linear-gradient(45deg, #4A00E0, #8E2DE2)"
    },
    History: {
      pageBg: "linear-gradient(45deg, #fdfcfb, #e2d1c3)",
      quizCardBg: "linear-gradient(45deg, #3C3B3F, #605C3C)",
      optionBg: "linear-gradient(45deg, #2C2B2F, #4E4C45)"
    },
    "Science & Nature": {
      pageBg: "linear-gradient(45deg, #E0F7FA, #B2EBF2)",
      quizCardBg: "linear-gradient(45deg, #00796B, #004D40)",
      optionBg: "linear-gradient(45deg, #004D40, #00796B)"
    },
    Geography: {
      pageBg: "linear-gradient(45deg, #E8F5E9, #C8E6C9)",
      quizCardBg: "linear-gradient(45deg, #1B5E20, #2E7D32)",
      optionBg: "linear-gradient(45deg, #2E7D32, #1B5E20)"
    },
    Literature: {
      pageBg: "linear-gradient(45deg, #FFFDE7, #FFF9C4)",
      quizCardBg: "linear-gradient(45deg, #F57F17, #F9A825)",
      optionBg: "linear-gradient(45deg, #F9A825, #F57F17)"
    },
    "Movies & TV Shows": {
      pageBg: "linear-gradient(45deg, #ECEFF1, #CFD8DC)",
      quizCardBg: "linear-gradient(45deg, #263238, #37474F)",
      optionBg: "linear-gradient(45deg, #37474F, #263238)"
    },
    Sports: {
      pageBg: "linear-gradient(45deg, #FFF3E0, #FFE0B2)",
      quizCardBg: "linear-gradient(45deg, #E65100, #FF6F00)",
      optionBg: "linear-gradient(45deg, #FF6F00, #E65100)"
    },
    Technology: {
      pageBg: "linear-gradient(45deg, #E3F2FD, #BBDEFB)",
      quizCardBg: "linear-gradient(45deg, #0D47A1, #1976D2)",
      optionBg: "linear-gradient(45deg, #1976D2, #0D47A1)"
    },
    "Food & Drink": {
      pageBg: "linear-gradient(45deg, #FFF8E1, #FFECB3)",
      quizCardBg: "linear-gradient(45deg, #BF360C, #D84315)",
      optionBg: "linear-gradient(45deg, #D84315, #BF360C)"
    },
    "General Knowledge": {
      pageBg: "linear-gradient(45deg, #F3E5F5, #E1BEE7)",
      quizCardBg: "linear-gradient(45deg, #4A148C, #6A1B9A)",
      optionBg: "linear-gradient(45deg, #6A1B9A, #4A148C)"
    },
    Mythology: {
      pageBg: "linear-gradient(45deg, #EDE7F6, #D1C4E9)",
      quizCardBg: "linear-gradient(45deg, #512DA8, #673AB7)",
      optionBg: "linear-gradient(45deg, #673AB7, #512DA8)"
    },
    "Language & Vocabulary": {
      pageBg: "linear-gradient(45deg, #E8F5E9, #DCEDC8)",
      quizCardBg: "linear-gradient(45deg, #1B5E20, #388E3C)",
      optionBg: "linear-gradient(45deg, #388E3C, #1B5E20)"
    },
    "Health & Wellness": {
      pageBg: "linear-gradient(45deg, #E0F2F1, #B2DFDB)",
      quizCardBg: "linear-gradient(45deg, #00695C, #004D40)",
      optionBg: "linear-gradient(45deg, #004D40, #00695C)"
    },
    "World Religions": {
      pageBg: "linear-gradient(45deg, #F1F8E9, #DCEDC8)",
      quizCardBg: "linear-gradient(45deg, #33691E, #558B2F)",
      optionBg: "linear-gradient(45deg, #558B2F, #33691E)"
    },
    "Space & Astronomy": {
      pageBg: "linear-gradient(45deg, #ECEFF1, #CFD8DC)",
      quizCardBg: "linear-gradient(45deg, #263238, #37474F)",
      optionBg: "linear-gradient(45deg, #37474F, #263238)"
    },
    "Animals & Wildlife": {
      pageBg: "linear-gradient(45deg, #FFF3E0, #FFE0B2)",
      quizCardBg: "linear-gradient(45deg, #BF360C, #D84315)",
      optionBg: "linear-gradient(45deg, #D84315, #BF360C)"
    }
  };

  const theme = themes[category] || {
    pageBg: "linear-gradient(45deg, #fefefe, #eaeaea)",
    quizCardBg: "linear-gradient(45deg, #444, #555)",
    optionBg: "linear-gradient(45deg, #333, #444)"
  };

  useEffect(() => {
    const quizzesRef = ref(db, `categories/${category}/labels/${label}/quizzes`);
    get(quizzesRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setQuizzes(data);
      }
    });
  }, [category, label]);

  const handleAnswerClick = (option) => {
    const currentQuiz = quizzes[currentIndex];
    const isCorrect = option === currentQuiz.answer;
    const quizResult = {
      question: currentQuiz.question,
      correctAnswer: currentQuiz.answer,
      userAnswer: option,
      correct: isCorrect,
    };

    const newScore = score + (isCorrect ? 10 : 0);
    const newResults = [...results, quizResult];

    if (currentIndex + 1 < quizzes.length) {
      setResults(newResults);
      setScore(newScore);
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate("/result", { state: { results: newResults, score: newScore, label, category } });
    }
  };

  if (quizzes.length === 0) {
    return <div className={classes.loading}>
        <div className="spinner-border text-info align-middle"></div>

    </div>;
  }

  const currentQuiz = quizzes[currentIndex];
  const progressPercentage = ((currentIndex) / quizzes.length) * 100;

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -50, opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className={classes.quizContainer} style={{ background: theme.pageBg }}>

    <h3 className="mb-4 fw-bold" style={{ textAlign: 'center',fontSize:'1.7rem'}}>{category}</h3>

      <h4 className={classes.labelTitle}>{label.toUpperCase()}</h4>
      
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={currentIndex}
          variants={cardVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className={classes.box}
          style={{ background: theme.quizCardBg }}
        >
          <h4 >{currentQuiz.question}</h4>
          <br />

          <p className="text-light mb-3">Choose the right answer from below :</p>

          <div className={classes.answers}>
            {currentQuiz.options.map((option, idx) => (
              <motion.div
                key={idx}
                className={classes.answer}
                style={{ background: theme.optionBg }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAnswerClick(option)}
              >
                {option}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className={classes.progressContainer}>
        <div className={classes.progressBar}>
          <motion.div
            className={classes.progressFill}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </div>
  );
}
