import styles from '../../../styles/dashboard.module.css';

export default function CompanyFilters({ filters, onChange, onClear, onApply, statusOptions }) {
  return (
    <div className={styles.filterPanel}>
      <div className={styles.filterHeader}>
        <h3>Filter Companies</h3>
        <button onClick={onClear} className={styles.clearButton}>
          Clear all
        </button>
      </div>

      <div className={styles.filterContent}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Company Name</label>
          <input
            type="text"
            className={styles.filterInput}
            value={filters.companyName}
            onChange={e => onChange({ ...filters, companyName: e.target.value })}
            placeholder="Search by company name"
          />
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Registration Number</label>
          <input
            type="text"
            className={styles.filterInput}
            value={filters.registrationNo}
            onChange={e => onChange({ ...filters, registrationNo: e.target.value })}
            placeholder="Search by registration number"
          />
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Filing Due Date</label>
          <input
            type="date"
            className={styles.filterInput}
            value={filters.dueDate}
            onChange={e => onChange({ ...filters, dueDate: e.target.value })}
          />
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Status</label>
          <div className={styles.statusOptions}>
            {statusOptions.map(status => (
              <div key={status} className={styles.statusOption}>
                <input
                  type="checkbox"
                  id={`status-${status}`}
                  className={styles.statusCheckbox}
                  checked={filters.status.includes(status)}
                  onChange={e => {
                    const newStatus = e.target.checked
                      ? [...filters.status, status]
                      : filters.status.filter(s => s !== status);
                    onChange({ ...filters, status: newStatus });
                  }}
                />
                <label htmlFor={`status-${status}`} className={styles.statusLabel}>
                  {status}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.filterFooter}>
        <button onClick={onApply} className={styles.applyButton}>
          Apply Filters
        </button>
      </div>
    </div>
  );
} 