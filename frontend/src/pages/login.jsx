'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // ✅ App Router version
import Link from 'next/link';
import Image from 'next/image';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import endpoints from '../network/config/endpoints';
import callApi from '../network/core/apiCaller';

const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      try {
        const res = await callApi(endpoints.auth.profile);
        if (res.success && res.user) {
          const role = res.user.role?.toLowerCase();
          if (role === 'admin') {
            router.replace('/dashboard/admin');
          } else {
            router.replace('/dashboard/client');
          }
        }
      } catch (err) {
        // not logged in
      } finally {
        setCheckingAuth(false);
      }
    };

    checkIfLoggedIn();
  }, [router]); // ✅ include router just in case

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error('Email and password are required');
      return;
    }

    setLoading(true);

    try {
      const response = await callApi(endpoints.auth.login, {
        emailOrUsername: email,
        password,
      });

      if (response.success) {
        toast.success(response.message || 'Login successful');
        const profile = await callApi(endpoints.auth.profile);
        const role = profile?.user?.role?.toLowerCase();

        setTimeout(() => {
          if (role === 'admin') {
            router.replace('/dashboard/admin');
          } else {
            router.replace('/dashboard/client');
          }
        }, 800);
      } else {
        toast.error(response.message || 'Login failed');
      }
    } catch (err) {
      toast.error(err?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center" style={{ backgroundColor: '#f8f9fa' }}>
      <ToastContainer position="top-center" autoClose={2000} />
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

                <form onSubmit={handleSubmit}>
                  <fieldset disabled={checkingAuth || loading}>
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
                  </fieldset>
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
