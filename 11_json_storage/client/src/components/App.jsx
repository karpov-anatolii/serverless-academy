import React, { useEffect } from 'react';
import Navbar from './navbar/Navbar';
import './app.scss';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Registration from './authorization/Registration';
import Login from './authorization/Login';
import { useSelector } from 'react-redux';
import Json from './json/Json';
import { refreshTokens } from '../action/user';

function App() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const accessToken = useSelector((state) => state.user.accessToken);

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (accessToken) {
        const nowInSeconds = Math.floor(Date.now() / 1000);
        const timeLeft = accessToken.exp - nowInSeconds;
        // Если timeLeft меньше заданного порога (например, 60 секунд), обновляем токены
        if (timeLeft < 60) {
          refreshTokens();
        }
      }
    };

    checkTokenExpiration();
  }, [accessToken]);

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <div
          className="wrap"
          style={{ justifyContent: isAuth ? 'start' : 'center' }}
        >
          {!isAuth ? (
            <Routes>
              <Route path="/registration" element={<Registration />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to={'/login'} />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<Json />} />
              <Route path="*" element={<Navigate to={'/'} />} />
            </Routes>
          )}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
