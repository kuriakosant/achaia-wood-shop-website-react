# Achaia Wood Shop — Frontend

<div align="center">

![Achaia Wood Banner](https://achaiawood.gr/static/media/hero-background.1684d1e49854b77ee4f8.jpg)

**A modern, full-featured e-catalogue and order management platform for a Greek woodworking company.**

[![Live Site](https://img.shields.io/badge/🌐%20Live%20Site-achaiawood.gr-green?style=for-the-badge)](https://achaiawood.gr)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel)](https://vercel.com)

</div>

---

## 🌐 Live Application

> **[https://achaiawood.gr](https://achaiawood.gr)**

The application is live and fully operational. It serves as the primary digital presence for **ΑΝΤΩΝΙΑΔΗΣ ΕΠΕ**, a woodworking and materials supply company based in Patras, Greece, with over 30 years of experience.

---

## 📋 Table of Contents

- [Features](#-features)
- [Pages & Routes](#-pages--routes)
- [Admin Portal](#-admin-portal)
- [Category System](#-category-system)
- [Orders System](#-orders-system)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Local Development](#-local-development)
- [Environment Variables](#-environment-variables)

---

## ✨ Features

### Customer-Facing

| Feature | Description |
|---|---|
| **Animated Landing Page** | Hero section with dual CTAs, featured products carousel, company stats, partners, and contact section |
| **Βιομηχανική Ξυλεία Catalogue** | Full product catalogue for industrial wood, with 2-level category filtering, search, and sort |
| **Εκθεση - Gallery Catalogue** | Separate catalogue for gallery/showroom products with 3-level category system (including company/brand) |
| **Product Detail Pages** | Rich individual product pages with image gallery, specifications, and features |
| **Παραγγελία — Orders Page** | Customers can submit orders via an inline Excel editor (auto-exports `.xlsx`) or by uploading files |
| **About Page** | Company history, team, ESPA certification, and photo gallery |
| **Contact Page** | Full contact info with address, phones, fax, map, and email |
| **Fully Responsive** | Mobile-first design that works on all screen sizes |

### Technical Highlights

- **Image Compression** — all uploaded product images are automatically compressed (< 500KB) before upload via browser-side `browser-image-compression`
- **Inline Excel Editor** — the Order page includes a live spreadsheet editor using `xlsx` library that generates a proper `.xlsx` file matching the factory template
- **Framer Motion Animations** — smooth page transitions, staggered product card reveals, animated hero
- **Real-time Filtering** — category tree sidebar, company filter, search, and sort all update the product grid instantly

---

## 🗺️ Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Home | Landing page with hero, featured products, stats, partners |
| `/wood` | Βιομηχανική Ξυλεία | Wood products catalogue with 2-level categories |
| `/wood/:id` | Product Detail | Individual wood product detail page |
| `/gallery` | Εκθεση - Gallery | Gallery products catalogue with 3-level categories |
| `/gallery/:id` | Product Detail | Individual gallery product detail page |
| `/order` | Παραγγελία | Customer order submission form |
| `/about` | Η Εταιρεία | Company about page |
| `/contact` | Επικοινωνία | Contact information page |
| `/admin/login` | Admin Login | Hidden admin authentication |
| `/admin/dashboard` | Admin Dashboard | Full product and category management panel |

---

## 🔐 Admin Portal

The admin portal is accessed via `/admin/login` (linked discreetly in the page footer). It is protected by JWT authentication.

### Admin Dashboard Sections

#### 🌲 Shop Switcher
Select between managing **Βιομηχανική Ξυλεία** (Wood) or **Εκθεση - Gallery** products. The entire panel context — products, categories, and the edit modal — switches accordingly.

#### 📦 Products Tab
- View all products in a clean table with ID, name, and price
- ⭐ Toggle products as **Featured** (they appear on the Home page carousel instantly)
- ✏️ Edit product details — name, price, description, category (full cascading dropdowns), and manufacturer
- 🗑️ Delete products

#### 🗂️ Categories Tab
Displays the full hierarchical category tree:
- **Level 1** — Main Category (e.g. "Μελαμίνη")
- **Level 2** — Subcategory (e.g. "Μονόχρωμα")
- **Level 3** — Company / Brand (Gallery only, optional — e.g. "Kaindl")

Actions: Create, Edit, Delete any category at any level.

#### 📋 Orders Tab
View all customer submitted orders in a table. Each row shows:
- Date submitted
- Customer name, phone, payment method, document type
- Special instructions
- **Download button** for the attached Excel/image file
- **Status dropdown** to mark the order as `Εκκρεμεί`, `Σε Επεξεργασία`, or `Ολοκληρώθηκε`
- Delete button

---

## 🗂️ Category System

The two product catalogues use different category depths:

### Βιομηχανική Ξυλεία (Wood)
```
Main Category (Level 1)  ← mandatory
  └── Subcategory (Level 2)  ← mandatory
```

### Εκθεση - Gallery
```
Main Category (Level 1)  ← mandatory
  └── Subcategory (Level 2)  ← mandatory
        └── Εταιρεία / Brand (Level 3)  ← optional
```

Products are filtered by clicking any category node in the sidebar tree. Clicking a Level 1 category shows all products in that main category. Clicking Level 2 narrows to that specific subcategory. Clicking Level 3 filters to a specific company.

---

## 📦 Orders System

The **Παραγγελία** (`/order`) page allows customers to place orders without any payment processing — orders are structured contact requests.

### How it works

1. Customer fills in their name, phone, payment preference, and document type
2. They either:
   - Fill in the **inline Excel editor** (a live spreadsheet with all factory column headers: ΥΛΙΚΟ, ΜΗΚΟΣ, ΠΛΑΤΟΣ, ΤΕΜΑΧΙΑ, ΧΡΩΜΑ PVC, PVC fields × 4, ΠΑΡΑΤΗΡΗΣΕΙΣ)
   - Or upload their own file (`.xlsx`, `.pdf`, `.png`, `.jpg`)
3. On submit, the inline editor auto-generates a proper `.xlsx` file and sends it base64-encoded to the backend
4. The admin views it in the dashboard → **Orders Tab** and can download the file directly

The sidebar on the order page contains:
- A download link for the **Excel Template** (`ORDER-DEFAULT.xlsx`)
- Step-by-step **PVC notation instructions**
- Phone numbers for placing orders by call
- A highlighted **Bank Deposit** info box with company email and phone for getting bank account details

---

## 🛠️ Tech Stack

| Technology | Role |
|---|---|
| **React 18** | UI framework |
| **TypeScript** | Type safety |
| **Framer Motion** | Animations and transitions |
| **React Router v6** | Client-side routing |
| **Axios** | HTTP client for API calls |
| **xlsx (SheetJS)** | In-browser Excel file generation |
| **browser-image-compression** | Client-side image compression before upload |
| **Lucide React** | SVG icon library |
| **clsx + tailwind-merge** | Conditional class utilities |
| **Vercel** | Deployment and CDN |

> ⚠️ Note: While Tailwind CSS class names are used in this project, the core design system was built using custom utility patterns for maximum control.

---

## 📁 Project Structure

```
src/
├── assets/              # Static images, logos, Excel template
├── components/
│   ├── Header.tsx       # Navigation bar with mobile menu
│   ├── Footer.tsx       # Site footer with links and contact
│   ├── ProductCard.tsx  # Reusable product card
│   ├── ProductDetail.tsx # Full-screen product detail component
│   └── ui/
│       ├── Button.tsx
│       └── SearchBar.tsx
├── pages/
│   ├── Home.tsx              # Landing page
│   ├── ProductsWoodPage.tsx  # Βιομηχανική Ξυλεία catalogue
│   ├── ProductsGalleryPage.tsx # Εκθεση - Gallery catalogue
│   ├── OrderPage.tsx         # Customer order submission
│   ├── AboutPage.tsx
│   ├── ContactPage.tsx
│   ├── AdminLogin.tsx
│   ├── AdminDashboard.tsx    # Full admin panel
│   └── AddProductPage.tsx    # New product creation form
├── utils/
│   └── imageCompression.ts  # Browser-side image compression helper
└── App.tsx                   # Routes definition
```

---

## 💻 Local Development

```bash
# 1. Clone the repository
git clone https://github.com/kuriakosant/achaia-wood-shop-website-react.git
cd achaia-wood-shop-website-react

# 2. Install dependencies
npm install

# 3. Create environment file
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# 4. Start the development server
npm start
```

The app will be available at `http://localhost:3000`.

> 💡 You also need the backend API running locally — see [achaia-wood-api](https://github.com/kuriakosant/achaia-wood-api).

---

## 🔧 Environment Variables

| Variable | Description | Example |
|---|---|---|
| `REACT_APP_API_URL` | Base URL of the backend API | `https://achaia-wood-api.vercel.app/api` |

---

## 📄 License

This project is licensed under a custom license. Users must credit **KYRIAKOS ANTONIADIS** for any use of the software. Commercial use is not permitted without explicit permission.

See `LICENSE` for full details.