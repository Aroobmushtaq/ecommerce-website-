# 🛒 Ecomrace – Ecommerce Web Application

**Ecomrace** is a full-stack e-commerce website built with React.js, Redux Toolkit, Firebase (Firestore + Auth), and Tailwind CSS. The app includes separate admin and user dashboards with functionality for orders, products, messages, and authentication.

---

## 🚀 Features

### 👤 User Side
- User signup/login (Firebase Authentication)
- Browse product listings
- Add to cart, view cart
- Checkout with order form (name, phone, address)
- Order confirmation page

### 🛠️ Admin Side
- Admin login
- Dashboard with stats: total products, total orders, messages
- Product management: add, update, delete
- View all orders 
- View and delete user messages

---

## 🔧 Technologies

- **Frontend:** React.js, Redux Toolkit, Tailwind CSS
- **Backend:** Firebase Firestore (NoSQL database)
- **Authentication:** Firebase Auth
- **Notifications:** React Hot Toast
- **Routing:** React Router DOM

---
## 🛠️ Setup Instructions
- 1 Clone the repo:
```bash 
git clone https://github.com/Aroobmushtaq/ecommerce-website-
```

- 2 Install dependencies:
```bash
npm install
```
- 3 Add your Firebase config to .env

Create a `.env` file in the root (not inside `/src`) with:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

- 4 Start the app:
```bash
npm start
```
👉 [Visit the Live Website](http://magical-lokum-addf92.netlify.app/)