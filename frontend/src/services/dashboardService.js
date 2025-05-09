import axiosInstance from "@/lib/axiosInstance";

// User Dashboard
export const getUserDashboardStats = async () => {
  const response = await axiosInstance.get('/user/dashboard/stats');
  return response.data;
};

// Admin Dashboard
export const getAdminDashboardStats = async () => {
  const response = await axiosInstance.get('/admin/dashboard');
  return response.data;
};

// Preparer Dashboard
export const getPreparerDashboardStats = async () => {
  const response = await axiosInstance.get('/admin/preparer/dashboard');
  return response.data;
};

// Approver Dashboard
export const getApproverDashboardStats = async () => {
  const response = await axiosInstance.get('/admin/approver/dashboard');
  return response.data;
};

// Get list of incorporations by status for different dashboards
export const getIncorporationsByStatus = async (role, status) => {
  let endpoint = '';
  
  switch (role) {
    case 'SUPER_ADMIN':
      endpoint = `/admin/incorporations?status=${status}`;
      break;
    case 'PREPARER':
      endpoint = `/admin/preparer/incorporations?status=${status}`;
      break;
    case 'APPROVER':
      endpoint = `/admin/approver/incorporations?status=${status}`;
      break;
    default:
      endpoint = `/user/incorporations?status=${status}`;
  }
  
  const response = await axiosInstance.get(endpoint);
  return response.data;
}; 