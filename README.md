# Shubhada — Doctor Appointment Booking App

A full-stack MERN application for booking doctor appointments online. Patients can browse verified specialists, book appointments, and pay online. Doctors and admins manage appointments through a dedicated panel.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS |
| Admin Panel | React 18, Vite, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Auth | JWT |
| File Upload | Cloudinary, Multer |
| Payments | Stripe, Razorpay |

## Project Structure

```
shubhada/
├── frontend/     # Patient-facing React app
├── admin/        # Admin & Doctor panel
└── backend/      # Express REST API
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account
- Stripe and/or Razorpay account

### 1. Clone the repo

```bash
git clone https://github.com/subbu-h21/shubhada.git
cd shubhada
```

### 2. Configure environment variables

Each folder needs a `.env` file. Use the provided `.env.example` in `backend/` as a reference.

**backend/.env**
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret
ADMIN_EMAIL=admin@shubhada.com
ADMIN_PASSWORD=your_admin_password
STRIPE_SECRET_KEY=your_stripe_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

**frontend/.env**
```env
VITE_BACKEND_URL=http://localhost:4000
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

**admin/.env**
```env
VITE_BACKEND_URL=http://localhost:4000
```

### 3. Install dependencies

```bash
# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install

# Admin
cd ../admin && npm install
```

### 4. Run the app

Open three terminals:

```bash
# Terminal 1 — Backend (http://localhost:4000)
cd backend && npm run server

# Terminal 2 — Frontend (http://localhost:5173)
cd frontend && npm run dev

# Terminal 3 — Admin panel (http://localhost:5174)
cd admin && npm run dev
```

## Features

**Patients**
- Browse doctors by speciality
- View doctor profiles, experience, and fees
- Book available time slots
- Pay online via Stripe or Razorpay
- Manage and cancel appointments
- Edit personal profile

**Doctors**
- View and manage their appointments
- Mark appointments as completed
- Update profile and availability

**Admin**
- Add and manage doctors
- View all appointments across the platform
- Dashboard with key metrics

## License

MIT
