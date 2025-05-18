// Format currency values
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'SGD'
  }).format(amount);
};

// Calculate growth percentage
export const calculateGrowth = (current, previous) => {
  if (!previous) return 0;
  return ((current - previous) / previous) * 100;
};

// Format date to readable string
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Process dashboard statistics
export const processDashboardStats = (data) => {
  return {
    ...data,
    totalRevenue: formatCurrency(data.totalRevenue),
    monthlyGrowth: `${data.monthlyGrowth.toFixed(1)}%`
  };
};

// Filter activities by date range
export const filterActivitiesByDateRange = (activities, startDate, endDate) => {
  return activities.filter(activity => {
    const activityDate = new Date(activity.timestamp);
    return activityDate >= startDate && activityDate <= endDate;
  });
};

// Sort services by revenue
export const sortServicesByRevenue = (services) => {
  return [...services].sort((a, b) => b.revenue - a.revenue);
};

// Calculate total revenue from activities
export const calculateTotalRevenue = (activities) => {
  return activities.reduce((total, activity) => {
    return total + (activity.amount || 0);
  }, 0);
};

// Get agent performance metrics
export const getAgentMetrics = (agent) => {
  return {
    ...agent,
    completionRate: ((agent.completedCases / (agent.completedCases + agent.pendingCases)) * 100).toFixed(1),
    averageRating: agent.rating.toFixed(1)
  };
};

// Filter notifications by priority
export const filterNotificationsByPriority = (notifications, priority) => {
  return notifications.filter(notification => notification.priority === priority);
};

// Get status color for activities
export const getActivityStatusColor = (status) => {
  const statusColors = {
    'completed': 'green',
    'pending': 'orange',
    'in_progress': 'blue',
    'cancelled': 'red'
  };
  return statusColors[status] || 'gray';
};

// Calculate agent workload
export const calculateAgentWorkload = (agent) => {
  const totalCases = agent.activeClients + agent.pendingCases;
  return {
    ...agent,
    workload: totalCases,
    workloadStatus: totalCases > 50 ? 'high' : totalCases > 30 ? 'medium' : 'low'
  };
}; 