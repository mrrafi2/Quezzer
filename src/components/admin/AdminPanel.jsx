import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import QuizManager from './quizMange';;
import UserManager from './userManage';
import styles from '../style/adminPanel.module.css';

export default function AdminPanel() {
  const { currentUser } = useAuth();
  const [section, setSection] = useState('quizzes');

  if (!currentUser?.isAdmin) {
    return (
      <div className={styles.locked}>
        <h2>🚫 Access Denied</h2>
        <p>You need admin privileges to view this page.</p>
      </div>
    );
  }

  const tabs = {
    quizzes: <QuizManager />,
    users: <UserManager />,
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>Quezzer Admin</div>
        {Object.keys(tabs).map((key) => (
          <button
            key={key}
            className={`${styles.navBtn} ${
              section === key ? styles.active : ''
            }`}
            onClick={() => setSection(key)}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
      </aside>

      <main className={styles.main}>
        <header className={styles.topbar}>
          <h1>
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </h1>
        </header>
        <section className={styles.content}>{tabs[section]}</section>
      </main>
    </div>
  );
}
