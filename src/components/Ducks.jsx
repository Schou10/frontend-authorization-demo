import { useContext } from "react";
import NavBar from "./NavBar";
import DuckList from "./DuckList";
import AppContext from "../context/AppContext";

function Ducks() {
  const setIsLoggedIn = useContext(AppContext)
  return (
    <>
      <NavBar />
      <DuckList />
    </>
  );
}

export default Ducks;
