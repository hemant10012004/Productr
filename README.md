# Productr - Full Stack Web Application

A comprehensive, full-stack MERN application for managing product listings, featuring secure real-time phone (SMS) and email OTP authentication. 

## 📋 Project Overview
This repository contains a full-stack web application built to exact specifications based on Figma designs. It allows users to securely authenticate via OTP, and fully manage product listings through a modern, responsive dashboard.

### Demo Links
- **Public Frontend URL (Vercel):** *[Link intentionally left blank for submission]*
- **Public Backend URL (Render):** *[Link intentionally left blank for submission]*

## 🛠️ Tech Stack
* **Frontend:** React.js, Vite, Tailwind CSS, Axios, React Router, Lucide Icons
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Authentication:** JSON Web Tokens (JWT), Twilio Verify v2, Nodemailer

## 📂 Folder Structure
The repository strictly adheres to a clean separation of concerns:
```text
productr/
├── client/         # React + Vite Frontend application
│   ├── src/        
│   │   ├── components/  # Reusable UI elements (Modals, Cards, Toasts)
│   │   ├── pages/       # Core views (Login, OTP verification, Dashboard)
│   │   └── services/    # Axios instance with auth interceptors
├── server/         # Node.js + Express Backend application
│   ├── controllers/     # Business logic for auth flow and CRUD
│   ├── middleware/      # JWT route protection
│   ├── models/          # Mongoose Schema Definitions representing Figma
│   ├── routes/          # Express route bindings
│   ├── utils/           # Helpers for sending/verifying SMS and Email
│   └── server.js        # Main application entry point & CORS config
├── .env.example    # Required environment variables template
├── .gitignore      # Ignored files (node_modules, .env, build, etc.)
└── README.md       # Project documentation
```

## 🚀 Local Setup Instructions

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/en/) and [MongoDB](https://www.mongodb.com/try/download/community) (optional, app supports memory server fallback) installed.

### 1. Setup Backend (Server)
Navigate to the server directory, install dependencies, and configure your environment:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory (Refer to `server/.env.example` for required keys) with the following **Required Environment Variables**:
```env
PORT=5000
MONGO_URI=mongodb_connection_string # Provide your MongoDB Atlas URI here
JWT_SECRET=supersecret123
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_VERIFY_SERVICE_SID=your_twilio_verify_sid
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

**How to run the backend:**
```bash
npm run dev
# Server runs on http://localhost:5000
```

### 2. Setup Frontend (Client)
In a separate terminal, navigate to the client directory and install dependencies:
```bash
cd client
npm install
```

Create a `.env` file locally with the **Required Environment Variable**:
```env
VITE_API_URL=http://localhost:5000
```

**How to run the frontend:**
```bash
npm run dev
# Client runs on http://localhost:5173
```

## 🌐 Deployment
This application is fully prepared for production deployment.

1. **Database:** Deploy your cluster on **MongoDB Atlas** and supply the `MONGO_URI`.
2. **Backend:** Deploy the `server/` directory easily via **Render** or **Railway** as a Web Service. Attach the environment variables in the host dashboard.
3. **Frontend:** Deploy the `client/` directory gracefully via **Vercel** or **Netlify**. Update `VITE_API_URL` to point to the live Render Backend URL.

*Note: Production URLs will be populated here by the author once live.*

* **Live Frontend:** `[Your Vercel Link Here]`
* **Live Backend APIs:** `[Your Render Link Here]`

---
Developed as a full-stack technical assignment showcasing clean code, strong separation of concerns, and robust 3rd party integrations.
