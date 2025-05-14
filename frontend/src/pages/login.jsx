'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { loginUser, fetchProfile } from '../redux/auth/authActions';
import { clearError } from '../redux/auth/authSlice';

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkingAuth, setCheckingAuth] = useState(true);

  const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);

  // Check session on load
  useEffect(() => {
  const checkIfLoggedIn = async () => {
    try {
      const res = await dispatch(fetchProfile()).unwrap();
      if (res) {
        const role = res.role?.toLowerCase();
        router.replace(role === 'admin' ? '/dashboard/admin' : '/dashboard/client');
      }
    } catch {
      
    } finally {
      setCheckingAuth(false);
    }
  };
  checkIfLoggedIn();
}, [dispatch, router]);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated && user) {
      const role = user.role?.toLowerCase();
      router.replace(role === 'admin' ? '/dashboard/admin' : '/dashboard/client');
    }
  }, [isAuthenticated, user, router]);

  // Show error toast
  useEffect(() => {
    if (error) {
      
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error('Email and password are required');
      return;
    }

    try {
      await dispatch(loginUser({ emailOrUsername: email, password })).unwrap();
      toast.success('Login successful');
      const res = await dispatch(fetchProfile()).unwrap();

      const role = res.role?.toLowerCase();
      setTimeout(() => {
        router.replace(role === 'admin' ? '/dashboard/admin' : '/dashboard/client');
      }, 800);
    } catch (err) {
      toast.error(typeof err === 'string' ? err : 'Login failed');
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center" style={{ backgroundColor: '#f8f9fa' }}>
      <ToastContainer position="top-center" autoClose={2500} />
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

                    <div className="text-end mb-4">
                      <Link href="/forgot-password" className="text-decoration-none" style={{ color: '#fcb900' }}>
                        Forgot Password?
                      </Link>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-lg w-100 mb-2 text-dark fw-semibold"
                      style={{ backgroundColor: '#fcb900' }}
                      disabled={loading || checkingAuth}
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
