import firebaseConfig from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  deleteUser,
  onAuthStateChanged,
  initializeAuth,
  getReactNativePersistence,
  signOut,
  getUser,
} from "firebase/auth";

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";

export const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const register = (email, pass, name) => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        const user = userCredential.user;
        const profilePromise = updateProfile(user, {
          displayName: name,
        });
        Promise.all([profilePromise])
          .then(() => {
            resolve({ success: true, errorMsg: "" });
          })
          .catch((error) => {
            deleteUser(user)
              .then(() => {
                reject({
                  success: false,
                  errorMsg: "Failed to set display name. User deleted.",
                });
              })
              .catch((deleteError) => {
                reject({
                  success: false,
                  errorMsg: "Failed to set display name. Error deleting user. ",
                });
              });
          });
      })
      .catch((error) => {
        reject({ success: false, errorMsg: error.message });
      });
  });
};

export const login = (email, pass) => {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        const user = userCredential.user;
        resolve({ success: true, errorMsg: "" });
      })
      .catch((error) => {
        const errorMessage = error.message;
        reject({ success: false, errorMsg: errorMessage });
      });
  });
};
export const getUserState = (callback) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      const displayName = user.displayName || "";
      callback({ state: "Home", displayName: displayName });
      // callback("Home");
    } else {
      // callback("Auth");
      callback({ state: "Auth", displayName: "" }); // User not signed in, no display name
    }
  });

  // Return the unsubscribe function to allow cleanup
  return unsubscribe;
};
export const logout = (navigation) => {
  signOut(auth)
    .then(() => {
      console.log("User signed out successfully");
      navigation.navigate("Auth", { loggedOut: true });
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
};
