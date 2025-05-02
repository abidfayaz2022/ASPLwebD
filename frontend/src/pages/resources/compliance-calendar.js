import { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import SEO from '../../components/SEO';
import styles from '../../styles/Calculator.module.css';

export default function ComplianceCalendar() {
  const [fyDate, setFyDate] = useState('');
  const [results, setResults] = useState(null);

  const handleCalculate = () => {
    if (!fyDate) return;

    const fyEnd = new Date(fyDate);
    const agm = new Date(fyEnd);
    agm.setMonth(agm.getMonth() + 6);

    const annualReturn = new Date(agm);
    annualReturn.setMonth(annualReturn.getMonth() + 1);

    const eci = new Date(fyEnd);
    eci.setMonth(eci.getMonth() + 3);

    const formC = new Date(fyEnd);
    formC.setFullYear(formC.getFullYear() + 1);
    formC.setMonth(10); // November
    formC.setDate(30);

    const format = (date) => date.toLocaleDateString('en-GB');

    setResults({
      fyEnd: format(fyEnd),
      agm: format(agm),
      annualReturn: format(annualReturn),
      eci: format(eci),
      formC: format(formC),
    });
  };

  return (
    <MainLayout>
      <SEO title="Compliance Calendar | The Angel Services" />
      <div className={styles.calculatorPage}>

        {/* ✅ Updated input UI here */}
        <div className={styles.inputSection}>
          <h1 className={styles.pageTitle}>Compliance Calendar</h1>
          <p className={styles.description}>
            Enter your <strong>Financial Year End</strong> to view key compliance deadlines and stay compliant with ACRA and IRAS requirements.
          </p>

          <div className={styles.cardBox}>
            <label htmlFor="fyDate">Please Select Financial Year End Date:</label>
            <input
              id="fyDate"
              type="date"
              value={fyDate}
              onChange={(e) => setFyDate(e.target.value)}
              className={styles.dateInput}
            />
            <button className={styles.generateButton} onClick={handleCalculate}>
              Generate Calendar
            </button>
          </div>
        </div>

        {/* ✅ Results Display */}
        {results && (
          <>
            <div className={styles.resultBox}>
              <h2>Financial Year End</h2>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Compliance</th>
                    <th>Date</th>
                    <th>Note</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Financial Year End</td>
                    <td>{results.fyEnd}</td>
                    <td>-</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className={styles.resultBox}>
              <h2>ACRA Compliance</h2>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Compliance</th>
                    <th>Date</th>
                    <th>Note</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Last Date of AGM</td>
                    <td>{results.agm}</td>
                    <td>6 months from the end of FY</td>
                  </tr>
                  <tr>
                    <td>Filing of Annual Return</td>
                    <td>{results.annualReturn}</td>
                    <td>1 month after AGM</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className={styles.resultBox}>
              <h2>IRAS Compliance</h2>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Compliance</th>
                    <th>Date</th>
                    <th>Note</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Filing of ECI</td>
                    <td>{results.eci}</td>
                    <td>3 months from the end of FY</td>
                  </tr>
                  <tr>
                    <td>Annual Tax Return (Form C)</td>
                    <td>{results.formC}</td>
                    <td>30/11 of the following year</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}
