import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBFt2mkUSfwohlefGrmeuSUnjxWLIY6cPI",
  authDomain: "islammax-a909e.firebaseapp.com",
  projectId: "islammax-a909e",
  storageBucket: "islammax-a909e.firebasestorage.app",
  messagingSenderId: "246519768172",
  appId: "1:246519768172:web:cbef86c9d333d0753ca449",
  measurementId: "G-1RRFDJ0LKL"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);

// تصدير الخدمات لاستخدامها في باقي الملفات
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;