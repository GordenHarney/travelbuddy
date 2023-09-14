import { useState } from "react";
import axios from "axios";
import { UserAuth } from "../context/AuthContext"; // Import the UserAuth hook
import { useNavigate } from "react-router-dom";

const Verification = () => {
  const { currentUser } = UserAuth(); // Destructure the necessary values/functions from the context
  const [username, setUsername] = useState(currentUser || ""); // Set the initial value to the current user if available
  const [password, setPassword] = useState(currentUser || "");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;

  const handleVerification = async () => {
    try {
      const response = await axios.post(`${backendUrl}/verify`, {
        username: username,
        code: code,
      });
      setMessage(response.data.message);

      // If the email is verified successfully, sign the user in
      if (response.data.message === "Email verified successfully!") {
         navigate("/landing");
      }
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  const handleResendVerification = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/resend_verification`,
        {
          username: username,
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Email Verification</h1>
          <div className="containerWrap py-8">
            <div className="form-control">
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
              <input
                className="input input-bordered input-accent"
                type="text"
                placeholder="Verification Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <button onClick={handleVerification} className="btn btn-neutral">
                Verify
              </button>
              <button
                onClick={handleResendVerification}
                className="btn btn-neutral"
              >
                Resend Verification Code
              </button>
            </div>
          </div>
          {message && <p className="text-center">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Verification;
