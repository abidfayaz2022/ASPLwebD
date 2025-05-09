import { useState, useEffect } from 'react';
import { useWizard } from '../../context/WizardContext';
import IncorporationLayout from '../../layouts/IncorporationLayout';
import SEO from '../../components/ui/incorporation/SEO';
import Button from '../../components/ui/incorporation/Button';
import styles from '../../styles/Incorporation_design/Step4.module.css';
import { FaInfoCircle } from 'react-icons/fa';

export default function Step4() {
  const { setCurrentStep, updateStepData, setUseNomineeDirector, stepsData } = useWizard();

  function createBlankDirector() {
    return {
      name: '',
      email: '',
      contact: '',
      dob: '',
      nationality: '',
      idType: '',
      idNumber: '',
      address1: '',
      address2: '',
      postal: '',
      country: '',
      identityProof: null,
      addressProof: null,
      isShareholder: false,
    };
  }

  const [directors, setDirectors] = useState(() => {
    if (stepsData?.step4?.directors?.length) {
      return stepsData.step4.directors.map(d => ({ ...d, identityProof: null, addressProof: null }));
    }
    return [createBlankDirector()];
  });

  const [nominee, setNominee] = useState(stepsData?.step4?.nominee || false);

  useEffect(() => {
    setCurrentStep(4);
  }, [setCurrentStep]);

  useEffect(() => {
    updateStepData(4, { directors, nominee });
    setUseNomineeDirector(nominee);
  }, [directors, nominee]);

  const handleDirectorChange = (index, field, value) => {
    const updated = [...directors];
    updated[index][field] = value;
    setDirectors(updated);
  };

  const handleFileUpload = (index, field, file) => {
    const updated = [...directors];
    updated[index][field] = file;
    setDirectors(updated);
  };

  const addDirector = () => setDirectors([...directors, createBlankDirector()]);
  const removeDirector = (index) => setDirectors(directors.filter((_, i) => i !== index));
  const isFormValid = directors.length > 0 && directors.every(d => d.name);

  return (
    <IncorporationLayout>
      <SEO title="Step 4: Directors Information" />
      <h2 className={styles.stepTitle}>Directors</h2>

      {/* Nominee Service Toggle */}
      <div className={styles.directorCard}>
        <label className={styles.nomineeLabel}>
          Do you want to use our Nominee Director Service (for a fee)?
          <span className={styles.tooltip}>
            <FaInfoCircle className={styles.infoIcon} />
            <span className={styles.tooltipText}>
              For Company Incorporation, one of the directors must be from Singapore.
            </span>
          </span>
        </label>
        <div className={styles.cardToggleGroup}>
          <div
            className={`${styles.cardToggle} ${nominee === true ? styles.activeCard : ''}`}
            onClick={() => setNominee(true)}
          >
            <strong>Yes</strong>
            <p>Use Nominee Director</p>
          </div>
          <div
            className={`${styles.cardToggle} ${nominee === false ? styles.activeCard : ''}`}
            onClick={() => setNominee(false)}
          >
            <strong>No</strong>
            <p>I have my own Director</p>
          </div>
        </div>
      </div>

      {/* Director Inputs */}
      {directors.map((director, index) => (
        <div key={index} className={styles.directorCard}>
          <div className={styles.grid}>
            {[
              ['Director Name', 'name'],
              ['Email ID', 'email'],
              ['Contact Number', 'contact'],
              ['Date of Birth', 'dob', 'date'],
              ['Nationality', 'nationality'],
              ['ID Number', 'idNumber'],
              ['Address Line 1', 'address1'],
              ['Address Line 2', 'address2'],
              ['Postal Code', 'postal'],
              ['Country', 'country'],
            ].map(([label, field, type = 'text']) => (
              <div key={field} className={styles.inputGroup}>
                <label>{label}:</label>
                <input
                  type={type}
                  value={director[field]}
                  onChange={(e) => handleDirectorChange(index, field, e.target.value)}
                />
              </div>
            ))}

            <div className={styles.inputGroup}>
              <label>ID Type:</label>
              <select
                value={director.idType}
                onChange={(e) => handleDirectorChange(index, 'idType', e.target.value)}
              >
                <option value="">Select</option>
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

            {/* Shareholder Toggle */}
            <div className={styles.inputGroup}>
              <label>Is Director a Shareholder?</label>
              <div className={styles.cardToggleGroupSmall}>
                <div
                  className={`${styles.cardToggleSmall} ${director.isShareholder === true ? styles.activeCard : ''}`}
                  onClick={() => handleDirectorChange(index, 'isShareholder', true)}
                >
                  <strong>Yes</strong>
                </div>
                <div
                  className={`${styles.cardToggleSmall} ${director.isShareholder === false ? styles.activeCard : ''}`}
                  onClick={() => handleDirectorChange(index, 'isShareholder', false)}
                >
                  <strong>No</strong>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.centered}>
            <button type="button" onClick={() => removeDirector(index)} className={styles.removeBtn}>
              Remove Director
            </button>
          </div>
        </div>
      ))}

      <div className={styles.centered}>
        <button type="button" onClick={addDirector} className={styles.addBtn}>
          Add Another Director
        </button>
      </div>

      <div className={styles.navigationButtons}>
        <Button href="/incorporation/step3" variant="outline">← Go Back</Button>
        <Button href="/incorporation/step5" disabled={!isFormValid}>Next Step →</Button>
      </div>
    </IncorporationLayout>
  );
}
