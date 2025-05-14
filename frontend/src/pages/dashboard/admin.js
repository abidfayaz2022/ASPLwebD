'use client';

import { useEffect, useState } from 'react';
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
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from '../../styles/dashboard.module.css';
import { fetchProfile, logoutUser } from '../../redux/auth/authActions';
import { fetchAllUsers, createNewUser } from '../../redux/admin/adminActions';
import { clearAdminError, clearAdminSuccess } from '../../redux/admin/adminSlice';

export default function AdminDashboard() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [activeSection, setActiveSection] = useState('overview');
  const [newUser, setNewUser] = useState({ name: '', email: '', agent: '' });

  const { users, loading, error, successMessage } = useSelector((state) => state.admin);
  const { user } = useSelector((state) => state.auth);

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
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
            <Image
              src="/images/admin.jpg"
              width={45}
              height={45}
              alt="Admin"
              className={styles.profileImg}
            />
          </div>
        </header>

        <div className={styles.contentArea}>
          {activeSection === 'overview' && (
            <section><h2>Overview</h2><p>Dashboard overview goes here.</p></section>
          )}

          {activeSection === 'users' && (
            <section>
              <h2>User Management</h2>
              <ul>
                {users.length > 0 ? users.map((u) => (
                  <li key={u.id}>{u.name || u.username} — {u.email}</li>
                )) : <p>No users found.</p>}
              </ul>
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
