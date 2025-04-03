import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/AuthFiles/Login";
import Home from "./pages/AuthFiles/Home";
import EmailVerify from "./pages/AuthFiles/EmailVerify";
import ResetPassword from "./pages/AuthFiles/ResetPassword";
import Register from "./pages/AuthFiles/Register";
import AfterLoggedIn from "./pages/AuthFiles/AfterLoggedIn";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SetresetPassword from "./pages/AuthFiles/SetresetPassword";
import ProtectedRoute from "./components/protectedRoute";

function App() {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/email-verify"
          element={
            <ProtectedRoute>
              <EmailVerify />
            </ProtectedRoute>
          }
        />
        <Route
          path="/afterLoggedIn"
          element={
            <ProtectedRoute>
              <AfterLoggedIn />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/setResetPassword" element={<SetresetPassword />} /> */}
      </Routes>
    </div>
  );
}

export default App;
