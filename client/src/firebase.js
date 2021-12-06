
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseApp = initializeApp({
    apiKey: "AIzaSyB6AhqnUd9Hg3nq6nQ23bog3S0fZQBJxjc",
    authDomain: "ecommerce-9e9a7.firebaseapp.com",
    projectId: "ecommerce-9e9a7",
    storageBucket: "ecommerce-9e9a7.appspot.com",
    messagingSenderId: "393993635696",
    appId: "1:393993635696:web:fe9914d07972ffae7571b5"
});



export const auth = getAuth(firebaseApp);
// export const googleAuthProvider = new auth.GoogleAuthProvider();