// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mearn-real-state.firebaseapp.com",
  projectId: "mearn-real-state",
  storageBucket: "mearn-real-state.appspot.com",
  messagingSenderId: "533509419531",
  appId: "1:533509419531:web:c6970eedc334e83d804d0e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
