import { useState } from "react";
import { handleSignup } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleSignup(username, password);
    navigate("/login");
  };

  const handleLoginButton = () => {
    navigate("/login");
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Sign Up</h1>
          <div className="containerWrap py-8">
            <form className="form-control" onSubmit={handleSubmit}>
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
                Sign Up
              </button>
            </form>
          </div>
          <button
            onClick={handleLoginButton}
            type="submit"
            className="btn btn-neutral"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
