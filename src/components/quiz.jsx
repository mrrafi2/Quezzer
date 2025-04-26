import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import art from "./images/art.jfif";
import animal from "./images/animal.webp";
import food from "./images/food.jfif";
import Gnk from "./images/genra.jfif";
import geo from "./images/geo.jfif";
import health from "./images/health.jfif";
import history from "./images/history.jfif";
import Lng from "./images/lang.jfif";
import Ltrc from "./images/litera.jfif";
import movies from "./images/movie.jfif";
import myth from "./images/myth.jfif";
import religion from "./images/religon.jfif";
import science from "./images/sciencNature.jfif";
import space from "./images/space.webp";
import sports from "./images/sport.jfif";
import tech from "./images/tech.jfif";
import { useDarkMode } from "./contexts/DarkMode";

const categories = [
  { name: "Arts & Culture", image: art, motto: "Challenge your creative genius", gradient: "linear-gradient(45deg, #ff758c, #ff7eb3)" },
  { name: "History", image: history, motto: "Step back in time and test your knowledge", gradient: "linear-gradient(45deg, #c8ad7f, #8b6e4f)" },
  { name: "Science & Nature", image: science, motto: "Uncover nature's secrets with every question", gradient: "linear-gradient(45deg, #a8e063, #56ab2f)" },
  { name: "Geography", image: geo, motto: "Map out your trivia adventure", gradient: "linear-gradient(45deg, rgb(169, 182, 102), rgb(202, 202, 0))" },
  { name: "Literature", image: Ltrc, motto: "Dive into wordplay and literary puzzles", gradient: "linear-gradient(45deg, #f7971e, #ffd200)" },
  { name: "Movies & TV Shows", image: movies, motto: "Lights, camera, quiz!", gradient: "linear-gradient(45deg,rgb(211, 161, 255),rgb(133, 71, 255))" },
  { name: "Sports", image: sports, motto: "Score big with every answer", gradient: "linear-gradient(45deg, #f85032, #e73827)" },
  { name: "Technology", image: tech, motto: "Decode digital mysteries with trivia", gradient: "linear-gradient(45deg, #b0bec5, #eceff1)" },
  { name: "Food & Drink", image: food, motto: "Savor the challenge of culinary trivia", gradient: "linear-gradient(45deg, #f12711, #f5af19)" },
  { name: "General Knowledge", image: Gnk, motto: "Test your everyday intellect", gradient: "linear-gradient(45deg, #11998e, #38ef7d)" },
  { name: "Mythology", image: myth, motto: "Unravel legendary lore through questions", gradient: "linear-gradient(45deg, #654ea3, #eaafc8)" },
  { name: "Vocabulary", image: Lng, motto: "Play with words and vocabulary", gradient: "linear-gradient(45deg, #ff512f, #dd2476)" },
  { name: "Health & Wellness", image: health, motto: "Keep your mind and body in the game", gradient: "linear-gradient(45deg, #56ab2f, #a8e063)" },
  { name: "World Religions", image: religion, motto: "Explore diverse beliefs with every quiz", gradient: "linear-gradient(45deg, #a2d9ff, #c8e6f2)" },
  { name: "Space & Astronomy", image: space, motto: "Blast off into cosmic challenges", gradient: "linear-gradient(45deg, #4f83cc, #bbdefb)" },
  { name: "Animals & Wildlife", image: animal, motto: "Go wild with trivia and challenge", gradient: "linear-gradient(45deg, #7b920a, #add100)" },
];

function Loader() {
  return (
    <div className="loader-overlay">
      <div className="spinner"></div>
    </div>
  );
}

export default function QuizCategory() {
  const { darkMode } = useDarkMode();
  const [visibleCards, setVisibleCards] = useState(Array(categories.length).fill(false));
  const [isLoading, setIsLoading] = useState(true);
  const cardRefs = useRef([]);

  useEffect(() => {
    function handleLoad() {
      setIsLoading(false);
    }
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-index"), 10);
            setVisibleCards((prev) => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.7 }
    );
    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <div className={`container mt-4 ${darkMode ? "dark" : ""}`}>
        <h2 className="mb-5 mt-4 ms-1" style={{ fontFamily: `"Lilita One", serif` }}>
          Choose a Category
        </h2>
        <div className="row ms-0">
          {categories.map((cat, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" ref={(el) => (cardRefs.current[index] = el)} data-index={index}>
              <Link to={`/labels/${encodeURIComponent(cat.name)}`} className="text-decoration-none">
                <div className={`quiz-card shadow ${visibleCards[index] ? "visible" : ""}`}>
                  <img className="quiz-card-img" src={cat.image} alt={cat.name} />
                  <div className={`quiz-card-overlay ${visibleCards[index] ? "active" : ""}`}>
                    <div className="text-container">
                      <h3
                      className="cat-title"
                        style={{
                          background: cat.gradient,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",                          
                          fontWeight: 600,
                          textShadow: "2px 2px 3px rgba(65, 65, 65, 0.68)",
                        }}
                      >
                        {cat.name}
                      </h3>
                      <p className="quiz-card-text mb-3">{cat.motto}</p>
                      <span className="quiz-btn mt-3">Select</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <style>{`
          h2 {
            font-family: "Lilita One", serif;
            color: black;
          }
          .quiz-card {
            position: relative;
            border-radius: 15px;
            overflow: hidden;
            cursor: pointer;
            background: #000;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .quiz-card.visible {
            animation: popIn 0.5s ease-out forwards;
          }
          @keyframes popIn {
            0% { opacity: 0; transform: scale(0.95); }
            100% { opacity: 1; transform: scale(1); }
          }
          .quiz-card:hover {
            transform: scale(1.03);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
          }
          .quiz-card-img {
            width: 100%;
            display: block;
            transition: transform 0.3s ease, filter 0.3s ease;
          }
          .quiz-card:hover .quiz-card-img {
            transform: scale(1.08);
            filter: brightness(0.7);
          }
          .quiz-card-overlay {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: top 0.4s ease;
          }
          .quiz-card:hover .quiz-card-overlay,
          .quiz-card-overlay.active {
            top: 0;
          }

          .cat-title{
          font-size: 1.3rem;
          }
          .text-container {
            text-align: center;
            color: #fff;
            transform: translateY(20px);
            opacity: 0;
            transition: opacity 0.4s ease, transform 0.4s ease;
          }
          .quiz-card:hover .text-container,
          .quiz-card-overlay.active .text-container {
            transform: translateY(0);
            opacity: 1;
          }
          .quiz-card-text {
            font-size: 0.85rem;
            margin-bottom: 20px;
            max-width: 190px;
          }
          .quiz-btn {
            padding: 8px 16px;
            background: #28a745;
            color: #fff;
            border-radius: 30px;
            font-weight: bold;
            transition: background 0.3s ease, transform 0.3s ease;
            cursor: pointer;
          }
          .quiz-btn:hover {
            background: #218838;
            transform: scale(1.05);
          }
          /* Dark Mode Overrides */
          .dark h2 {
            font-family: "Lilita One", serif;
            color: rgb(240, 240, 240);
          }
          .dark .quiz-card {
            border: 2px solid #fff;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
          }
          .dark .quiz-card:hover .quiz-card-img {
            filter: brightness(0.5);
          }
          .dark .text-container {
            color: #fff;
          }
          /* Media Query for Small Screens */
          @media (max-width: 868px) {
            .quiz-card {
            padding: 4rem;
              border-radius: 10px;
            }

             .cat-title{
          font-size: 1rem;
          }

            .quiz-card-text {
              font-size: 0.7rem;
              margin-bottom: 15px;
              max-width: 160px;
            }
            .quiz-btn {
              padding: 6px 12px;
              font-size: 0.8rem;
            }
            .text-container {
              transform: translateY(10px);
            }
          }
          /* Loader Styles */
          .loader-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
          }
          .spinner {
            width: 80px;
            height: 80px;
            border: 8px solid transparent;
            border-top-color: #ff758c;
            border-right-color: #ff7eb3;
            border-bottom-color: #a8e063;
            border-left-color: #56ab2f;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </>
  );
}
