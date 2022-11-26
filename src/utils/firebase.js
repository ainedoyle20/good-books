import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, 
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "goodbooks-66352.firebaseapp.com",
  projectId: "goodbooks-66352",
  storageBucket: "goodbooks-66352.appspot.com",
  messagingSenderId: "1058742778624",
  appId: "1:1058742778624:web:4a39dd7259e698b0c811e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, onAuthStateChanged };

export const createUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const { displayName, uid, photoURL } = userCredential.user;
    return { displayName, uid, photoURL };
  } catch (error) {
    console.log("Error creating firebase user: ", error);
  }
}

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const { displayName, uid, photoURL } = userCredential.user;
    return { displayName, uid, photoURL };
  } catch (error) {
    if (error.code  === "auth/wrong-password") {
      alert("Incorrect password, please try again.");
    } else if (error.code === "auth/user-not-found") {
      alert("No user with this email was found. Please make sure the email you have entered is correct. If you do not have an account please sign up.");
    } else {
      alert("Incorrect details please try again");
    }

    window.location.reload();
  }
}

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const { displayName, uid, photoURL } = result.user;
    return { displayName, uid, photoURL };
  } catch (error) {
    console.log("Error logging in with google provider: ", error);
  }
}

export const logout = async () => {
  try {
    await signOut(auth);
    console.log("logout successful");
  } catch (error) {
    console.log("Error logging out firebase user: ", error);
  }
}
