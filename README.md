# DELIVERY-AHA-WED-APPLICATION

> **AHA Food Delivery — A Taste Above**: A luxury, full-stack food ordering and delivery web application built with modern React 19, Vite, and Tailwind CSS. Featuring multi-city location selection, dynamic restaurant catalogs, customizable dishes, real-time cart and checkout, animated order tracking, and a comprehensive user profile ecosystem.

[![React](https://img.shields.io/badge/React-19.0.0-61dafb.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646cff.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v3.4.17-38bdf8.svg)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.42.0-ff0055.svg)](https://www.framer.com/motion/)
[![Lucide Icons](https://img.shields.io/badge/Lucide-React-orange.svg)](https://lucide.dev/)

---

## 🌟 Overview & Highlights

**AHA Food Delivery** is an artisanal food delivery experience designed with warm gold accents, sleek obsidian dark-mode aesthetics, responsive micro-animations, and smooth transitions. 

From searching local restaurants across 12 Indian metropolitan hubs to live-tracking an order delivery with interactive milestones, AHA delivers an end-to-end e-commerce flow directly in the browser with reactive local persistence.

---

## 🚀 Key Features

### 📍 1. Multi-City & Location Intelligence
* **Location Modal**: Search and switch between major cities (Hyderabad, Visakhapatnam, Bengaluru, Mumbai, Delhi, Chennai, and more) and neighborhood micro-areas.
* **Geolocation Detection**: Fast browser geolocation simulation with automated fallback.
* **Saved Addresses**: Manage multiple delivery addresses (*Home*, *Work*, *Other*) with default selection.

### 🍽️ 2. Dynamic Discovery & Cuisines
* **Category Filtering**: Explore Biryanis, Wood-Fired Pizzas, Artisanal Burgers, South Indian Ghee Roasts, North Indian Curries, Himalayan Momos, Desserts, and Healthy Bowls.
* **Smart Search**: Real-time filtering by restaurant name, dish title, cuisine, price range, ratings, and pure-vegetarian toggle.
* **AHA Select & Featured Badges**: Curated highlights for top-rated dining spots.

### 🍱 3. Food Customization & Dining Trays
* **Dish Customizer**: Portion sizes (Half / Full / Family), spice levels, extra toppings, and special cooking instructions.
* **Interactive Cart Tray**: Real-time subtotal, GST calculation, dynamic delivery fee discounts, and coupon code redemptions.
* **Persistence**: Full local storage persistence across page reloads.

### 💳 4. Streamlined Checkout & Payment Simulator
* **Delivery Scheduling**: Instant delivery or scheduled time slots.
* **Payment Gateways**: UPI (GPay / PhonePe / Paytm / BHIM), Credit/Debit Cards, Net Banking, and Cash on Delivery (COD).
* **Celebration Flow**: High-energy confetti explosion ([canvas-confetti](https://www.npmjs.com/package/canvas-confetti)) on successful placement.

### 🛵 5. Real-Time Order Tracking & Management
* **Live Stepper**: Visual tracking from *Order Confirmed* ➔ *Cooking in Kitchen* ➔ *Driver Assigned* ➔ *Out for Delivery* ➔ *Delivered*.
* **Driver Intelligence**: Driver details, vehicle number, simulated live ETA countdown, and one-tap calling/support.
* **Order History & Invoices**: Detailed order receipts with itemized breakdown and re-order button.

### 👤 6. Account & Profile Hub
* **Authentication**: Simulated login, registration, password reset flows, and Protected Routes.
* **Favorites & Bookmarks**: Save preferred restaurants and signature dishes.
* **Reviews & Ratings**: Post star reviews and culinary feedback.
* **Notifications & Settings**: Granular push notification settings and dietary preferences.

---

## 📁 Repository Structure

```
.
├── index.html                  # HTML entry point
├── package.json                # Project dependencies and run scripts
├── vite.config.js              # Vite configuration with React plugin
├── tailwind.config.js          # Bespoke gold & obsidian theme configuration
├── postcss.config.js           # PostCSS Tailwind & Autoprefixer plugins
├── src/
│   ├── main.jsx                # React root mount
│   ├── App.jsx                 # Routing table & Context providers wrapper
│   ├── index.css               # Global styling, custom scrollbars & glassmorphism
│   ├── context/                # Global state management
│   │   ├── AuthContext.jsx     # User authentication and session
│   │   ├── CartContext.jsx     # Shopping cart state, coupons & item calculations
│   │   ├── LocationContext.jsx # Current city, selected address & GPS state
│   │   └── ToastContext.jsx    # Reactive notifications & alerts
│   ├── components/             # Reusable UI components
│   │   ├── common/             # Navbar, Footer, MobileNav, LocationModal, ProtectedRoute
│   │   └── cards/              # FoodCard, RestaurantCard, CategoryCard, CartItemCard
│   ├── pages/                  # 29 Application pages
│   │   ├── HomePage.jsx        # Landing hero, featured categories & top kitchens
│   │   ├── SearchPage.jsx      # Instant search with multi-faceted filtering
│   │   ├── RestaurantsPage.jsx # Restaurant listings & sort options
│   │   ├── CartPage.jsx        # Shopping cart view
│   │   ├── CheckoutPage.jsx    # Address confirmation & order summary
│   │   ├── PaymentPage.jsx     # Multi-method payment interface
│   │   ├── OrderTrackingPage.jsx # Live delivery progress stepper
│   │   └── ...                 # Profile, Addresses, Orders, Reviews, Auth pages
│   └── data/
│       ├── mockData.js         # Curated catalog of cities, restaurants, dishes & coupons
│       └── storage.js          # LocalStorage abstractions and data seeders
```

---

## 🛠️ Technology Stack

* **Frontend Framework**: [React 19](https://react.dev/)
* **Build Tooling**: [Vite 6](https://vitejs.dev/)
* **Routing**: [React Router DOM v7](https://reactrouter.com/)
* **Styling**: [Tailwind CSS v3](https://tailwindcss.com/) with `@tailwindcss/forms`
* **Icons**: [Lucide React](https://lucide.dev/)
* **Animations**: [Framer Motion](https://www.framer.com/motion/)
* **Visual Effects**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)

---

## ⚡ Getting Started

### 1. Prerequisites
* [Node.js](https://nodejs.org/) (version 18.0 or higher recommended)
* `npm` or `yarn`

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/tandyalamohan317-cmyk/DELIVERY-AHA-WED-APPLICATION.git
cd DELIVERY-AHA-WED-APPLICATION
npm install
```

### 3. Launch Development Server
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:5173
```

### 4. Build for Production
To generate a production-ready optimized build:
```bash
npm run build
```
To preview the production bundle locally:
```bash
npm run preview
```

---

## 📄 License
This project is open-source and available under the [MIT License](package.json).
