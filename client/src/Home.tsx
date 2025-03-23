import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { baseUrl, port } from '../common/configuration';
import { errorMessages } from '../common/messages';

interface FileData {
  _id: string;
  originalName: string;
  mimetype: string;
  size: number;
}

const Home: React.FC = () => {
  const [files, setFiles] = useState<FileData[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const res = await axios.get<FileData[]>(`${baseUrl}:${port}/files`);
      setFiles(res.data);
    } catch (err) {
      console.error('Error fetching Files: ', err);
      setMessage(`fetchFiles: ${errorMessages.file.fetchFiles}`);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      return ;
    }
    setUploading(true);
    setMessage('');
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      await axios.post(`${baseUrl}:${port}/upload`, formData, {
        // for multer, only multipart/form-data works
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage('File uploaded successfully');
      setSelectedFile(null);
      fetchFiles();
    } catch (err) {
      console.error('Upload error', err);
      setMessage(`handleUpload: ${errorMessages.file.uploadFile}`);
    }
    setUploading(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>My Files</h2>
      <div style={{ marginBottom: '20px' }}>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload} disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
      {message && <p>{message}</p>}
      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>File Name</th>
            <th>Type</th>
            <th>Size (bytes)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {files.map(file => (
            <tr key={file._id}>
              <td>{file.originalName}</td>
              <td>{file.mimetype}</td>
              <td>{file.size}</td>
              <td>
                <a
                  href={`${baseUrl}:${port}/file/${file._id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download
                </a>
                {' | '}
                <Link to={`/view/${file._id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;