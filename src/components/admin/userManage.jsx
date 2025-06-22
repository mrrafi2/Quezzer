import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../firebaseInt/firebase';
import { ref, remove, update, onChildAdded, onChildChanged, onChildRemoved } from 'firebase/database';
import { CSVLink } from 'react-csv';
import { Search, Download, Trash2, Shield, Clock, Activity, Calendar, Timer } from 'lucide-react';
import styles from '../style/userManager.module.css';


export default function UserManager() {

  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(new Set());
  const [modalUser, setModalUser] = useState(null);
  const [sortBy, setSortBy] = useState('name');


  // fetch users 
useEffect(() => {
    const usersRef = ref(db, 'users');
  
 
    const unsubAdded = onChildAdded(usersRef, snap => {
      setUsers(prev => ({ ...prev, [snap.key]: snap.val() }));
      setLoading(false);
    });
  

    const unsubChanged = onChildChanged(usersRef, snap => {
      setUsers(prev => ({ ...prev, [snap.key]: snap.val() }));
    });
  
    
    const unsubRemoved = onChildRemoved(usersRef, snap => {
      setUsers(prev => {
        const next = { ...prev };
        delete next[snap.key];
        return next;
      });
    });
  
    // cleanup
    return () => {
      unsubAdded();
      unsubChanged();
      unsubRemoved();
    };
  }, []);
  
  const calculateActivityMetrics = (user) => {
    const now = new Date();
    const today = now.toDateString();
    const thisWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thisMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const sessions = user.sessions || {};
    const quizzes = user.quizzes || {};

    let todayActiveTime = 0;
    let weeklyActiveTime = 0;
    let monthlyActiveTime = 0;
    let todayQuizzes = 0;

    Object.values(sessions).forEach(session => {
      const sessionDate = new Date(session.timestamp);
      const activeTime = session.duration || 0;

      if (sessionDate.toDateString() === today) {
        todayActiveTime += activeTime;
      }
      if (sessionDate >= thisWeek) {
        weeklyActiveTime += activeTime;
      }
      if (sessionDate >= thisMonth) {
        monthlyActiveTime += activeTime;
      }
    });

    Object.values(quizzes).forEach(quiz => {
      const quizDate = new Date(quiz.timestamp);
      if (quizDate.toDateString() === today) {
        todayQuizzes++;
      }
    });

    return {
      todayActiveTime: Math.round(todayActiveTime / 60), 
      weeklyActiveTime: Math.round(weeklyActiveTime / 60),
      monthlyActiveTime: Math.round(monthlyActiveTime / 60),
      averageDailyTime: Math.round(monthlyActiveTime / 30 / 60),
      todayQuizzes,
      lastActive: user.lastActive ? new Date(user.lastActive).toLocaleDateString() : 'Never'
    };
  };

  const userList = useMemo(() => {
    let filtered = Object.entries(users)
      .map(([uid, u]) => ({ 
        uid, 
        ...u, 
        activity: calculateActivityMetrics(u) 
      }))
      .filter(u => {
        const q = search.toLowerCase();
        const name = (u.displayName || '').toLowerCase();
        const email = (u.email || '').toLowerCase();
        return name.includes(q) || email.includes(q);
      });

    // Sort users
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.displayName || '').localeCompare(b.displayName || '');
        case 'email':
          return (a.email || '').localeCompare(b.email || '');
        case 'activity':
          return b.activity.todayActiveTime - a.activity.todayActiveTime;
        case 'quizzes':
          return b.activity.todayQuizzes - a.activity.todayQuizzes;
        default:
          return 0;
      }
    });

    return filtered;
  }, [users, search, sortBy]);

  const deleteUser = uid => {
    if (!window.confirm('Delete this user permanently?')) return;
    remove(ref(db, `users/${uid}`)).catch(err => {
      console.error(err);
      setError('Could not delete user.');
    });
  };

  const bulkDelete = () => {
    if (!window.confirm(`Delete ${selected.size} users?`)) return;
    selected.forEach(uid => remove(ref(db, `users/${uid}`)));
    setSelected(new Set());
  };

  const restrictUser = (uid) => {
    update(ref(db, `users/${uid}`), { restricted: true }).catch(err => {
      console.error(err);
      setError('Could not restrict user.');
    });
  };

  const formatTime = (minutes) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const csvData = useMemo(() => {
    return userList.map(u => ({
      UID: u.uid,
      Name: u.displayName,
      Email: u.email,
      'Today Active Time': formatTime(u.activity.todayActiveTime),
      'Today Quizzes': u.activity.todayQuizzes,
      'Weekly Active Time': formatTime(u.activity.weeklyActiveTime),
      'Monthly Active Time': formatTime(u.activity.monthlyActiveTime),
      'Last Active': u.activity.lastActive,
    }));
  }, [userList]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading users...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>User Management</h1>
        <p className={styles.subtitle}>Monitor user activity and manage accounts</p>
      </div>

      {error && (
        <motion.div 
          className={styles.errorAlert}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.div>
      )}

      <div className={styles.controls}>
        <div className={styles.searchWrapper}>
          <Search className={styles.searchIcon} size={20} />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className={styles.sortSelect}
        >
          <option value="name">Sort by Name</option>
          <option value="email">Sort by Email</option>
          <option value="activity">Sort by Activity</option>
          <option value="quizzes">Sort by Quizzes</option>
        </select>

        <div className={styles.actionButtons}>
          <button 
            onClick={bulkDelete} 
            disabled={!selected.size}
            className={`${styles.button} ${styles.deleteButton}`}
          >
            <Trash2 size={16} />
            Delete ({selected.size})
          </button>

          <CSVLink data={csvData} filename="users.csv" className={styles.csvLink}>
            <button className={`${styles.button} ${styles.exportButton}`}>
              <Download size={16} />
              Export CSV
            </button>
          </CSVLink>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Activity size={24} />
          </div>
          <div className={styles.statInfo}>
            <h3>Total Users</h3>
            <p>{userList.length}</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Clock size={24} />
          </div>
          <div className={styles.statInfo}>
            <h3>Active Today</h3>
            <p>{userList.filter(u => u.activity.todayActiveTime > 0).length}</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Calendar size={24} />
          </div>
          <div className={styles.statInfo}>
            <h3>Avg Daily Activity</h3>
            <p>{Math.round(userList.reduce((acc, u) => acc + u.activity.averageDailyTime, 0) / userList.length || 0)}m</p>
          </div>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <input
            type="checkbox"
            checked={selected.size === userList.length && userList.length > 0}
            onChange={e => {
              if (e.target.checked) {
                setSelected(new Set(userList.map(u => u.uid)));
              } else {
                setSelected(new Set());
              }
            }}
            className={styles.checkbox}
          />
          <span>Select All</span>
        </div>

        <div className={styles.userGrid}>
          <AnimatePresence>
            {userList.map((user, index) => (
              <motion.div
                key={user.uid}
                className={styles.userCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className={styles.userCardHeader}>
                  <input
                    type="checkbox"
                    checked={selected.has(user.uid)}
                    onChange={e => {
                      const next = new Set(selected);
                      e.target.checked ? next.add(user.uid) : next.delete(user.uid);
                      setSelected(next);
                    }}
                    className={styles.checkbox}
                  />
                  <div className={styles.userAvatar}>
                    <i
                      className={user.avatarIcon || 'fas fa-user'}
                      style={{ 
                        background: user.avatarBgColor || '#6366f1',
                        color: '#fff',
                        fontSize: '18px'
                      }}
                    />
                  </div>
                  <div className={styles.userInfo}>
                    <h3>{user.displayName || 'Unknown User'}</h3>
                    <p>{user.email}</p>
                  </div>
                </div>

                <div className={styles.activityGrid}>
                  <div className={styles.activityItem}>
                    <Timer size={16} />
                    <span>Today: {formatTime(user.activity.todayActiveTime)}</span>
                  </div>
                  <div className={styles.activityItem} style={{display:"none"}}>
                    <Activity size={16} />
                    <span>Quizzes: {user.activity.todayQuizzes}</span>
                  </div>
                  <div className={styles.activityItem}>
                    <Calendar size={16} />
                    <span>Weekly: {formatTime(user.activity.weeklyActiveTime)}</span>
                  </div>
                  <div className={styles.activityItem}>
                    <Clock size={16} />
                    <span>Avg Daily: {formatTime(user.activity.averageDailyTime)}</span>
                  </div>
                </div>

                <div className={styles.userActions}>
                  <button
                    onClick={() => restrictUser(user.uid)}
                    className={`${styles.button} ${styles.restrictButton}` }
                    style={{display:'none'}}
                  >
                    <Shield size={14} />
                    Restrict
                  </button>
                  <button
                    onClick={() => deleteUser(user.uid)}
                    className={`${styles.button} ${styles.deleteButton}`}
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {userList.length === 0 && (
          <div className={styles.emptyState}>
            <Activity size={48} />
            <h3>No users found</h3>
            <p>Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
