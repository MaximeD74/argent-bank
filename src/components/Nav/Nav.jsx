import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import argentBankLogo from '../../img/argentBankLogo.webp';
import './nav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { logout } from '../../redux/authReducer';

const Navigation = () => {
  let { authToken, userName } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (!authToken) {
    authToken = localStorage.getItem('authToken');
  }

  const handleSignOut = () => {
    localStorage.removeItem('authToken');
    dispatch(logout());
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      {authToken ? (
        <div className="sign-out">
          <Link className="main-nav-item" to="/profile">
            <FontAwesomeIcon
              icon={faCircleUser}
              className="sign-in-icon nav-sign-in-icon"
            />
            {userName}
          </Link>
          <Link className="main-nav-item" to="/" onClick={handleSignOut}>
            <FontAwesomeIcon
              icon={faRightFromBracket}
              className="sign-in-icon nav-sign-in-icon"
            />
            Sign Out
          </Link>
        </div>
      ) : (
        <div className="sign-in">
          <Link className="main-nav-item" to="/signin">
            <FontAwesomeIcon
              icon={faCircleUser}
              className="sign-in-icon nav-sign-in-icon"
            />
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navigation;