import styles from '../../../styles/dashboard.module.css';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

export default function CompanyTable({ companies, sortConfig, onSort, onOpen }) {
  const getSortIcon = (col) => {
    if (!sortConfig || sortConfig.key !== col) return <FaSort />;
    return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
  };

  return (
    <table className={styles.companyTable}>
      <thead>
        <tr>
          {['companyName', 'incorporationDate', 'registrationNo', 'dueDate', 'status'].map(col => (
            <th key={col} onClick={() => onSort(col)} style={{ cursor: 'pointer' }}>
              {col === 'companyName' && 'Company Name'}
              {col === 'incorporationDate' && 'Incorporation Date'}
              {col === 'registrationNo' && 'Registration No.'}
              {col === 'dueDate' && 'Due Date'}
              {col === 'status' && 'Status'}
              <span style={{ marginLeft: 6 }}>{getSortIcon(col)}</span>
            </th>
          ))}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {companies.map(company => (
          <tr key={company.id} className={styles.companyTableRow}>
            <td className={styles.companyTableCell}>{company.companyName}</td>
            <td className={styles.companyTableCell}>{company.incorporationDate}</td>
            <td className={styles.companyTableCell}>{company.registrationNo}</td>
            <td className={styles.companyTableCell}>{company.dueDate}</td>
            <td className={styles.companyTableCell}>
              <span className={styles.statusLabel}>{company.status}</span>
            </td>
            <td className={styles.companyTableCell}>
              <a href="#" className={styles.openLink} onClick={() => onOpen(company)}>Open</a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
} 