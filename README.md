# 🚀 QuickAIPro – AI Content Creation Platform

QuickAIPro is a modern AI-powered SaaS platform designed to help users generate high-quality digital content instantly.

From writing articles to generating images and reviewing resumes, QuickAIPro delivers a complete AI productivity suite inside a clean, responsive dashboard.

🌐 **Live Demo:**  
👉 https://quick-ai-pro-eight.vercel.app/

---

## ✨ Features

QuickAIPro includes a powerful AI tool ecosystem:

- 📝 AI Article Generator  
- 🏷️ Smart Blog Title Generator  
- 🎨 AI Image Generator  
- 🪄 Background Remover  
- ✂️ Object Removal Tool  
- 📄 AI Resume Reviewer  
- 📊 User Dashboard with Creation Tracking  
- 🔐 Secure Authentication (Clerk)  
- ⚡ Smooth UI Animations & Modern UX  

All tools are seamlessly integrated into a unified dashboard experience.

---

## 🏗️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- Clerk Authentication
- Lenis (Smooth Scroll)

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- CORS & Security Middleware

### Deployment
- Frontend → Vercel  
- Backend → Render  
- Database → MongoDB Atlas  

---

## 🖼️ Architecture Overview

Frontend (Vercel)  
⬇  
Backend API (Render)  
⬇  
MongoDB Atlas (Cloud Database)

---

## ⚡ Local Setup Guide

### 1️⃣ Clone Repository

```bash
git clone https://github.com/shriyash04/QuickAIPro.git
cd QuickAIPro
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` inside `backend`:

```env
PORT=8081
MONGODB_URI=your_mongodb_atlas_uri
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` inside `frontend`:

```env
VITE_API_BASE=http://localhost:8081
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
```

Run frontend:

```bash
npm run dev
```

---

## 🌍 Production Environment Variables

### Frontend (Vercel)

```env
VITE_API_BASE=https://your-render-backend-url.onrender.com
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
```

### Backend (Render)

```env
MONGODB_URI=your_mongodb_uri
FRONTEND_URL=https://quick-ai-pro-eight.vercel.app
JWT_SECRET=your_secret_key
```

---

## 🎯 Project Vision

QuickAIPro is built to evolve into a complete AI productivity ecosystem — enabling users to create, edit, enhance, and manage digital content effortlessly.

---

## 📈 Future Enhancements

- Advanced AI Model Integration  
- Subscription & Billing System  
- Admin Panel  
- Usage Analytics Dashboard  
- AI Workflow Automation  

---

## 📜 License

This project is built for educational and demonstration purposes.

---

## 👨‍💻 Author

Developed by **Shriyash** 
Building scalable AI SaaS platforms 🚀