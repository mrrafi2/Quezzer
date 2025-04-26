import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { useDarkMode } from "./contexts/DarkMode"; 
import { motion, AnimatePresence, color } from "framer-motion";

export default function Account() {
  const { currentUser, logout, updateUser } = useAuth();
  const { darkMode, setDarkMode } = useDarkMode(); 

  const [showAccountOverlay, setShowAccountOverlay] = useState(false);
  const [showEditOverlay, setShowEditOverlay] = useState(false);
  const [editedUsername, setEditedUsername] = useState(
    currentUser?.displayName || "User"
  );
  const [editedAvatarIcon, setEditedAvatarIcon] = useState(null);
  const [customAvatarBgColor, setCustomAvatarBgColor] = useState("");

  const defaultStringToColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 70%, 60%)`;
  };

  const displayName = currentUser?.displayName || "User";

  let storedAvatarIcon = null;
  let storedAvatarBgColor = "";
  if (currentUser?.photoURL) {
    try {
      const data = JSON.parse(currentUser.photoURL);
      storedAvatarIcon = data.avatarIcon;
      storedAvatarBgColor = data.avatarBgColor;
    } catch (e) {"Error"}
  }

  useEffect(() => {
    if (currentUser?.photoURL) {
      try {
        const data = JSON.parse(currentUser.photoURL);
        setEditedAvatarIcon(data.avatarIcon || null);
        setCustomAvatarBgColor(data.avatarBgColor || "");
      } catch (e) {}
    }
  }, [currentUser]);

  const avatarBgColor =
    customAvatarBgColor || storedAvatarBgColor || defaultStringToColor(displayName);

  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase())
    .join("");

  const editedInitials = editedUsername
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase())
    .join("");

  const avatarIcons = [
    "fa-solid fa-user",
    "fa-solid fa-user-secret",
    "fa-solid fa-user-tie",
    "fa-solid fa-user-nurse",
    "fa-sharp fa-solid fa-brain",
    "fa-solid fa-face-smile",
    "fa-solid fa-child-dress",
    "fa-solid fa-question",
    "fa-solid fa-person-military-rifle",
    "fa-solid fa-user-ninja",
    "fa-solid fa-user-doctor",
    "fa-solid fa-user-astronaut",
    "fa-solid fa-skull",
    "fa-solid fa-robot",
    "fa-solid fa-dove",
   "fa-solid fa-fire-flame-curved"
  ];

  // Handlers
  const handleLogout = () => {
    logout();
    setShowAccountOverlay(false);
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
   
  };

  const handleSaveChanges = async () => {
    await updateUser(editedUsername, editedAvatarIcon, customAvatarBgColor);
    setShowEditOverlay(false);
    setShowAccountOverlay(false);
  };

  const closeAccountOverlay = () => {
    setShowAccountOverlay(false);
  };

  const accountCardStyles = {
    position: "absolute",
    top: "45px",
    right: "0",
    borderRadius: "8px",
    boxShadow: darkMode ? "0 2px 10px rgba(0,0,0,0.5)" : "0 2px 10px rgba(0,0,0,0.15)",
    padding: "15px",
    width: "260px",
    animation: "fadeIn 0.3s",
    zIndex: 1000,
    background: darkMode ? "linear-gradient(100deg, #2c2c2c, #1f1f1f)" : "linear-gradient(100deg, #ffffff, #f0f0f0)",
    color : darkMode ? 'white' : "black"
  };

  const cardCloseButtonStyles = {
    position: "absolute",
    top: "5px",
    right: "5px",
    border: "none",
    background: "none",
    fontSize: "20px",
    cursor: "pointer",
    color : darkMode ? 'white' : "black"

  };
  
  return (
    <div>
      <div style={{ position: "relative", display: "inline-block", top: "-7px", right:'-8px' }}>
        <div className="d-flex align-items-center me-0">
          {currentUser ? (
            <>
              <div
                className="me-0 ms-2"
                style={{
                  width: "33px",
                  height: "33px",
                  borderRadius: "50%",
                  backgroundColor: avatarBgColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 500,
                  fontSize: "13px",
                  transition: "background-color 0.3s ease",
                  cursor: "pointer",
                }}
                title={displayName}
                onClick={() => setShowAccountOverlay(!showAccountOverlay)}
              >
                {editedAvatarIcon || storedAvatarIcon ? (
                  <i className={editedAvatarIcon || storedAvatarIcon}></i>
                ) : (
                  initials
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                className="me-2"
                style={{
                  textDecoration: "none",
                  color: 'white', 
                  fontWeight: 'bold',
                  transition: "color 0.3s ease",
                  fontSize: "10px",
                  position: "relative",
                  
                  background: "linear-gradient(90deg,rgb(253, 113, 13),rgb(242, 16, 16))",
                  padding: "0.3rem 0.5rem",
                  borderRadius: "0.5rem",

                }}
              >
                Sign-up
              </Link>
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  fontWeight: "bold",
                  padding: "0.3rem 0.6rem",
                  borderRadius: "0.5rem",
                  background: "linear-gradient(90deg, #0d6efd, #6610f2)",
                  color: "#fff",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  fontSize: "10px",
                }}
              >
                Log-in
              </Link>
            </>
          )}
        </div>

        {/* Account Details Overlay Card */}
        {showAccountOverlay && (
          <div style={accountCardStyles}>
            <button style={cardCloseButtonStyles} onClick={() => setShowAccountOverlay(false)}>
              ×
            </button>

            <h4 style={{ margin: "10px 35px 5px" }}>{displayName}</h4>
            <p style={{ margin: "0 32px 16px", fontSize: "14px", color: darkMode ? "#ddd" : "#555", }} >
              {currentUser?.email}
            </p>

            <button
              onClick={() => setShowEditOverlay(true)}
              style={{ width: "90%", marginLeft: "10px" }}
              className="btn btn-light btn-sm"
              title="Edit Account"
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </button>

            <hr className="bg-secondary mt-3 mb-3" style={{ height: "0.5px", opacity: 0.3 }} />

            <Link
              to="/privacy"
              className="alert alert-secondary"
              style={{
                textDecoration: "none",
                fontSize: "14px",
                display: "block",
                marginTop: "15px",
                height: "20px",
                marginBottom: "10px",
              }}
              onClick={closeAccountOverlay}
            >
              <span style={{ position: "relative", top: "-10.5px", fontWeight: 500 }} className="text-muted">
                Privacy Policy
              </span>
            </Link>

            <Link
              to="/terms"
              className="alert alert-secondary"
              style={{
                textDecoration: "none",
                fontSize: "14px",
                display: "block",
                height: "20px",
                marginBottom: "10px",
              }}
              onClick={closeAccountOverlay}
            >
              <span style={{ position: "relative", top: "-10.5px", fontWeight: 500 }} className="text-muted">
                Terms & Conditions
              </span>
            </Link>

            <div style={{ marginTop: "15px", fontSize: "14px",  }} className="form-check form-switch">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={handleDarkModeToggle}
                style={{ cursor: "pointer" }}
                className="form-check-input"
                id="dark"
              />
              <label className="form-check-label" htmlFor="dark" style={{cursor:"pointer"}}>
                Dark Mode
              </label>
            </div>

            <hr className="bg-secondary mt-3 mb-2" style={{ height: "0.5px", opacity: 0.3 }} />

            <button
              onClick={handleLogout}
              style={{ marginTop: "10px", width: "80%" }}
              className="btn btn-sm btn-outline-danger mb-2 ms-4"
            >
              Logout
            </button>
          </div>
        )}

      </div>

      <AnimatePresence>
        {showEditOverlay && (
          <motion.div
            style={overlayStyles}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              style={modalStyles}
              initial={{ scale: 0.8, opacity: 0, y: -50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -50 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <button style={closeButtonStyles} onClick={() => setShowEditOverlay(false)}>
                ×
              </button>
              {/* Current Avatar Preview */}
              <div style={{ marginBottom: "15px", display: "flex", justifyContent: "center" }}>
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    backgroundColor: customAvatarBgColor || defaultStringToColor(editedUsername),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: 500,
                    fontSize: "20px",
                  }}
                >
                  {editedAvatarIcon ? (
                    <i className={editedAvatarIcon}></i>
                  ) : (
                    editedInitials
                  )}
                </div>
              </div>

              <h5>Edit Account</h5>
              <div style={{ marginTop: "15px", textAlign: "start" }}>
                <label>
                  Username:
                  <input
                    className="border-0 shadow mt-2"
                    type="text"
                    value={editedUsername}
                    onChange={(e) => setEditedUsername(e.target.value)}
                    style={{ marginLeft: "10px", padding: "7px", width: "calc(100% - 80px)", borderRadius:"4px" }}
                  />
                </label>
              </div>
              <div style={{ marginTop: "17px", textAlign: "left" }}>
                <p className="text-light">Choose an Avatar :</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {avatarIcons.map((iconClass, index) => (
                    <div
                      key={index}
                      onClick={() => setEditedAvatarIcon(iconClass)}
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        backgroundColor: "#f0f0f0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        border: editedAvatarIcon === iconClass ? "2px solid #007bff" : "none",
                      }}
                    >
                      <i className={iconClass} style={{ fontSize: "19px", color: "#333" }}></i>
                    </div>
                  ))}
                  <div
                    onClick={() => setEditedAvatarIcon(null)}
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      backgroundColor: "#f0f0f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      border: editedAvatarIcon === null ? "2px solid #007bff" : "none",
                    }}
                    title="Use default initials"
                  >
                    <span style={{ fontSize: "16px", color: "#333" }}>
                      {editedInitials.slice(0, 2)}
                    </span>
                  </div>
                </div>
                <div style={{ marginTop: "15px", border:"none" }} className="rounded">
                  <span className="text-light mb-2">Choose Avatar Background Color:</span>
                  <input
                    className="rounded-circle p-2"
                    type="color"
                    value={customAvatarBgColor || "#ffffff"}
                    onChange={(e) => setCustomAvatarBgColor(e.target.value)}
                    style={{
                      marginLeft: "10px",
                      padding: "5px",
                      border: "none",
                      width: "40px",
                      height: "40px",
                      cursor: "pointer",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.3)"
                    }}
                  />
                </div>
              </div>
              <div style={{ marginTop: "15px" }}>
                <button onClick={handleSaveChanges} style={buttonStyles}>
                  Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>

  );
}


    
    

const overlayStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
  minHeight: "100vh",
};

const modalStyles = {
  background: "linear-gradient(135deg, #f6d365, #fda085)",
  padding: "30px",
  borderRadius: "12px",
  width: "340px",
  position: "relative",
  textAlign: "center",
  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
  color: "#fff",
  height:"520px"
};

const closeButtonStyles = {
  position: "absolute",
  top: "10px",
  right: "10px",
  border: "none",
  background: "none",
  fontSize: "20px",
  cursor: "pointer",
};

const buttonStyles = {
  padding: "5px 9px",
  border: "none",
  borderRadius: "4px",
  backgroundColor: "#007bff",
  color: "#fff",
  cursor: "pointer",
  fontSize: "11px",
  fontWeight: 500,
};

