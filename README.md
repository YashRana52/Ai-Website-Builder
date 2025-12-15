# ⚙️ AI Website Builder – Full Stack SaaS Application

A modern **full‑stack AI SaaS platform** that allows users to generate complete websites using AI, manage usage via a **credit‑based system**, and purchase credits securely using **Stripe**. Built with **PostgreSQL, Express, React, and Node.js (PERN Stack)** following best practices for scalability, security, and performance.

---



## 🚀 Live Demo

🔗 [View Live](https://ai-website-builder-frontend.vercel.app)

---

## 📸 Screenshots

| Home Page                         | Community Project                   |  Website Generation                      |
|----------------------------------|----------------------------------|-----------------------------------|
| ![Home](./screenshots/home.png) | ![Community](./screenshots/project.png) | ![Website](./screenshots/website.png) |

---

## 🚀 What You Will Learn from This Project

This project demonstrates **real‑world SaaS architecture** and covers:

* How to build a **full‑stack AI website builder** using PERN stack
* How to generate websites using a **free AI model**
* How to implement a **credit‑based usage system**
* How to integrate **Stripe payments** for buying credits
* How to deploy **frontend & backend separately**
* Best practices for building **modern AI SaaS applications**

---

## ✨ Key Features

### 🤖 AI Website Builder

* Generate complete website layouts using AI prompts
* AI creates:

  * Page structure
  * Sections & content
  * Styling suggestions
* Free AI model integration for cost‑effective generation

---

### 👤 User Authentication

* Secure authentication system
* User‑specific projects & history
* Session‑based access control

---

### 💳 Credit‑Based Usage System

* Each AI generation consumes credits
* Separate limits for:

  * Free users
  * Paid users
* Real‑time credit tracking
* Prevents usage when credits are exhausted

---

### 💰 Stripe Payment Integration

* Purchase credits using Stripe Checkout
* Secure payment flow
* Webhooks to:

  * Verify payment
  * Add credits automatically
* Supports scalable pricing plans

---

### 📱 Responsive UI

* Fully responsive design
* Optimized for:

  * Desktop
  * Tablet
  * Mobile devices
* Modern UI components with clean UX

---

## 🧠 System Architecture

```text
Frontend (React)
   │
   │ REST API
   ▼
Backend (Node + Express)
   │
   │ Prisma ORM
   ▼
PostgreSQL (Neon DB)
```

---

## 🧰 Tech Stack

### 💻 Frontend

* React.js (Vite)
* Tailwind CSS
* Context API for state management
* Stripe JS SDK

### 🖥️ Backend

* Node.js
* Express.js
* PostgreSQL (Neon)
* Prisma ORM
* Stripe Webhooks
* REST APIs

### 🤖 AI Integration

* Free AI model API
* Prompt‑based website generation
* Optimized prompt engineering

---

## 📂 Project Structure

```bash
AI-Website-Builder/
├── frontend/            # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── context/
│       └── services/
├── backend/             # Node.js backend
│   ├── controllers/
│   ├── routes/
│   ├── prisma/
│   └── server.js
└── README.md
```

---

## ⚙️ How Website Generation Works

1. User enters a **prompt** describing the website
2. Backend sends the prompt to the AI model
3. AI generates structured website data
4. Data is converted into reusable UI components
5. Credits are deducted from the user account

---

## 🔢 Credit System Logic

* New users receive **free starter credits**
* Each AI request consumes credits
* Credits are stored in PostgreSQL
* Stripe payments increase credit balance
* Middleware blocks requests when credits = 0

---

## 💳 Stripe Credit Purchase Flow

1. User selects a credit package
2. Redirected to Stripe Checkout
3. Payment is completed securely
4. Stripe webhook triggers backend
5. Credits are added to the user account

---

## 🚀 Deployment Strategy

### Frontend Deployment

* Deployed on **Vercel**
* Environment variables managed securely

### Backend Deployment

* Deployed on **Render / Railway**
* Stripe webhooks configured with public URL

### Database

* Hosted on **Neon (PostgreSQL)**
* Serverless & scalable

---

## 🧰 Environment Variables

```env
DATABASE_URL=your_postgres_url
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_webhook_secret
FRONTEND_URL=your_frontend_url
```

---

## 🏆 Best Practices Followed

* Clean folder structure
* Separation of frontend & backend
* Secure environment variables
* Credit‑based rate limiting
* Webhook verification for Stripe
* Scalable database design
* Production‑ready API structure

---

## 📌 Ideal For

* Full‑stack developers
* AI SaaS builders
* Students learning PERN stack
* Developers building real‑world SaaS apps

---

## 👨‍💻 Author

**Yash Rana**
🎓 IET Lucknow
📧 [yashrana2200520100072@gmail.com](mailto:yashrana2200520100072@gmail.com)
🔗 LinkedIn: [https://www.linkedin.com/in/yashrana52](https://www.linkedin.com/in/yashrana52)
💻 GitHub: [https://github.com/YashRana52](https://github.com/YashRana52)

---

⭐ If you found this project useful, don’t forget to star the repository!
