import styles from '../../../styles/dashboard.module.css';

export default function DeleteUserModal({ open, onClose, onConfirm, user }) {
  if (!open) return null;
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalCard}>
        <button className={styles.closeDrawer} onClick={onClose}>×</button>
        <div className={styles.deleteIconWrapper}>
          <span className={styles.deleteIcon}>🗑️</span>
        </div>
        <h2>Are you sure you want to delete this User?</h2>
        <p style={{marginBottom: '24px', color: '#555'}}>{user?.name} ({user?.email})</p>
        <button className={styles.inviteButton} onClick={onConfirm}>Done</button>
      </div>
    </div>
  );
} 