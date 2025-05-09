// pages/dashboard/admin.js
import { useState } from "react";
import Image from "next/image";
import {
  FaChartLine,
  FaUsers,
  FaFileUpload,
  FaUserCog,
  FaBell,
  FaRegCreditCard,
  FaKey,
} from "react-icons/fa";
import styles from "../../styles/dashboard.module.css";

// UploadCompanies Component (exactly as you provided)
function UploadCompanies() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const correctPassword = "admin123"; // Replace with env or secure method later

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      setMessage("Uploading file...");

      const xhr = new XMLHttpRequest();
      xhr.open("POST", "http://localhost:3000/api/admin/upload", true);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setProgress(percent);
        }
      };

      xhr.onload = () => {
        setUploading(false);
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          setMessage(data.message || "Upload complete.");
        } else {
          setMessage("Upload failed. Please try again.");
        }
      };

      xhr.onerror = () => {
        setUploading(false);
        setMessage("Upload error. Please check the server.");
      };

      xhr.send(formData);
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploading(false);
      setMessage("Error uploading file.");
    }
  };

  const handleLogin = () => {
    if (password === correctPassword) {
      setIsAuthenticated(true);
      setMessage("");
    } else {
      setMessage("Incorrect password. Access denied.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {!isAuthenticated ? (
        <div>
          <h2>Admin Login</h2>
          <input
            type="password"
            placeholder="Enter Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
          {message && <p>{message}</p>}
        </div>
      ) : (
        <div>
          <h2>Upload Company Names CSV</h2>
          <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files[0])} />
          <br /><br />
          <button onClick={handleUpload} disabled={uploading}>
            {uploading ? "Uploading..." : "Upload"}
          </button>

          {uploading && (
            <div style={{ marginTop: "10px" }}>
              <progress value={progress} max="100" style={{ width: "300px" }} />
              <p>{progress}%</p>
            </div>
          )}

          {message && (
            <p
              style={{
                color: message.toLowerCase().includes("success") ? "green" : "red",
                marginTop: "10px",
              }}
            >
              {message}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// Main Admin Dashboard Component
export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div className={styles.dashboardWrapper}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>Admin Panel</div>
        <ul className={styles.nav}>
          <li
            data-fulltext="Overview"
            className={activeSection === "overview" ? styles.active : ""}
            onClick={() => setActiveSection("overview")}
          >
            <FaChartLine className={styles.navIcon} /> Overview
          </li>
          <li
            data-fulltext="User Management"
            className={activeSection === "users" ? styles.active : ""}
            onClick={() => setActiveSection("users")}
          >
            <FaUsers className={styles.navIcon} /> User Management
          </li>
          <li
            data-fulltext="Upload Companies CSV"
            className={activeSection === "upload" ? styles.active : ""}
            onClick={() => setActiveSection("upload")}
          >
            <FaFileUpload className={styles.navIcon} /> Upload Companies CSV
          </li>
          <li
            data-fulltext="Agent Assignment"
            className={activeSection === "agents" ? styles.active : ""}
            onClick={() => setActiveSection("agents")}
          >
            <FaUserCog className={styles.navIcon} /> Agent Assignment
          </li>
          <li
            data-fulltext="Notifications"
            className={activeSection === "notifications" ? styles.active : ""}
            onClick={() => setActiveSection("notifications")}
          >
            <FaBell className={styles.navIcon} /> Notifications
          </li>
          <li
            data-fulltext="Invoices & Payments"
            className={activeSection === "invoices" ? styles.active : ""}
            onClick={() => setActiveSection("invoices")}
          >
            <FaRegCreditCard className={styles.navIcon} /> Invoices & Payments
          </li>
          <li
            data-fulltext="Add New User"
            className={activeSection === "newuser" ? styles.active : ""}
            onClick={() => setActiveSection("newuser")}
          >
            <FaKey className={styles.navIcon} /> Add New User
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1>Admin Dashboard</h1>
          <div className={styles.userBox}>
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
          {activeSection === "overview" && (
            <section>
              <h2>Overview</h2>
              <p>
                Here you can view key metrics, recent activities, and summary cards with charts.
              </p>
              {/* Insert summary cards or charts as needed */}
            </section>
          )}

          {activeSection === "users" && (
            <section>
              <h2>User Management</h2>
              <p>View and manage registered users along with their process statuses.</p>
              {/* Insert a table or list of users (data from your database) */}
            </section>
          )}

          {activeSection === "upload" && (
            <section>
              <h2>Upload Companies CSV</h2>
              {/* Render the UploadCompanies component inline */}
              <UploadCompanies />
            </section>
          )}

          {activeSection === "agents" && (
            <section>
              <h2>Agent Assignment</h2>
              <p>
                Assign agents to customers. Use the form or table below to assign and track agent responsibilities.
              </p>
              {/* Insert your agent assignment UI components here */}
            </section>
          )}

          {activeSection === "notifications" && (
            <section>
              <h2>Notifications</h2>
              <p>Send notifications to users and review notification history.</p>
              {/* Insert a form for sending notifications and a list for past notifications */}
            </section>
          )}

          {activeSection === "invoices" && (
            <section>
              <h2>Invoices & Payments</h2>
              <p>Review and manage all invoices and payment records.</p>
              {/* Insert a detailed table or card view to display invoices and payment data */}
            </section>
          )}

          {activeSection === "newuser" && (
            <section>
              <h2>Add New User</h2>
              <p>Create a new user profile with an auto-generated ID and password.</p>
              {/* Example form for adding a new user */}
              <form>
                <div style={{ marginBottom: "10px" }}>
                  <label>
                    Full Name: <br />
                    <input type="text" placeholder="Full name" required />
                  </label>
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label>
                    Email: <br />
                    <input type="email" placeholder="Email address" required />
                  </label>
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label>
                    Agent Assigned: <br />
                    <input type="text" placeholder="Agent name" required />
                  </label>
                </div>
                <button type="submit">Create User</button>
              </form>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
