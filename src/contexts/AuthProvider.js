import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';

export const AuthContext =createContext()
const auth =getAuth(app);

const AuthProvider = ({children}) => {
  const [user, setUser] =useState(null);
  const [loading, setLoading] =useState(true);

  // Create a new user with email and password>>>>>>
  const creatUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  }

// SignIn with email and password >>>
const signIn = (email, password) => {
  setLoading(true)
  return signInWithEmailAndPassword(auth, email, password);
}

// Update User Profiles >>>
const updateUser = (userInfo) => {
  return updateProfile(auth.currentUser, userInfo);
}

// Sign Out >>>

const logOut = () => {
  setLoading(true)
  return signOut(auth)
}

// Obgerber state change set
useEffect( () => {
  const unsubsribe = onAuthStateChanged(auth, currentUser => {
    // console.log("User observing");
    setUser(currentUser)
    setLoading(false)
  })
  return () => unsubsribe()
}, [])

// all information pase in Auth
  const authInfo ={
    user,
    creatUser,
    updateUser,
    signIn,
    logOut,
    loading
  }
  return (
    <AuthContext.Provider value={authInfo}>
     
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;