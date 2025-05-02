import { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import SEO from '../../components/SEO';
import styles from '../../styles/Calculator.module.css';

export default function AuditCalculator() {
  const [inputs, setInputs] = useState({
    employees: '',
    revenue: '',
    assets: '',
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const toNum = (val) => parseFloat(val || 0);

  const handleCalculate = () => {
    const { employees, revenue, assets } = inputs;
    if (!employees || !revenue || !assets) {
      setResult(null);
      return;
    }

    const employeeCheck = toNum(employees) <= 12;
    const revenueCheck = toNum(revenue) <= 1200000;
    const assetsCheck = toNum(assets) <= 12000000;

    const conditionsMet = [employeeCheck, revenueCheck, assetsCheck].filter(Boolean).length;
    const needsAudit = conditionsMet < 2;
    setResult(needsAudit ? '❗ Audit Required' : '✅ Audit Not Required');
  };

  return (
    <MainLayout>
      <SEO title="Audit Calculator | The Angel Services" />
      <div className={styles.calculatorPage}>
        <div className={styles.inputSection}>
          <h1 className={styles.pageTitle}>Audit Requirement Checker</h1>
          <p className={styles.description}>
            Determine if your company qualifies for audit exemption under ACRA’s small company criteria.
          </p>

          <div className={styles.cardBox}>
            <label htmlFor="employees">Number of Employees (End of FY)*</label>
            <input
              id="employees"
              name="employees"
              type="number"
              value={inputs.employees}
              onChange={handleChange}
              placeholder="e.g. 10"
              className={styles.dateInput}
            />

            <label htmlFor="revenue">Total Revenue (S$)*</label>
            <input
              id="revenue"
              name="revenue"
              type="number"
              value={inputs.revenue}
              onChange={handleChange}
              placeholder="e.g. 900000"
              className={styles.dateInput}
            />

            <label htmlFor="assets">Total Assets (S$)*</label>
            <input
              id="assets"
              name="assets"
              type="number"
              value={inputs.assets}
              onChange={handleChange}
              placeholder="e.g. 5000000"
              className={styles.dateInput}
            />

            <button className={styles.generateButton} onClick={handleCalculate}>
              Calculate
            </button>

            {result && (
              <div style={{ marginTop: '20px' }}>
                <strong style={{ fontSize: '1.2rem', color: result.includes('Not') ? 'green' : 'red' }}>
                  {result}
                </strong>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
