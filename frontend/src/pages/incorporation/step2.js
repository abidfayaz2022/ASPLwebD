import { useState, useEffect } from 'react';
import { useWizard } from '../../context/WizardContext';
import IncorporationLayout from '../../layouts/IncorporationLayout';
import SEO from '../../components/ui/incorporation/SEO';
import Button from "../../components/ui/incorporation/Button";
import styles from '../../styles/Incorporation_design/Step4.module.css';

export default function Step2() {
  const { setCurrentStep, updateStepData, stepsData } = useWizard();
  const today = new Date().toISOString().split('T')[0];
  const [incorporationDate, setIncorporationDate] = useState('');

  useEffect(() => {
    setCurrentStep(2);
    if (stepsData?.step2?.incorporationDate) {
      setIncorporationDate(stepsData.step2.incorporationDate);
    }
  }, [setCurrentStep, stepsData]);

  useEffect(() => {
    if (incorporationDate) {
      updateStepData(2, { incorporationDate });
    }
  }, [incorporationDate]);

  return (
    <IncorporationLayout>
      <SEO title="Step 2: Incorporation Date" />
      <h2 className={styles.stepTitle}>Step 2: Incorporation Date</h2>

      <div className={`${styles.directorCard} ${styles.singleField}`}>
        <div className={styles.inputGroup}>
          <label>Proposed Date of Incorporation:</label>
          <input
            type="date"
            min={today}
            value={incorporationDate}
            onChange={(e) => setIncorporationDate(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.navigationButtons}>
        <Button href="/incorporation/step1" variant="outline">← Go Back</Button>
        <Button href="/incorporation/step3" disabled={!incorporationDate}>Next Step →</Button>
      </div>
    </IncorporationLayout>
  );
}
