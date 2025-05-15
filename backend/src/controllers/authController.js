import * as authService from '../services/authService.js';



export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json({ message: 'No refresh token' });

    const { token } = await authService.refreshAccessToken(refreshToken);

    // ✅ Set new access token cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    res.json({ success: true, message: 'Token refreshed' });
  } catch (err) {
    res.status(401).json({ message: err.message || 'Unauthorized' });
  }
};

export const register = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error registering user', error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { token, refreshToken, user } = await authService.loginUser(req.body);

    // ✅ Set HTTP-only cookie for refresh token
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    // ✅ Set JWT access token (also in cookie if needed)
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user
      // ❌ Don't send token in body in production
    });

  } catch (error) {
    res.status(401).json({ success: false, message: error.message || 'Invalid credentials' });
  }
};


export const logout = (_req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  res.status(200).json({ success: true, message: 'Logged out successfully' });
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
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
};





