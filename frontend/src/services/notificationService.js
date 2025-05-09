import axiosInstance from "@/lib/axiosInstance";

// Get user notifications
export const getUserNotifications = async () => {
  const response = await axiosInstance.get('/user/notifications');
  return response.data;
};

// Mark notification as read
export const markNotificationAsRead = async (notificationId) => {
  const response = await axiosInstance.put(`/user/notifications/${notificationId}/read`);
  return response.data;
};

// Get admin notifications
export const getAdminNotifications = async () => {
  const response = await axiosInstance.get('/admin/notifications');
  return response.data;
};

// Send a notification to a user
export const sendNotificationToUser = async (userId, notificationData) => {
  const response = await axiosInstance.post(`/admin/notifications/user/${userId}`, notificationData);
  return response.data;
};

// Send an email notification for incorporation status update
export const sendStatusUpdateEmail = async (incorporationId, status, message) => {
  const response = await axiosInstance.post(`/admin/notifications/email/${incorporationId}`, {
    status,
    message
  });
  return response.data;
}; 