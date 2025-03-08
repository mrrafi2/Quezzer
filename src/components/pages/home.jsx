import React, { useState, useEffect } from 'react';
import TotalProgress from "../progress";
import QuizCategory from "../quiz";
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
      : "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
    padding: isSmallScreen ? "1rem" : "2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const innerContainerStyle = {
    width: isSmallScreen ? "98%" : "95%",
    maxWidth: isSmallScreen ? "600px" : "1400px",
    background: darkMode
      ? "rgba(40, 40, 40, 0.95)"
      : "rgba(255, 255, 255, 0.95)",
    borderRadius: "15px",
    boxShadow: darkMode
      ? "0 8px 20px rgba(0, 0, 0, 0.5)"
      : "0 8px 20px rgba(0, 0, 0, 0.1)",
    padding: isSmallScreen ? "1rem" : "2rem",
    display: "flex",
    flexDirection: "column",
    gap: isSmallScreen ? "1rem" : "2rem",
    color: darkMode ? "#f1f1f1" : "#333",
  };

  const totalProgressContainerStyle = {
    minHeight: "300px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={homeContainerStyle}>
      <div style={innerContainerStyle}>
        <QuizCategory />
        <div style={totalProgressContainerStyle}>
          <TotalProgress />
        </div>
      </div>
    </div>
  );
}
