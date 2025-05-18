export const clientDashboardData = {
  userProfile: {
    id: 'USR123',
    name: 'John Doe',
    email: 'john.doe@example.com',
    membershipLevel: 'Premium',
    joinDate: '2024-01-15',
    lastLogin: '2024-03-20T08:30:00Z',
    company: 'Tech Solutions Pte Ltd',
    assignedAgent: 'Gaurav Agrawal',
    agentContact: {
      phone: '+65 9123 4567',
      email: 'gaurav@angelservices.com'
    }
  },
  incorporationStatus: {
    currentStep: 2,
    totalSteps: 5,
    steps: [
      {
        id: 1,
        name: 'Initial Consultation',
        status: 'completed',
        date: '2024-03-15'
      },
      {
        id: 2,
        name: 'Document Collection',
        status: 'in_progress',
        date: '2024-03-20'
      },
      {
        id: 3,
        name: 'ACRA Submission',
        status: 'pending',
        date: null
      },
      {
        id: 4,
        name: 'Bank Account Setup',
        status: 'pending',
        date: null
      },
      {
        id: 5,
        name: 'Completion',
        status: 'pending',
        date: null
      }
    ]
  },
  documents: {
    required: [
      {
        id: 1,
        name: 'Passport Copy',
        status: 'uploaded',
        uploadDate: '2024-03-18',
        url: '/documents/passport.pdf'
      },
      {
        id: 2,
        name: 'Proof of Address',
        status: 'pending',
        uploadDate: null,
        url: null
      },
      {
        id: 3,
        name: 'Company Name Reservation',
        status: 'pending',
        uploadDate: null,
        url: null
      }
    ],
    additional: [
      {
        id: 4,
        name: 'Business Plan',
        status: 'optional',
        uploadDate: null,
        url: null
      }
    ]
  },
  orders: [
    {
      id: 'ORD001',
      date: '2024-03-15',
      status: 'Delivered',
      total: 2500,
      items: 3
    },
    {
      id: 'ORD002',
      date: '2024-03-10',
      status: 'Processing',
      total: 1800,
      items: 2
    },
    {
      id: 'ORD003',
      date: '2024-03-05',
      status: 'Delivered',
      total: 3200,
      items: 4
    }
  ],
  recentActivity: [
    {
      id: 1,
      type: 'document_upload',
      description: 'Passport copy uploaded',
      timestamp: '2024-03-18T14:30:00Z'
    },
    {
      id: 2,
      type: 'consultation',
      description: 'Initial consultation completed',
      timestamp: '2024-03-15T11:20:00Z'
    },
    {
      id: 3,
      type: 'payment',
      description: 'Service payment processed',
      timestamp: '2024-03-14T09:15:00Z'
    }
  ],
  notifications: [
    {
      id: 1,
      type: 'document_reminder',
      message: 'Please upload your proof of address',
      timestamp: '2024-03-20T10:30:00Z',
      priority: 'high'
    },
    {
      id: 2,
      type: 'agent_message',
      message: 'Your agent has sent you a message',
      timestamp: '2024-03-19T15:45:00Z',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'payment_confirmation',
      message: 'Payment received for incorporation service',
      timestamp: '2024-03-14T09:15:00Z',
      priority: 'low'
    }
  ],
  savedItems: [
    {
      id: 1,
      name: 'Product X',
      price: 1200,
      savedDate: '2024-03-18'
    },
    {
      id: 2,
      name: 'Product Y',
      price: 800,
      savedDate: '2024-03-17'
    }
  ],
  services: {
    current: {
      id: 1,
      name: 'Company Incorporation - Singapore',
      status: 'in_progress',
      startDate: '2024-03-14',
      nextStep: 'Upload remaining documents',
      price: 2500
    },
    available: [
      {
        id: 2,
        name: 'Corporate Secretarial',
        description: 'Annual compliance and secretarial services',
        price: 1200
      },
      {
        id: 3,
        name: 'Fund Administration',
        description: 'Fund setup and administration services',
        price: 3500
      }
    ]
  }
}; 