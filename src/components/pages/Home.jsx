import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TotalProgress from "../quiz/TotalProgress";
import QuizCategory from "../quiz/QuizCategory";
import { useDarkMode } from "../contexts/DarkMode";

export default function Home() {
  const { darkMode } = useDarkMode();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isSmallScreen = windowWidth < 768;

  const homeContainerStyle = {
    minHeight: "100vh",
    background: darkMode
      ? "linear-gradient(135deg, #1f1f1f, #2b2b2b)"
      : "linear-gradient(135deg, #f5f7fa, #f0f0f0)",
    padding: isSmallScreen ? "1rem" : "2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  };

 
  const innerContainerStyle = {
    width: isSmallScreen ? "98%" : "95%",
    maxWidth: isSmallScreen ? "600px" : "1400px",
    background: darkMode
      ? "rgba(40, 40, 40, 0.95)"
      : "rgba(255, 255, 255, 0.95)",
    borderRadius: "15px",
    boxShadow: darkMode
      ? "0 12px 30px rgba(0, 0, 0, 0.7)"
      : "0 12px 30px rgba(0, 0, 0, 0.15)",
    padding: isSmallScreen ? "1rem" : "2rem",
    display: "flex",
    flexDirection: "column",
    gap: isSmallScreen ? "1rem" : "2rem",
    color: darkMode ? "#f1f1f1" : "#333",
    transition: "transform 0.3s ease",
  };

  const totalProgressContainerStyle = {
    minHeight: "300px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  const hoverEffect = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
  };

  return (
    <motion.div
      style={homeContainerStyle}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        style={innerContainerStyle}
        {...hoverEffect}
      >
        <QuizCategory />
        <div style={totalProgressContainerStyle}>
          <TotalProgress />
        </div>
        <br />
        
      </motion.div>
    </motion.div>
  );
}