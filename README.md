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
In a separate terminal, navigate to the client directory:
```bash
cd client
npm install
```

Start the frontend:
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
