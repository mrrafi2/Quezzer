import React from "react";
import { motion } from "framer-motion";
import classes from "./style/privacy.module.css";
import { Link } from "react-router-dom";
import { useDarkMode } from "./contexts/DarkMode"; 

const PrivacyPolicy = () => {
  const { darkMode } = useDarkMode();

  return (
    <motion.div
      className={`${classes.container} ${darkMode ? classes.dark : ""}`}
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0 }}
    >
      <h2 className={classes.header}>Privacy Policy</h2>

      <section className={classes.section}>
        <h2>Introduction</h2>
        <p>
          Welcome to Quezzer. Our Privacy Policy explains how we collect, use, share, and safeguard your personal information when you access and use our website and services (collectively, the "Service"). By accessing or using Quezzer, you agree to the practices described in this Privacy Policy.
        </p>
        <p>
          We are committed to protecting your privacy and ensuring the security of your personal data. Please read this policy carefully to understand our views and practices regarding your personal data and how we will treat it.
        </p>
      </section>

      <section className={classes.section}>
        <h2>Information We Collect</h2>
        <p>We collect several different types of information for various purposes:</p>
        <ul>
          <li>
            <strong>Personal Information:</strong> Such as your name, email address, username, password and other information that you voluntarily provide when you register or update your profile.
          </li>
          <li>
            <strong>Usage and Quiz Data:</strong> Details about your interactions with our Service, including quiz results, preferences, views, and overall usage patterns, to help personalize your experience and improve our offerings.
          </li>
          <li>
            <strong>Technical Data:</strong> We automatically collect information like your IP address, browser type, device information, operating system, and access times. This helps us diagnose problems, improve performance, and enhance security.
          </li>
          <li>
            <strong>Cookies and Tracking Data:</strong> We use cookies and similar technologies to track your activity on our website, manage user sessions, and remember your preferences. You can manage your cookie preferences in your browser settings.
          </li>
        </ul>
      </section>


      <section className={classes.section}>
        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy or our data practices, please contact us:
        </p>
        <p>
          Email: <a href="mailto:support@quezzer.com">support@quezzer.com</a>
          <br />
          Or navigate to <Link to="/contact">Contact</Link> page
          <br />
          Address: 1234 Patenga, Chittagong, Bangladesh
        </p>
      </section>
    </motion.div>
  );
};

export default PrivacyPolicy;
