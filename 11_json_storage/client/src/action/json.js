import axios from 'axios';
import { API_URL } from '../config';
import { setFiles } from '../reducers/jsonReducer';

export const getAll = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}json`);
      if (response.data.files) {
        dispatch(setFiles(response.data.files));
      }
    } catch (err) {
      alert(err.response.data);
    }
  };
};

export const getFile = (filename) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}json/${filename}`);
      if (response.data.file) {
        dispatch(setFiles(response.data.files));
      }
    } catch (err) {
      alert(err.response.data);
    }
  };
};
