'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailOrUsername: email,
          password: password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Login failed with status ${response.status}`);
      }

      // Token is set in HTTP-only cookie by the API route
      router.push('/');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'An error occurred. Please try again.');
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
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
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
                    className="btn btn-lg w-100 mb-4 text-dark fw-semibold"
                    style={{ backgroundColor: '#fcb900' }}
                  >
                    Sign In
                  </button>
                  <p className="text-center mb-0">
                    Don't have an account?{' '}
                    <Link href="/register" className="text-decoration-none" style={{ color: '#fcb900' }}>
                      Sign Up
                    </Link>
                  </p>
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
