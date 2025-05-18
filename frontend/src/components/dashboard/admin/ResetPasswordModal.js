import { useState, useEffect } from 'react';
import styles from '../../../styles/dashboard.module.css';

export default function ResetPasswordModal({ open, onClose, onSubmit, user }) {
  const [form, setForm] = useState({ password: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (open) setForm({ password: '', confirm: '' });
  }, [open]);

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password && form.password === form.confirm) {
      onSubmit(form.password);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalCard}>
        <button className={styles.closeDrawer} onClick={onClose}>×</button>
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit} className={styles.userFormModal}>
          <label>New Password</label>
          <div className={styles.passwordFieldWrapper}>
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={handleChange}
              placeholder="Enter New Password"
              required
            />
            <button type="button" className={styles.eyeButton} onClick={() => setShowPassword(v => !v)}>
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          <label>Confirm Password</label>
          <div className={styles.passwordFieldWrapper}>
            <input
              name="confirm"
              type={showConfirm ? 'text' : 'password'}
              value={form.confirm}
              onChange={handleChange}
              placeholder="Enter Confirm Password"
              required
            />
            <button type="button" className={styles.eyeButton} onClick={() => setShowConfirm(v => !v)}>
              {showConfirm ? '🙈' : '👁️'}
            </button>
          </div>
          <button type="submit" className={styles.inviteButton}>Save</button>
        </form>
      </div>
    </div>
  );
} 