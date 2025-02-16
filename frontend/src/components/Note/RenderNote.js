import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../constants/apiConstants';
import { Link, useLocation } from 'react-router-dom';

const RenderNote = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);   
    const noteId = queryParams.get('id');

    const [content, setContent] = useState('');

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/notes/renderHtml/${noteId}`, {
                    headers: {
                        'Authorization': localStorage.getItem('login_access_token')
                    }
                });
                setContent(response.data.htmlContent);
            } catch (error) {
                console.error('Error fetching the note:', error);
            }
        };

        if (noteId) {
            fetchNote();
        }
    }, [noteId]);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Rendered HTML</h1>
            <div className="border p-4 rounded" dangerouslySetInnerHTML={{ __html: content || "<p>No content available</p>" }} />
            <Link to="/" className="mt-4 inline-block px-4 py-2 bg-gray-500 text-white rounded">Back</Link>
      </div>
    );
};

export default RenderNote;