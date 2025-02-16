import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../constants/apiConstants';
import { Navigate, useNavigate } from 'react-router-dom';

const ListAllNotes = () => {
    const [notes, setNotes] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const [isRefresh, setIsRefresh] = useState(true);

    const fetchNotes = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/notes/listByUser`, {
                headers: {
                    'Authorization': localStorage.getItem('login_access_token')
                }
            });
            setNotes(response.data.notes);
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.error || "Something went wrong!");
            } else {
                setErrorMessage("Network error. Please try again.");
            }
        }
    };

    useEffect(() => {
        fetchNotes();
    }, [isRefresh]);

    const deleteNote = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/notes/${id}`, {
                headers: {
                    'Authorization': localStorage.getItem('login_access_token')
                }
            });
            fetchNotes();
        } catch (error) {
            if (error.response) {
            setErrorMessage(error.response.data.error || "Something went wrong!");
            } else {
            setErrorMessage("Network error. Please try again.");
            }
        } finally {
            setIsRefresh(true);
        }
        };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">All Notes</h1>
            <ul className="list-group">
                {notes.map(note => (
                    <li key={note.id} className="list-group-item mb-3">
                        <div className='d-flex justify-content-between'>
                            <div>
                                {note.fileName}
                            </div>
                            <div>
                                <button className='btn btn-lightseagreen me-2' onClick={() => {
                                    navigate(`/renderNote?id=${note.id}`);
                                }}>Render Note</button>
                                <button className='btn btn-lightseagreen me-2' onClick={() => {
                                     navigate(`/checkGrammar?id=${note.id}`);
                                    }}>Check Grammar</button>
                                <button className='btn btn-danger me-2' onClick={() => deleteNote(note.id)}>Delete Note</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="mt-3" >
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </div>
        </div>
    );
};

export default ListAllNotes;