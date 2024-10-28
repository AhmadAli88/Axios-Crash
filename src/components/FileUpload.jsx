import React from 'react'

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
  
    const handleUpload = async () => {
      if (!file) return;
  
      const formData = new FormData();
      formData.append('file', file);
  
      try {
        await axios.post('https://api.example.com/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(progress);
          }
        });
        alert('File uploaded successfully!');
      } catch (error) {
        console.error('Upload failed:', error);
      }
    };
  
    return (
      <div>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button onClick={handleUpload}>Upload</button>
        {uploadProgress > 0 && <div>Upload Progress: {uploadProgress}%</div>}
      </div>
    );
  };

export default FileUpload