import Header from '../components/Header';
import { useWizard } from '../context/WizardContext';
import StepIndicator from '../components/StepIndicator';
//import OrderSummary from '../components/OrderSummary';
import styles from '../styles/IncorporationLayout.module.css';

export default function IncorporationLayout({ children }) {
  const { currentStep } = useWizard();

  return (
    <div className={styles.layout}>
      <Header />
      <StepIndicator currentStep={currentStep} />
      <div className={styles.contentWrapper}>
        <main className={styles.mainContent}>
          {children}
        </main>
        {/* <aside className={styles.orderSummary}>
          <OrderSummary />
        </aside> */}
      </div>
    </div>
  );
}
