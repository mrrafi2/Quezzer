
import React from 'react';
import { useAuth } from '../contexts/AuthContext';        
import Account from "../Auth/account";
import Logo from "./logo";
import Nav from './nav';
import classes from "../style/header.module.css"; 
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { currentUser } = useAuth();      
  const navigate = useNavigate()              

  return (
    <header className={classes.header} role="banner" aria-label="Main site header">
      <div className={classes.bgAnimation}>
        <div className={classes.floatingShape1}></div>
        <div className={classes.floatingShape2}></div>
        <div className={classes.floatingShape3}></div>
        <div className={classes.particleEffect}></div>
      </div>
      
      
      <div className={classes.gradientOverlay}></div>
      
      <div className={classes.headerContainer}>
        <div className={classes.headerLeft}>

          
          <div className={classes.logoWrapper}>
         
            <Logo />     
          </div>

          {currentUser?.isAdmin && (
            <span 
              className={classes.adminBadge} 
              onClick={() => {navigate("/admin")}}
              role="button" 
              aria-label="Admin dashboard"
              tabIndex={0}
            >
              <span className={classes.adminText}>Admin Panel</span>
              <div className={classes.badgeGlow}></div>
            </span>
          )}
        </div>

        <div className={classes.headerRight}>
          
          <div className={classes.accountWrapper}>
            <Account />
          </div>

          <div className={classes.navWrapper}>
            <Nav />
          </div>
        
        </div>
      </div>
      
      {/* Interactive Pulse Effect */}
      <div className={classes.pulseEffect}></div>
    </header>
  );
}
