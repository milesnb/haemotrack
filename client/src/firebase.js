import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDziNE5-56Lz1F85RIAC9BvTJ08aUjW1T0",
    authDomain: "haemotrack.firebaseapp.com",
    projectId: "haemotrack",
    storageBucket: "haemotrack.firebasestorage.app",
    messagingSenderId: "938110999270",
    appId: "1:938110999270:web:baba73ecaab8b899757927"
};
  
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
