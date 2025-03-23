import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { baseUrl, port } from '../common/configuration';
import { errorMessages } from '../common/messages';

interface FileData {
  _id: string;
  originalName: string;
  mimetype: string;
}

const FileView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [fileData, setFileData] = useState<FileData | null>(null);
  const [content, setContent] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchFileData = async () => {
      try {
        const res = await axios.get<FileData[]>(`${baseUrl}:${port}/files`);
        const file = res.data.find(f => f._id === id);
        if (file) {
          setFileData(file);
          if (file.mimetype === 'text/plain' || file.mimetype === 'application/json') {
            const viewRes = await axios.get(`${baseUrl}:${port}/file/view/${id}`, { responseType: 'text' });
            setContent(viewRes.data);
          }
        } else {
          setError(errorMessages.file.notFound);
        }
      } catch (err) {
        console.error(err);
        setError(`fetchFileData: ${errorMessages.file.fetchFileData}`);
      }
    };
    fetchFileData();
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!fileData) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>{fileData.originalName}</h2>
      {/* Different for different type of data */}
      {(fileData.mimetype === 'text/plain' || fileData.mimetype === 'application/json') && (
        <pre>{content}</pre>
      )}
      {(fileData.mimetype === 'image/jpeg' || fileData.mimetype === 'image/png') && (
        <img
          src={`${baseUrl}:${port}/file/view/${id}`}
          alt={fileData.originalName}
          style={{ maxWidth: '100%' }}
        />
      )}
      {!(fileData.mimetype === 'text/plain' ||
        fileData.mimetype === 'application/json' ||
        fileData.mimetype === 'image/jpeg' ||
        fileData.mimetype === 'image/png') && (
        <p>Viewing not supported for this file type. Please download the file.</p>
      )}
    </div>
  );
};

export default FileView;
