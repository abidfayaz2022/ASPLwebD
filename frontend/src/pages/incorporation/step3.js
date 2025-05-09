import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useWizard } from '../../context/WizardContext';
import IncorporationLayout from '../../layouts/IncorporationLayout';
import SEO from '../../components/ui/incorporation/SEO';
import Button from '../../components/ui/incorporation/Button';
import styles from '../../styles/Incorporation_design/Step4.module.css';

import countryList from '../../data/countries.json';
import currencyList from '../../data/currencies.json';

export default function Step3() {
  const router = useRouter();
  const { setCurrentStep, updateStepData, stepsData } = useWizard();

  const [form, setForm] = useState(() => ({
    numberOfShares: stepsData?.step3?.numberOfShares || '',
    shareCapitalCurrency: stepsData?.step3?.shareCapitalCurrency || '',
    shareCapitalAmount: stepsData?.step3?.shareCapitalAmount || '',
    address1: stepsData?.step3?.address1 || '',
    address2: stepsData?.step3?.address2 || '',
    postalCode: stepsData?.step3?.postalCode || '',
    country: stepsData?.step3?.country || '',
    primaryActivity: stepsData?.step3?.primaryActivity || '',
    primaryDescription: stepsData?.step3?.primaryDescription || '',
    secondaryActivity: stepsData?.step3?.secondaryActivity || '',
    secondaryDescription: stepsData?.step3?.secondaryDescription || ''
  }));

  useEffect(() => {
    setCurrentStep(3);
  }, [setCurrentStep]);

  useEffect(() => {
    updateStepData(3, form);
  }, [form]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid =
    form.numberOfShares &&
    form.shareCapitalCurrency &&
    form.shareCapitalAmount &&
    form.address1 &&
    form.postalCode &&
    form.country;

  return (
    <IncorporationLayout>
      <SEO title="Step 3: Company Details" />
      <h2 className={styles.stepTitle}>Company Details</h2>

      <div className={styles.directorCard}>
        <div className={styles.grid}>
          <div className={styles.inputGroup}>
            <label>Number of Proposed Shares:</label>
            <input
              type="number"
              value={form.numberOfShares}
              onChange={(e) => handleChange('numberOfShares', e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Share Capital:</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                list="currencies"
                placeholder="Start typing currency..."
                value={form.shareCapitalCurrency}
                onChange={(e) => handleChange('shareCapitalCurrency', e.target.value)}
                style={{ backgroundColor: '#fff', color: '#000' }}
              />
              <datalist id="currencies">
                {currencyList.map((c, i) => (
                  <option key={i} value={c} />
                ))}
              </datalist>
              <input
                type="number"
                placeholder="Amount"
                value={form.shareCapitalAmount}
                onChange={(e) => handleChange('shareCapitalAmount', e.target.value)}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Address Line 1:</label>
            <input
              value={form.address1}
              onChange={(e) => handleChange('address1', e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Address Line 2:</label>
            <input
              value={form.address2}
              onChange={(e) => handleChange('address2', e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Postal Code:</label>
            <input
              value={form.postalCode}
              onChange={(e) => handleChange('postalCode', e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Country:</label>
            <input
              list="countries"
              placeholder="Start typing country..."
              value={form.country}
              onChange={(e) => handleChange('country', e.target.value)}
              style={{ backgroundColor: '#fff', color: '#000' }}
            />
            <datalist id="countries">
              {countryList.map((country, i) => (
                <option key={i} value={country} />
              ))}
            </datalist>
          </div>

          <div className={styles.inputGroup}>
            <label>Primary Business Activity:</label>
            <select
              value={form.primaryActivity}
              onChange={(e) => handleChange('primaryActivity', e.target.value)}
            >
              <option value="">Select Primary Business Activity</option>
              <option value="IT Services">IT Services</option>
              <option value="Consulting">Consulting</option>
              <option value="Trading">Trading</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label>Primary Business Activity Description:</label>
            <textarea
              value={form.primaryDescription}
              onChange={(e) => handleChange('primaryDescription', e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Secondary Business Activity:</label>
            <select
              value={form.secondaryActivity}
              onChange={(e) => handleChange('secondaryActivity', e.target.value)}
            >
              <option value="">Select Secondary Business Activity</option>
              <option value="IT Services">IT Services</option>
              <option value="Consulting">Consulting</option>
              <option value="Trading">Trading</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label>Secondary Business Activity Description:</label>
            <textarea
              value={form.secondaryDescription}
              onChange={(e) => handleChange('secondaryDescription', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className={styles.navigationButtons}>
        <Button onClick={() => router.push('/incorporation/step2')} variant="outline">
          ← Go Back
        </Button>
        <Button onClick={() => router.push('/incorporation/step4')} disabled={!isFormValid}>
          Next Step →
        </Button>
      </div>
    </IncorporationLayout>
  );
}
