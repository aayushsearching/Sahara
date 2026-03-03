const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const User = require('./models/User');

const app = express();

// Security
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));

// Rate limiting on auth
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 50, message: { success: false, message: 'Too many requests, try again later' } });

// Body parsing
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Routes
app.use('/api/auth', authLimiter, require('./routes/authRoutes'));
app.use('/api/buyer/enquiry', require('./routes/buyerRoutes'));
app.use('/api/seller/listing', require('./routes/sellerRoutes'));
app.use('/api/deals', require('./routes/dealRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Health check
app.get('/api/health', (req, res) => res.json({ success: true, message: 'Sahara API running' }));

// Error handler
app.use(errorHandler);

// Seed admin
const seedAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@sahara.com';
    const existing = await User.findOne({ email: adminEmail });
    if (!existing) {
      await User.create({
        name: process.env.ADMIN_NAME || 'Admin',
        email: adminEmail,
        phone: '0000000000',
        password: process.env.ADMIN_PASSWORD || 'admin123456',
        role: 'admin',
      });
      console.log('Admin user seeded');
    }
  } catch (error) {
    console.error('Admin seed error:', error.message);
  }
};

// Start
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  seedAdmin();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
