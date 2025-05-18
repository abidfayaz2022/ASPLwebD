export const adminDashboardData = {
  statistics: {
    totalClients: 1250,
    activeClients: 850,
    totalRevenue: 75000,
    pendingIncorporations: 45,
    completedIncorporations: 320,
    monthlyGrowth: 15.5
  },
  companies: [
    {
      id: 1,
      companyName: 'ABC Pte Ltd.',
      incorporationDate: '28 May, 2023',
      registrationNo: '12345678',
      dueDate: '02 May, 2023',
      status: 'Application Submitted'
    },
    {
      id: 2,
      companyName: 'ABC Pte Ltd.',
      incorporationDate: '28 May, 2023',
      registrationNo: '12345678',
      dueDate: '02 May, 2023',
      status: 'Payment'
    },
    {
      id: 3,
      companyName: 'ABC Pte Ltd.',
      incorporationDate: '28 May, 2023',
      registrationNo: '12345678',
      dueDate: '02 May, 2023',
      status: 'Documents reviewed'
    },
    {
      id: 4,
      companyName: 'ABC Pte Ltd.',
      incorporationDate: '28 May, 2023',
      registrationNo: '12345678',
      dueDate: '02 May, 2023',
      status: 'Documents signed'
    },
    {
      id: 5,
      companyName: 'ABC Pte Ltd.',
      incorporationDate: '28 May, 2023',
      registrationNo: '12345678',
      dueDate: '02 May, 2023',
      status: 'Application Submitted'
    },
    {
      id: 6,
      companyName: 'ABC Pte Ltd.',
      incorporationDate: '28 May, 2023',
      registrationNo: '12345678',
      dueDate: '02 May, 2023',
      status: 'Payment'
    },
    {
      id: 7,
      companyName: 'ABC Pte Ltd.',
      incorporationDate: '28 May, 2023',
      registrationNo: '12345678',
      dueDate: '02 May, 2023',
      status: 'Documents reviewed'
    },
    {
      id: 8,
      companyName: 'ABC Pte Ltd.',
      incorporationDate: '28 May, 2023',
      registrationNo: '12345678',
      dueDate: '02 May, 2023',
      status: 'Documents signed'
    },
    {
      id: 9,
      companyName: 'ABC Pte Ltd.',
      incorporationDate: '28 May, 2023',
      registrationNo: '12345678',
      dueDate: '02 May, 2023',
      status: 'Application Submitted'
    },
    {
      id: 10,
      companyName: 'ABC Pte Ltd.',
      incorporationDate: '28 May, 2023',
      registrationNo: '12345678',
      dueDate: '02 May, 2023',
      status: 'Payment'
    }
  ],
  recentActivities: [
    {
      id: 1,
      type: 'new_incorporation',
      client: 'John Doe',
      company: 'Tech Solutions Pte Ltd',
      amount: 2500,
      timestamp: '2024-03-20T10:30:00Z',
      status: 'completed',
      agent: 'Gaurav Agrawal'
    },
    {
      id: 2,
      type: 'document_upload',
      client: 'Alice Smith',
      company: 'Global Trading Co',
      timestamp: '2024-03-20T09:15:00Z',
      status: 'pending',
      agent: 'Sarah Chen'
    },
    {
      id: 3,
      type: 'payment_received',
      client: 'Bob Johnson',
      company: 'Innovation Hub Pte Ltd',
      amount: 1800,
      timestamp: '2024-03-20T08:45:00Z',
      status: 'completed',
      agent: 'Mike Wong'
    }
  ],
  topServices: [
    {
      id: 1,
      name: 'Company Incorporation - Singapore',
      sales: 150,
      revenue: 15000,
      growth: 12.5
    },
    {
      id: 2,
      name: 'Fund Administration',
      sales: 120,
      revenue: 12000,
      growth: 8.3
    },
    {
      id: 3,
      name: 'Corporate Secretarial',
      sales: 90,
      revenue: 9000,
      growth: 15.2
    }
  ],
  agentPerformance: [
    {
      id: 1,
      name: 'Gaurav Agrawal',
      activeClients: 45,
      completedCases: 120,
      pendingCases: 8,
      rating: 4.8
    },
    {
      id: 2,
      name: 'Sarah Chen',
      activeClients: 38,
      completedCases: 95,
      pendingCases: 12,
      rating: 4.7
    },
    {
      id: 3,
      name: 'Mike Wong',
      activeClients: 42,
      completedCases: 110,
      pendingCases: 5,
      rating: 4.9
    }
  ],
  notifications: [
    {
      id: 1,
      type: 'document_approval',
      message: 'New document uploaded by Tech Solutions Pte Ltd',
      timestamp: '2024-03-20T10:30:00Z',
      priority: 'high'
    },
    {
      id: 2,
      type: 'payment_reminder',
      message: 'Payment pending for Global Trading Co',
      timestamp: '2024-03-20T09:15:00Z',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'incorporation_complete',
      message: 'Incorporation completed for Innovation Hub Pte Ltd',
      timestamp: '2024-03-20T08:45:00Z',
      priority: 'low'
    }
  ]
}; 