import React, { useState } from 'react'
import axios from 'axios'

const ImageUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [gifUrl, setGifUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('file', selectedFile)

      const response = await axios.post('https://api.example.com/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      setGifUrl(response.data.url)
    } catch (error) {
      console.error('Error uploading image:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button type="submit" disabled={!selectedFile || loading}>
        {loading ? 'Uploading...' : 'Upload and Convert to GIF'}
      </button>
      {gifUrl && (
        <div>
          <h2>GIF Result:</h2>
          <img src={gifUrl} alt="GIF" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </form>
  )
}

export default ImageUploadForm
