import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            setMessage('Please select a file');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('avatar', selectedFile);

            const response = await axios.post('http://localhost:5000/api/v1/users/upload', formData);

            if (response.data.success) {
                setMessage('File uploaded successfully');
            } else {
                setMessage('File upload failed');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            setMessage('An error occurred while uploading the file');
        }
    };

    return (
        <div>
            <h2>File Upload</h2>
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                <div>
                    <input type="file" onChange={handleFileChange} name="avatar" />
                </div>
                <button type="submit">Upload</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default FileUpload;
