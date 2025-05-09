// pages/dashboard/client.js
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
} from 'react-icons/fa';

export default function ClientDashboard() {
  return (
    <div className={styles.dashboardWrapper}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>Angel Services</div>
        <ul className={styles.nav}>
          <li className={styles.active}>
            <FaFileAlt className={styles.navIcon} /> Home
          </li>
          <li>
            <FaBuilding className={styles.navIcon} /> My Company Details
          </li>
          <li>
            <FaFileAlt className={styles.navIcon} /> Incorporation Form
          </li>
          <li>
            <FaUpload className={styles.navIcon} /> Uploaded Documents
          </li>
          <li>
            <FaRegCreditCard className={styles.navIcon} /> Services Subscribed
          </li>
          <li>
            <FaRegCreditCard className={styles.navIcon} /> Payments
          </li>
          <li>
            <FaRegCreditCard className={styles.navIcon} /> Calculators
          </li>
          <li>
            <FaComments className={styles.navIcon} /> Support
          </li>
          <li>
            <FaUserTie className={styles.navIcon} /> Activity Trail
          </li>
          <li>
            <FaUserTie className={styles.navIcon} /> Profile Settings
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1>User Dashboard</h1>
          <div className={styles.userBox}>
            <FaBell className={styles.bellIcon} />
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
            <p>Company Incorporation - Singapore</p>
          </div>
          <div className={styles.card}>
            <h4>Status</h4>
            <p className={styles.inProgress}>In Progress</p>
            <p>Awaiting document upload</p>
          </div>
          <div className={styles.card}>
            <h4>Documents Pending</h4>
            <ul>
              <li>ID Proof</li>
              <li>Address Proof</li>
              <li>M&amp;A Form</li>
            </ul>
          </div>
          <div className={styles.card}>
            <h4>Assigned Agent</h4>
            <p>Gaurav Agrawal</p>
            <small>📞 Contact | 📧 Email</small>
          </div>
        </section>

        {/* Quick Actions */}
        <section className={styles.actionsGrid}>
          <button className={styles.actionBtn}>
            <FaFileAlt /> Complete Incorporation Form
          </button>
          <button className={styles.actionBtn}>
            <FaUpload /> Upload Docs
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
            <li>
              <FaCheckCircle className={styles.iconSuccess} /> Invoice #204 has been generated.{' '}
              <Link href="#">View now</Link>
            </li>
            <li>
              <FaCheckCircle className={styles.iconSuccess} /> ID Proof has been approved.
            </li>
            <li>
              <FaCloudUploadAlt className={styles.iconPending} /> Next step: Upload M&amp;A Form
            </li>
          </ul>
        </section>

        {/* Step Indicator */}
        <section className={styles.steps}>
          <div className={styles.step}>
            <FaCheckCircle color="#4caf50" /> Form Submitted
          </div>
          <div className={styles.step}>
            <FaCloudUploadAlt color="#2196f3" /> Docs Uploaded
          </div>
          <div className={styles.step}>
            <FaHourglassHalf color="#ff9800" /> Under Review
          </div>
          <div className={styles.step}>
            <FaFlagCheckered color="#9c27b0" /> Company Registered
          </div>
        </section>
      </main>
    </div>
  );
}
