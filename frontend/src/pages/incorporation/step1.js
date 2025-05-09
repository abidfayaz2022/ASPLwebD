import { useState, useEffect } from "react";
import { useWizard } from "../../context/WizardContext";
import IncorporationLayout from "../../layouts/IncorporationLayout";
import SEO from "../../components/ui/incorporation/SEO";
import styles from "../../styles/Incorporation_design/Step4.module.css";
import Button from "../../components/ui/incorporation/Button";
import { checkCompanyName } from "../../services/checkNameService";

export default function Step1() {
  const { updateStepData, setCurrentStep, stepsData } = useWizard();
  const [companyName, setCompanyName] = useState(stepsData?.step1?.companyName || "");
  const [availabilityMessage, setAvailabilityMessage] = useState("");

  useEffect(() => {
    setCurrentStep(1);
  }, [setCurrentStep]);

  useEffect(() => {
    updateStepData(1, { companyName });
  }, [companyName]);

  const checkAvailability = async () => {
    if (!companyName.trim()) {
      setAvailabilityMessage("⚠ Please enter a company name.");
      return;
    }

    try {
      const data = await checkCompanyName(companyName);
      setAvailabilityMessage(data.message);
    } catch (error) {
      setAvailabilityMessage("Error checking name availability.");
    }
  };

  return (
    <IncorporationLayout>
      <SEO title="Step 1: Company Name & Availability" />
      <h2 className={styles.stepTitle}>Step 1: Company Name & Availability</h2>

      <div className={`${styles.directorCard} ${styles.singleField}`}>
        <div className={styles.inputGroup}>
          <label htmlFor="companyName">Proposed Name of Company:</label>
          <input
            type="text"
            id="companyName"
            placeholder="Enter company name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>

        <div className={styles.centered}>
          <button className={styles.addBtn} onClick={checkAvailability}>
            Check Availability
          </button>
        </div>

        {availabilityMessage && (
          <p style={{ color: "#fcb900", textAlign: "center", marginTop: "10px" }}>
            {availabilityMessage}
          </p>
        )}
      </div>

      <div className={styles.navigationButtons}>
        <Button href="/" variant="outline">← Go Back</Button>
        <Button href="/incorporation/step2" disabled={!companyName}>Next Step →</Button>
      </div>
    </IncorporationLayout>
  );
}
