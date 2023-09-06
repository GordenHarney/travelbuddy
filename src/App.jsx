import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import ChatRoom from "./pages/ChatRoom";
import { Route,Routes } from "react-router-dom";
import { PrivateRoute} from "./routes/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import Landing from "./pages/Landing";

function App() {
  return (
      <AuthProvider>
        <Navbar />
        <Routes>
        <Route path="/Landing" element={<PrivateRoute><Landing/></PrivateRoute>}/>
          <Route path="/" element={<Login />} />
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
