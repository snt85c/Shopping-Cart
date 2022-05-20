import { useEffect, useState } from "react";
import {
  // createUserWithEmailAndPassword,
  // signInWithEmailAndPassword,
  // signInAnonymously,
  // GithubAuthProvider,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "./Firebase";

export function LoginComponent(){

  const [user, setUser] = useState("");

  // function signInAnon() {
  //   return signInAnonymously(auth);
  // }

  // function signUp(email, password) {
  //   return createUserWithEmailAndPassword(auth, email, password);
  // }

  //  function logIn(email, password) {
  //   return signInWithEmailAndPassword(auth, email, password);
  // }

  // function GitHubSignIn() {
    // const githubAuthProvider = new GithubAuthProvider();
    // return signInWithPopup(auth, githubAuthProvider);
  // }

  function logout() {
    return signOut(auth);
  }

  //sign in with google
   function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return {googleSignIn,logout, user}

}

