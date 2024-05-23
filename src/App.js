import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [predictedClass, setPredictedClass] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/images/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setPredictedClass(response.data.predicted_class);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Skin Disease Classifier</h1>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload Image</button>
        {predictedClass && (
          <div>
            <h2>Predicted Class:</h2>
            <p>{predictedClass}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
