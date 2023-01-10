import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
// Add Firebase products that you want to use
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js'

const firebaseConfig = {
  apiKey: "AIzaSyA5LOko7WeCidj4tKcIdCx3IoBCqSbYjTg",
  authDomain: "meeting-minutes-ginahend94.firebaseapp.com",
  projectId: "meeting-minutes-ginahend94",
  storageBucket: "meeting-minutes-ginahend94.appspot.com",
  messagingSenderId: "1013743673744",
  appId: "1:1013743673744:web:e4609e3f52300e437c1315"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { auth };
