import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../constants/apiConstants';
import './note.css';
import { useNavigate } from 'react-router-dom';

const NoteFileUpload = () => {
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate()

    const onFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'text/markdown') {
            setFile(selectedFile);
            setErrorMessage('');
        } else {
            setFile(null);
            e.target.value = ''; // Clear the file input field
            setErrorMessage('Please upload a valid Markdown (.md) file.');
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('noteFile', file);

        try {
            const res = await axios.post(`${API_BASE_URL}/notes/uploadNoteFile`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': localStorage.getItem('login_access_token') 
                }
            });
            alert(res.data.message)
            setErrorMessage('');
            redirectToHome();
        } catch (err) {
            setErrorMessage('Error uploading file');
        }
    };

    const redirectToHome = () => {  
        navigate('/home');
    }

    return (
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <h2 className="card-header mb-3">Note File Upload</h2>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="file" accept=".md" name='file' onChange={onFileChange} className="form-control-file" required />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary mt-3">Upload</button>
                </div>
            </form>
            <div className="mt-3">
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
            </div>
        </div>
    );
};

export default NoteFileUpload;