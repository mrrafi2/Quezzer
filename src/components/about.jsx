import React from 'react';
import { useDarkMode } from "./contexts/DarkMode"; 

const AboutUs = () => {
  const { darkMode } = useDarkMode();

  return (
    <div className={`about-container p-3 ${darkMode ? 'dark' : ''}`}>
      <header className="about-header fw-bold ms-2 mt-2">
        <h1>About Quezzer</h1>
      </header>
      
      <main className="about-content ms-3 mb-5">
        <section className="intro-section">
          <p>
            Welcome to <strong>Quezzer</strong>—the ultimate hub for curious minds and quiz enthusiasts. We transform everyday trivia into an immersive experience that challenges your intellect and fuels your passion for discovery.
          </p>
        </section>
        
        <section className="journey-section">
          <h2>Our Journey</h2>
          <p>
            Founded by a diverse team of educators, innovators, and tech aficionados, Quezzer started as a bold idea to make learning interactive and fun. Our journey began with a simple quiz platform and evolved into a vibrant, community-driven space that celebrates knowledge and creativity.
          </p>
          <p>
            Over time, we have refined our platform with cutting-edge technology and user feedback. Every quiz is crafted with care, ensuring that learning is not just informative—but also engaging and dynamic.
          </p>
        </section>
        
        <section className="mission-section">
          <h2>Our Mission and Values</h2>
          <p>
            At Quezzer, our mission is to empower individuals to learn, explore, and grow. We believe in:
          </p>
          <ul>
            <li><strong>Innovation:</strong> Using modern technology to create intuitive, interactive learning experiences.</li>
            <li><strong>Inclusivity:</strong> Building a welcoming platform for people of all ages and backgrounds.</li>
            <li><strong>Curiosity:</strong> Inspiring a lifelong passion for learning through engaging content and challenges.</li>
            <li><strong>Community:</strong> Encouraging knowledge sharing and collaboration among quiz enthusiasts.</li>
          </ul>
          <p>
            These core values guide our decisions and drive us to continuously improve our platform for an ever-evolving digital age.
          </p>
        </section>
        
        <section className="offer-section">
          <h2>What We Offer</h2>
          <p>
            Quezzer isn’t just a quiz site—it’s a complete learning ecosystem. Here’s what you can expect:
          </p>
          <ul>
            <li><strong>Extensive Quiz Library:</strong> Hundreds of quizzes spanning topics from science and history to pop culture and technology.</li>
            <li><strong>Interactive Tools:</strong> Features that let you track your progress, earn badges, and challenge friends.</li>
            <li><strong>User-Centric Design:</strong> A modern, responsive interface designed for both desktop and mobile experiences.</li>
            <li><strong>Continuous Updates:</strong> Fresh content and features regularly added to keep your learning journey exciting.</li>
          </ul>
          <p>
            Whether you’re a casual quiz taker or a trivia expert, Quezzer adapts to your pace and curiosity.
          </p>
        </section>
        
        <section className="community-section">
          <h2>Our Community</h2>
          <p>
            At the core of Quezzer is a passionate community of learners and quiz enthusiasts. Our interactive events, competitions, and forums create a lively space where knowledge is celebrated and shared.
          </p>
          <p>
            We continuously engage with our users, using your feedback to shape new features and content, ensuring that every member feels valued and empowered.
          </p>
        </section>
        
        <section className="connect-section">
          <h2>Connect With Us</h2>
          <p>
            We love hearing from you! Join our community on social media or visit our forums to share your ideas, learn from others, and stay updated on the latest quizzes and events.
          </p> 
          <div className="social-icons mt-5">
            <a href="https://www.facebook.com/quezzer" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com/quezzer" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.linkedin.com/company/quezzer" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://www.youtube.com/quezzer" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </section>
      </main>
      
      <style>{`
        /* Base container styles */
        .about-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
          font-family: 'Roboto', sans-serif;
          font-size: 1rem;
          line-height: 1.8;
          color: #333;
          background-color: #f9f9f9;
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        .about-container.dark {
          background-color: #1e1e1e;
          color: #ddd;
        }
        
        .about-header {\n  margin-bottom: 30px;\n}\n\n.about-header h1 {\n  font-size: 2.4rem;\n  font-weight: 700;\n  color: #222;\n  margin-bottom: 20px;\n  letter-spacing: -1px;\n  transition: color 0.3s ease;\n}\n\n.about-container.dark .about-header h1 {\n  color: #fff;\n}\n        \n        /* Content and paragraph styles */\n        .about-content p {\n          font-size: 1.1rem;\n          margin: 20px 0;\n          transition: color 0.3s ease;\n        }\n        .about-container.dark .about-content p {\n          color: #ccc;\n        }\n\n        /* Heading styles */\n        .about-content h2 {\n          margin-top: 40px;\n          font-size: 2.2rem;\n          font-weight: 600;\n          color: #444;\n          border-bottom: 2px solid #ddd;\n          padding-bottom: 10px;\n          margin-bottom: 20px;\n          transition: color 0.3s ease, border-color 0.3s ease;\n        }\n        .about-container.dark .about-content h2 {\n          color: #ddd;\n          border-bottom: 2px solid #555;\n        }\n\n        /* List styles */\n        .about-content ul {\n          list-style-type: disc;\n          margin-left: 20px;\n          font-size: 1.1rem;\n        }\n\n        /* Social icons */\n        .social-icons {\n          margin-top: 20px;\n          text-align: center;\n        }\n        .social-icons a {\n          margin: 0 10px;\n          font-size: 2rem;\n          color: #555;\n          transition: color 0.3s ease;\n        }\n        .about-container.dark .social-icons a {\n          color: #aaa;\n        }\n        .social-icons a:hover {\n          color: #1da1f2;\n        }\n      `}</style>
    </div>
  );
};

export default AboutUs;
