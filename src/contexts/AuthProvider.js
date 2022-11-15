import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import app from '../firebase/firebase.config';

export const AuthContext =createContext()
const auth =getAuth(app);

const AuthProvider = ({children}) => {
  const [user, setUser] =useState(null);

  // Create a new user with email and password>>>>>>
  const creatUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }

// SignIn with email and password >>>
const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
}

// Obgerber state change set
useEffect( () => {
  const unsubsribe = onAuthStateChanged(auth, currentUser => {
    console.log("User observing");
    setUser(currentUser)
  })
  return () => unsubsribe()
}, [])

// all information pase in Auth
  const authInfo ={
    user,
    creatUser,
    signIn
  }
  return (
    <AuthContext.Provider value={authInfo}>
     
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;