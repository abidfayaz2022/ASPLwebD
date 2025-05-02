import { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import SEO from '../../components/SEO';
import styles from '../../styles/Calculator.module.css';

export default function GSTRequirement() {
  const [inputs, setInputs] = useState({
    taxableTurnover: '',
    importedServices: '',
    overseasSales: '',
  });

  const [checked, setChecked] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
    setChecked(false); // Hide result if user edits again
  };

  const toNum = (val) => parseFloat(val || 0);
  const totalTaxable = toNum(inputs.taxableTurnover) + toNum(inputs.importedServices);
  const isValid =
    inputs.taxableTurnover && inputs.importedServices && inputs.overseasSales;
  const isRequired = totalTaxable > 1000000;

  const handleCheck = () => {
    if (isValid) {
      setChecked(true);
    }
  };

  return (
    <MainLayout>
      <SEO title="GST Requirement | The Angel Services" />
      <div className={styles.calculatorPage}>
        <h1 className={styles.pageTitle}>GST Registration Requirement Checker</h1>
        <p className={styles.description}>
          Check if your business is required to register for <strong>GST in Singapore</strong> based on annual taxable turnover.
        </p>

        <div className={styles.cardBox}>
          <label htmlFor="taxableTurnover">Total Taxable Turnover (last 12 months)*</label>
          <input
            id="taxableTurnover"
            name="taxableTurnover"
            type="number"
            value={inputs.taxableTurnover}
            onChange={handleChange}
            placeholder="e.g. 800000"
            className={styles.dateInput}
          />

          <label htmlFor="importedServices">Imported Services (Reverse Charge)*</label>
          <input
            id="importedServices"
            name="importedServices"
            type="number"
            value={inputs.importedServices}
            onChange={handleChange}
            placeholder="e.g. 100000"
            className={styles.dateInput}
          />

          <label htmlFor="overseasSales">Overseas Sales (Zero-rated supplies)*</label>
          <input
            id="overseasSales"
            name="overseasSales"
            type="number"
            value={inputs.overseasSales}
            onChange={handleChange}
            placeholder="e.g. 50000"
            className={styles.dateInput}
          />

          <button className={styles.generateButton} onClick={handleCheck}>
            Check GST Requirement
          </button>
        </div>

        {checked && (
          <div className={styles.resultBox}>
            <h2>GST Summary</h2>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Amount (SGD)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Total Taxable Turnover</td>
                  <td>{toNum(inputs.taxableTurnover).toLocaleString()}</td>
                </tr>
                <tr>
                  <td>Imported Services</td>
                  <td>{toNum(inputs.importedServices).toLocaleString()}</td>
                </tr>
                <tr>
                  <td>Overseas Sales</td>
                  <td>{toNum(inputs.overseasSales).toLocaleString()}</td>
                </tr>
                <tr>
                  <td><strong>Total for GST Threshold</strong></td>
                  <td><strong>{totalTaxable.toLocaleString()}</strong></td>
                </tr>
              </tbody>
            </table>

            <h2
              style={{
                marginTop: '20px',
                color: isRequired ? '#198754' : '#DC3545',
              }}
            >
              {isRequired
                ? 'You must register for GST (Threshold exceeded)'
                : 'GST Registration not required yet'}
            </h2>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
