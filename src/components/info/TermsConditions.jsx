import React from "react";
import { motion } from "framer-motion";
import classes from "../style/terms.module.css";
import { useDarkMode } from "../contexts/DarkMode"; 


const Terms = () => {

      const { darkMode } = useDarkMode();
    
  return (
    <motion.div
       className={`${classes.container} ${darkMode ? classes.dark : ""}`}
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0 }}
    >
      <h1 className={classes.header}>Terms &amp; Conditions</h1>

      <section className={classes.section}>
        <h2>1. Introduction</h2>
        <p>
          Welcome to Quezzer, the ultimate quiz platform (“Quezzer,” “we,” “us,” or “our”). These Terms &amp; Conditions (“Terms”) apply to your use of our website, mobile application, and all related services (collectively, the “Service”). By accessing or using the Service, you agree to be bound by these Terms. If you do not agree with any part of these Terms, please do not use our Service.
        </p>
      </section>

      <section className={classes.section}>
        <h2>2. Acceptance of Terms</h2>
        <p>
          By using Quezzer, you confirm that you have read, understood, and agree to be bound by these Terms, as may be amended from time to time. Your continued use of the Service constitutes acceptance of any changes. We recommend that you review these Terms periodically to stay informed of our practices.
        </p>
      </section>

      <section className={classes.section}>
        <h2>3. Eligibility</h2>
        <p>
          You must be at least 13 years old to use Quezzer. By accessing the Service, you represent and warrant that you meet the minimum age requirements and have the legal capacity to enter into these Terms. If you are under the age of 18, you must have your parent or legal guardian’s consent.
        </p>
      </section>

      <section className={classes.section}>
        <h2>4. Account Registration</h2>
        <p>
          To access certain features of our Service, you may be required to create an account. When you register, you agree to provide true, accurate, current, and complete information about yourself. You are responsible for maintaining the confidentiality of your account and password, as well as for all activities that occur under your account. If you suspect any unauthorized use of your account, you must notify us immediately.
        </p>
      </section>

      <section className={classes.section}>
        <h2>5. Use of the Service</h2>
        <p>
          You agree to use Quezzer only for lawful purposes and in accordance with these Terms. You will not use the Service to engage in any harmful, abusive, or illegal behaviors such as attempting to breach the security of our systems or interfering with other users’ experiences.
        </p>
        <p>
          You further agree not to: (a) copy, modify, or distribute any content from the Service without our written permission, (b) use any automated systems (like bots) to access or interact with the Service, or (c) misuse the Service in any way that may compromise its integrity.
        </p>
      </section>

      <section className={classes.section}>
        <h2>6. Intellectual Property</h2>
        <p>
          All content contained on Quezzer, including, but not limited to, text, graphics, logos, images, audio clips, video clips, data compilations, and software, is the property of Quezzer or its licensors and is protected by copyright,
          trademark, and other intellectual property laws. You agree not to reproduce, distribute, or create derivative works from our content without our express written permission.
        </p>
      </section>

      <section className={classes.section}>
        <h2>7. User-Generated Content</h2>
        <p>
          Quezzer may allow you to post, submit, or display content, including your quiz responses, comments, and other information (“User-Generated Content”). You retain ownership of your User-Generated Content, but by submitting it, you grant Quezzer a non-exclusive, worldwide, royalty-free, irrevocable license to use, reproduce, distribute, and display such content in connection with our Services.
        </p>
      </section>

      <section className={classes.section}>
        <h2>8. Privacy Policy</h2>
        <p>
          The collection and use of personal data is described in our <strong>Privacy Policy</strong>, which is incorporated by reference into these Terms. By using our Service, you consent to the collection and use of your information as outlined in our Privacy Policy.
        </p>
      </section>

      <section className={classes.section}>
        <h2>9. Third-Party Links</h2>
        <p>
          Our Service may contain links to third-party websites or services that are not owned or controlled by Quezzer. We are not responsible for the content, privacy policies, or practices of any third-party sites or services. You acknowledge and agree that Quezzer shall not be liable, directly or indirectly, for any damage or loss caused by your use of any third-party content, products, or services.
        </p>
      </section>

      <section className={classes.section}>
        <h2>10. Disclaimers and Limitation of Liability</h2>
        <p>
          YOUR USE OF THE SERVICE IS AT YOUR SOLE RISK. THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED. TO THE MAXIMUM EXTENT PERMITTED BY LAW, QUEZZER DISCLAIMS ALL WARRANTIES,
          EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
        </p>
        <p>
          IN NO EVENT SHALL QUEZZER, ITS AFFILIATES, OR THEIR RESPECTIVE DIRECTORS, OFFICERS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICE.
        </p>
      </section>

      <section className={classes.section}>
        <h2>11. Indemnification</h2>
        <p>
          You agree to indemnify, defend, and hold harmless Quezzer, its affiliates, and their respective directors, officers, employees, and agents from and against any and all claims, liabilities, damages, losses, and expenses, including reasonable attorney fees, arising from your
          use of the Service or your breach of these Terms.
        </p>
      </section>

      <section className={classes.section}>
        <h2>12. Governing Law and Jurisdiction</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of [Your Country/State] without regard to its conflict of law provisions. Any disputes arising under or in connection with these Terms shall be submitted to the exclusive jurisdiction
          of the courts located in [Your Jurisdiction].
        </p>
      </section>

      <section className={classes.section}>
        <h2>13. Termination</h2>
        <p>
          We reserve the right to suspend or terminate your access to the Service at any time for any reason, including but not limited to a violation of these Terms. Upon termination, your right to use the Service will immediately cease, and you must promptly
          destroy all materials obtained from the Service.
        </p>
      </section>

      <section className={classes.section}>
        <h2>14. Amendments</h2>
        <p>
          We may update or modify these Terms from time to time. When we do, we will update the "Effective Date" at the bottom of these Terms and notify you by con­siderable means (for example, posting a notice on our website). Your continued use of
          the Service after any such modifications shall constitute your acceptance of the new Terms.
        </p>
      </section>

      <section className={classes.section}>
        <h2>15. Contact Information</h2>
        <p>
          If you have any questions about these Terms &amp; Conditions, please contact us:
        </p>
        <p>
          Email: <a href="mailto:support@quezzer.com">support@quezzer.com</a>
          <br />
          Address: South Patenga, Chittagong, Bangladesh
        </p>
      </section>

      <section className={classes.section}>
        <h2>Effective Date</h2>
        <p>
          These Terms &amp; Conditions are effective as of January 1, 2025.
        </p>
      </section>
    </motion.div>
  );
};

export default Terms;
