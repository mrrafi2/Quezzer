import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export default function Nav() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleOffcanvas = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  const closeOffcanvas = () => {
    setShowOffcanvas(false);
  };

  // Responsive offcanvas width
  const offcanvasWidth = windowWidth < 768 ? '230px' : '280px';

  const triggerButtonContainerStyle = {
    marginRight: '7px',
    marginTop: '4px',
    marginBottom: '12px',
  };

  const triggerButtonStyle = {
    background: 'rgba(0, 0, 0, 0.6)',
    border: 'none',
    padding: windowWidth < 768 ? '4px 7px' : '5px 8px',
    borderRadius: '8px',
    transition: 'all 0.3s ease-in-out',
    color: 'white',
    cursor: 'pointer',
    transform: isButtonClicked ? 'scale(0.9)' : 'scale(1)',
    fontSize: windowWidth < 768 ? '11px' : '13px',
    marginTop: '10px',
    position: 'relative',
    right: '-6px',
  };

  // Updated offcanvas style includes fading and pointer-events
  const offcanvasStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: offcanvasWidth,
    height: '100vh',
    background: 'rgba(0, 0, 0, 0.9)',
    backdropFilter: 'blur(12px)',
    transform: showOffcanvas ? 'translateX(0)' : 'translateX(-100%)',
    opacity: showOffcanvas ? 1 : 0,
    transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
    zIndex: 1050,
    borderRight: '2px solid rgba(255, 255, 255, 0.1)',
    color: '#fff',
    pointerEvents: showOffcanvas ? 'auto' : 'none',
  };

  const offcanvasHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  };

  const offcanvasTitleStyle = {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    color: '#fff',
    margin: 0,
  };

  const closeButtonStyle = {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    color: '#fff',
    cursor: 'pointer',
    transition: 'transform 0.2s ease-in-out',
  };

  const offcanvasBodyStyle = {
    padding: '1rem',
  };

  const navLinkStyle = (isActive) => ({
    fontSize: '1.1rem',
    padding: '12px',
    transition: 'all 0.3s ease',
    marginBottom: '15px',
    borderRadius: '25px',
    textAlign: 'center',
    color: '#ffffff',
    background: isActive
      ? 'linear-gradient(135deg, #007bff, #0056b3)'
      : 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    transform: isActive ? 'scale(1.05)' : 'none',
    textDecoration: 'none',
    display: 'block',
  });

  // Button click handler with micro-interaction for icon toggling
  const handleButtonClick = () => {
    setIsButtonClicked(true);
    setTimeout(() => {
      setIsButtonClicked(false);
      toggleOffcanvas();
    }, 150);
  };

  return (
    <>
      {/* Trigger Button */}
      <div style={triggerButtonContainerStyle}>
        <button style={triggerButtonStyle} onClick={handleButtonClick}>
          {/* Toggle icon based on offcanvas visibility */}
          {showOffcanvas ? (
            <i className="fa-solid fa-xmark" style={{ fontSize: windowWidth < 768 ? '12px' : '15px' }}></i>
          ) : (
            <i className="fa-sharp fa-solid fa-bars" style={{ fontSize: windowWidth < 768 ? '12px' : '15px' }}></i>
          )}
        </button>
      </div>

      <div style={offcanvasStyle}>
        <div style={offcanvasHeaderStyle}>
          <h5 style={offcanvasTitleStyle}>Menu</h5>
          <button type="button" style={closeButtonStyle} onClick={closeOffcanvas}>
            &times;
          </button>
        </div>
        <div style={offcanvasBodyStyle}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li>
              <NavLink
                to="/"
                onClick={closeOffcanvas}
                style={({ isActive }) => navLinkStyle(isActive)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/category-progress"
                onClick={closeOffcanvas}
                style={({ isActive }) => navLinkStyle(isActive)}
              >
                Scores
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/ranking"
                onClick={closeOffcanvas}
                style={({ isActive }) => navLinkStyle(isActive)}
              >
                Ranking
              </NavLink>
            </li>
            <hr
              style={{
                backgroundColor: "white",
                height: "2px",
                marginBottom: "25px",
                marginTop: "25px",
                opacity: 0.8,
              }}
            />
            <li>
              <NavLink
                to="/about"
                onClick={closeOffcanvas}
                style={({ isActive }) => navLinkStyle(isActive)}
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/help"
                onClick={closeOffcanvas}
                style={({ isActive }) => navLinkStyle(isActive)}
              >
                Help
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                onClick={closeOffcanvas}
                style={({ isActive }) => navLinkStyle(isActive)}
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
