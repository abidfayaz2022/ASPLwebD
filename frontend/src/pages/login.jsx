'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import endpoints from '../network/config/endpoints';
import callApi from '../network/core/apiCaller';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const response = await callApi(endpoints.auth.login, {
        emailOrUsername: email,
        password
      });

      if (response.success && response.user) {
        setSuccessMsg(response.message || 'Login successful');
        toast.success(response.message || 'Login successful');

        // Redirect based on role
        const role = response.user.role?.toLowerCase();
        setTimeout(() => {
          if (role === 'admin') {
            router.push('/dashboard/admin');
          } else {
            router.push('/dashboard/client');
          }
        }, 1000);
      } else {
        setErrorMsg(response.message || 'Login failed');
        toast.error(response.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      const msg = err?.message || err?.data?.message || 'Something went wrong';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <Link href="/">
                    <Image
                      src="/images/angelserviceslogo (2).png"
                      alt="Angel Services Logo"
                      width={190}
                      height={56}
                      priority
                    />
                  </Link>
                </div>
                <h2 className="text-center fw-bold mb-4">Welcome Back</h2>

                {/* Alerts */}
                {loading && (
                  <div className="alert alert-info" role="alert">
                    Logging in...
                  </div>
                )}
                {errorMsg && (
                  <div className="alert alert-danger" role="alert">
                    {errorMsg}
                  </div>
                )}
                {successMsg && (
                  <div className="alert alert-success" role="alert">
                    {successMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label fw-semibold">Email Address</label>
                    <input
                      type="email"
                      className="form-control form-control-lg rounded-3"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label fw-semibold">Password</label>
                    <input
                      type="password"
                      className="form-control form-control-lg rounded-3"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="remember" />
                      <label className="form-check-label" htmlFor="remember">
                        Remember me
                      </label>
                    </div>
                    <Link href="/forgot-password" className="text-decoration-none" style={{ color: '#fcb900' }}>
                      Forgot Password?
                    </Link>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-lg w-100 mb-2 text-dark fw-semibold"
                    style={{ backgroundColor: '#fcb900' }}
                    disabled={loading}
                  >
                    {loading ? 'Signing In...' : 'Sign In'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
