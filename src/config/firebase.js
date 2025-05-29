import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyD1XfqYPIFw7J_umv0tPFbfTr11Qqs_UXc",
  authDomain: "ecommraceweb.firebaseapp.com",
  projectId: "ecommraceweb",
  storageBucket: "ecommraceweb.firebasestorage.app",
  messagingSenderId: "1069128043192",
  appId: "1:1069128043192:web:b209c9f6c1675ec7ee424d",
  measurementId: "G-NZ9DP0Y39H"
};
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
export const auth=getAuth(app)