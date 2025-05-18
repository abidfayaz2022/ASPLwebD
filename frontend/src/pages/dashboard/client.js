// pages/dashboard/client.js
import { useState } from 'react';
import styles from '../../styles/dashboard.module.css';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaBuilding,
  FaUpload,
  FaRegCreditCard,
  FaComments,
  FaUserTie,
  FaFileAlt,
  FaBell,
  FaCheckCircle,
  FaCloudUploadAlt,
  FaHourglassHalf,
  FaFlagCheckered,
  FaPhone,
  FaEnvelope,
} from 'react-icons/fa';

// Import mock data and utilities
import { clientDashboardData } from '../../data/mockData/client/dashboardData';
import {
  calculateProgress,
  getNextRequiredDocument,
  getStatusColor,
  formatCurrency,
  getDocumentStatusIcon,
  sortNotificationsByPriority,
} from '../../utils/client/dashboardUtils';

export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState('home');
  const { userProfile, incorporationStatus, documents, recentActivity, notifications, services } = clientDashboardData;

  // Calculate progress
  const progress = calculateProgress(incorporationStatus.steps);
  const nextDocument = getNextRequiredDocument(documents);
  const sortedNotifications = sortNotificationsByPriority(notifications);

  return (
    <div className={styles.dashboardWrapper}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>Angel Services</div>
        <ul className={styles.nav}>
          <li className={activeTab === 'home' ? styles.active : ''} onClick={() => setActiveTab('home')}>
            <FaFileAlt className={styles.navIcon} /> Home
          </li>
          <li className={activeTab === 'company' ? styles.active : ''} onClick={() => setActiveTab('company')}>
            <FaBuilding className={styles.navIcon} /> My Company Details
          </li>
          <li className={activeTab === 'incorporation' ? styles.active : ''} onClick={() => setActiveTab('incorporation')}>
            <FaFileAlt className={styles.navIcon} /> Incorporation Form
          </li>
          <li className={activeTab === 'documents' ? styles.active : ''} onClick={() => setActiveTab('documents')}>
            <FaUpload className={styles.navIcon} /> Uploaded Documents
          </li>
          <li className={activeTab === 'services' ? styles.active : ''} onClick={() => setActiveTab('services')}>
            <FaRegCreditCard className={styles.navIcon} /> Services Subscribed
          </li>
          <li className={activeTab === 'payments' ? styles.active : ''} onClick={() => setActiveTab('payments')}>
            <FaRegCreditCard className={styles.navIcon} /> Payments
          </li>
          <li className={activeTab === 'calculators' ? styles.active : ''} onClick={() => setActiveTab('calculators')}>
            <FaRegCreditCard className={styles.navIcon} /> Calculators
          </li>
          <li className={activeTab === 'support' ? styles.active : ''} onClick={() => setActiveTab('support')}>
            <FaComments className={styles.navIcon} /> Support
          </li>
          <li className={activeTab === 'activity' ? styles.active : ''} onClick={() => setActiveTab('activity')}>
            <FaUserTie className={styles.navIcon} /> Activity Trail
          </li>
          <li className={activeTab === 'profile' ? styles.active : ''} onClick={() => setActiveTab('profile')}>
            <FaUserTie className={styles.navIcon} /> Profile Settings
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1>Welcome, {userProfile.name}</h1>
          <div className={styles.userBox}>
            <div className={styles.notificationIcon}>
              <FaBell className={styles.bellIcon} />
              {sortedNotifications.filter(n => n.priority === 'high').length > 0 && (
                <span className={styles.notificationBadge}></span>
              )}
            </div>
            <Image
              src="/images/client.jpg"
              width={45}
              height={45}
              alt="User Profile"
              className={styles.profileImg}
            />
          </div>
        </header>

        {/* Service Info Cards */}
        <section className={styles.summaryGrid}>
          <div className={styles.card}>
            <h4>Service Purchased</h4>
            <p>{services.current.name}</p>
            <small>Started: {services.current.startDate}</small>
          </div>
          <div className={styles.card}>
            <h4>Status</h4>
            <p className={styles[services.current.status]}>
              {services.current.status.replace('_', ' ').toUpperCase()}
            </p>
            <p>{services.current.nextStep}</p>
          </div>
          <div className={styles.card}>
            <h4>Documents Pending</h4>
            <ul>
              {documents.required
                .filter(doc => doc.status === 'pending')
                .map(doc => (
                  <li key={doc.id}>{doc.name}</li>
                ))}
            </ul>
          </div>
          <div className={styles.card}>
            <h4>Assigned Agent</h4>
            <p>{userProfile.assignedAgent}</p>
            <div className={styles.agentContact}>
              <a href={`tel:${userProfile.agentContact.phone}`}>
                <FaPhone /> {userProfile.agentContact.phone}
              </a>
              <a href={`mailto:${userProfile.agentContact.email}`}>
                <FaEnvelope /> {userProfile.agentContact.email}
              </a>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className={styles.actionsGrid}>
          <button className={styles.actionBtn}>
            <FaFileAlt /> Complete Incorporation Form
          </button>
          <button className={styles.actionBtn}>
            <FaUpload /> Upload {nextDocument?.name || 'Documents'}
          </button>
          <button className={styles.actionBtn}>
            <FaRegCreditCard /> View Invoices
          </button>
          <button className={styles.actionBtn}>
            <FaComments /> Chat with Support
          </button>
        </section>

        {/* Notifications */}
        <section className={styles.notifications}>
          <h3>Recent Notifications</h3>
          <ul>
            {sortedNotifications.map(notification => (
              <li key={notification.id} className={styles[notification.priority]}>
                <FaBell className={styles.notificationIcon} />
                {notification.message}
                <small>{new Date(notification.timestamp).toLocaleDateString()}</small>
              </li>
            ))}
          </ul>
        </section>

        {/* Step Indicator */}
        <section className={styles.steps}>
          {incorporationStatus.steps.map((step, index) => (
            <div key={step.id} className={`${styles.step} ${styles[step.status]}`}>
              {step.status === 'completed' ? (
                <FaCheckCircle color="#4caf50" />
              ) : step.status === 'in_progress' ? (
                <FaCloudUploadAlt color="#2196f3" />
              ) : step.status === 'pending' ? (
                <FaHourglassHalf color="#ff9800" />
              ) : (
                <FaFlagCheckered color="#9c27b0" />
              )}
              {step.name}
              {step.date && <small>{step.date}</small>}
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
