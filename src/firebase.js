
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {

    apiKey: "AIzaSyDRcm0fkubqq7mIJ8sdgO7dZ1OfvO4X5jk",
  
    authDomain: "react-ecommerce-23cb4.firebaseapp.com",
  
    projectId: "react-ecommerce-23cb4",
  
    storageBucket: "react-ecommerce-23cb4.appspot.com",
  
    messagingSenderId: "673431008697",
  
    appId: "1:673431008697:web:f594f671ec562819cd3268"
  
  };
  
  
  // Initialize Firebase
  
  const app = initializeApp(firebaseConfig);
 
  export const auth = getAuth(app);

  export const provider = new GoogleAuthProvider(app);