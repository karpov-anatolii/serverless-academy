const SET_USER = 'SET_USER';
const SET_ME = 'SET_ME';
const LOGOUT = 'LOGOUT';
const SET_ACCESSTOKEN = 'SET_ACCESSTOKEN';
const SET_JWT = 'SET_JWT';

const defaultState = {
  currentUser: {},
  isAuth: false,
  me: null,
  accessToken: null,
  jwt: null,
};

export default function userReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload,
        isAuth: true,
      };

    case SET_ME:
      return {
        ...state,
        me: action.payload,
      };

    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        currentUser: {},
        isAuth: false,
        me: null,
      };

    case SET_ACCESSTOKEN:
      return {
        ...state,
        accessToken: action.payload,
      };

    case SET_JWT:
      return {
        ...state,
        jwt: action.payload,
      };

    default:
      return state;
  }
}

export const setUser = (user) => ({ type: SET_USER, payload: user });
export const setMe = (data) => ({ type: SET_ME, payload: data });
export const logout = () => ({ type: LOGOUT });
export const setAccessToken = (token) => ({
  type: SET_ACCESSTOKEN,
  payload: token,
});
export const setJWT = (jwt) => ({
  type: SET_JWT,
  payload: jwt,
});
