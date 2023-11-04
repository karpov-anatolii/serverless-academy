import React from 'react';
import './navbar.scss';
import { NavLink } from 'react-router-dom';
import { logout } from '../../reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
  const isAuth = useSelector((state) => state.user.isAuth);

  const dispatch = useDispatch();

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo-block">
          <div className="container2">
            <a href={process.env.REACT_APP_SITE_ROOT} className="header">
              AUTH API
            </a>
          </div>
        </div>
        <div className="auth-block">
          {!isAuth && (
            <div className="login">
              <NavLink to="/login">Sigh-in</NavLink>
            </div>
          )}

          {!isAuth && (
            <div className="registration">
              <NavLink to="/registration">Sign-up</NavLink>
            </div>
          )}

          {isAuth && (
            <div className="login" onClick={() => dispatch(logout())}>
              Exit
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
