 import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ref, get } from "firebase/database";
import { db } from "../firebaseInt/firebase";
import { useAuth } from "../contexts/AuthContext";

export default function Label() {
  const { category } = useParams();
  const [labels, setLabels] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDetailOverlay, setShowDetailOverlay] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [badgeData, setBadgeData] = useState({});
  const [badgePopover, setBadgePopover] = useState(null);

  // Predefined order of categories
  const categoriesOrder = [
    "Arts & Culture",
    "History",
    "Science & Nature",
    "Geography",
    "Literature",
    "Movies & TV Shows",
    "Sports",
    "Technology",
    "Food & Drink",
    "General Knowledge",
    "Mythology",
    "Vocabulary",
    "Health & Wellness",
    "World Religions",
    "Space & Astronomy",
    "Animals & Wildlife"
  ];

  // Calculate next category based on current category
  const currentIndex = categoriesOrder.indexOf(category);
  const nextCategory =
    currentIndex === -1 || currentIndex === categoriesOrder.length - 1
      ? categoriesOrder[0]
      : categoriesOrder[currentIndex + 1];

  useEffect(() => {
    const labelsRef = ref(db, `categories/${category}/labels`);
    get(labelsRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const sortedLabels = Object.keys(data).sort((a, b) => {
          const numA = parseInt(a.replace(/[^0-9]/g, ""), 10);
          const numB = parseInt(b.replace(/[^0-9]/g, ""), 10);
          return numA - numB;
        });
        setLabels(sortedLabels);
      } else {
        // Fallback: generate and sort default labels 1 to 32
        const defaultLabels = Array.from({ length: 32 }, (_, i) => `label${i + 1}`);
        setLabels(defaultLabels);
      }
    });
  }, [category]);

  useEffect(() => {
    if (!currentUser) return;
    const userId = currentUser.uid;
    const badgesRef = ref(db, `users/${userId}/badges/${category}`);
    get(badgesRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setBadgeData(snapshot.val());
        } else {
          setBadgeData({});
        }
      })
      .catch((error) => console.error(error));
  }, [currentUser, category]);

  const getBadgeColor = (score) => {
    const s = parseInt(score, 10);
    if (isNaN(s)) return "#333";
    if (s >= 10 && s <= 20) return "#cd7f32"; // Bronze
    else if (s >= 30 && s <= 50) return "#C0C0C0"; // Silver
    else if (s >= 60 && s <= 80) return "#FFD700"; // Gold
    else if (s >= 90 && s <= 100) return "#b9f2ff"; // Diamond
    return "#333";
  };

  const handleLabelClick = (label, index) => {
    const firstIncompleteIndex = labels.findIndex((l) => !badgeData[l]);
    const allowedIndex = firstIncompleteIndex === -1 ? labels.length : firstIncompleteIndex;
    if (index > allowedIndex) {
      setShowModal(true);
      return;
    }
    navigate(`/quiz/${encodeURIComponent(category)}/${encodeURIComponent(label)}`);
  };

  return (
    <div
      className="label-page-container"
      style={{
        background: (themes =>
          themes[category]
            ? themes[category].containerBg
            : "linear-gradient(45deg, #f0f0f0, #d0d0d0)"
        )({
          "Arts & Culture": {
            containerBg: "linear-gradient(45deg, #ffe6f0, #ffc0cb)",
            cardGradient: "linear-gradient(45deg, #ff758c, #ff7eb3)"
          },
          "History": {
            containerBg: "linear-gradient(45deg, #f7f1e1, #e3d5b9)",
            cardGradient: "linear-gradient(45deg, #c8ad7f, #8b6e4f)"
          },
          "Science & Nature": {
            containerBg: "linear-gradient(45deg, #e0f7e9, #c1e1c5)",
            cardGradient: "linear-gradient(45deg, #a8e063, #56ab2f)"
          },
          "Geography": {
            containerBg: "linear-gradient(45deg, rgb(220,220,200), rgb(180,180,160))",
            cardGradient: "linear-gradient(45deg, #667db6, #0082c8)"
          },
          "Literature": {
            containerBg: "linear-gradient(45deg, #fff0e0, #ffe6cc)",
            cardGradient: "linear-gradient(45deg, #f7971e, #ffd200)"
          },
          "Movies & TV Shows": {
            containerBg: "linear-gradient(45deg, #e0e0e0, #c0c0c0)",
            cardGradient: "linear-gradient(45deg, #8e2de2, #4a00e0)"
          },
          "Sports": {
            containerBg: "linear-gradient(45deg, #fff5e6, #ffebcc)",
            cardGradient: "linear-gradient(45deg, #f85032, #e73827)"
          },
          "Technology": {
            containerBg: "linear-gradient(45deg, #f0f0f0, #d9d9d9)",
            cardGradient: "linear-gradient(45deg, #b0bec5, #eceff1)"
          },
          "Food & Drink": {
            containerBg: "linear-gradient(45deg, #fff0f0, #ffe6e6)",
            cardGradient: "linear-gradient(45deg, #f12711, #f5af19)"
          },
          "General Knowledge": {
            containerBg: "linear-gradient(45deg, #e6f7ff, #ccf2ff)",
            cardGradient: "linear-gradient(45deg, #11998e, #38ef7d)"
          },
          "Mythology": {
            containerBg: "linear-gradient(45deg, #f5e6f7, #e6ccf2)",
            cardGradient: "linear-gradient(45deg, #654ea3, #eaafc8)"
          },
          "Vocabulary": {
            containerBg: "linear-gradient(45deg, #ffe6f7, #ffccdd)",
            cardGradient: "linear-gradient(45deg, #ff512f, #dd2476)"
          },
          "Health & Wellness": {
            containerBg: "linear-gradient(45deg, #e6ffe6, #ccffcc)",
            cardGradient: "linear-gradient(45deg, #56ab2f, #a8e063)"
          },
          "World Religions": {
            containerBg: "linear-gradient(45deg, #e6f0ff, #cce0ff)",
            cardGradient: "linear-gradient(45deg, #a2d9ff, #c8e6f2)"
          },
          "Space & Astronomy": {
            containerBg: "linear-gradient(45deg, #e6f7ff, #ccefff)",
            cardGradient: "linear-gradient(45deg, #4f83cc, #bbdefb)"
          },
          "Animals & Wildlife": {
            containerBg: "linear-gradient(45deg, #e6ffe6, #ccffcc)",
            cardGradient: "linear-gradient(45deg, #7b920a, #add100)"
          }
        }),
        minHeight: "100vh",
        padding: "30px",
        transition: "background 0.7s ease"
      }}
    >
      <div className="d-flex justify-content-between">
        <Link to="/" className="btn btn-sm text-muted border-0 "
        style={{fontSize:"16px"}}
        >
          <i className="fa-sharp fa-solid fa-house" title="Home"></i>
        </Link>

        <h3 className="mb-5 text-center text-muted">
          {category ? `${category}` : "Labels"}
        </h3>

        <Link
          to={`/labels/${encodeURIComponent(nextCategory)}`}
          className="btn btn-sm text-muted border-0 "
          style={{fontSize:"16px"}}
        >
          <i className="fa-sharp fa-solid fa-diagram-next" title="Next Category"></i>
        </Link>
      </div>

      <div className="row">
        {labels.map((label, index) => (
          <div key={index} className="col-6 col-sm-4 col-md-3 mb-3">
            <div
              onClick={() => handleLabelClick(label, index)}
              className={`label-card ${({
                "Arts & Culture": "artistic",
                "History": "historical",
                "Science & Nature": "scientific",
                "Geography": "geographic",
                "Literature": "literary",
                "Movies & TV Shows": "cinematic",
                "Sports": "sporty",
                "Technology": "robotic",
                "Food & Drink": "culinary",
                "General Knowledge": "general",
                "Mythology": "mythic",
                "Vocabulary": "linguistic",
                "Health & Wellness": "wellness",
                "World Religions": "spiritual",
                "Space & Astronomy": "cosmic",
                "Animals & Wildlife": "wildlife"
              }[category] || "default")}`}
              style={{
                "--card-gradient": (themes =>
                  themes[category]
                    ? themes[category].cardGradient
                    : "linear-gradient(45deg, #888, #555)"
                )({
                  "Arts & Culture": {
                    containerBg: "linear-gradient(45deg, #ffe6f0, #ffc0cb)",
                    cardGradient: "linear-gradient(45deg, #ff758c, #ff7eb3)"
                  },
                  "History": {
                    containerBg: "linear-gradient(45deg, #f7f1e1, #e3d5b9)",
                    cardGradient: "linear-gradient(45deg, #c8ad7f, #8b6e4f)"
                  },
                  "Science & Nature": {
                    containerBg: "linear-gradient(45deg, #e0f7e9, #c1e1c5)",
                    cardGradient: "linear-gradient(45deg, #a8e063, #56ab2f)"
                  },
                  "Geography": {
                    containerBg: "linear-gradient(45deg, rgb(220,220,200), rgb(180,180,160))",
                    cardGradient: "linear-gradient(45deg, #667db6, #0082c8)"
                  },
                  "Literature": {
                    containerBg: "linear-gradient(45deg, #fff0e0, #ffe6cc)",
                    cardGradient: "linear-gradient(45deg, #f7971e, #ffd200)"
                  },
                  "Movies & TV Shows": {
                    containerBg: "linear-gradient(45deg, #e0e0e0, #c0c0c0)",
                    cardGradient: "linear-gradient(45deg, #8e2de2, #4a00e0)"
                  },
                  "Sports": {
                    containerBg: "linear-gradient(45deg, #fff5e6, #ffebcc)",
                    cardGradient: "linear-gradient(45deg, #f85032, #e73827)"
                  },
                  "Technology": {
                    containerBg: "linear-gradient(45deg, #f0f0f0, #d9d9d9)",
                    cardGradient: "linear-gradient(45deg, #b0bec5, #eceff1)"
                  },
                  "Food & Drink": {
                    containerBg: "linear-gradient(45deg, #fff0f0, #ffe6e6)",
                    cardGradient: "linear-gradient(45deg, #f12711, #f5af19)"
                  },
                  "General Knowledge": {
                    containerBg: "linear-gradient(45deg, #e6f7ff, #ccf2ff)",
                    cardGradient: "linear-gradient(45deg, #11998e, #38ef7d)"
                  },
                  "Mythology": {
                    containerBg: "linear-gradient(45deg, #f5e6f7, #e6ccf2)",
                    cardGradient: "linear-gradient(45deg, #654ea3, #eaafc8)"
                  },
                  "Vocabulary": {
                    containerBg: "linear-gradient(45deg, #ffe6f7, #ffccdd)",
                    cardGradient: "linear-gradient(45deg, #ff512f, #dd2476)"
                  },
                  "Health & Wellness": {
                    containerBg: "linear-gradient(45deg, #e6ffe6, #ccffcc)",
                    cardGradient: "linear-gradient(45deg, #56ab2f, #a8e063)"
                  },
                  "World Religions": {
                    containerBg: "linear-gradient(45deg, #e6f0ff, #cce0ff)",
                    cardGradient: "linear-gradient(45deg, #a2d9ff, #c8e6f2)"
                  },
                  "Space & Astronomy": {
                    containerBg: "linear-gradient(45deg, #e6f7ff, #ccefff)",
                    cardGradient: "linear-gradient(45deg, #4f83cc, #bbdefb)"
                  },
                  "Animals & Wildlife": {
                    containerBg: "linear-gradient(45deg, #e6ffe6, #ccffcc)",
                    cardGradient: "linear-gradient(45deg, #7b920a, #add100)"
                  }
                }),
                cursor: "pointer",
                textAlign: "center",
                position: "relative",
                fontSize:'13px'
              }}
            >
              {/* Star badge at top right */}
              <span
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  color: getBadgeColor(badgeData[label]),
                  fontSize: "1.1rem"
                }}
                onClick={(e) => {
                  e.stopPropagation(); 
                  const score = badgeData[label]; 
                  let colorName = "Incomplete"; 
                  if (score !== undefined) {
                    const s = parseInt(score, 10);
                    if (s >= 10 && s <= 20) colorName = "Bronze";
                    else if (s >= 30 && s <= 50) colorName = "Silver"; 
                    else if (s >= 60 && s <= 80) colorName = "Gold"; 
                    else if (s >= 90 && s <= 100) colorName = "Diamond"; 
                  }
                  setBadgePopover({ label, colorName, x: e.clientX, y: e.clientY }); 
                }}
              >
                <i className="fa-solid fa-star"></i>
              </span>
              {label.toUpperCase()}
            </div>
          </div>
        ))}
      </div>

      {badgePopover && (
        <div
          className="badge-popover"
          style={{
            position: "fixed",
            top: badgePopover.y + 14,
            left: badgePopover.x - 100,
            background: "#fff",
            border: "none",
            padding: "4px 7px",
            borderRadius: "4px",
            color:'#333',
            zIndex: 100000,
            fontWeight:'600',
          }}
        >
          {badgePopover.colorName}
          <button onClick={() => setBadgePopover(null)} style={{ marginLeft: "12px",fontSize:"8px" , color:'white',position:'relative',top:"-7px" }}className=" text-light btn-close btn-sm"></button>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <p className="text-light ">Please complete the previous labels first.</p>
            <button onClick={() => setShowModal(false)} className="btn btn-sm btn-primary mt-2">Close</button>
          </div>
        </div>
      )}

<style>{`
        
        .label-card {
          position: relative;
          padding: 20px;
          border-radius: 8px;
          color: #fff;
          font-weight: bold;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
          overflow: hidden;
          background-color: #333;
        }
        .label-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 200%;
          height: 200%;
          z-index: -1;
          background: var(--card-gradient, linear-gradient(45deg, lime, red));
          background-size: 400% 400%;
          animation: gradientAnimation 8s ease infinite;
          opacity: 0.4;
          transform: rotate(15deg);
        }
        @keyframes gradientAnimation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

           /* Arts & Culture: Soft, artistic movement */
        .label-card.artistic {
          animation: artisticAnimation 3s infinite ease-in-out;
        }
        @keyframes artisticAnimation {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(2px, -2px) rotate(1deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }

        /* History: A gentle, aged flicker effect */
        .label-card.historical {
          animation: historicalAnimation 4s infinite ease-in-out;
        }
        @keyframes historicalAnimation {
          0% { transform: translateY(0) scale(1); filter: contrast(1); }
          50% { transform: translateY(2px) scale(0.98); filter: contrast(0.9); }
          100% { transform: translateY(0) scale(1); filter: contrast(1); }
        }

        /* Science & Nature: A subtle bobbing and rotation */
        .label-card.scientific {
          animation: scientificAnimation 3s infinite ease-in-out;
        }
        @keyframes scientificAnimation {
          0% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-3px) rotate(2deg); }
          50% { transform: translateY(0) rotate(0deg); }
          75% { transform: translateY(3px) rotate(-2deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }

        /* Geography: Mimics a subtle rotation & drift like a spinning globe */
        .label-card.geographic {
          animation: geographicAnimation 3.5s infinite ease-in-out;
        }
        @keyframes geographicAnimation {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(2px, -2px) rotate(3deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }

        /* Literature: A soft pulsing and fading effect */
        .label-card.literary {
          animation: literaryAnimation 3s infinite ease-in-out;
        }
        @keyframes literaryAnimation {
          0% { opacity: 1; transform: translateY(0); }
          50% { opacity: 0.85; transform: translateY(-2px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        /* Movies & TV Shows: A cinematic scale and rotation flicker */
        .label-card.cinematic {
          animation: cinematicAnimation 3s infinite ease-in-out;
        }
        @keyframes cinematicAnimation {
          0% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.03) rotate(0.5deg); }
          50% { transform: scale(1) rotate(0deg); }
          75% { transform: scale(1.03) rotate(-0.5deg); }
          100% { transform: scale(1) rotate(0deg); }
        }

        /* Sports: A bouncy, energetic movement */
        .label-card.sporty {
          animation: sportyAnimation 2.5s infinite ease-in-out;
        }
        @keyframes sportyAnimation {
          0% { transform: translateY(0); }
          30% { transform: translateY(-8px); }
          50% { transform: translateY(0); }
          70% { transform: translateY(-4px); }
          100% { transform: translateY(0); }
        }

        /* Technology: Retaining the original robotic jitter */
        .label-card.robotic {
          animation: roboticAnimation 2s infinite linear;
        }
        @keyframes roboticAnimation {
          0% { transform: translate(0, 0) rotate(0deg); filter: brightness(1); }
          10% { transform: translate(1px, 0) rotate(0.2deg); filter: brightness(1.05); }
          20% { transform: translate(-1px, 0) rotate(-0.2deg); filter: brightness(0.95); }
          30% { transform: translate(1px, 0) rotate(0.2deg); filter: brightness(1.05); }
          40% { transform: translate(-1px, 0) rotate(-0.2deg); filter: brightness(0.95); }
          50% { transform: translate(0, 0) rotate(0deg); filter: brightness(1); }
          60% { transform: translate(1px, 0) rotate(0.2deg); filter: brightness(1.05); }
          70% { transform: translate(-1px, 0) rotate(-0.2deg); filter: brightness(0.95); }
          80% { transform: translate(1px, 0) rotate(0.2deg); filter: brightness(1.05); }
          90% { transform: translate(-1px, 0) rotate(-0.2deg); filter: brightness(0.95); }
          100% { transform: translate(0, 0) rotate(0deg); filter: brightness(1); }
        }

        /* Food & Drink: A gentle simmering effect */
        .label-card.culinary {
          animation: culinaryAnimation 3s infinite ease-in-out;
        }
        @keyframes culinaryAnimation {
          0% { transform: translateY(0) scale(1); }
          25% { transform: translateY(-2px) scale(1.01); }
          50% { transform: translateY(0) scale(1); }
          75% { transform: translateY(2px) scale(0.99); }
          100% { transform: translateY(0) scale(1); }
        }

        /* General Knowledge: A subtle pulse */
        .label-card.general {
          animation: generalAnimation 3s infinite ease-in-out;
        }
        @keyframes generalAnimation {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }

        /* Mythology: A mystical, glowing pulse */
        .label-card.mythic {
          animation: mythicAnimation 3s infinite ease-in-out;
        }
        @keyframes mythicAnimation {
          0% { transform: translateY(0); filter: brightness(1); }
          50% { transform: translateY(-3px); filter: brightness(1.1); }
          100% { transform: translateY(0); filter: brightness(1); }
        }

        /* Language & Vocabulary: A playful wobble */
        .label-card.linguistic {
          animation: linguisticAnimation 3s infinite ease-in-out;
        }
        @keyframes linguisticAnimation {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(2deg); }
          50% { transform: rotate(0deg); }
          75% { transform: rotate(-2deg); }
          100% { transform: rotate(0deg); }
        }

        /* Health & Wellness: A soothing, breathing effect */
        .label-card.wellness {
          animation: wellnessAnimation 4s infinite ease-in-out;
        }
        @keyframes wellnessAnimation {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.03); opacity: 0.95; }
          100% { transform: scale(1); opacity: 1; }
        }

        /* World Religions: A calm, pulsing spiritual vibe */
        .label-card.spiritual {
          animation: spiritualAnimation 4s infinite ease-in-out;
        }
        @keyframes spiritualAnimation {
          0% { transform: scale(1) translateY(0); opacity: 1; }
          50% { transform: scale(1.02) translateY(-2px); opacity: 0.95; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }

        /* Space & Astronomy: A cosmic float & drift */
        .label-card.cosmic {
          animation: cosmicAnimation 3.5s infinite ease-in-out;
        }
        @keyframes cosmicAnimation {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(3px, -3px) rotate(3deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }

        /* Animals & Wildlife: A natural, organic jitter */
        .label-card.wildlife {
          animation: wildlifeAnimation 2.5s infinite ease-in-out;
        }
        @keyframes wildlifeAnimation {
          0% { transform: translate(0, 0); }
          20% { transform: translate(1px, -1px); }
          40% { transform: translate(-1px, 1px); }
          60% { transform: translate(1px, 1px); }
          80% { transform: translate(-1px, -1px); }
          100% { transform: translate(0, 0); }
        }

        /* Fallback for any category without a custom animation */
        .label-card.default {
          animation: roboticAnimation 2s infinite linear;
        }


        .label-card:hover {
          animation-play-state: paused;
          transform: translateY(-5px) scale(1.1);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
        h3 {
          font-family: "Anton", serif;
        }
        /* Modal styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }
        .modal-content {
          background: #333;
          padding: 30px;
          border-radius: 8px;
          text-align: center;
          width: 270px;
          font-weight: 400;
        }
      `}</style>
    </div>
  );
}