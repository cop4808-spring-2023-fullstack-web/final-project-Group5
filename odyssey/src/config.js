import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCQ8D1f4KGe-sQsG8_EHe-ThndkZ0K0GoY",
  authDomain: "odyssey-19ee4.firebaseapp.com",
  projectId: "odyssey-19ee4",
  storageBucket: "odyssey-19ee4.appspot.com",
  messagingSenderId: "866465891561",
  appId: "1:866465891561:web:a82487a2699a86fbe69c78",
  measurementId: "G-ENQ9D0FNF9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;
