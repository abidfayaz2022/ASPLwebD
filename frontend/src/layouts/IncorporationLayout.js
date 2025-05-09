import Navbar from '../components/ui/navbar';
import { useWizard } from '../context/WizardContext';
import StepIndicator from '../components/ui/StepIndicator';
//import OrderSummary from '../components/OrderSummary';
import styles from '../styles/IncorporationLayout.module.css';

export default function IncorporationLayout({ children }) {
  const { currentStep } = useWizard();

  return (
    <div className={styles.layout}>
      <Navbar />
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
