
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

export const firebaseConfig = {
  apiKey: "AIzaSyDp-1ia_ZKrZPkHR9s6IfrHHwrA_-VbyTo",
  authDomain: "ecom-e130a.firebaseapp.com",
  projectId: "ecom-e130a",
  storageBucket: "ecom-e130a.appspot.com",
  messagingSenderId: "315404840607",
  appId: "1:315404840607:web:823a6873e4fee646f73caa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;