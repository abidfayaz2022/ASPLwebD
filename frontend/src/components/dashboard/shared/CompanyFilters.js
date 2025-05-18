import styles from '../../../styles/dashboard.module.css';

export default function CompanyFilters({ filters, onChange, onClear, onApply, statusOptions }) {
  return (
    <div className={styles.filterPanel}>
      <h3>Filters</h3>
      <div className={styles.filterGroup}>
        <label>Search by company name</label>
        <input
          type="text"
          value={filters.companyName}
          onChange={e => onChange({ ...filters, companyName: e.target.value })}
          placeholder="Company name"
        />
      </div>
      <div className={styles.filterGroup}>
        <label>Search by registration number</label>
        <input
          type="text"
          value={filters.registrationNo}
          onChange={e => onChange({ ...filters, registrationNo: e.target.value })}
          placeholder="Registration number"
        />
      </div>
      <div className={styles.filterGroup}>
        <label>Filing due dates</label>
        <input
          type="date"
          value={filters.dueDate}
          onChange={e => onChange({ ...filters, dueDate: e.target.value })}
        />
      </div>
      <div className={styles.filterGroup}>
        <label>Status</label>
        {statusOptions.map(status => (
          <div key={status}>
            <input
              type="checkbox"
              checked={filters.status.includes(status)}
              onChange={e => {
                const newStatus = e.target.checked
                  ? [...filters.status, status]
                  : filters.status.filter(s => s !== status);
                onChange({ ...filters, status: newStatus });
              }}
            />
            <span>{status}</span>
          </div>
        ))}
      </div>
      <div className={styles.filterActions}>
        <button onClick={onApply} className={styles.filterButton}>Filter</button>
        <button onClick={onClear} className={styles.clearButton}>Clear all</button>
      </div>
    </div>
  );
} 