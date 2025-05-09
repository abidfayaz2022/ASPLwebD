import styles from '../styles/StepIndicator.module.css'; // Adjust the path as necessary

export default function StepIndicator({ currentStep }) {
  const steps = [
    { label: 'Company Name', number: 1 },
    { label: 'Incorporation Date', number: 2 },
    { label: 'Company Details', number: 3 },
    { label: 'Director Details', number: 4 },
    { label: 'Shareholder Details', number: 5 },
    { label: 'Contact Details', number: 6 },
  ];

  return (
    <div className={styles.stepIndicator}>
      {steps.map((step) => {
        let stepClass = styles.step;
        if (step.number < currentStep) {
          stepClass += ` ${styles.completed}`;
        } else if (step.number === currentStep) {
          stepClass += ` ${styles.active}`;
        }
        return (
          <div key={step.number} className={stepClass}>
            <div className={styles.stepNumber}>{step.number}</div>
            <div className={styles.stepLabel}>{step.label}</div>
          </div>
        );
      })}
    </div>
  );
}
