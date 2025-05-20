'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  FaChartLine,
  FaFileAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaBell,
  FaHistory,
  FaSearch,
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './../../styles/dashboard.module.css';
import { fetchProfile, logoutUser } from '../../redux/auth/authActions';
import CompanyTable from '../../components/dashboard/shared/CompanyTable';
import CompanyFilters from '../../components/dashboard/shared/CompanyFilters';

const statusOptions = [
  'Pending Review', 'Approved', 'Rejected', 'Needs Revision'
];

function filterCompanies(companies, filters) {
  return companies.filter(c =>
    (!filters.companyName || c.companyName.toLowerCase().includes(filters.companyName.toLowerCase())) &&
    (!filters.registrationNo || c.registrationNo.includes(filters.registrationNo)) &&
    (!filters.dueDate || c.dueDate === filters.dueDate) &&
    (filters.status.length === 0 || filters.status.includes(c.status))
  );
}

function sortCompanies(companies, sortConfig) {
  if (!sortConfig) return companies;
  const sorted = [...companies].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });
  return sorted;
}

export default function ApproverDashboard() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [activeSection, setActiveSection] = useState('overview');
  const [companies, setCompanies] = useState([]);
  const [filters, setFilters] = useState({ companyName: '', registrationNo: '', dueDate: '', status: [] });
  const [sortConfig, setSortConfig] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const { user } = useSelector((state) => state.auth);

  // Mock data - replace with actual data fetching
  const mockNotifications = [
    { id: 1, message: 'New company submission requires review' },
    { id: 2, message: 'Document verification completed' },
  ];

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const profile = await dispatch(fetchProfile()).unwrap();
        if (!profile) {
          toast.error('Not logged in');
          router.push('/login');
          return;
        }
        const role = profile.role?.toLowerCase();
        if (role !== 'admin' && role !== 'approver') {
          toast.error('Access denied. Approver access required.');
          router.push('/login');
          return;
        }
      } catch (err) {
        toast.error('Not logged in');
        router.push('/login');
      }
    };
    checkAccess();
  }, [dispatch, router]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success('Logged out');
      setTimeout(() => router.push('/login'), 800);
    } catch (err) {
      toast.error(typeof err === 'string' ? err : 'Logout failed');
    }
  };

  const handleSort = (key) => {
    setSortConfig(prev =>
      prev && prev.key === key
        ? { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
        : { key, direction: 'asc' }
    );
  };

  const handleApplyFilters = () => setShowFilters(false);
  const handleClearFilters = () => setFilters({ companyName: '', registrationNo: '', dueDate: '', status: [] });

  const filtered = filterCompanies(companies, filters);
  const sorted = sortCompanies(filtered, sortConfig);

  return (
    <div className={styles.dashboardWrapper}>
      <ToastContainer position="top-center" autoClose={2000} />
      <aside className={styles.sidebar}>
        <div className={styles.logo}>Approver Panel</div>
        <ul className={styles.nav}>
          {[
            ['overview', 'Overview', <FaChartLine />],
            ['pending', 'Pending Reviews', <FaFileAlt />],
            ['approved', 'Approved', <FaCheckCircle />],
            ['rejected', 'Rejected', <FaTimesCircle />],
            ['history', 'Review History', <FaHistory />],
            ['search', 'Search Documents', <FaSearch />],
            ['notifications', 'Notifications', <FaBell />],
          ].map(([key, label, icon]) => (
            <li
              key={key}
              className={activeSection === key ? styles.active : ''}
              onClick={() => setActiveSection(key)}
            >
              <span className={styles.navIcon}>{icon}</span> {label}
            </li>
          ))}
        </ul>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1>Approver Dashboard</h1>
          <div className={styles.headerRight}>
            <div className={styles.notificationWrapper}>
              <button className={styles.bellButton} onClick={() => setShowNotifications(v => !v)}>
                <FaBell className={styles.bellIcon} />
              </button>
              {showNotifications && (
                <div className={styles.notificationDropdown}>
                  <div className={styles.notificationTitle}>Notifications</div>
                  {mockNotifications.length === 0 ? (
                    <div className={styles.noNotifications}>No notifications</div>
                  ) : (
                    mockNotifications.map(n => (
                      <div key={n.id} className={styles.notificationItem}>
                        {n.message}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
            <Image
              src="/images/client.jpg"
              width={45}
              height={45}
              alt="Approver"
              className={styles.profileImg}
            />
          </div>
        </header>

        <div className={styles.contentArea}>
          {activeSection === 'overview' && (
            <section>
              <div className={styles.dashboardHeader}>
                <h2>Dashboard</h2>
                <div className={styles.dashboardHeaderActions}>
                  <button onClick={() => setShowFilters(true)} className={styles.filterButton}>Filter</button>
                </div>
              </div>
              {showFilters && (
                <div className={styles.filterDrawer}>
                  <CompanyFilters
                    filters={filters}
                    onChange={setFilters}
                    onClear={handleClearFilters}
                    onApply={handleApplyFilters}
                    statusOptions={statusOptions}
                  />
                  <button className={styles.closeDrawer} onClick={() => setShowFilters(false)}>×</button>
                </div>
              )}
              <div className={styles.tableWrapper}>
                <CompanyTable
                  companies={sorted}
                  sortConfig={sortConfig}
                  onSort={handleSort}
                  onOpen={company => {/* handle open action */ }}
                />
              </div>
            </section>
          )}

          {activeSection === 'pending' && (
            <section><h2>Pending Reviews</h2><p>List of documents pending review.</p></section>
          )}

          {activeSection === 'approved' && (
            <section><h2>Approved Documents</h2><p>List of approved documents.</p></section>
          )}

          {activeSection === 'rejected' && (
            <section><h2>Rejected Documents</h2><p>List of rejected documents.</p></section>
          )}

          {activeSection === 'history' && (
            <section><h2>Review History</h2><p>Complete review history.</p></section>
          )}

          {activeSection === 'search' && (
            <section><h2>Search Documents</h2><p>Search interface for documents.</p></section>
          )}

          {activeSection === 'notifications' && (
            <section><h2>Notifications</h2><p>Review and manage notifications.</p></section>
          )}
        </div>
      </main>
    </div>
  );
} 