# ASMA Kitchens - Company Website

A modern, responsive portfolio website for **ASMA Kitchens**, a kitchen design and interior solutions company.

---

## 🔍 Overview

This project provides a clean, high-performance frontend built with **Next.js App Router** and **Tailwind CSS**, showcasing ASMA Kitchens' services and project gallery. It's designed with scalability and maintainability in mind, using modern React features and best practices.

---

## ⚙️ Tech Stack

- **Next.js 13+** (App Router)
- **React (Hooks)**
- **TypeScript**
- **Tailwind CSS**
- **ESLint**

---

## 🖥️ Features

- Fully responsive layout
- Modular and reusable components
- Fast performance and optimized routing
- Clean, maintainable codebase with TypeScript
- Organized folder structure for scalability

---

## 📁 Folder Structure (src)

```txt
src/
├── app/                      # Pages and routing (Next.js App Router)
│   ├── (routes)/             # Project routes
│   │   ├── About/
│   │   ├── AdminDashboard/
│   │   ├── Book-now/
│   │   ├── Contact/
│   │   ├── ContactUs/
│   │   ├── Dashboard/
│   │   ├── Design-gallery/
│   │   ├── privacy-policy/
│   │   ├── Request-design/
│   │   ├── Services/
│   │   └── terms-of-service/
│   ├── layout.tsx            # Main layout
│   ├── metadata.ts           # Page metadata for SEO
│   └── page.tsx              # Default homepage
├── components/               # Reusable UI components
│   ├── about/
│   ├── book-now/
│   ├── dashboard/
│   ├── gallery/
│   ├── home/
│   ├── login/
│   ├── providers/
│   ├── request-design/
│   ├── services/
│   └── shared/
├── context/                  # React Context for global state
├── lib/                      # Utility functions and API logic
├── middleware.ts             # Next.js middleware
├── styles/                   # Global and theme styles
│   ├── global.css
│   └── theme.css
├── translations/             # i18n or localization support (if any)
├── types/                    # TypeScript types
└── utils/                    # Utility/helper functions
🛠️ Getting Started
To run the project locally:

bash
نسخ
تحرير
git clone https://github.com/AhmedEmad-21/ASMA-Project.git
cd ASMA-Project
npm install
npm run dev
Then open http://localhost:3000 in your browser.

🔗 Live Demo
You can view the live version of the website here:

https://asma-project.vercel.app

yaml
نسخ
تحرير
