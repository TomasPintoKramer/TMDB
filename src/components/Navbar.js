import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../store/context/AuthContext";
import { useNavigate } from "react-router";
import { FaUser } from "react-icons/fa";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, toggleAuth, user } = useContext(AuthContext);
  const clickHandler = () => {
    toggleAuth(null);
    axios
      .post("api/users/logout")
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

  return (
    <nav className="navbar the" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/">
          <img
            className="navbar-item"
            width={"75%"}
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_1-8ba2ac31f354005783fab473602c34c3f4fd207150182061e425d366e4f34596.svg"
            alt="notfound"
          />
        </Link>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          {user && (
            <Link
              to={`/favourites/${user.id}`}
              className="navbar-item basefont"
            >
              Your collection
            </Link>
          )}
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {isAuthenticated ? (
                <>
                  <Link to={`/your_profile/${user.id}`}>
                    <FaUser className="datacolor" />
                    <strong className="basefont"> {user.name}</strong>
                  </Link>
                  <button onClick={clickHandler} className="button is-info">
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/signUp" className="button data is-primary">
                    <strong>Sign up</strong>
                  </Link>
                  <Link to="/logIn" className="base button is-light ">
                    Log in
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
