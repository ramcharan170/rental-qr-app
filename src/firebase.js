import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBmfjOeEDlfXzdeH0ivT7_UZagsZ7S0n5Q",
  authDomain: "rental-qr-app.firebaseapp.com",
  projectId: "rental-qr-app",
  storageBucket: "rental-qr-app.firebasestorage.app",
  messagingSenderId: "14154877166",
  appId: "1:14154877166:web:5d6d9c606b9274450c4bff",
  databaseURL: "https://rental-qr-app-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);