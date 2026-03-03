const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken(user._id);
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
  const userData = { _id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role };
  res.status(statusCode).cookie('token', token, cookieOptions).json({ success: true, user: userData });
};

exports.register = async (req, res, next) => {
  try {
    const { name, email, phone, password, role } = req.body;
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all fields' });
    }
    if (role === 'admin') {
      return res.status(400).json({ success: false, message: 'Cannot register as admin' });
    }
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }
    const user = await User.create({ name, email, phone, password, role: role || 'buyer' });
    sendTokenResponse(user, 201, res);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    if (!user.isActive) {
      return res.status(401).json({ success: false, message: 'Account deactivated' });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const user = { _id: req.user._id, name: req.user.name, email: req.user.email, phone: req.user.phone, role: req.user.role };
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
    res.json({ success: true, message: 'Logged out' });
  } catch (error) {
    next(error);
  }
};
