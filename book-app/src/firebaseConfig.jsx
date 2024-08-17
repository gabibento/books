import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD1Wnka3XLVbq6FNWajxrIvGa4dZ6B0jaA",
    authDomain: "book-9f561.firebaseapp.com",
    projectId: "book-9f561",
    storageBucket: "book-9f561.appspot.com",
    messagingSenderId: "66074156760",
    appId: "1:66074156760:web:89997bc6e435fcfdb401ad",
    measurementId: "G-Y6P4FT7VGX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };