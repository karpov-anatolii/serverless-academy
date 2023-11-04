import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { me } from '../../action/user';
import '../app.scss';

const Me = () => {
  const dispatch = useDispatch();
  const meState = useSelector((state) => state.user.me);
  const jwt = useSelector((state) => state.user.jwt);

  return (
    <div className="me-container">
      <button className="btn_me " onClick={() => dispatch(me(jwt))}>
        About me
      </button>
      {meState && <div>{JSON.stringify(meState)}</div>}
    </div>
  );
};

export default Me;
