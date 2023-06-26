import React, {useContext} from 'react';
import logo from '../assets/banana-01.png';
import { useNavigate, Link } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";

function NavBar() {
  const navigate = useNavigate();
  const { isAuth, toggleIsAuth, login, logout, signInPage } = useContext(AuthContext);

  return (
    <nav>
        <Link to="/">
          <span className="logo-container">
            <img src={logo} alt="logo"/>
            <h3>
              Banana Security
            </h3>
          </span>
        </Link>

      <div>
        <button
          type="button"
          onClick={isAuth ? logout : () => navigate('/login')}
        >
          {isAuth ? "Log out" : "Log in"}
        </button>
        { !isAuth && (
            <button
              type="button"
              onClick={() => navigate('/register')}
        >
            Registreren
            </button>
            )}
      </div>
    </nav>
  );
}

export default NavBar;