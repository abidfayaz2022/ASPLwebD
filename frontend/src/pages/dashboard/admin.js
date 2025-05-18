'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  FaChartLine,
  FaUsers,
  FaFileUpload,
  FaUserCog,
  FaBell,
  FaRegCreditCard,
  FaKey,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './../../styles/dashboard.module.css';
import { fetchProfile, logoutUser } from '../../redux/auth/authActions';
import { fetchAllUsers, createNewUser } from '../../redux/admin/adminActions';
import { clearAdminError, clearAdminSuccess } from '../../redux/admin/adminSlice';
import { adminDashboardData } from '../../data/mockData/admin/dashboardData';

import CompanyTable from '../../components/dashboard/shared/CompanyTable';
import CompanyFilters from '../../components/dashboard/shared/CompanyFilters';
import UserTable from '../../components/dashboard/admin/UserTable';
import UserModal from '../../components/dashboard/admin/UserModal';
import DeleteUserModal from '../../components/dashboard/admin/DeleteUserModal';
import ResetPasswordModal from '../../components/dashboard/admin/ResetPasswordModal';

const statusOptions = [
  'Application Submitted', 'Payment', 'Documents reviewed', 'Documents signed'
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

const mockUsers = [
  { id: 1, name: 'Christian Buehner', email: 'christian251@gmail.com', role: 'Preparer' },
  { id: 2, name: 'Jonas Kakaroto', email: 'jonaskakaroto@gmail.com', role: 'Approver' },
  { id: 3, name: 'Janko Ferlič', email: 'janko12@gmail.com', role: 'Approver' },
  { id: 4, name: 'Mitchell Luo', email: 'mitchell8621523@gmail.com', role: 'Approver' },
  { id: 5, name: 'Lachlan Dempsey', email: 'lachlandempsey69@gmail.com', role: 'Preparer' },
  { id: 6, name: 'Ian Dooley', email: 'ian@gmail.com', role: 'Preparer' },
  { id: 7, name: 'Ludovic Migneault', email: 'ludovicmigneault@gmail.com', role: 'Approver' },
  { id: 8, name: 'Charlie Green', email: 'charlie258@gmail.com', role: 'Approver' },
  { id: 9, name: 'Ali Morshedlou', email: 'alimorshedlou@gmail.com', role: 'Approver' },
];

export default function AdminDashboard() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [activeSection, setActiveSection] = useState('overview');
  const [newUser, setNewUser] = useState({ name: '', email: '', agent: '' });
  const [companies, setCompanies] = useState([]);
  const [filters, setFilters] = useState({ companyName: '', registrationNo: '', dueDate: '', status: [] });
  const [sortConfig, setSortConfig] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [users, setUsers] = useState(mockUsers);
  const [showUserModal, setShowUserModal] = useState(false);
  const [userModalMode, setUserModalMode] = useState('add');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const { users: reduxUsers, loading, error, successMessage } = useSelector((state) => state.admin);
  const { user } = useSelector((state) => state.auth);

  // Get data from mock
  const {
    statistics,
    recentActivities,
    topServices,
    agentPerformance,
    notifications
  } = adminDashboardData;

  useEffect(() => {
    setCompanies(adminDashboardData.companies);
  }, []);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const profile = await dispatch(fetchProfile()).unwrap();
        if (profile.role?.toLowerCase() !== 'admin') {
          toast.error('Access denied');
          router.push('/login');
        }
      } catch (err) {
        toast.error('Not logged in');
        router.push('/login');
      }
    };
    checkAccess();
  }, [dispatch, router]);

  useEffect(() => {
    if (activeSection === 'users') {
      dispatch(fetchAllUsers());
    }
  }, [activeSection, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAdminError());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearAdminSuccess());
    }
  }, [error, successMessage, dispatch]);

  const handleUserCreate = async (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email || !newUser.agent) {
      toast.error('Please fill all fields');
      return;
    }
    await dispatch(createNewUser(newUser));
    setNewUser({ name: '', email: '', agent: '' });
  };

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

  // User management handlers
  const handleAddUser = () => {
    setUserModalMode('add');
    setSelectedUser(null);
    setShowUserModal(true);
  };
  const handleEditUser = (user) => {
    setUserModalMode('edit');
    setSelectedUser(user);
    setShowUserModal(true);
  };
  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };
  const handleResetPassword = (user) => {
    setSelectedUser(user);
    setShowResetModal(true);
  };
  const handleUserModalSubmit = (form) => {
    if (userModalMode === 'add') {
      setUsers([...users, { ...form, id: Date.now() }]);
    } else {
      setUsers(users.map(u => u.id === selectedUser.id ? { ...u, ...form } : u));
    }
    setShowUserModal(false);
  };
  const handleDeleteConfirm = () => {
    setUsers(users.filter(u => u.id !== selectedUser.id));
    setShowDeleteModal(false);
  };
  const handleResetPasswordSubmit = (password) => {
    // Password reset logic here
    setShowResetModal(false);
  };

  return (
    <div className={styles.dashboardWrapper}>
      <ToastContainer position="top-center" autoClose={2000} />
      <aside className={styles.sidebar}>
        <div className={styles.logo}>Admin Panel</div>
        <ul className={styles.nav}>
          {[
            ['overview', 'Overview', <FaChartLine />],
            ['users', 'User Management', <FaUsers />],
            ['upload', 'Upload Companies CSV', <FaFileUpload />],
            ['agents', 'Agent Assignment', <FaUserCog />],
            ['notifications', 'Notifications', <FaBell />],
            ['invoices', 'Invoices & Payments', <FaRegCreditCard />],
            ['newuser', 'Add New User', <FaKey />],
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
          <h1>Admin Dashboard</h1>
          <div className={styles.headerRight}>
            <div className={styles.notificationWrapper}>
              <button className={styles.bellButton} onClick={() => setShowNotifications(v => !v)}>
                <FaBell className={styles.bellIcon} />
              </button>
              {showNotifications && (
                <div className={styles.notificationDropdown}>
                  <div className={styles.notificationTitle}>Notifications</div>
                  {notifications.length === 0 ? (
                    <div className={styles.noNotifications}>No notifications</div>
                  ) : (
                    notifications.map(n => (
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
              alt="Admin"
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
                  <button className={styles.addButton}>+ Add New Company</button>
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

          {activeSection === 'users' && (
            <section>
              <div className={styles.dashboardHeader}>
                <h2>Manage User Roles</h2>
                <button className={styles.addButton} onClick={handleAddUser}>Add New User</button>
              </div>
              <div className={styles.tableWrapper}>
                <UserTable
                  users={users}
                  onEdit={handleEditUser}
                  onDelete={handleDeleteUser}
                  onResetPassword={handleResetPassword}
                />
              </div>
              <UserModal
                open={showUserModal}
                onClose={() => setShowUserModal(false)}
                onSubmit={handleUserModalSubmit}
                user={selectedUser}
                mode={userModalMode}
              />
              <DeleteUserModal
                open={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteConfirm}
                user={selectedUser}
              />
              <ResetPasswordModal
                open={showResetModal}
                onClose={() => setShowResetModal(false)}
                onSubmit={handleResetPasswordSubmit}
                user={selectedUser}
              />
            </section>
          )}

          {activeSection === 'upload' && (
            <section><h2>Upload Companies CSV</h2><p>Upload feature placeholder.</p></section>
          )}

          {activeSection === 'agents' && (
            <section><h2>Agent Assignment</h2><p>Agent assignment UI here.</p></section>
          )}

          {activeSection === 'notifications' && (
            <section><h2>Notifications</h2><p>Send/review notifications here.</p></section>
          )}

          {activeSection === 'invoices' && (
            <section><h2>Invoices & Payments</h2><p>Invoice UI here.</p></section>
          )}

          {activeSection === 'newuser' && (
            <section>
              <h2>Add New User</h2>
              <form onSubmit={handleUserCreate}>
                <input
                  className="form-control mb-2"
                  placeholder="Full Name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
                <input
                  className="form-control mb-2"
                  placeholder="Email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
                <input
                  className="form-control mb-2"
                  placeholder="Agent Name"
                  value={newUser.agent}
                  onChange={(e) => setNewUser({ ...newUser, agent: e.target.value })}
                />
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Creating...' : 'Create User'}
                </button>
              </form>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
