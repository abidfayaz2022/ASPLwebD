import { useState, useRef, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiKey } from 'react-icons/fi';
import styles from '../../../styles/dashboard.module.css';

export default function UserActionsMenu({ onEdit, onDelete, onResetPassword }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className={styles.userActionsMenu} ref={menuRef}>
      <button className={styles.menuButton} onClick={() => setOpen(v => !v)}>
        <span className={styles.menuDots}>⋮</span>
      </button>
      {open && (
        <div className={styles.menuDropdown}>
          <button onClick={onEdit} className={styles.menuItem}>
            <FiEdit2 className={styles.menuIcon} /> Edit
          </button>
          <button onClick={onDelete} className={styles.menuItem}>
            <FiTrash2 className={styles.menuIcon} /> Delete
          </button>
          <button onClick={onResetPassword} className={styles.menuItem}>
            <FiKey className={styles.menuIcon} /> Reset Password
          </button>
        </div>
      )}
    </div>
  );
} 