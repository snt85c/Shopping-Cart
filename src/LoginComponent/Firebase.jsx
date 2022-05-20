import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {

  apiKey: "AIzaSyDkh-I0_881z2GYyPNHCOpkiG2WNEkrpSs",

  authDomain: "shopping-cart-4bffc.firebaseapp.com",

  projectId: "shopping-cart-4bffc",

  storageBucket: "shopping-cart-4bffc.appspot.com",

  messagingSenderId: "259691318823",

  appId: "1:259691318823:web:61965fbe8bc2faa8394802"

};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

