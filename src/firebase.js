import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { setPersistence, browserLocalPersistence } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAmO0VsrVC9JaNEI15VxJj1eWm41eovO5g",
  authDomain: "chatbot-30264.firebaseapp.com",
  projectId: "chatbot-30264",
  storageBucket: "chatbot-30264.firebasestorage.app",
  messagingSenderId: "353621292019",
  appId: "1:353621292019:web:66b6f373f32f9e8b15d886",
  measurementId: "G-YL0FTZ77ZS"
};

const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence) .then(() => {
    // persistence set successfully
  })
  .catch((error) => {
    console.error("Auth persistence error:", error);
  });
export const googleProvider = new GoogleAuthProvider();