import { createContext, useState, useContext, useEffect } from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithRedirect, signOut } from "firebase/auth";
import { query, where, getDocs, collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSignUpPrompt, setShowSignUpPrompt] = useState(false);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithRedirect(auth, provider);
    const user = userCredential.user;

    // Add the user to Firestore after successful sign-up
    await addDoc(collection(db, "users"), {
      email: user.email,
      name: user.displayName,
    });

    setCurrentUser(user);
  };

  const logout = () => signOut(auth);

  useEffect(() => {
    const checkIfUserIsAuthorized = async (user) => {
      if (user) {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", user.email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          setCurrentUser(user);
        } else {
          logout();  // If user is not authorized, logout
          setCurrentUser(null); // Reset to null for safety
          setShowSignUpPrompt(true);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      checkIfUserIsAuthorized(user);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, signInWithGoogle, logout }}>
      {!loading && children}
      {showSignUpPrompt && (
        <div className="signup-modal modal-box py-5 px-5">
          <p>You are not authorized. Please sign up to continue.</p>
          <button onClick={signInWithGoogle}>Sign Up with Google</button>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
