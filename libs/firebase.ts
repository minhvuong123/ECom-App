import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCkhKTmC8OwBWn631A_2zXc0ESzJPMW-s4",
  authDomain: "ecom-shop-3b43b.firebaseapp.com",
  projectId: "ecom-shop-3b43b",
  storageBucket: "ecom-shop-3b43b.appspot.com",
  messagingSenderId: "463514298122",
  appId: "1:463514298122:web:e3d7411c27c30997c93cf3"
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;