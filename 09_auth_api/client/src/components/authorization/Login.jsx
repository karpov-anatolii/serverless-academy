import React from 'react';
import './authorization.scss';
//import Input from "../../utils/input/Input";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../action/user';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="authorization">
      <div className="header">Authorization</div>
      <input type="text" value={email} onChange={handleEmailChange} />

      <input type="password" value={password} onChange={handlePasswordChange} />

      <button className="btn" onClick={() => dispatch(login(email, password))}>
        Login
      </button>
    </div>
  );
};

export default Login;
