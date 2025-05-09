import { useState, useEffect } from 'react';
import { useWizard } from '../../context/WizardContext';
import IncorporationLayout from '../../layouts/IncorporationLayout';
import SEO from '../../components/ui/incorporation/SEO';
import Button from '../../components/ui/incorporation/Button';
import styles from '../../styles/Incorporation_design/Step4.module.css';

export default function Step5() {
  const { setCurrentStep, updateStepData, stepsData } = useWizard();

  function createBlankShareholder() {
    return {
      name: '',
      email: '',
      contact: '',
      dob: '',
      nationality: '',
      type: 'Individual',
      idType: 'Passport',
      idNumber: '',
      address1: '',
      address2: '',
      postal: '',
      country: '',
      shares: '',
      capital: '',
      identityProof: null,
      addressProof: null,
    };
  }

  const [shareholders, setShareholders] = useState(() => {
    if (stepsData?.step5?.shareholders?.length) {
      return stepsData.step5.shareholders.map(s => ({
        ...s,
        identityProof: null,
        addressProof: null
      }));
    }
    return [createBlankShareholder()];
  });

  useEffect(() => {
    setCurrentStep(5);
  }, [setCurrentStep]);

  useEffect(() => {
    updateStepData(5, {
      shareholders: shareholders.map((s) => ({
        ...s,
        identityProof: s.identityProof?.name || '',
        addressProof: s.addressProof?.name || '',
      }))
    });
  }, [shareholders]);

  const handleChange = (index, field, value) => {
    const updated = [...shareholders];
    updated[index][field] = value;
    setShareholders(updated);
  };

  const handleFileUpload = (index, field, file) => {
    const updated = [...shareholders];
    updated[index][field] = file;
    setShareholders(updated);
  };

  const addShareholder = () => {
    setShareholders([...shareholders, createBlankShareholder()]);
  };

  const removeShareholder = (index) => {
    setShareholders(shareholders.filter((_, i) => i !== index));
  };

  const isFormValid = shareholders.every((s) => s.name && s.shares);

  return (
    <IncorporationLayout>
      <SEO title="Step 5: Shareholders & Documents" />
      <h2 className={styles.stepTitle}>Shareholders</h2>

      {shareholders.map((s, index) => (
        <div key={index} className={styles.directorCard}>
          <div className={styles.grid}>
            {[
              ['Shareholder Name', 'name'],
              ['Email ID', 'email'],
              ['Contact Number', 'contact'],
              ['Date of Birth', 'dob', 'date'],
              ['Nationality', 'nationality'],
              ['Type', 'type'],
              ['ID Number', 'idNumber'],
              ['Address Line 1', 'address1'],
              ['Address Line 2', 'address2'],
              ['Postal Code', 'postal'],
              ['Country', 'country'],
              ['Number of Shares to Allocate', 'shares'],
              ['Share Capital Allocation', 'capital']
            ].map(([label, field, type = 'text']) => (
              <div key={field} className={styles.inputGroup}>
                <label>{label}:</label>
                <input
                  type={type}
                  value={s[field]}
                  onChange={(e) => handleChange(index, field, e.target.value)}
                />
              </div>
            ))}

            <div className={styles.inputGroup}>
              <label>ID Type:</label>
              <select
                value={s.idType}
                onChange={(e) => handleChange(index, 'idType', e.target.value)}
              >
                <option value="Passport">Passport</option>
                <option value="NRIC">NRIC</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label>Identity Proof (PDF/JPG):</label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileUpload(index, 'identityProof', e.target.files[0])}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Address Proof (PDF/JPG):</label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileUpload(index, 'addressProof', e.target.files[0])}
              />
            </div>
          </div>

          <div className={styles.centered}>
            <button type="button" onClick={() => removeShareholder(index)} className={styles.removeBtn}>
              Remove Shareholder
            </button>
          </div>
        </div>
      ))}

      <div className={styles.centered}>
        <button type="button" onClick={addShareholder} className={styles.addBtn}>
          Add Another Shareholder
        </button>
      </div>

      {/* Navigation Buttons */}
      <div className={styles.navigationButtons}>
        <Button href="/incorporation/step4" variant="outline">
          ← Go Back
        </Button>
        <Button href="/incorporation/step6" disabled={!isFormValid}>
          Next Step →
        </Button>
      </div>
    </IncorporationLayout>
  );
}
