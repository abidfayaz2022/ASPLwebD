import { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import SEO from '../../components/SEO';
import styles from '../../styles/Calculator.module.css';

export default function CorporateTaxCalculator() {
  const [inputs, setInputs] = useState({
    year: '',
    netProfit: '',
    separateIncome: '',
    nonDeductible: '',
    nonTaxable: '',
    caBrought: '',
    caCurrent: '',
    lossBrought: '',
    addedSeparate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const toNum = (val) => parseFloat(val || 0);

  const total = toNum(inputs.netProfit) - toNum(inputs.separateIncome);
  const adjBefore = total + toNum(inputs.nonDeductible) - toNum(inputs.nonTaxable);
  const adjAfter = adjBefore - toNum(inputs.caBrought) - toNum(inputs.caCurrent) - toNum(inputs.lossBrought);
  const chargeable = adjAfter + toNum(inputs.addedSeparate);

  return (
    <MainLayout>
      <SEO title="Corporate Tax Calculator | The Angel Services" />
      <div className={styles.calculatorPage}>
        <h1 className={styles.pageTitle}>Estimated Corporate Tax Calculator</h1>
        <p className={styles.description}>
          Get a real-time estimate of your company’s chargeable income before exemptions.
        </p>

        <div className={styles.taxCalculatorSection}>
          {[
            { label: 'Year of Incorporation*', name: 'year', type: 'number', placeholder: 'ex: 2020' },
            { label: 'Net profit/(loss) as per accounts*', name: 'netProfit' },
            { label: '(Less): Separate source income*', name: 'separateIncome' },
            { isResult: true, value: `Total: $${total.toFixed(2)}` },
            { label: '(Add): non-deductible Expenses*', name: 'nonDeductible' },
            { label: '(Less): non-taxable Income*', name: 'nonTaxable' },
            { isResult: true, value: `Adjusted profit before capital allowances and losses: $${adjBefore.toFixed(2)}` },
            { label: 'Capital Allowances brought forward*', name: 'caBrought' },
            { label: 'Capital Allowances for current year*', name: 'caCurrent' },
            { label: 'Losses brought forward*', name: 'lossBrought' },
            { isResult: true, value: `Adjusted profit after capital allowances and losses: $${adjAfter.toFixed(2)}` },
            { label: '(Add): Separate source income', name: 'addedSeparate' },
            { isResult: true, value: `Chargeable Income (before Exempt amount): $${chargeable.toFixed(2)}` }
          ].map((field, idx) =>
            field.isResult ? (
              <div key={idx} className={styles.taxTotalDisplay}>{field.value}</div>
            ) : (
              <div key={idx} className={styles.taxInputGroup}>
                <label htmlFor={field.name}>{field.label}</label>
                <input
                  name={field.name}
                  type={field.type || 'number'}
                  placeholder={field.placeholder || ''}
                  value={inputs[field.name]}
                  onChange={handleChange}
                />
              </div>
            )
          )}
        </div>
      </div>
    </MainLayout>
  );
}
