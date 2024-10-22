import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import * as api from "../utils/api";
import { setToken, getToken } from "../utils/token";
import Ducks from "./Ducks";
import Login from "./Login";
import MyProfile from "./MyProfile";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from '../utils/auth';
import "./styles/App.css";

function App() {
  const [userData, setUserData] = useState({ username: "", email: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();

  const handleLogin = ({ username, password }) => {
    if (!username || !password) {
      return;
    }
    auth
      .authorize(username, password)
      .then((data) => {
        // Verify that a jwt is included before logging the user in.
        if (data.jwt) {
          setToken(data.jwt);
          setUserData(data.user);  // save user's data to state
          setIsLoggedIn(true);    // log the user in
          // After login, instead of navigating always to /ducks, 
          // navigate to the location that is stored in state. If
          // there is no stored location, we default to 
          // redirecting to /ducks.
          const redirectPath = location.state?.from?.pathname || "/ducks";
          navigate(redirectPath);
        }
      })
      .catch(console.error);
  };

  const handleRegistration = ({
    username,
    email,
    password,
    confirmPassword,
  }) => {
    if (password === confirmPassword) {
      auth.register(username, password, email)
       .then(() => {
        navigate("/login");
       })
        .catch(console.error);
    }
  };

  useEffect(() => {
    const jwt = getToken();
      
    if (!jwt) {
      return;
    }
    api
    .getUserInfo(jwt)
    .then(({ username, email }) => {
      // If the response is successful, log the user in, save their 
      // data to state, and navigate them to /ducks.
      setIsLoggedIn(true);
      setUserData({ username, email });
      navigate("/ducks");
    })
    .catch(console.error);
  }, []);

  return (
    <Routes>
      <Route 
        path="/ducks" 
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn} >
            <Ducks />
          </ProtectedRoute>} />
      <Route 
        path="/my-profile" 
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn} >
            <MyProfile userData={userData}/>
          </ProtectedRoute>} />
      <Route
        path="/login"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn} anonymous >
            <div className="loginContainer">
              <Login  handleLogin={handleLogin} />
            </div>
          </ProtectedRoute>

          
        }
      />
      <Route
        path="/register"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn} anonymous >
            <div className="registerContainer">
              <Register handleRegistration={handleRegistration} />
            </div>
          </ProtectedRoute>
          
        }
      />
      <Route 
        path="*" 
        element = {
          isLoggedIn ? (
            <Navigate to="/ducks" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}

export default App;
