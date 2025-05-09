// src/context/WizardContext.js
import { createContext, useContext, useState } from 'react';

// Define base fees or services
const BASE_REGISTRATION_FEE = 100;
const ADDRESS_SERVICE_FEE = 50;
const NOMINEE_DIRECTOR_FEE = 100;

const WizardContext = createContext();

export function WizardProvider({ children }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [companyName, setCompanyName] = useState('');
  const [useAddressService, setUseAddressService] = useState(false);
  const [useNomineeDirector, setUseNomineeDirector] = useState(false);
  const [stepsData, setStepsData] = useState({}); // ✅ Store user inputs for all steps

  // ✅ Function to update step data
  const updateStepData = (step, data) => {
    setStepsData((prevData) => ({
      ...prevData,
      [`step${step}`]: { ...prevData[`step${step}`], ...data },
    }));
    console.log(`✅ [WizardContext] Step ${step} Data Updated:`, data);
  };

  // ✅ Calculate total dynamically
  const total =
    BASE_REGISTRATION_FEE +
    (useAddressService ? ADDRESS_SERVICE_FEE : 0) +
    (useNomineeDirector ? NOMINEE_DIRECTOR_FEE : 0);

  const value = {
    currentStep,
    setCurrentStep,
    companyName,
    setCompanyName,
    useAddressService,
    setUseAddressService,
    useNomineeDirector,
    setUseNomineeDirector,
    total,
    BASE_REGISTRATION_FEE,
    ADDRESS_SERVICE_FEE,
    NOMINEE_DIRECTOR_FEE,
    stepsData, // ✅ Store user inputs for all steps
    updateStepData, // ✅ Function to update step data
  };

  return (
    <WizardContext.Provider value={value}>
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  return useContext(WizardContext);
}
