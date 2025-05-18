import { useState, useEffect } from 'react';
import styles from '../../../styles/dashboard.module.css';

const roleOptions = ['Preparer', 'Approver'];

export default function UserModal({ open, onClose, onSubmit, user, mode }) {
  const [form, setForm] = useState({ name: '', email: '', role: '' });

  useEffect(() => {
    if (user) {
      setForm({ name: user.name, email: user.email, role: user.role });
    } else {
      setForm({ name: '', email: '', role: '' });
    }
  }, [user, open]);

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalCard}>
        <button className={styles.closeDrawer} onClick={onClose}>×</button>
        <h2>{mode === 'edit' ? 'Edit User' : 'Add New User'}</h2>
        <form onSubmit={handleSubmit} className={styles.userFormModal}>
          <label>Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter Name"
            required
          />
          <label>Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter Email"
            type="email"
            required
          />
          <label>Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            required
          >
            <option value="">Enter Role</option>
            {roleOptions.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
          <button type="submit" className={styles.inviteButton}>
            {mode === 'edit' ? 'Save' : 'Invite'}
          </button>
        </form>
      </div>

    </div>
  );
} 