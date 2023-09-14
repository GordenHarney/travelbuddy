import axios from "axios";

// Function to handle user signup
async function handleSignup(username, password) {
  const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;
  const endpoint = `${backendUrl}/signup`;
  const payload = {
    username: username,
    password: password,
  };

  try {
    const response = await axios.post(endpoint, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = response.data;

    if (data.message) {
      alert(data.message); // Display success message
    } else if (data.error) {
      alert(data.error); // Display error message
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Please try again.");
  }
}

// Function to handle user login
async function handleLogin(username, password) {
  const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;
  const endpoint = `${backendUrl}/login`;
  const payload = {
    username: username,
    password: password,
  };

  try {
    const response = await axios.post(endpoint, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = response.data;
    console.log(data?.isVerified);
    console.log(data);

    if (data.message) {
      return { success: true, needsVerification: !data?.isVerified };
    } else if (data.error) {
      return { success: false, error: data.error };
    }
  } catch (error) {
    alert("Invalid Credentials!");
    return { success: false, error: "An error occurred. Please try again." };
  }
}
export { handleSignup, handleLogin };
