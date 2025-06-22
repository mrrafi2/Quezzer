import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { ref, get, set } from 'firebase/database';
import { db } from '../firebaseInt/firebase';
import {
  PlusSquare,
  Save,
  RefreshCw,
  XCircle,
  Loader2,
} from 'lucide-react';
import styles from '../style/QuizManage.module.css';

export default function QuizManager() {
  const { currentUser } = useAuth();
  const [category, setCategory] = useState('');
  const [label, setLabel]       = useState('');
  const [quizzes, setQuizzes]   = useState([]);
  const [loading, setLoading]   = useState(false);
  const [saving, setSaving]     = useState(false);
  const [error, setError]       = useState('');
  const [success, setSuccess]   = useState('');

  
  useEffect(() => {
    if (!category || !label) return;
    setLoading(true);
    setError('');
    setSuccess('');
    get(ref(db, `categories/${category}/labels/${label}/quizzes`))
      .then(snap => {
        const data = snap.val() || {};
        const arr = Array(10).fill().map((_, i) => ({
          id: i,
          question: data[i]?.question || '',
          options: data[i]?.options || ['', '', '', ''],
          answer:  data[i]?.answer   || '',
        }));
        setQuizzes(arr);
      })
      .catch(() => setError('Failed to load quizzes.'))
      .finally(() => setLoading(false));
  }, [category, label]);

  const updateField = (idx, field, value) => {
    setQuizzes(qs => {
      const copy = [...qs];
      if (field === 'options') {
        copy[idx].options = value.split('|').map(s => s.trim()).slice(0,4);
      } else {
        copy[idx][field] = value;
      }
      return copy;
    });
  };

  const createNewLabel = async () => {
    if (!category.trim()) {
      setError('Enter a valid Category first!');
      return;
    }
    setError(''); setSuccess('');
    try {
      const snap = await get(ref(db, `categories/${category}/labels`));
      const count = Object.keys(snap.val()||{}).length;
      setLabel(`label${count+1}`);
      setQuizzes(Array(10).fill().map((_,i)=>({
        id: i, question:'', options:['','','',''], answer:''
      })));
    } catch {
      setError('Couldn’t fetch existing labels.');
    }
  };

  const saveQuizzes = async () => {
    // validate
    for (let i=0; i<10; i++) {
      const { question, options, answer } = quizzes[i];
      if (!question.trim() || options.length!==4 || !answer.trim()) {
        setError(`Row ${i+1} incomplete.`);
        return;
      }
    }
    setSaving(true); setError(''); setSuccess('');
    const payload = quizzes.reduce((acc,q)=> {
      acc[q.id] = { question:q.question.trim(), options:q.options, answer:q.answer.trim() };
      return acc;
    }, {});
    try {
      await set(ref(db, `categories/${category}/labels/${label}/quizzes`), payload);
      setSuccess('Quizzes saved successfully!');
    } catch {
      setError('Failed to save.');
    } finally {
      setSaving(false);
    }
  };

  if (!currentUser?.isAdmin) {
    return <div className={styles.locked}>🚫 Access Denied</div>;
  }

  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <header className={styles.header}>
        <h1>Quiz Manager</h1>
        <div className={styles.controls}>
          <input
            className={styles.input}
            placeholder="Category (e.g. History)"
            value={category}
            onChange={e=>setCategory(e.target.value)}
          />
          <input
            className={styles.input}
            placeholder="Label (auto or type)"
            value={label}
            onChange={e=>setLabel(e.target.value)}
          />
          <button
            type="button"
            className={styles.btn}
            onClick={createNewLabel}
          >
            <PlusSquare size={18}/> New Label
          </button>
          <button
            type="button"
            className={styles.btn}
            onClick={()=>window.location.reload()}
          >
            <RefreshCw size={18}/> Reload
          </button>
        </div>
      </header>

      {/* Feedback */}
      {error && (
        <motion.div
          className={styles.toastError}
          initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
        >
          <XCircle size={16}/> {error}
        </motion.div>
      )}
      {success && (
        <motion.div
          className={styles.toastSuccess}
          initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
        >
          <Save size={16}/> {success}
        </motion.div>
      )}

      {/* Loader */}
      {(loading || saving) && (
        <div className={styles.loadingOverlay}>
          <Loader2 className={styles.loaderIcon} />
        </div>
      )}

      {/* Quiz Table */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Question</th>
              <th>Options (| delimited)</th>
              <th>Answer</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((q, i) => (
              <tr key={i}>
                <td>{i+1}</td>
                <td>
                  <input
                    className={styles.cellInput}
                    value={q.question}
                    onChange={e=>updateField(i,'question',e.target.value)}
                  />
                </td>
                <td>
                  <input
                    className={styles.cellInput}
                    value={q.options.join(' | ')}
                    onChange={e=>updateField(i,'options',e.target.value)}
                  />
                </td>
                <td>
                  <input
                    className={styles.cellInput}
                    value={q.answer}
                    onChange={e=>updateField(i,'answer',e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Save Button */}
      <motion.button
        className={styles.saveButton}
        onClick={saveQuizzes}
        whileHover={{scale:1.03}}
        whileTap={{scale:0.97}}
        disabled={saving}
      >
        <Save size={20}/> Save All
      </motion.button>
    </div>
  );
}
