import axios from 'axios';
import { API_URL } from '../config';
import {
  setUser,
  setMe,
  setAccessToken,
  setJWT,
} from '../reducers/userReducer';

axios.defaults.withCredentials = true;

function generateFingerprint() {
  const fingerprint = `${navigator.userAgent} ${
    navigator.language
  } ${new Date().getTimezoneOffset()}`;
  return btoa(fingerprint); // кодирование в base64 для безопасности
}

function payloadDecoder(token) {
  const payloadBase64 = token.split('.')[1];
  const decodedPayload = atob(payloadBase64);
  return JSON.parse(decodedPayload);
}

export const registration = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API_URL}auth/sign-up`, {
        email,
        password,
        fingerprint: generateFingerprint(),
      });

      const payloadObject = payloadDecoder(response.data.token);

      dispatch(setAccessToken(payloadObject));
      dispatch(setJWT(response.data.token));
      dispatch(setUser(response.data.user));
    } catch (err) {
      alert(err.response.data);
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API_URL}auth/sign-in`, {
        email,
        password,
        fingerprint: generateFingerprint(),
      });
      const payloadObject = payloadDecoder(response.data.token);
      dispatch(setAccessToken(payloadObject));
      dispatch(setJWT(response.data.token));
      dispatch(setUser(response.data.user));
    } catch (err) {
      alert(err.response.data);
    }
  };
};

export const refreshTokens = () => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API_URL}auth/refresh-tokens`, {
        fingerprint: generateFingerprint(),
      });
      const payloadObject = payloadDecoder(response.data.token);
      dispatch(setAccessToken(payloadObject));
    } catch (err) {
      alert(err.response.data);
    }
  };
};

export const me = (jwt) => {
  console.log('accessToken=', jwt);
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}me`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          Accept: 'application/json',
        },
      });
      if (response.data.user) {
        dispatch(setMe(response.data.data));
      }
    } catch (err) {
      alert(err.response.data);
    }
  };
};
