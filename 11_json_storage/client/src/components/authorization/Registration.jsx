import React from 'react';
import './authorization.scss';
//import Input from '../../utils/input/Input';
import { useState } from 'react';
import { registration } from '../../action/user';
import { useDispatch } from 'react-redux';

const Registration = () => {
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
      <div className="header">Registration</div>

      <input type="text" value={email} onChange={handleEmailChange} />

      <input type="password" value={password} onChange={handlePasswordChange} />

     

      <button
        className="btn"
        onClick={() => dispatch(registration(email, password))}
      >
        Enter
      </button>
    </div>
  );
};

export default Registration;
