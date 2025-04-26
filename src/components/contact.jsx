import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaUser, FaRegPaperPlane } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const ContactUs = () => {
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState(''); 

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_92q7bkv',    
        'template_stzl0m2',   
        e.target,
        'VE2iSZYr85KvBwxB1'   
      )
      .then(
        (result) => {
          console.log('Email successfully sent!', result.text);
          setFeedback('Your message was sent successfully!');
          setFeedbackType('success');
        },
        (error) => {
          console.error('There was an error sending the email:', error.text);
          setFeedback('There was an error sending your message. Please try again later.');
          setFeedbackType('error');
        }
      );
    
    e.target.reset(); 
  };

  return (
    <div>
      <motion.div
        className="contact-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1>We'd Love to Hear from You!</h1>
        <p className="intro-text">
          Have questions, suggestions, or just want to say hello? Drop us a message and we'll get back to you soon!
        </p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <motion.div className="form-group" whileHover={{ scale: 1.05 }}>
            <label htmlFor="fullname">
              <FaUser /> Full Name
            </label>
            <input type="text" id="fullname" name="fullname" required />
          </motion.div>
          <motion.div className="form-group" whileHover={{ scale: 1.05 }}>
            <label htmlFor="email">
              <FaEnvelope /> Email
            </label>
            <input type="email" id="email" name="email" required />
          </motion.div>
          <motion.div className="form-group" whileHover={{ scale: 1.05 }}>
            <label htmlFor="subject">
              <FaRegPaperPlane /> Subject
            </label>
            <input type="text" id="subject" name="subject" required />
          </motion.div>
          <motion.div className="form-group" whileHover={{ scale: 1.05 }}>
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" required></textarea>
          </motion.div>
          {feedback && (
            <div className={`feedback-message ${feedbackType}`}>
              {feedback}
            </div>
          )}
          <motion.button
            type="submit"
            className="submit-button"
            whileHover={{ scale: 1.05 }}
          >
            Send Message
          </motion.button>
        </form>
      </motion.div>

      <style>
        {`
          .contact-container {
            max-width: 1000px;
            margin: 50px auto;
            padding: 40px;
            border-radius: 15px;
            background: linear-gradient(135deg, #6a11cb, #2575fc);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
            text-align: center;
            color: #ffffff;
          }

          .intro-text {
            font-size: 1.2em;
            margin-bottom: 50px;
          }

          .contact-form {
            display: flex;
            flex-direction: column;
          }

          .form-group {
            margin-bottom: 25px;
          }

          label {
            display: flex;
            align-items: center;
            margin-bottom: 8px;
            font-weight: bold;
            font-size: 1em;
          }

          label svg {
            margin-right: 8px;
          }

          input, textarea {
            width: 100%;
            padding: 12px;
            border: none;
            border-radius: 8px;
            background-color: rgba(255, 255, 255, 0.1);
            color: #ffffff;
            font-size: 1em;
          }

          input::placeholder, textarea::placeholder {
            color: #dddddd;
          }

          input:focus, textarea:focus {
            outline: none;
            background-color: rgba(255, 255, 255, 0.2);
          }

          textarea {
            height: 120px;
          }

          .feedback-message {
            margin-bottom: 15px;
            font-size: 1em;
            padding: 10px;
            border-radius: 8px;
          }

          .feedback-message.success {
            background-color: #d4edda;
            color: #155724;
          }

          .feedback-message.error {
            background-color: #f8d7da;
            color: #721c24;
          }

          .submit-button {
            padding: 15px 30px;
            margin-top: 15px;
            border: none;
            border-radius: 30px;
            background: #ffffff;
            color: #6a11cb;
            font-size: 1.1em;
            font-weight: bold;
            cursor: pointer;
            transition: background 0.3s;
          }

          .submit-button:hover {
            background: #e0e0e0;
          }

          @media (max-width: 600px) {
            .contact-container {
              margin: 10px;
              padding: 20px;
            }

            .intro-text {
              font-size: 1em;
            }

            label, input, textarea, .submit-button {
              font-size: 0.9em;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ContactUs;
