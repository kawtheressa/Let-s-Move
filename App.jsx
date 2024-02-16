import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [gifUrl, setGifUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setUploadedImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('api_key', 'YOUR_GIPHY_API_KEY');

      const response = await axios.post('https://upload.giphy.com/v1/gifs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setGifUrl(response.data.data.url);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Image to GIF Converter</h1>
      <div>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>
      {selectedFile && (
        <div>
          <h2>Selected Image:</h2>
          <img src={uploadedImage} alt="Selected" style={{ maxWidth: '100%' }} />
        </div>
      )}
      <button onClick={handleSubmit} disabled={!selectedFile || loading}>
        {loading ? 'Converting...' : 'Convert to GIF'}
      </button>
      {gifUrl && (
        <div>
          <h2>GIF Result:</h2>
          <img src={gifUrl} alt="GIF" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
};

export default App;
