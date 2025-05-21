'use client';

import { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import SEO from '../../components/SEO';

export default function ComplianceCalendarUAE() {
  const [inputs, setInputs] = useState({ incorporationDate: '', fyeDate: '' });

  const toDate = (str) => str ? new Date(str) : null;

  const incorporation = toDate(inputs.incorporationDate);
  const fye = toDate(inputs.fyeDate);

  const formatDate = (date) =>
    date ? date.toLocaleDateString('en-GB') : ''; // dd/mm/yyyy

  let complianceFYE = '';
  let taxDueDate = '';
  let note = '';

  if (incorporation && fye) {
    const monthsDiff = (fye.getFullYear() - incorporation.getFullYear()) * 12 + fye.getMonth() - incorporation.getMonth();

    const baseFYE = new Date(fye);

    if (monthsDiff > 6) {
      complianceFYE = formatDate(baseFYE);
      note = 'Compliance starts from same FYE (more than 6 months gap)';
    } else {
      baseFYE.setFullYear(baseFYE.getFullYear() + 1);
      complianceFYE = formatDate(baseFYE);
      note = 'Compliance starts from next FYE (6 months or less gap)';
    }

    const taxDueDateRaw = new Date(baseFYE);
    taxDueDateRaw.setMonth(taxDueDateRaw.getMonth() + 9);

    // Set to last day of that month
    const lastDayOfMonth = new Date(taxDueDateRaw.getFullYear(), taxDueDateRaw.getMonth() + 1, 0);
    taxDueDate = formatDate(lastDayOfMonth);
  }

  return (
    <MainLayout>
      <SEO title="Compliance Calendar – UAE | The Angel Services" />
      <div className="container">
        <h1>Compliance Calendar – UAE</h1>
        <div className="underline" />

        <div className="form">
          <label>Company Incorporation Date*</label>
          <input
            type="date"
            name="incorporationDate"
            value={inputs.incorporationDate}
            onChange={(e) => setInputs({ ...inputs, incorporationDate: e.target.value })}
          />

          <label>Financial Year End (FYE) Date*</label>
          <input
            type="date"
            name="fyeDate"
            value={inputs.fyeDate}
            onChange={(e) => setInputs({ ...inputs, fyeDate: e.target.value })}
          />
        </div>

        {complianceFYE && (
          <div className="result-card">
            <h3>Compliance Results</h3>
            <p><strong>Compliance Start FYE:</strong> {complianceFYE}</p>
            <p><strong>Corporate Tax Filing Due:</strong> {taxDueDate}</p>
            <p><strong>Payment of Corporate Tax:</strong> {taxDueDate}</p>
            <p className="note">{note}</p>
          </div>
        )}

        <div className="info-section">
          <h3>VAT Return Filing (If applicable)</h3>
          <table>
            <thead>
              <tr>
                <th>Annual Turnover</th>
                <th className="nowrap">Frequency of Return</th>
                <th className="nowrap">Payment of VAT</th>
                <th className="nowrap">Due Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>More than 150 Million AED</td>
                <td>Monthly</td>
                <td>Monthly</td>
                <td>On or before 28 days from the end of month</td>
              </tr>
              <tr>
                <td>Less than 150 Million AED</td>
                <td>Quarterly</td>
                <td>Quarterly</td>
                <td>On or before 28 days from the end of quarter</td>
              </tr>
            </tbody>
          </table>
        </div>

        <style jsx>{`
          .container {
            padding: 40px 20px;
            max-width: 800px;
            margin: auto;
            background: #f9fafb;
            min-height: 100vh;
          }

          h1 {
            text-align: center;
            font-size: 28px;
            font-weight: bold;
            color: #1f2a44;
            margin-bottom: 8px;
          }

          .underline {
            height: 4px;
            width: 80px;
            background-color: #fcb900;
            border-radius: 4px;
            margin: 0 auto 30px auto;
          }

          .form label {
            display: block;
            margin-top: 16px;
            font-weight: 600;
          }

          .form input {
            width: 100%;
            padding: 10px;
            margin-top: 6px;
            border-radius: 8px;
            border: 1px solid #ccc;
          }

          .result-card {
            margin-top: 30px;
            padding: 20px;
            background: #fff;
            border-left: 5px solid #fcb900;
            border-radius: 10px;
            box-shadow: 0 0 8px rgba(0,0,0,0.05);
          }

          .result-card h3 {
            margin-bottom: 16px;
            color: #1f2a44;
          }

          .note {
            font-style: italic;
            color: #555;
            margin-top: 10px;
          }

          .info-section {
            margin-top: 40px;
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 8px rgba(0,0,0,0.05);
          }

          .info-section h3 {
            margin-bottom: 16px;
            color: #1f2a44;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
          }

          th, td {
            padding: 10px;
            border-bottom: 1px solid #eee;
          }

          th.nowrap, td.nowrap {
            white-space: nowrap;
          }

          th {
            background: #f4f4f4;
            font-weight: 600;
          }
        `}</style>
      </div>
    </MainLayout>
  );
}
