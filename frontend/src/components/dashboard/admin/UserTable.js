import styles from '../../../styles/dashboard.module.css';
import UserActionsMenu from './UserActionsMenu';

export default function UserTable({ users, onEdit, onDelete, onResetPassword }) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.companyTable}>
        <thead className={styles.companyTableHead}>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Roles</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className={styles.companyTableRow}>
              <td className={styles.companyTableCell}>
                <div className={styles.avatarCircle}>
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className={styles.avatarImg} />
                  ) : (
                    <span className={styles.avatarInitial}>{user.name[0]}</span>
                  )}
                </div>
              </td>
              <td className={styles.companyTableCell}>{user.name}</td>
              <td className={styles.companyTableCell}>{user.email}</td>
              <td className={styles.companyTableCell}>
                <span className={styles.rolePill}>{user.role}</span>
              </td>
              <td className={styles.companyTableCell}>
                <UserActionsMenu
                  onEdit={() => onEdit(user)}
                  onDelete={() => onDelete(user)}
                  onResetPassword={() => onResetPassword(user)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 