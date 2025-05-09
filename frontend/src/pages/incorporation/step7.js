import { useEffect } from 'react';
import { useWizard } from '../../context/WizardContext';
import IncorporationLayout from '../../layouts/IncorporationLayout';
import SEO from '../../components/ui/incorporation/SEO';

export default function Step7() {
  const { setCurrentStep } = useWizard();

  useEffect(() => {
    setCurrentStep(7);
  }, [setCurrentStep]);

  return (
    <IncorporationLayout>
      <SEO title="Step 7: Confirmation" />
      <h2>Thank You!</h2>
      <p>Your details has been recorded successfully. Thank you for choosing our services.</p>
      <p>You will receive a confirmation email shortly.</p>
    </IncorporationLayout>
  );
}
