import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDarkMode } from "../contexts/DarkMode";

//Category Thumbnail images
import Art from "../../images/art.jfif";
import Animal from "../../images/animal.webp";
import Food from "../../images/food.jfif";
import GK from "../../images/GK.jfif";
import Geo from "../../images/geo.jfif";
import Health from "../../images/health.jfif";
import History from "../../images/history.jfif";
import Vocal from "../../images/Vocal.jfif";
import Ltr from "../../images/Ltr.jfif";
import Movies from "../../images/movie.jfif";
import Myth from "../../images/myth.jfif";
import Religion from "../../images/religon.jfif";
import Science from "../../images/sciencNature.jfif";
import Space from "../../images/space.webp";
import Sports from "../../images/sport.jfif";
import Tech from "../../images/tech.jfif";


const categories = [

  { name: "Arts & Culture",
    image: Art, 
    motto: "Challenge your creative genius", 
    gradient: "linear-gradient(135deg, #ff758c, #ff7eb3, #c471ed)" },

  { name: "History", 
    image: History, 
    motto: "Step back in time and test your knowledge",
     gradient: "linear-gradient(135deg, #c8ad7f, #8b6e4f, #654321)" },

  { name: "Science & Nature", 
    image: Science, 
    motto: "Uncover nature's secrets with every question", 
    gradient: "linear-gradient(135deg, #a8e063, #56ab2f, #2d5016)" },

  { name: "Geography", 
    image: Geo, 
    motto: "Map out your trivia adventure", 
    gradient: "linear-gradient(135deg, rgb(169, 182, 102), rgb(202, 202, 0), rgb(255, 215, 0))" },

  { name: "Literature", 
    image: Ltr, 
    motto: "Dive into wordplay and literary puzzles", 
    gradient: "linear-gradient(135deg, #f7971e, #ffd200, #ffed4e)" },

  { name: "Movies & TV Shows", 
    image: Movies, 
    motto: "Lights, camera, quiz!", 
    gradient: "linear-gradient(135deg,rgb(211, 161, 255),rgb(133, 71, 255), rgb(88, 28, 135))" },

  { name: "Sports", 
    image: Sports, 
    motto: "Score big with every answer", 
    gradient: "linear-gradient(135deg, #f85032, #e73827, #b91c1c)" },

  { name: "Technology", 
    image: Tech, 
    motto: "Decode digital mysteries with trivia", 
    gradient: "linear-gradient(135deg, #b0bec5, #eceff1, #64b5f6)" },

  { name: "Food & Drink", 
    image: Food, 
    motto: "Savor the challenge of culinary trivia", 
    gradient: "linear-gradient(135deg, #f12711, #f5af19, #fb923c)" },

  { name: "General Knowledge", 
    image: GK, 
    motto: "Test your everyday intellect", 
    gradient: "linear-gradient(135deg, #11998e, #38ef7d, #84fab0)" },

  { name: "Mythology", 
    image: Myth, 
    motto: "Unravel legendary lore through questions", 
    gradient: "linear-gradient(135deg, #654ea3, #eaafc8, #ff9a9e)" },

  { name: "Vocabulary", 
    image: Vocal, 
    motto: "Play with words and vocabulary", 
    gradient: "linear-gradient(135deg, #ff512f, #dd2476, #ff416c)" },

  { name: "Health & Wellness", 
    image: Health, 
    motto: "Keep your mind and body in the game", 
    gradient: "linear-gradient(135deg, #56ab2f, #a8e063, #7dd3fc)" },

  { name: "World Religions", 
    image: Religion, 
    motto: "Explore diverse beliefs with every quiz", 
    gradient: "linear-gradient(135deg, #a2d9ff, #c8e6f2, #e0f2fe)" },

  { name: "Space & Astronomy", 
    image: Space, 
    motto: "Blast off into cosmic challenges", 
    gradient: "linear-gradient(135deg, #4f83cc, #bbdefb, #1e3a8a)" },

  { name: "Animals & Wildlife", 
    image: Animal, 
    motto: "Go wild with trivia and challenge", 
    gradient: "linear-gradient(135deg, #7b920a, #add100, #84cc16)" },

];

function Loader() {
  return (
    <div className="loader-overlay">
      <div className="advanced-spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
      <div className="loading-text">Loading Categories...</div>
    </div>
  );
}

export default function QuizCategory() {
  const { darkMode } = useDarkMode();
  const [visibleCards, setVisibleCards] = useState(Array(categories.length).fill(false));
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const cardRefs = useRef([]);

  const visibleList = showAll
    ? categories
    : categories.slice(0, 12);


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
            const idx = Number(entry.target.getAttribute("data-index"));
            setVisibleCards(prev => {
              const next = [...prev];
              next[idx] = true;
              return next;
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.7 }
    );
  
    cardRefs.current.forEach(card => {
      if (card) observer.observe(card);
    });
  
    return () => observer.disconnect();
  }, [showAll]);
  

  return (
    <>
      {isLoading && <Loader />}
      <div className={`modern-container ${darkMode ? "dark-mode" : ""}`}>
        <div className="background-animation">
          <div className="floating-particles"></div>
          <div className="gradient-orbs">
            <div className="orb orb-1"></div>
            <div className="orb orb-2"></div>
            <div className="orb orb-3"></div>
            <div className="orb orb-4"></div>
          </div>
        </div>
        
        <div className="content-wrapper">
          <div className="header-section">
            <h1 className="main-title">
              <span className="title-text">Choose Your</span>
              <span className="title-accent">Category</span>
            </h1>
            <div className="subtitle">Embark on your knowledge journey</div>
          </div>

    <div className="categories-grid">
       {visibleList.map((cat, displayIdx) => {
       const origIdx = categories.findIndex(c => c.name === cat.name);

       return (
        <div
          key={cat.name}
          className={`category-card-wrapper ${visibleCards[origIdx] ? 'visible' : ''}`}
          ref={el => (cardRefs.current[origIdx] = el)}
          data-index={origIdx}
          style={{ '--delay': `${displayIdx * 0.1}s` }}
        >
          <Link to={`/labels/${encodeURIComponent(cat.name)}`} className="card-link">
            <div className="category-card">
              <div className="card-inner">
              
                <div className="card-front">
                  <div className="image-container">
                    <img className="category-image" src={cat.image} alt={cat.name}  loading="lazy"/>
                    <div className="image-overlay"></div>
                  </div>
                  <div className="card-content">
                    <h3
                      className="category-title"
                      style={{
                        background: cat.gradient,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                    >
                      {cat.name}
                    </h3>
                    <div className="category-icon">
                      <div className="icon-shimmer"></div>
                    </div>
                  </div>
                </div>
  
                
                <div className="card-back">
                  <div className="back-content">
                    <h3
                      className="back-title"
                      style={{
                        background: cat.gradient,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                    >
                      {cat.name}
                    </h3>
                    <p className="category-motto">{cat.motto}</p>
                    <div className="select-button">
                      <span className="button-text">Start Quiz</span>
                      <div className="button-glow"></div>
                    </div>
                  </div>
                </div>
  
              </div>
            </div>
          </Link>
        </div>
      );
    })}
    </div>

          {categories.length > 12 && (
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <button
              onClick={() => setShowAll(prev => !prev)}
              className="show-more-btn"
            >
              {showAll ? "Show Less" : "Show All"}
            </button>
          </div>
        )}
        </div>

        <style>{`
          .modern-container {
            min-height: 100vh;
            position: relative;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            overflow-x: hidden;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          }

          .dark-mode {
            background: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%);
          }

          .background-animation {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
          }

          .floating-particles::before,
          .floating-particles::after {
            content: '';
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            animation: float 6s ease-in-out infinite;
          }

          .floating-particles::before {
            top: 20%;
            left: 20%;
            animation-delay: 0s;
          }

          .floating-particles::after {
            top: 60%;
            right: 30%;
            animation-delay: 3s;
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
            50% { transform: translateY(-30px) rotate(180deg); opacity: 1; }
          }

          .gradient-orbs {
            position: absolute;
            width: 100%;
            height: 100%;
          }

          .orb {
            position: absolute;
            border-radius: 50%;
            filter: blur(60px);
            opacity: 0.7;
            animation: orbFloat 8s ease-in-out infinite;
          }

          .orb-1 {
            width: 300px;
            height: 300px;
            background: linear-gradient(45deg, #ff6b6b, #ee5a24);
            top: 10%;
            left: -5%;
            animation-delay: 0s;
          }

          .orb-2 {
            width: 250px;
            height: 250px;
            background: linear-gradient(45deg, #4834d4, #686de0);
            top: 60%;
            right: -5%;
            animation-delay: 2s;
          }

          .orb-3 {
            width: 200px;
            height: 200px;
            background: linear-gradient(45deg, #00d2d3, #54a0ff);
            bottom: 20%;
            left: 20%;
            animation-delay: 4s;
          }

          .orb-4 {
            width: 180px;
            height: 180px;
            background: linear-gradient(45deg, #5f27cd, #a55eea);
            top: 30%;
            right: 30%;
            animation-delay: 6s;
          }

          @keyframes orbFloat {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -30px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }

          .content-wrapper {
            position: relative;
            z-index: 1;
            padding: 2rem;
            max-width: 1400px;
            margin: 0 auto;
          }

          .header-section {
            text-align: center;
            margin-bottom: 4rem;
            padding-top: 2rem;
          }

          .main-title {
            font-size: clamp(1.8rem, 4vw, 3.8rem);
            font-weight: 800;
            margin-bottom: 1rem;
            line-height: 1.1;
          }

          .title-text {
            display: block;
            background: linear-gradient(135deg, #fff, #e2e8f0);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          }

          .title-accent {
            display: block;
            background: linear-gradient(135deg, #f093fb, #f5576c, #4facfe);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: gradientShift 3s ease-in-out infinite;
          }

          @keyframes gradientShift {
            0%, 100% { filter: hue-rotate(0deg); }
            50% { filter: hue-rotate(45deg); }
          }

          .subtitle {
            font-size: 1.1rem;
            color: rgba(255, 255, 255, 0.8);
            font-weight: 300;
            letter-spacing: 0.5px;
          }

          .dark-mode .subtitle {
            color: rgba(255, 255, 255, 0.9);
          }

          .categories-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            padding: 1rem 0;
          }

          .category-card-wrapper {
            opacity: 0;
            transform: translateY(50px) rotateX(15deg);
            transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
            transition-delay: var(--delay);
          }

          .category-card-wrapper.visible {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
          }

          .card-link {
            text-decoration: none;
            display: block;
            height: 100%;
          }

          .category-card {
            height: 200px;
            perspective: 1000px;
            position: relative;
          }

          .card-inner {
            position: relative;
            width: 100%;
            height: 100%;
            transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
            transform-style: preserve-3d;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
          }

          .category-card:hover .card-inner {
            transform: rotateY(180deg);
          }

          .card-front,
          .card-back {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            border-radius: 20px;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.1);
          }

          .card-back {
            transform: rotateY(180deg);
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }

          .dark-mode .card-back {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
            border: 1px solid rgba(255, 255, 255, 0.1);
          }

          .image-container {
            position: relative;
            height: 70%;
            overflow: hidden;
          }

          .category-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.6s ease, filter 0.6s ease;
          }

          .card-front:hover .category-image {
            transform: scale(1.1);
            filter: brightness(0.8) saturate(1.2);
          }

          .image-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.7) 100%);
            opacity: 0;
            transition: opacity 0.4s ease;
          }

          .card-front:hover .image-overlay {
            opacity: 1;
          }

          .card-content {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 1.1rem;
            background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.9));
            color: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .category-title {
            font-size: 1.1rem;
            font-weight: 700;
            margin: 0;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
            flex: 1;
          }

          .category-icon {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
          }

          .icon-shimmer {
            width: 15px;
            height: 15px;
            background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.8), transparent);
            border-radius: 50%;
            animation: shimmer 2s ease-in-out infinite;
          }

          @keyframes shimmer {
            0% { transform: scale(0.8) rotate(0deg); opacity: 0.5; }
            50% { transform: scale(1.2) rotate(180deg); opacity: 1; }
            100% { transform: scale(0.8) rotate(360deg); opacity: 0.5; }
          }

          .back-content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%;
            padding: 1.5rem;
            text-align: center;
            color: white;
          }

          .back-title {
            font-size: 1.2rem;
            font-weight: 700;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          }

          .category-motto {
            font-size: 0.8rem;
            line-height: 1.6;
            margin-bottom: 2rem;
            opacity: 0.9;
            font-weight: 300;
          }

          .select-button {
            position: relative;
            padding: 12px 32px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.3s ease;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
          }

          .select-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
          }

          .button-text {
            position: relative;
            z-index: 2;
            font-weight: 600;
            font-size: 0.95rem;
            letter-spacing: 0.5px;
          }

          .button-glow {
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
            transition: left 0.5s ease;
          }

          .select-button:hover .button-glow {
            left: 100%;
          }

    
          .loader-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 9999;
          }

          .advanced-spinner {
            position: relative;
            width: 120px;
            height: 120px;
            margin-bottom: 2rem;
          }

          .spinner-ring {
            position: absolute;
            border: 3px solid transparent;
            border-radius: 50%;
            animation: spin 2s linear infinite;
          }

          .spinner-ring:nth-child(1) {
            width: 120px;
            height: 120px;
            border-top-color: #ff6b6b;
            border-right-color: #4ecdc4;
            animation-duration: 2s;
          }

          .spinner-ring:nth-child(2) {
            width: 90px;
            height: 90px;
            top: 15px;
            left: 15px;
            border-top-color: #45b7d1;
            border-right-color: #f9ca24;
            animation-duration: 1.5s;
            animation-direction: reverse;
          }

          .spinner-ring:nth-child(3) {
            width: 60px;
            height: 60px;
            top: 30px;
            left: 30px;
            border-top-color: #6c5ce7;
            border-right-color: #a29bfe;
            animation-duration: 1s;
          }

          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          .loading-text {
            color: white;
            font-size: 1.2rem;
            font-weight: 300;
            letter-spacing: 2px;
            animation: pulse 2s ease-in-out infinite;
          }

          @keyframes pulse {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
          }

          /* Responsive Design */
          @media (max-width: 768px) {
            .content-wrapper {
              padding: 1rem;
            }

            .categories-grid {
              grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
              gap: 1.5rem;
            }

            .category-card {
              height: 180px;
            }

            .main-title {
              font-size: 1.7rem;
            }

            .header-section {
              margin-bottom: 1.9rem;
            }

            .category-title {
              font-size: 1rem;
            }

            .back-title {
              font-size: 1rem;
            }

            .category-motto {
              font-size: 0.9rem;
            }
          }

          @media (max-width: 480px) {

            .categories-grid {
              grid-template-columns: 1fr;
              gap: 1rem;
            }

            .category-card {
              height: 170px;
            }


            .card-content {
              padding: 0.9rem;
            }

            .subtitle{
            font-size: 0.8rem;
            }

            .back-content {
              padding: 1.3rem;
            }
          }

         
          .category-card-wrapper {
            will-change: transform, opacity;
          }

          .card-inner {
            will-change: transform;
          }

          .category-image {
            will-change: transform, filter;
          }

        .show-more-btn {
          display: inline-block;
         margin: 2rem auto 0;
           padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        background-size: 200% 200%;
         background-position: 0% 50%;
        border: none;
  border-radius: 50px;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background-position 0.5s ease;
}

.show-more-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.25);
  background-position: 100% 50%;
}

.show-more-btn:active {
  transform: translateY(0) scale(0.98);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}


@media (max-width: 600px) {
  .show-more-btn {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
}

        `}</style>
      </div>
    </>
  );
}
