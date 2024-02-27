import React, { useContext, useEffect, useState } from "react";
import { auth } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
<<<<<<< HEAD
=======
  const [userLoggedIn, setUserLoggedIn] = useState(false);
>>>>>>> 31380f2b522a9cb3e97d9e2dfd5c54404dc9972e
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  async function initializeUser(user) {
    if (user) {
<<<<<<< HEAD
      setCurrentUser(user); // Set current user
    } else {
      setCurrentUser(null);
=======
      setCurrentUser({ ...user });
      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
>>>>>>> 31380f2b522a9cb3e97d9e2dfd5c54404dc9972e
    }
    setLoading(false);
  }

  const value = {
    currentUser,
<<<<<<< HEAD
    userId: currentUser ? currentUser.uid : null, // Set userId from currentUser's uid
=======
    userLoggedIn,
>>>>>>> 31380f2b522a9cb3e97d9e2dfd5c54404dc9972e
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
