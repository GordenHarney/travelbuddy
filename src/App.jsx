import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import ChatRoom from "./pages/ChatRoom";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./routes/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Verification from "./pages/Verification";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route
          path="/Landing"
          element={
            <PrivateRoute>
              <Landing />
            </PrivateRoute>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<Verification />} />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <ChatRoom />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
