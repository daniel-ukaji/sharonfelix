import { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';

function ImageUpload({ onImageUploaded }) {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const uploadImage = async () => {
    if (!image) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        params: {
          key: 'f1ba6f8ef7cb6358fbc6e2c9ee1d41b5', // Replace with your ImgBB API key
        },
      });

      console.log('ImgBB API Response:', response.data); // Log the entire response
      console.log(response.data.data.url)

      const imageUrl = response.data.data.url;
      onImageUploaded(imageUrl); // Callback to parent component with the image URL

    } catch (error) {
      console.error('Error uploading image:', error);
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Image Upload</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <Button onClick={uploadImage} disabled={loading || !image}>
        Upload
      </Button>
      {loading && <p>Uploading...</p>}
    </div>
  );
}

export default ImageUpload;