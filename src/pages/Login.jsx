import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { currentUser, signInWithAPI, logout } = UserAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginClick = async (e) => {
    e.preventDefault();
    try {
      const response = await signInWithAPI(username, password);
      console.log(response)
      console.log(response?.needsVerification)
      if (response && response?.needsVerification && response?.success) {
        navigate("/verify");
      } else {
        navigate("/landing");
      }
    } catch (error) {
      alert(error.message || "An error occurred. Please try again.");
      logout();
    }
  };

  const handleSignUpButton = () => {
    navigate("/signup");
  }

  useEffect(() => {
    if (currentUser) {
      navigate("/landing");
    }
  }, [currentUser]);

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Login</h1>
          <div className="containerWrap py-6">
            <form className="form-control" onSubmit={handleLoginClick}>
              <input
                className="input input-bordered input-accent"
                type="email"
                placeholder="Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="input input-bordered input-accent"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="btn btn-neutral">
                Login
              </button>
            </form>
          </div>
          <button
            onClick={handleSignUpButton}
            type="submit"
            className="btn btn-neutral"
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
