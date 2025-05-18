// Format order status with color
export const getStatusColor = (status) => {
  const statusColors = {
    'completed': 'green',
    'in_progress': 'blue',
    'pending': 'orange',
    'cancelled': 'red'
  };
  return statusColors[status] || 'gray';
};

// Calculate total spent
export const calculateTotalSpent = (services) => {
  return services.reduce((total, service) => total + (service.price || 0), 0);
};

// Format date
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Get membership benefits
export const getMembershipBenefits = (level) => {
  const benefits = {
    'Premium': [
      'Priority Support',
      'Exclusive Deals',
      'Free Document Review',
      'Dedicated Agent'
    ],
    'Standard': [
      'Standard Support',
      'Basic Document Review'
    ],
    'Basic': [
      'Basic Support'
    ]
  };
  return benefits[level] || [];
};

// Calculate incorporation progress
export const calculateProgress = (steps) => {
  const completedSteps = steps.filter(step => step.status === 'completed').length;
  return (completedSteps / steps.length) * 100;
};

// Get next required document
export const getNextRequiredDocument = (documents) => {
  return documents.required.find(doc => doc.status === 'pending');
};

// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'SGD'
  }).format(amount);
};

// Get document status icon
export const getDocumentStatusIcon = (status) => {
  const icons = {
    'uploaded': 'check-circle',
    'pending': 'clock',
    'rejected': 'x-circle',
    'approved': 'check-circle-fill'
  };
  return icons[status] || 'question-circle';
};

// Sort notifications by priority
export const sortNotificationsByPriority = (notifications) => {
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  return [...notifications].sort((a, b) => 
    priorityOrder[a.priority] - priorityOrder[b.priority]
  );
};

// Calculate days remaining
export const calculateDaysRemaining = (targetDate) => {
  const today = new Date();
  const target = new Date(targetDate);
  const diffTime = target - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}; 