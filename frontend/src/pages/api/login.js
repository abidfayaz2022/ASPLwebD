import cookie from 'cookie';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { emailOrUsername, password } = req.body;

  try {
    const apiRes = await fetch('http://localhost:3333/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ emailOrUsername, password }),
    });

    const data = await apiRes.json();

    if (!apiRes.ok) {
      return res.status(apiRes.status).json({ message: data.message || 'Login failed' });
    }

    const token = data.token;

    if (!token) {
      return res.status(500).json({ message: 'Token not received from backend.' });
    }

    // Set the token in an HTTP-only cookie
    res.setHeader('Set-Cookie', cookie.serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // true in production
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: 'strict',
      path: '/',
    }));

    return res.status(200).json({ message: 'Login successful' });

  } catch (error) {
    console.error('Login API error:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
