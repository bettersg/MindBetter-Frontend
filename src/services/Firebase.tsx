import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"


const firebaseConfig = {
    apiKey: process.env.REACT_APP_MINDBETTER_APIKEY,
    authDomain: process.env.REACT_APP_MINDBETTER_AUTHDOMAIN,
    projectId: process.env.REACT_APP_MINDBETTER_PROJECT_ID,
    storageBucket: process.env.REACT_APP_MINDBETTER_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MINDBETTER_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_MINDBETTER_APP_ID,
    measurementId: process.env.REACT_APP_MINDBETTER_MEASUREMENT_ID
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);