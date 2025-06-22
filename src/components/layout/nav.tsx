import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { createPortal } from 'react-dom';

export default function Nav() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const toggleOffcanvas = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  const closeOffcanvas = () => {
    setShowOffcanvas(false);
  };

  const offcanvasWidth = windowWidth < 768 ? '270px' : '320px';

  const triggerButtonContainerStyle: React.CSSProperties = {
    position: 'fixed',
    top: '4px',
    right: '10px',
    zIndex: 1100,
     transform: showOffcanvas ? `translateX(${offcanvasWidth})` : 'translateX(0)',
    transition: 'transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  };

  const triggerButtonStyle: React.CSSProperties = {
    background: showOffcanvas 
      ? 'linear-gradient(135deg, #ff6b6b, #ee5a24)' 
      : 'linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6))',
    padding: windowWidth < 500 ? '10px' : '14px',
    borderRadius: '16px',
    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    color: 'white',
    cursor: 'pointer',
    transform: isButtonClicked ? 'scale(0.85) rotate(180deg)' : 'scale(1) rotate(0deg)',
    fontSize: windowWidth < 500 ? '14px' : '18px',
    boxShadow: showOffcanvas 
      ? '0 10px 25px rgba(255, 107, 107, 0.4), 0 0 30px rgba(255, 107, 107, 0.2)' 
      : '0 8px 20px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    position: 'relative',
    overflow: 'hidden',
    top: windowWidth < 500 ? '-10px' : '-1px'
  };

  const offcanvasStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    right: 0,
    width: offcanvasWidth,
    height:'100vh',
    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(20, 20, 40, 0.95))',
    backdropFilter: 'blur(20px)',
    transform: showOffcanvas ? 'translateX(0) scale(1)' : `translateX(${offcanvasWidth}) scale(0.8)`,
    opacity: showOffcanvas ? 1 : 0,
    transition: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    zIndex: 1050,
    borderLeft: '2px solid rgba(255, 255, 255, 0.1)',
    color: '#fff',
    pointerEvents: showOffcanvas ? 'auto' : 'none',
    boxShadow: showOffcanvas ? '-20px 0 60px rgba(0, 0, 0, 0.5)' : 'none',
    overflow: 'hidden',
  };

  const floatingShapeStyle = (delay: number, size: number): React.CSSProperties => ({
    position: 'absolute',
    width: `${size}px`,
    height: `${size}px`,
    background: 'linear-gradient(45deg, rgba(74, 144, 226, 0.3), rgba(80, 227, 194, 0.3))',
    borderRadius: '50%',
    animation: `float 6s ease-in-out infinite ${delay}s, rotate 8s linear infinite`,
    filter: 'blur(1px)',
  });

  const offcanvasHeaderStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2rem 1.5rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
    position: 'relative',
    overflow: 'hidden',
  };

  const offcanvasTitleStyle: React.CSSProperties = {
    fontSize: '1.6rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #4a90e2, #50e3c2)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0,
    letterSpacing: '0.5px',
    animation: showOffcanvas ? 'slideInLeft 0.6s ease-out 0.2s both' : 'none',
  };

  const closeButtonStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.1)',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    fontSize: '20px',
    color: '#fff',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(10px)',
  };

  const offcanvasBodyStyle: React.CSSProperties = {
    padding: '2rem 1.5rem',
    height: 'calc(100% - 120px)',
    overflowY: 'auto',
    position: 'relative',
  };

  const navItemStyle = (index: number): React.CSSProperties => ({
    animation: showOffcanvas ? `slideInUp 0.6s ease-out ${0.1 * index + 0.3}s both` : 'none',
    marginBottom: '1rem',
  });

  const navLinkStyle = (isActive: boolean): React.CSSProperties => ({
    fontSize: '1.1rem',
    padding: '16px 20px',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    borderRadius: '20px',
    textAlign: 'center',
    color: '#ffffff',
    background: isActive
      ? 'linear-gradient(135deg, #4a90e2, #50e3c2)'
      : 'rgba(255, 255, 255, 0.08)',
    border: isActive 
      ? '2px solid rgba(74, 144, 226, 0.5)' 
      : '2px solid rgba(255, 255, 255, 0.1)',
    transform: isActive ? 'scale(1.05) translateY(-2px)' : 'scale(1) translateY(0)',
    textDecoration: 'none',
    display: 'block',
    position: 'relative',
    overflow: 'hidden',
    backdropFilter: 'blur(10px)',
    boxShadow: isActive 
      ? '0 10px 30px rgba(74, 144, 226, 0.3), 0 0 20px rgba(80, 227, 194, 0.2)' 
      : '0 4px 15px rgba(0, 0, 0, 0.2)',
    fontWeight: isActive ? '600' : '500',
    letterSpacing: '0.5px',
  });

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    right: offcanvasWidth,
    bottom: 0,
    left: 0,       
    background: 'rgba(0, 0, 0, 0.4)',
    /* backdropFilter: 'none',   */
    zIndex: 1040,
    transition: 'all 0.4s ease-in-out',
    pointerEvents: showOffcanvas ? 'auto' : 'none',
  };

  const handleButtonClick = () => {
    setIsButtonClicked(true);
    setTimeout(() => {
      setIsButtonClicked(false);
      toggleOffcanvas();
    }, 150);
  };

  const handleLinkHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <>
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
          
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @keyframes slideInLeft {
            from { 
              transform: translateX(-50px);
              opacity: 0;
            }
            to { 
              transform: translateX(0);
              opacity: 1;
            }
          }
          
          @keyframes slideInUp {
            from { 
              transform: translateY(30px);
              opacity: 0;
            }
            to { 
              transform: translateY(0);
              opacity: 1;
            }
          }
          
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          
          .nav-link {
            position: relative;
            overflow: hidden;
          }
          
          .nav-link::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s;
          }
          
          .nav-link:hover::before {
            left: 100%;
          }
          
          .nav-link::after {
            content: '';
            position: absolute;
            top: var(--mouse-y, 50%);
            left: var(--mouse-x, 50%);
            width: 0;
            height: 0;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: width 0.3s ease, height 0.3s ease;
            pointer-events: none;
          }
          
          .nav-link:hover::after {
            width: 200px;
            height: 200px;
          }
          
          .trigger-button::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: width 0.3s ease, height 0.3s ease;
          }
          
          .trigger-button:hover::before {
            width: 100px;
            height: 100px;
          }
        `}
      </style>

      
      <>
      {/* Trigger Button */}
      <div style={triggerButtonContainerStyle}>
        <button
          style={triggerButtonStyle}
          onClick={handleButtonClick}
          className="trigger-button"
        >
          {showOffcanvas ? '✕' : '☰'}
        </button>
      </div>

      {/* Portal: Overlay + Offcanvas */}
      {createPortal(
        <>
         <div style={offcanvasStyle}>
        
        <div style={floatingShapeStyle(0, 80)} 
             className="absolute top-10 right-10" />
        <div style={floatingShapeStyle(2, 60)} 
             className="absolute top-32 right-32" />
        <div style={floatingShapeStyle(4, 40)} 
             className="absolute bottom-20 right-16" />
        <div style={floatingShapeStyle(1, 50)} 
             className="absolute bottom-40 left-10" />

        <div style={offcanvasHeaderStyle}>
          <h5 style={offcanvasTitleStyle}>Navigation</h5>
          <button 
            type="button" 
            style={closeButtonStyle} 
            onClick={closeOffcanvas}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)';
              e.currentTarget.style.background = 'rgba(255, 107, 107, 0.8)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
          >
            ✕
          </button>
        </div>

        <div style={offcanvasBodyStyle}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              { to: '/', label: 'Home' },
              { to: '/category-progress', label: 'Scores' },
              { to: '/ranking', label: 'Ranking' },
            ].map((item, index) => (
              <li key={item.to} style={navItemStyle(index)}>
                <NavLink
                  to={item.to}
                  onClick={closeOffcanvas}
                  className="nav-link"
                  style={({ isActive }) => navLinkStyle(isActive)}
                  onMouseMove={handleLinkHover}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05) translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(74, 144, 226, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    const isActive = e.currentTarget.getAttribute('aria-current') === 'page';
                    e.currentTarget.style.transform = isActive ? 'scale(1.05) translateY(-2px)' : 'scale(1) translateY(0)';
                    e.currentTarget.style.boxShadow = isActive 
                      ? '0 10px 30px rgba(74, 144, 226, 0.3)' 
                      : '0 4px 15px rgba(0, 0, 0, 0.2)';
                  }}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            
            <li style={navItemStyle(3)}>
              <hr style={{
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                height: '2px',
                border: 'none',
                margin: '2rem 0',
                borderRadius: '1px',
              }} />
            </li>

            {[
              { to: '/about', label: 'About Us' },
              { to: '/help', label: 'Help' },
              { to: '/contact', label: 'Contact' },
            ].map((item, index) => (
              <li key={item.to} style={navItemStyle(index + 4)}>
                <NavLink
                  to={item.to}
                  onClick={closeOffcanvas}
                  className="nav-link"
                  style={({ isActive }) => navLinkStyle(isActive)}
                  onMouseMove={handleLinkHover}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05) translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(74, 144, 226, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    const isActive = e.currentTarget.getAttribute('aria-current') === 'page';
                    e.currentTarget.style.transform = isActive ? 'scale(1.05) translateY(-2px)' : 'scale(1) translateY(0)';
                    e.currentTarget.style.boxShadow = isActive 
                      ? '0 10px 30px rgba(74, 144, 226, 0.3)' 
                      : '0 4px 15px rgba(0, 0, 0, 0.2)';
                  }}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>,
        document.getElementById('portal-root')!
      )}
    </>
    </>
  );
}
