import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../constants/apiConstants";

export default function CreateNote() {

    const [note, setNote] = useState({
        fileName: '',
        content: ''
    })
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNote({
            ...note,
            [name]: value,
        });
    }

    const handleSave = async (e) => {
        e.preventDefault();
        const payload = {
            "fileName": note.fileName,
            "content": note.content
        };
        
        try{
            const response = await axios.post(`${API_BASE_URL}/notes/saveNote`, payload, {
                headers: {
                    'Authorization': localStorage.getItem('login_access_token')
                }
            });
            alert(response.data.message);
            redirectToHome();
        }catch(error) {
            if(error.response) {
                setErrorMessage(error.response.data.error || "Something went wrong!");
            } else {
                setErrorMessage("Network error. Please try again.");
            }
        }
    }

    const redirectToHome = () => {
        navigate('/home');
    }

    return (
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <h2 className="card-header mt-3">Create Note</h2>
            <form onSubmit={handleSave}>
                <div className="form-group mt-3">
                    <label htmlFor="fileName">FileName:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="fileName"
                        name="fileName"
                        value={note.fileName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="content">Content:</label>
                    <textarea
                        className="form-control"
                        id="content"
                        name="content"
                        rows="4"
                        value={note.content}
                        onChange={handleChange}
                        placeholder="Type here..."
                        required
                    />
                </div>
                <button type="submit" className="btn btn-light mt-5">Save</button>
            </form>
            <div className="mt-3" >
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </div>
        </div>
    )

}