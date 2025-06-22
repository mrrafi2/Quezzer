import React from "react";
import { motion } from "framer-motion";
import classes from "../style/help.module.css";
import { Link } from "react-router-dom";
import {useDarkMode} from "../contexts/DarkMode"
import { FaRibbon, FaStar, FaCrown } from "react-icons/fa"; 

export default function Help() {
       const { darkMode } = useDarkMode();
     
  return (
    <motion.div
        className={`${classes.helpContainer} ${darkMode ? classes.dark : ""}`}
       initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header Section */}
      <motion.h1
        className={classes.header}
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 70 }}
      >
        Help Center
      </motion.h1>

      {/* Introduction Section */}
      <motion.section
        className={classes.section}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h4 className={classes.sectionHeader}>Getting Started</h4>
        <p>
          Welcome to <strong>Quezzer</strong>—your ultimate quiz platform! To begin,
          sign up or log in, select your preferred quiz category, and start with the first
          label. Remember: labels must be completed in sequential order.
        </p>
      </motion.section>

      <motion.section
        className={classes.section}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h4 className={classes.sectionHeader}>Account Modifications</h4>
        <p>
           After Creating an account you can see a circled default avatar at the right corner of the header. Click the circle to get options like <strong>Logout</strong>, Dark mode and specially <strong>Edit Account</strong>. There you can edit username or design your account avatar from mutiple icons and your favourite background color.
        </p>
      </motion.section>


      {/* Using Quezzer Section */}
      <motion.section
        className={classes.section}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h4 className={classes.sectionHeader}>Quiz Categories & Sequential Progression</h4>
        <p>
          Quezzer offers diverse categories such as Arts & Culture, History, Science & Nature, Sports
          and many more. Each category is divided into multiple labels. Our system enforces
          sequential progression—if you try to skip a label, you'll receive an alert prompting
          you to complete the previous ones.
        </p>
      </motion.section>

      <motion.section
        className={classes.section}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <h4 className={classes.sectionHeader}>Score Tracking & Badges</h4>
        <p>
          Your performance is tracked per label and per category. Scores are securely stored in
          your account using Firebase. Based on your score, you earn badges:
        </p>
        <ul>
          <li>
            <FaRibbon className={classes.icon} /> Ribbon medal for reaching a 20% milestone.
          </li>
          <li>
            <FaStar className={classes.icon} /> Star medal for reaching a 50% milestone.
          </li>
          <li>
            <FaCrown className={classes.icon} /> Crown medal for reaching an 85% milestone.
          </li>
        </ul>
        <p>
          Initially, the icons appear in grey. As you meet each milestone, they change to
          their unique colors—rewarding you for your progress.
        </p>
      </motion.section>

      {/* Progress Overview Section */}
      <motion.section
        className={classes.section}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <h4 className={classes.sectionHeader}>Progress Overview</h4>
        <p>
        At <strong>Quezzer</strong>, your progress is more than just numbers—it's a journey of discovery and achievement! Our Progress Overview feature dynamically tracks every quiz you conquer, seamlessly translating your earned points into a vibrant, animated progress bar. As you advance through each label, the bar fills up in real time, and at key milestones—20%, 50%, and 85%—you unlock exclusive medals that light up your profile. This engaging visual feedback not only celebrates your current achievements but also motivates you to push further, inspiring you to reach new heights on the leaderboard. Every quiz session is a step closer to mastering your favorite topics, making your learning journey exciting, rewarding, and uniquely yours.
          The overall progress bar displays your cumulative score while an interactive
          “Show all” button lets you view progress for each category.
        </p>
      </motion.section>

      <motion.section
        className={classes.section}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <h4 className={classes.sectionHeader}>Rankings</h4>
        <p>
        Welcome to <strong>Quezzer’s Ranking Arena</strong>, where your quiz prowess transforms into a real-time leaderboard glory! Our innovative ranking system continuously tracks your progress by summing up the scores you earn across different categories. As you complete quizzes and climb through the levels, every point contributes to your overall score, and your rank is recalculated instantly. With every milestone reached, you earn exclusive badges—ribbons, stars, and crowns—that not only celebrate your achievements but also add a vibrant glow to your ranking profile. Whether you're striving for that top spot or chasing personal bests, our dynamic ranking mechanism fuels healthy competition and motivates you to keep pushing your limits. Get ready to see your name shine and your ranking soar as you conquer each challenge on Quezzer!
        </p>
      </motion.section>

      {/* Interactive Features Section */}
      <motion.section
        className={classes.section}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        <h4 className={classes.sectionHeader}>Interactive Features & Animations</h4>
        <p>
          Enjoy a dynamic experience powered by smooth animations and effects. Every category,
          label card, progress bar, and icon is designed to engage you visually and make your
          quiz journey enjoyable.
        </p>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        className={classes.section}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
      >
        <h4 className={classes.sectionHeader}>Frequently Asked Questions</h4>
        <div className={classes.faqItem}>
          <strong>Q: How do I earn a medal?</strong>
          <p>
            <strong>A:</strong> Earn a medal by achieving the required score milestone for a label.
            Once you hit 20%, 50%, or 85% of the maximum points, the corresponding medal icon changes
            color.
          </p>
        </div>
        <div className={classes.faqItem}>
          <strong>Q: Can I skip a label?</strong>
          <p>
            <strong>A:</strong> No. Labels must be completed sequentially. If you attempt to skip
            one, an alert will prompt you to complete the previous labels first.
          </p>
        </div>
        <div className={classes.faqItem}>
          <strong>Q: Where is my progress stored?</strong>
          <p>
            <strong>A:</strong> Your progress is saved to your account via Firebase, ensuring that
            your scores and badges are accessible from any device when you log in.
          </p>
        </div>
      </motion.section>

      {/* Need More Help Section */}
      <motion.section
        className={classes.section}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <h4 className={classes.sectionHeader}>Need More Help?</h4>
        <p>
          If you have further questions or need assistance, please reach out to our support team at{" "}
          <a href="mailto:support@quezzer.com" className={classes.emailLink}>
            support@quezzer.com
          </a>.
          <br />
          Alternatively, you can drop your thoughts at our{" "}
          <Link to="/contact" className={classes.contactLink}>
            Contact Us
          </Link>{" "}
          page!
        </p>
      </motion.section>
    </motion.div>
  );
}
