import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyACfnUs_HwhgiqGxAekTqSPaA9HlGrBZgM",
  authDomain: "personal-finance-tracker-e967a.firebaseapp.com",
  projectId: "personal-finance-tracker-e967a",
  storageBucket: "personal-finance-tracker-e967a.firebasestorage.app",
  messagingSenderId: "988757464179",
  appId: "1:988757464179:web:1b2beb69bcc00425d10606"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
