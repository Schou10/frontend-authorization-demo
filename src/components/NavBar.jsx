import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import Logo from "./Logo";
import AppContext from "../context/AppContext";
import "./styles/NavBar.css";

function NavBar() {
  const { setIsLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();
  // The signOut function removes the token from local
  // storage, sends them back to the login page, and 
  // sets isLoggedIn to false.
  function signOut() {
    removeToken();
    navigate("/login");
    setIsLoggedIn(false);
  }
  


  return (
    <div className="navbar">
      <div className="navbar__logo">
        <Logo />
      </div>
      <ul className="navbar__nav">
        <li>
          <NavLink to="/ducks" className="navbar__link">
            Ducks
          </NavLink>
        </li>
        <li>
          <NavLink to="/my-profile" className="navbar__link">
            My Profile
          </NavLink>
        </li>
        <li>
          <button onClick= { signOut } className="navbar__link navbar__button">
            Sign Out
          </button>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
