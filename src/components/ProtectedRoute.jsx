import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AppContext from "../context/AppContext";

// New prop - anonymous. This prop will be used to indicate routes
// that can be visited anonymously (i.e., without authorization). 
// The two 'anonymous' routes in this application are /register 
// and /login.
export default function ProtectedRoute({
  children,
  anonymous = false,
}) { 
  const location = useLocation();
  const from = location.state?.from || "/";

  const { isLoggedIn } = useContext(AppContext);
  
  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  
  return children;
}