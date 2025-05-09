import axiosInstance from "@/lib/axiosInstance";

// Step 1: Check company name availability
// export const checkCompanyName = async (name) => {
//   const response = await axiosInstance.post("/incorporation/check-name", { name });
//   return response.data;
// };

// Step 2: Start incorporation process
export const startIncorporation = async (initialData) => {
  const response = await axiosInstance.post("/incorporation/start", initialData);
  return response.data;
};

// Step 3: Update incorporation step data
export const updateIncorporationStep = async (sessionId, stepData, stepName) => {
  const response = await axiosInstance.put(`/incorporation/step/${sessionId}`, {
    stepData,
    stepName
  });
  return response.data;
};

// Step 4: Submit basic incorporation details
export const submitBasicDetails = async (sessionId, formData) => {
  return updateIncorporationStep(sessionId, formData, "basic-details");
};

// Step 5: Submit additional services
export const submitAdditionalServices = async (sessionId, servicesData) => {
  return updateIncorporationStep(sessionId, servicesData, "additional-services");
};

// Step 6: Submit contact details and accept T&C
export const submitContactDetails = async (sessionId, contactData) => {
  return updateIncorporationStep(sessionId, contactData, "contact-details");
};

// Step 7: Get payment summary
export const getPaymentSummary = async (sessionId) => {
  const response = await axiosInstance.get(`/incorporation/payment-summary/${sessionId}`);
  return response.data;
};

// Step 8: Process payment
export const processPayment = async (sessionId, paymentDetails) => {
  const response = await axiosInstance.post(`/incorporation/payment/${sessionId}`, paymentDetails);
  return response.data;
};

// Step 9: Complete incorporation
export const completeIncorporation = async (sessionId) => {
  const response = await axiosInstance.post("/incorporation/complete", { sessionId });
  return response.data;
};

// Resume incorporation process from email link
export const resumeIncorporation = async (sessionId) => {
  const response = await axiosInstance.get(`/incorporation/resume/${sessionId}`);
  return response.data;
};

// User Dashboard API
export const getUserIncorporations = async () => {
  const response = await axiosInstance.get("/user/incorporations");
  return response.data;
};

// Get incorporation details
export const getIncorporationDetails = async (incorporationId) => {
  const response = await axiosInstance.get(`/incorporation/${incorporationId}`);
  return response.data;
};

// Get documents for e-signing
export const getDocumentsForSigning = async (incorporationId) => {
  const response = await axiosInstance.get(`/incorporation/${incorporationId}/documents`);
  return response.data;
};

// Sign documents via Docusign integration
export const signDocuments = async (incorporationId, signatureData) => {
  const response = await axiosInstance.post(`/incorporation/${incorporationId}/sign-documents`, signatureData);
  return response.data;
};

// Get signed documents
export const getSignedDocuments = async (incorporationId) => {
  const response = await axiosInstance.get(`/incorporation/${incorporationId}/signed-documents`);
  return response.data;
};

// Admin APIs
// Get pending incorporations for review
export const getIncorporationsForReview = async (status) => {
  const response = await axiosInstance.get(`/admin/incorporations?status=${status}`);
  return response.data;
};

// Update incorporation status (for approver dashboard)
export const updateIncorporationStatus = async (incorporationId, status, notes) => {
  const response = await axiosInstance.put(`/admin/incorporation/${incorporationId}/status`, {
    status,
    notes
  });
  return response.data;
};

// Generate invoice for incorporation
export const generateInvoice = async (incorporationId) => {
  const response = await axiosInstance.post(`/admin/incorporation/${incorporationId}/generate-invoice`);
  return response.data;
}; 