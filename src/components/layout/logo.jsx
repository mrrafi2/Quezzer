import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import classes from "../style/logo.module.css";
import { useDarkMode } from "../contexts/DarkMode"; 


const Logo = () => {
  const { darkMode } = useDarkMode();
  
  return (
    <Link 
      to="/" 
      className={`${classes.logoContainer} ${darkMode ? classes.dark : ""}`}
    >
      <img src={logo} alt="#Logo" className={classes.logoImg} />
    </Link>
  );
};

export default Logo;
