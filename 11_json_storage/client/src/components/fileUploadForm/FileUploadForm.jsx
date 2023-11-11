import React from 'react';
import axios from 'axios';
import { API_URL } from '../../config';
import { getAll } from '../../action/json';
import './fileUploadForm.scss';
import { useDispatch } from 'react-redux';

const FileUploadForm = () => {
  const dispatch = useDispatch();
  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = async function (event) {
        const jsonString = event.target.result;

        try {
          const response = await axios.put(
            `${API_URL}demo_bucket/${selectedFile.name.split('.')[0]}`,
            JSON.parse(jsonString),
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          console.log('File uploaded successfully:', response.data);
          dispatch(getAll());
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      };

      reader.onerror = function (error) {
        console.error('Error reading the file:', error);
      };

      reader.readAsText(selectedFile);
    }
  };

  return (
    <div>
      <h2>Upload JSON file</h2>
      <br />
      <input type="file" onChange={handleFileChange} accept=".json" />
    </div>
  );
};

export default FileUploadForm;
