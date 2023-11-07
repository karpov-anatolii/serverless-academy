import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAll } from '../../action/json';
import './json.scss';
import FileUploadForm from '../fileUploadForm/FileUploadForm';
import { useState } from 'react';
import { API_URL } from '../../config';
import axios from 'axios';

const Json = () => {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.json.files);
  const [jsonContent, setJsonContent] = useState();

  const clickButtonHandler = async (filename) => {
    try {
      const response = await axios.get(
        `${API_URL}json/${filename.split('.')[0]}`
      );
      if (response.data.file) {
        setJsonContent(JSON.stringify(response.data.file));
      }
    } catch (err) {
      alert(err.response.data);
    }
  };

  useEffect(() => {
    dispatch(getAll());
  }, []);

  return (
    <>
      <div className="file_upload_form">
        <FileUploadForm />
      </div>
      <div className="json_container">
        {files && (
          <div>
            <ul>
              {files.map((file) => (
                <li key={file.name}>
                  <button
                    onClick={() => {
                      clickButtonHandler(file.name);
                    }}
                  >
                    {file.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {jsonContent && <div>{jsonContent}</div>}
    </>
  );
};

export default Json;
