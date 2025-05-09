import { useEffect, useState } from 'react';
import { useWizard } from '../../context/WizardContext';
import IncorporationLayout from '../../layouts/IncorporationLayout';
import SEO from '../../components/ui/incorporation/SEO';
import Button from '../../components/ui/incorporation/Button';
import styles from '../../styles/Incorporation_design/Step4.module.css';

export default function Step6() {
  const { setCurrentStep, total, stepsData, updateStepData } = useWizard();
  const [email, setEmail] = useState(stepsData?.step6?.email || "");
  const [contact, setContact] = useState(stepsData?.step6?.contact || "");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCurrentStep(6);
  }, [setCurrentStep]);

  useEffect(() => {
    if (email || contact) {
      updateStepData(6, { email, contact });
    }
  }, [email, contact, updateStepData]);

  const handleProceed = async (e) => {
    e.preventDefault();

    if (!email || !contact || isEmailSent || loading) return;

    setLoading(true);
    updateStepData(6, { email, contact });

    const formData = {
      step1: stepsData?.step1 || {},
      step2: stepsData?.step2 || {},
      step3: stepsData?.step3 || {},
      step4: stepsData?.step4 || {},
      step5: stepsData?.step5 || {},
      step6: { email, contact },
    };

    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData, userEmail: email })
      });

      const data = await response.json();
      console.log('✅ Email sent successfully:', data);
      setIsEmailSent(true);
      window.location.href = "/incorporation/step7";
    } catch (error) {
      console.error('❌ Error sending email:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IncorporationLayout>
      <SEO title="Contact Details" />

      <div className={`${styles.directorCard}`}>
        <div className={styles.inputGroup}>
          <label htmlFor="email"><strong>Email Address:</strong></label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="contact"><strong>Contact Number:</strong></label>
          <input
            type="tel"
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Enter your contact number"
            required
          />
        </div>
      </div>

      <div className={styles.navigationButtons}>
        <Button href="/incorporation/step5" variant="outline">
          ← Go Back
        </Button>
        <Button onClick={handleProceed} disabled={!email || !contact || loading || isEmailSent}>
          {loading ? "Processing..." : "Submit"}
        </Button>
      </div>
    </IncorporationLayout>
  );
}
