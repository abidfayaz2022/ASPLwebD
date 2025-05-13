import * as authService from '../services/authService.js';

export const register = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { token, user } = await authService.loginUser(req.body);

    // Set HTTP-only cookie with JWT token
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use HTTPS in prod
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    

    // Return success response with user details
    res.status(200).json({
      message: 'Login successful',
      user,
      token,   //remove this token in deployment..................................................
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(401).json({ message: error.message || 'Invalid credentials' });
  }
};


export const logout = (_req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  res.json({ message: 'Logged out successfully' });
};

// Request reset password link
export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await authService.generateResetToken(email);
    if (!result) return res.status(404).json({ success: false, message: 'User not found' });

    res.json({ success: true, message: 'Reset token sent to email (simulate in dev)' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Reset password using token
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const result = await authService.resetPassword(token, newPassword);
    if (!result) return res.status(400).json({ success: false, message: 'Invalid or expired token' });

    res.json({ success: true, message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Send OTP
export const sendOtpToUser = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = await authService.generateOtp(email);
    if (!otp) return res.status(404).json({ success: false, message: 'User not found' });

    res.json({ success: true, message: `OTP sent to email (simulate in dev)` });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Verify OTP
export const verifyUserOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const result = await authService.verifyOtp(email, otp);
    if (!result) return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });

    res.json({ success: true, message: 'OTP verified successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await authService.fetchProfile(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
};





