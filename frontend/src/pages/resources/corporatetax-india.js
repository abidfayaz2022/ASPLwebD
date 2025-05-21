'use client';

import { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import SEO from '../../components/SEO';

export default function CorporateTaxIndia() {
  const [inputs, setInputs] = useState({ revenue: '', expenses: '' });
  const [error, setError] = useState('');

  const toNum = (val) => parseFloat(val || 0);
  const revenue = toNum(inputs.revenue);
  const expenses = toNum(inputs.expenses);
  const taxableIncome = revenue - expenses;
  const threshold = 375000;
  const afterThreshold = Math.max(0, taxableIncome - threshold);
  const taxPayable = afterThreshold * 0.09;
  const isValid = !error && revenue > 0 && expenses >= 0 && expenses <= revenue;

  const handleChange = (e) => {
    const { name, value } = e.target;
    const val = value.trim();
    setInputs((prev) => ({ ...prev, [name]: val }));

    const rev = name === 'revenue' ? toNum(val) : revenue;
    const exp = name === 'expenses' ? toNum(val) : expenses;

    if (rev < 0 || exp < 0) {
      setError('Values cannot be negative.');
    } else if (exp > rev) {
      setError('Expenses cannot exceed revenue.');
    } else {
      setError('');
    }
  };

  return (
    <MainLayout>
      <SEO title="UAE Corporate Tax Calculator | The Angel Services" />
      <div className="calculator-container">
        <div className="calculator-card">
          <h1 style={{ textAlign: 'center' }}>Corporate Tax Calculator – UAE</h1>
          <div className="underline-center mx-auto mb-4"></div>
          <p className="subtitle">
            Estimate your UAE corporate tax liability based on current rates and exemption thresholds.
          </p>

          <div className="input-section">
            <label>Total Revenue (AED)</label>
            <input
              type="number"
              name="revenue"
              placeholder="e.g., 500000"
              value={inputs.revenue}
              onChange={handleChange}
            />
            <label>Deductible Expenses (AED)</label>
            <input
              type="number"
              name="expenses"
              placeholder="e.g., 200000"
              value={inputs.expenses}
              onChange={handleChange}
            />
            {error && <p className="error">{error}</p>}
          </div>

          {isValid && (
            <>
              <div className="result-card">
                <h3>
                  Corporate Tax Payable (9%):{' '}
                  <span>
                    AED {taxPayable.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </h3>
                {taxPayable === 0 && (
                  <p className="info-box">
                    No tax payable because taxable income is below the exemption threshold of AED 375,000.
                  </p>
                )}
              </div>

              <div className="summary-card">
                <h4>Calculation Breakdown</h4>
                <table>
                  <tbody>
                    <tr><td>Total Revenue</td><td>AED {revenue.toLocaleString()}</td></tr>
                    <tr><td>Deductible Expenses</td><td>AED {expenses.toLocaleString()}</td></tr>
                    <tr><td>Taxable Income</td><td>AED {taxableIncome.toLocaleString()}</td></tr>
                    <tr><td>Threshold (Exempted)</td><td>AED {threshold.toLocaleString()}</td></tr>
                    <tr><td>Taxable After Threshold</td><td>AED {afterThreshold.toLocaleString()}</td></tr>
                    <tr><td><strong>Corporate Tax (9%)</strong></td><td><strong>AED {taxPayable.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong></td></tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        <style jsx>{`
          .underline-center {
            height: 4px;
            width: 80px;
            background-color: #fcb900;
            border-radius: 4px;
          }

          .calculator-container {
            padding: 40px 20px;
            background: #f9fafb;
            min-height: 100vh;
          }

          .calculator-card {
            background: #fff;
            max-width: 700px;
            margin: auto;
            padding: 30px;
            border-radius: 16px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
          }

          h1 {
            font-size: 32px;
            font-weight: 700;
            color: #1f2a44;
            margin-bottom: 10px;
          }

          .subtitle {
            color: #4a4a4a;
            margin-bottom: 25px;
            text-align: center;
          }

          .input-section label {
            display: block;
            font-weight: 600;
            margin-top: 16px;
            color: #333;
          }

          input {
            width: 100%;
            padding: 10px 14px;
            border: 1px solid #ccc;
            border-radius: 8px;
            margin-top: 6px;
          }

          .error {
            color: #d32f2f;
            margin-top: 10px;
          }

          .result-card {
            margin-top: 30px;
            background: #fefbf3;
            border-left: 5px solid #fcb900;
            padding: 20px;
            border-radius: 12px;
          }

          .result-card h3 {
            color: #000;
            font-weight: 600;
            margin: 0;
          }

          .result-card span {
            color: #1f2a44;
            font-weight: 700;
          }

          .info-box {
            margin-top: 10px;
            color: #666;
            font-style: italic;
          }

          .summary-card {
            margin-top: 30px;
            background: #fff;
            padding: 20px 25px;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          }

          .summary-card h4 {
            font-size: 20px;
            margin-bottom: 20px;
          }

          .summary-card table {
            width: 100%;
            border-collapse: collapse;
          }

          .summary-card td {
            padding: 10px 0;
            border-bottom: 1px solid #eee;
          }

          .summary-card td:first-child {
            font-weight: 500;
            color: #444;
          }

          .summary-card td:last-child {
            text-align: right;
            font-weight: 600;
            color: #1f2a44;
          }
        `}</style>
      </div>
    </MainLayout>
  );
}
