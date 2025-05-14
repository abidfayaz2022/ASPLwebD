'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  FaChartLine,
  FaUsers,
  FaFileUpload,
  FaUserCog,
  FaBell,
  FaRegCreditCard,
  FaKey,
} from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from '../../styles/dashboard.module.css';
import callApi from '../../network/core/apiCaller';
import endpoints from '../../network/config/endpoints';

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('overview');
  const [users, setUsers] = useState([]);
  const router = useRouter();

  // ✅ Auth check
  useEffect(() => {
    const checkAccess = async () => {
      try {
        const res = await callApi(endpoints.auth.profile);
        if (!res.success || res.user.role?.toLowerCase() !== 'admin') {
          toast.error('Access denied');
          router.replace('/login');
        }
      } catch (err) {
        toast.error('Not logged in');
        router.replace('/login');
      }
    };
    checkAccess();
  }, []);

  // 📦 Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await callApi({ url: '/api/admin/users', method: 'GET' });
        setUsers(res.data || []);
      } catch (err) {
        toast.error('Failed to load users');
      }
    };
    if (activeSection === 'users') fetchUsers();
  }, [activeSection]);

  return (
    <div className={styles.dashboardWrapper}>
      <ToastContainer position="top-center" autoClose={2000} />

      {/* Sidebar */}
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

      {/* Main Content */}
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1>Admin Dashboard</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={async () => {
                try {
                  await callApi( endpoints.auth.logout);
                  toast.success('Logged out');
                  setTimeout(() => router.push('/login'), 800);
                } catch (err) {
                  toast.error('Logout failed');
                }
              }}
              className={styles.logoutButton}
            >
              Logout
            </button>
            <Image
              src="/images/admin.jpg"
              width={45}
              height={45}
              alt="Admin Profile"
              className={styles.profileImg}
            />
          </div>
        </header>

        <div className={styles.contentArea}>
          {activeSection === 'overview' && (
            <section>
              <h2>Overview</h2>
              <p>Welcome to the admin dashboard. View charts and stats here.</p>
            </section>
          )}

          {activeSection === 'users' && (
            <section>
              <h2>User Management</h2>
              <ul>
                {users.length > 0 ? (
                  users.map((user) => (
                    <li key={user.id}>
                      {user.name || user.username} - {user.email}
                    </li>
                  ))
                ) : (
                  <p>No users found.</p>
                )}
              </ul>
            </section>
          )}

          {activeSection === 'upload' && (
            <section>
              <h2>Upload Companies CSV</h2>
              <p>Upload CSV logic here...</p>
            </section>
          )}

          {activeSection === 'agents' && (
            <section>
              <h2>Agent Assignment</h2>
              <p>Agent assignment UI goes here.</p>
            </section>
          )}

          {activeSection === 'notifications' && (
            <section>
              <h2>Notifications</h2>
              <p>Send and review notifications.</p>
            </section>
          )}

          {activeSection === 'invoices' && (
            <section>
              <h2>Invoices & Payments</h2>
              <p>Display invoice records and payments.</p>
            </section>
          )}

          {activeSection === 'newuser' && (
            <section>
              <h2>Add New User</h2>
              <form>
                <input placeholder="Full Name" className="form-control mb-2" />
                <input type="email" placeholder="Email" className="form-control mb-2" />
                <input placeholder="Agent Name" className="form-control mb-2" />
                <button type="submit" className="btn btn-primary">Create User</button>
              </form>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
