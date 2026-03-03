# Sahara - Real Estate Deal Platform

## Overview

Sahara is a production-grade real estate platform that connects property **buyers** and **sellers**. The platform collects buyer requirements and seller listings, stores them in a centralized database, and allows an **admin** to match deals, facilitate transactions, and earn commission.

---

## User Roles

| Role     | Description                                                                 |
|----------|-----------------------------------------------------------------------------|
| **Buyer**  | Submits property purchase enquiries (type, area, budget, preferred location) |
| **Seller** | Publishes property listings with details, photos, and asking price          |
| **Admin**  | Full access — views all enquiries/listings, matches deals, manages payments |

---

## Core Features

### 1. Authentication & Authorization
- User registration with role selection (Buyer / Seller)
- Email + password login (with hashed passwords using bcrypt)
- JWT-based session tokens (access + refresh tokens)
- Role-based route protection (Buyer, Seller, Admin)
- Password reset via email (OTP or link)
- Admin account seeded via environment variable (not self-registered)

### 2. Buyer Flow
- **Submit Enquiry**: Buyer fills a form specifying:
  - Property type (Flat / House / Plot / Commercial)
  - Desired area (in gaj / sq. ft.)
  - Preferred location / city / locality
  - Budget range (min - max)
  - Additional notes (optional)
- **My Enquiries**: Dashboard showing all submitted enquiries with status:
  - `Pending` — submitted, not yet matched
  - `In Progress` — admin is working on matching
  - `Matched` — a seller property has been found
  - `Deal Closed` — transaction completed
  - `Cancelled` — enquiry withdrawn
- **Receipts**: View all payments made (commission, booking amount, etc.)

### 3. Seller Flow
- **Publish Listing**: Seller fills a form with:
  - Property type (Flat / House / Plot / Commercial)
  - Address / Location (city, locality, pin code)
  - Area (in gaj / sq. ft.)
  - Number of rooms / floors (if applicable)
  - Asking price
  - Property description
  - Upload photos (up to 10 images)
  - Furnishing status (Furnished / Semi-furnished / Unfurnished)
  - Property age (years)
- **My Listings**: Dashboard showing all published listings with status:
  - `Active` — visible and available
  - `In Negotiation` — admin matched a buyer
  - `Sold` — deal completed
  - `Delisted` — removed by seller
- **My Enquiries**: View buyer enquiries matched to their listings
- **Receipts**: View all commission payments and transaction history

### 4. Admin Dashboard
- **View All Buyer Enquiries**: Filter by status, location, budget, property type
- **View All Seller Listings**: Filter by status, location, price, property type
- **Match Deals**: Manually pair a buyer enquiry with a seller listing
- **Deal Management**:
  - Create a deal record linking buyer + seller
  - Set commission amount and payment terms
  - Track deal status (Initiated → Negotiation → Agreement → Payment → Closed)
- **Payment & Receipt Management**:
  - Record payments from both parties
  - Generate receipts (PDF download)
  - Track commission earned
- **User Management**: View, edit, deactivate any user account
- **Analytics** (Phase 2): Total deals, revenue, active listings, conversion rate

### 5. Enquiry Section (Shared)
- Both buyers and sellers see a unified "My Enquiries" section
- Shows enquiry status, matched counterparty (once matched), and deal progress
- Real-time status updates

### 6. Receipt Section (Shared)
- Lists all financial transactions related to a user
- Each receipt shows: date, amount, type (commission/booking/advance), deal reference
- Download receipt as PDF

---

## Tech Stack

| Layer         | Technology                        | Reason                                      |
|---------------|-----------------------------------|---------------------------------------------|
| **Frontend**  | React 18 + Vite                   | Fast build, component-based, production-proven |
| **Styling**   | Tailwind CSS                      | Utility-first, rapid UI development         |
| **Routing**   | React Router v6                   | Client-side routing with protected routes   |
| **State**     | React Context + useReducer        | Simple, no extra dependency needed          |
| **Backend**   | Node.js + Express.js              | Fast, scalable REST API                     |
| **Database**  | MongoDB + Mongoose                | Flexible schema for property data, easy scaling |
| **Auth**      | JWT (jsonwebtoken) + bcrypt       | Stateless auth, secure password hashing     |
| **File Upload** | Multer + Cloudinary             | Image upload and cloud storage              |
| **PDF**       | jsPDF or pdfkit                   | Receipt generation                          |
| **Validation**| express-validator (backend), Zod (frontend) | Input sanitization on both ends  |
| **Email**     | Nodemailer + SMTP                 | Password reset, notifications               |

---

## Project Structure

```
Sahara/
├── client/                     # React frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/             # Static images, icons
│   │   ├── components/         # Reusable UI components
│   │   │   ├── common/         # Button, Input, Modal, Navbar, Footer
│   │   │   ├── buyer/          # Buyer-specific components
│   │   │   ├── seller/         # Seller-specific components
│   │   │   └── admin/          # Admin-specific components
│   │   ├── pages/              # Route-level pages
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── BuyerDashboard.jsx
│   │   │   ├── SellerDashboard.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── SubmitEnquiry.jsx
│   │   │   ├── PublishListing.jsx
│   │   │   ├── MyEnquiries.jsx
│   │   │   ├── MyListings.jsx
│   │   │   ├── Receipts.jsx
│   │   │   └── NotFound.jsx
│   │   ├── context/            # Auth context, global state
│   │   ├── hooks/              # Custom hooks (useAuth, useFetch)
│   │   ├── utils/              # API client, helpers, constants
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── server/                     # Express backend
│   ├── config/
│   │   ├── db.js               # MongoDB connection
│   │   └── cloudinary.js       # Cloudinary config
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── buyerController.js
│   │   ├── sellerController.js
│   │   ├── dealController.js
│   │   ├── paymentController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   ├── auth.js             # JWT verification
│   │   ├── roleCheck.js        # Role-based access
│   │   ├── upload.js           # Multer config
│   │   └── errorHandler.js     # Global error handler
│   ├── models/
│   │   ├── User.js
│   │   ├── BuyerEnquiry.js
│   │   ├── SellerListing.js
│   │   ├── Deal.js
│   │   └── Payment.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── buyerRoutes.js
│   │   ├── sellerRoutes.js
│   │   ├── dealRoutes.js
│   │   ├── paymentRoutes.js
│   │   └── adminRoutes.js
│   ├── utils/
│   │   ├── generateToken.js
│   │   ├── sendEmail.js
│   │   └── pdfGenerator.js
│   ├── server.js               # Entry point
│   └── package.json
│
├── .env.example                # Environment variable template
├── .gitignore
├── plan.md
└── README.md
```

---

## Database Schema

### User
```
{
  name:          String (required)
  email:         String (required, unique)
  phone:         String (required)
  password:      String (required, hashed)
  role:          Enum ["buyer", "seller", "admin"]
  avatar:        String (URL, optional)
  isActive:      Boolean (default: true)
  createdAt:     Date
  updatedAt:     Date
}
```

### BuyerEnquiry
```
{
  buyer:           ObjectId -> User (ref)
  propertyType:    Enum ["flat", "house", "plot", "commercial"]
  desiredArea:     Number (in gaj)
  areaUnit:        Enum ["gaj", "sqft"]
  preferredLocation: String
  city:            String
  budgetMin:       Number
  budgetMax:       Number
  notes:           String (optional)
  status:          Enum ["pending", "in_progress", "matched", "deal_closed", "cancelled"]
  matchedDeal:     ObjectId -> Deal (ref, optional)
  createdAt:       Date
  updatedAt:       Date
}
```

### SellerListing
```
{
  seller:          ObjectId -> User (ref)
  propertyType:    Enum ["flat", "house", "plot", "commercial"]
  address:         String
  locality:        String
  city:            String
  pinCode:         String
  area:            Number
  areaUnit:        Enum ["gaj", "sqft"]
  rooms:           Number (optional)
  floors:          Number (optional)
  askingPrice:     Number
  description:     String
  photos:          [String] (array of Cloudinary URLs, max 10)
  furnishing:      Enum ["furnished", "semi-furnished", "unfurnished"]
  propertyAge:     Number (years)
  status:          Enum ["active", "in_negotiation", "sold", "delisted"]
  matchedDeal:     ObjectId -> Deal (ref, optional)
  createdAt:       Date
  updatedAt:       Date
}
```

### Deal
```
{
  buyerEnquiry:    ObjectId -> BuyerEnquiry (ref)
  sellerListing:   ObjectId -> SellerListing (ref)
  buyer:           ObjectId -> User (ref)
  seller:          ObjectId -> User (ref)
  agreedPrice:     Number
  commissionRate:  Number (percentage)
  commissionAmount:Number
  status:          Enum ["initiated", "negotiation", "agreement", "payment_pending", "closed", "cancelled"]
  notes:           String (optional, admin notes)
  createdAt:       Date
  updatedAt:       Date
}
```

### Payment
```
{
  deal:            ObjectId -> Deal (ref)
  paidBy:          ObjectId -> User (ref)
  amount:          Number
  type:            Enum ["commission", "booking", "advance", "final"]
  method:          Enum ["cash", "bank_transfer", "upi", "cheque"]
  status:          Enum ["pending", "completed", "refunded"]
  receiptNumber:   String (auto-generated, unique)
  notes:           String (optional)
  createdAt:       Date
}
```

---

## API Endpoints

### Auth
| Method | Endpoint              | Description           | Access  |
|--------|-----------------------|-----------------------|---------|
| POST   | /api/auth/register    | Register new user     | Public  |
| POST   | /api/auth/login       | Login, returns JWT    | Public  |
| GET    | /api/auth/me          | Get current user      | Auth    |
| POST   | /api/auth/forgot-password | Send reset email  | Public  |
| POST   | /api/auth/reset-password  | Reset password    | Public  |

### Buyer
| Method | Endpoint                  | Description              | Access |
|--------|---------------------------|--------------------------|--------|
| POST   | /api/buyer/enquiry        | Submit new enquiry       | Buyer  |
| GET    | /api/buyer/enquiries      | Get my enquiries         | Buyer  |
| GET    | /api/buyer/enquiry/:id    | Get single enquiry       | Buyer  |
| PUT    | /api/buyer/enquiry/:id    | Update enquiry           | Buyer  |
| DELETE | /api/buyer/enquiry/:id    | Cancel enquiry           | Buyer  |

### Seller
| Method | Endpoint                    | Description              | Access  |
|--------|-----------------------------|--------------------------|---------|
| POST   | /api/seller/listing         | Publish new listing      | Seller  |
| GET    | /api/seller/listings        | Get my listings          | Seller  |
| GET    | /api/seller/listing/:id     | Get single listing       | Seller  |
| PUT    | /api/seller/listing/:id     | Update listing           | Seller  |
| DELETE | /api/seller/listing/:id     | Delist property          | Seller  |

### Deals (Admin)
| Method | Endpoint               | Description                | Access |
|--------|------------------------|----------------------------|--------|
| POST   | /api/deals             | Create deal (match buyer+seller) | Admin  |
| GET    | /api/deals             | Get all deals              | Admin  |
| GET    | /api/deals/:id         | Get deal details           | Auth   |
| PUT    | /api/deals/:id         | Update deal status         | Admin  |

### Payments
| Method | Endpoint                    | Description              | Access |
|--------|-----------------------------|--------------------------|--------|
| POST   | /api/payments               | Record a payment         | Admin  |
| GET    | /api/payments/my            | Get my payments/receipts | Auth   |
| GET    | /api/payments/:id           | Get payment detail       | Auth   |
| GET    | /api/payments/:id/download  | Download receipt PDF     | Auth   |

### Admin
| Method | Endpoint                      | Description              | Access |
|--------|-------------------------------|--------------------------|--------|
| GET    | /api/admin/users              | List all users           | Admin  |
| GET    | /api/admin/enquiries          | List all buyer enquiries | Admin  |
| GET    | /api/admin/listings           | List all seller listings | Admin  |
| PUT    | /api/admin/user/:id           | Edit user                | Admin  |
| DELETE | /api/admin/user/:id           | Deactivate user          | Admin  |
| GET    | /api/admin/stats              | Dashboard statistics     | Admin  |

---

## Pages & UI Flow

### Public Pages
1. **Home Page** — Hero section with "Buy" and "Sell" CTA buttons, brief description
2. **Login Page** — Email + password form
3. **Register Page** — Name, email, phone, password, role selection (Buyer/Seller)

### Buyer Pages
4. **Buyer Dashboard** — Overview: total enquiries, matched deals, recent activity
5. **Submit Enquiry** — Form to submit property requirement
6. **My Enquiries** — Table/list of all submitted enquiries with status badges
7. **Enquiry Detail** — Full enquiry info + matched deal info (if any)
8. **Receipts** — List of all payment receipts with download option

### Seller Pages
9. **Seller Dashboard** — Overview: total listings, active/sold count, recent activity
10. **Publish Listing** — Form with photo upload to list property
11. **My Listings** — Grid/list of all listings with status
12. **Listing Detail** — Full listing info + matched deal info (if any)
13. **Receipts** — List of all payment receipts with download option

### Admin Pages
14. **Admin Dashboard** — Stats overview (users, enquiries, listings, deals, revenue)
15. **All Buyer Enquiries** — Filterable table of all buyer enquiries
16. **All Seller Listings** — Filterable table of all seller listings
17. **Deal Management** — Create, view, update deals
18. **Payment Management** — Record payments, view all transactions
19. **User Management** — View, edit, deactivate users

---

## Implementation Phases

### Phase 1 — Foundation (Week 1-2)
- [ ] Initialize project (Vite + React frontend, Express backend)
- [ ] Set up MongoDB connection and Mongoose models
- [ ] Implement User model, registration, login, JWT auth
- [ ] Set up role-based middleware (buyer, seller, admin)
- [ ] Build Navbar, Footer, and layout components
- [ ] Create Home, Login, Register pages
- [ ] Set up protected routes in React
- [ ] Seed admin user

### Phase 2 — Buyer & Seller Core (Week 3-4)
- [ ] Build Buyer Enquiry form and API
- [ ] Build Seller Listing form with photo upload (Multer + Cloudinary)
- [ ] Build My Enquiries page (buyer)
- [ ] Build My Listings page (seller)
- [ ] Build detail pages for enquiries and listings
- [ ] Add input validation on both frontend and backend

### Phase 3 — Admin & Deals (Week 5-6)
- [ ] Build Admin Dashboard with stats
- [ ] Build admin views for all enquiries and listings
- [ ] Implement Deal creation (matching buyer + seller)
- [ ] Build Deal management page
- [ ] Build User management page
- [ ] Implement status update flows

### Phase 4 — Payments & Receipts (Week 7)
- [ ] Build Payment model and API
- [ ] Implement payment recording by admin
- [ ] Build Receipts page for buyers and sellers
- [ ] Implement PDF receipt generation and download
- [ ] Receipt number auto-generation

### Phase 5 — Polish & Production (Week 8)
- [ ] Error handling and loading states throughout
- [ ] Responsive design (mobile-first)
- [ ] Input sanitization and security hardening (rate limiting, helmet, CORS)
- [ ] Environment-based configuration (.env)
- [ ] Testing (API routes, critical flows)
- [ ] Deployment setup (frontend on Vercel/Netlify, backend on Render/Railway, DB on MongoDB Atlas)

---

## Environment Variables (.env)

```
# Server
PORT=5000
NODE_ENV=production

# Database
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/sahara

# JWT
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your_refresh_secret_here
JWT_REFRESH_EXPIRE=30d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Admin Seed
ADMIN_NAME=Admin
ADMIN_EMAIL=admin@sahara.com
ADMIN_PASSWORD=secure_admin_password
```

---

## Security Checklist

- [x] Passwords hashed with bcrypt (salt rounds: 12)
- [x] JWT stored in httpOnly cookies (not localStorage)
- [x] Role-based access control on every protected route
- [x] Input validation and sanitization (express-validator)
- [x] File upload restrictions (type: image only, size: max 5MB per file)
- [x] Rate limiting on auth endpoints (express-rate-limit)
- [x] Helmet.js for HTTP security headers
- [x] CORS configured for frontend origin only
- [x] MongoDB injection prevention (Mongoose sanitization)
- [x] No sensitive data in JWT payload (only user ID and role)

---

## Deployment Plan

| Component  | Platform        | Notes                          |
|------------|-----------------|--------------------------------|
| Frontend   | Vercel          | Auto-deploy from GitHub        |
| Backend    | Render / Railway| Free tier available, auto-deploy |
| Database   | MongoDB Atlas   | Free M0 cluster for start      |
| Images     | Cloudinary      | Free tier: 25GB storage        |
| Domain     | Custom domain   | Connect to Vercel              |

---

## Future Enhancements (Post-MVP)

- Real-time notifications (Socket.io) when deal status changes
- In-app chat between admin and buyer/seller
- Property search for buyers (browse active seller listings)
- Google Maps integration for property location
- Analytics dashboard with charts (deals/month, revenue trend)
- Multi-language support (Hindi + English)
- Mobile app (React Native)
