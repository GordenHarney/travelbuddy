import { createContext, useState, useContext, useEffect } from "react";
import { handleSignup, handleLogin } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSignUpPrompt, setShowSignUpPrompt] = useState(false);
  const navigate = useNavigate();

  const signUpWithAPI = async (username, password) => {
    try {
      await handleSignup(username, password);
      setCurrentUser(username); // Set the username as the current user after signup
      localStorage.setItem("currentUser", username); // Store the username in localStorage
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const signInWithAPI = async (username, password) => {
    try {
      const response = await handleLogin(username, password);
      if (response?.success) {
        setCurrentUser(username); // Set the username as the current user
        localStorage.setItem("currentUser", username); // Store the username in localStorage
      }
      console.log(response);
      console.log(response?.needsVerification);
      if (response?.success) {
        console.log();
        return {
          success: response?.success,
          needsVerification: response?.needsVerification,
        };
      }
    } catch (error) {
      console.error("Error:", error);
      return { error: error };
    }
  };

  const logout = () => {
    setCurrentUser(null); // Log out by setting user to null
    localStorage.removeItem("currentUser"); // Remove the user from localStorage
    navigate("/");
  };

  useEffect(() => {
    // Check if the user is already authenticated by looking in localStorage
    const loggedInUser = localStorage.getItem("currentUser");
    if (loggedInUser) {
      setCurrentUser(loggedInUser);
    }

    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, signInWithAPI, signUpWithAPI, logout }}
    >
      {!loading && children}
      {showSignUpPrompt && (
        <div className="signup-modal modal-box py-5 px-5">
          <p>You are not authorized. Please sign up to continue.</p>
          <button
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign Up
          </button>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
