# IdeaVault – Startup Idea Sharing Platform

A modern startup idea sharing platform where users can discover, share, manage, and discuss innovative startup concepts from around the world.

Built with **Next.js**, **Better Auth**, **MongoDB**, **Tailwind CSS**, and **Express.js**.

---

# 🔗 Live Website

```bash
https://idea-vault-gilt.vercel.app/
```

---

# 📂 GitHub Repositories

## Client Repository

```bash
https://github.com/Palash-4/IdeaVault
```

## Server Repository

```bash
https://github.com/Palash-4/IdeaVault-Server
```

---

# 🚀 Features

* User Authentication with Better Auth
* Google Login & Registration
* JWT Protected Routes
* Create Startup Ideas
* Update & Delete Own Ideas
* Explore Public Ideas
* Comment System
* Edit & Delete Own Comments Only
* My Ideas Dashboard
* My Interactions Page
* Responsive Design
* Dark / Light Mode
* Beautiful Modern UI
* Secure Backend API
* MongoDB Database Integration

---

# 🛠️ Technologies Used

## Frontend

* Next.js 16
* React 19
* Tailwind CSS
* Better Auth
* React Hot Toast
* SweetAlert2
* Lucide React
* React Icons
* Swiper JS

## Backend

* Express.js
* MongoDB
* JOSE JWT Verification
* CORS
* dotenv

---

# 🔐 Authentication & Security

* Email/Password Authentication
* Google Authentication
* JWT Token Verification
* Protected API Routes
* Authorization Based Comment Control
* Secure User Data Access

---

# 📄 Pages

* Home Page
* Ideas Page
* Idea Details Page
* Add Idea Page
* My Ideas Page
* My Interactions Page
* Login Page
* Register Page
* Profile Page
* Custom 404 Page

---

# ⚡ Installation & Setup

## Clone the repositories

```bash
git clone https://github.com/Palash-4/IdeaVault.git
```

```bash
git clone https://github.com/Palash-4/IdeaVault-Server.git
```

---

# 📦 Frontend Setup

## Navigate to client folder

```bash
cd idea-vault
```

## Install dependencies

```bash
npm install
```

## Run development server

```bash
npm run dev
```

---

# 📦 Backend Setup

## Navigate to server folder

```bash
cd ideavault-server
```

## Install dependencies

```bash
npm install
```

## Start backend server

```bash
npm run dev
```

---

# 🔑 Environment Variables

## Frontend (.env.local)

```env
NEXT_PUBLIC_SERVER_URL=http://localhost:5000
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
MONGODB_URI=your_mongodb_uri
```

---

## Backend (.env)

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
CLIENT_URL=http://localhost:3000
```

---

# 🌐 API Endpoints

## Ideas

* GET /ideas
* POST /ideas
* GET /ideas/:id
* PATCH /ideas/:id
* DELETE /ideas/:id
* GET /my-ideas/:email

## Comments

* GET /comments/:ideaId
* POST /comments
* PATCH /comments/:id
* DELETE /comments/:id
* GET /my-interactions/:email

---

# 📱 Responsive Design

The application is fully responsive and optimized for:

* Mobile Devices
* Tablets
* Laptops
* Desktop Screens

---

# ✨ UI Highlights

* Modern Gradient Design
* Animated Components
* Interactive Cards
* Smooth Hover Effects
* Clean Dashboard Layout
* Professional Typography
* Elegant Dark Mode

---

# 🧠 Project Purpose

IdeaVault helps entrepreneurs and creators share startup concepts, receive feedback, and collaborate with others in a modern online community.

---

# 👨‍💻 Developer

## Md. Hasan Al Tarek Palash

* Full Stack Web Developer
* Passionate about modern web technologies and clean UI/UX design.

---

# 📜 License

This project is created for educational and portfolio purposes.
