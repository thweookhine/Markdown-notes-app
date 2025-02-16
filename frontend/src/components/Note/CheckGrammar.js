import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { API_BASE_URL } from "../../constants/apiConstants";

const CheckGrammar = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);   
    const noteId = queryParams.get('id');
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/notes/check-grammar/${noteId}`, {
                    headers: {
                        'Authorization': localStorage.getItem('login_access_token')
                    }
                });
                console.log(response.data.results)
                setResults(response.data.results);
            } catch (error) {
                console.error('Error fetching the note:', error);
            }
        };
    
        if(noteId) {
             fetchNote()
        }

        console.log(results)
    },[noteId])

    return (
        <div className="mt-4">
            <h4 style={{ textAlign: 'left' }}>Grammar Check Results:</h4>
            {results && (
                results.map((result, resultIndex) => (
                    <div key={resultIndex} className="mb-3 mt-3"> 
                            <h5 className="card-header" style={{ textAlign: 'left' }}>{resultIndex + 1}</h5>
                            <div className="card-body">
                                {result.message && <h5 className="card-text mt-3" style={{ textAlign: 'left' }}>Message: {result.message}</h5>}
                                <h5 className="card-text mt-3" style={{ textAlign: 'left' }}>Suggestions</h5>
                                {result.suggestions && result.suggestions.length > 0 && (
                                    <ul className="list-group list-group-flush mt-3" style={{ maxHeight: '100px', overflowY: 'auto', textAlign: 'left' }}>
                                        {result.suggestions.map((suggestion, suggestionIndex) => (
                                            <li key={suggestionIndex} className="list-group-item" style={{ textAlign: 'left' }}>
                                                {suggestion}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {result.incorrectWord && <h5 className="card-text mt-3" style={{ textAlign: 'left' }}>Incorrect Word: {result.incorrectWord}</h5>}
                                {result.position && <h5 className="card-text mt-3" style={{ textAlign: 'left' }}>Position: {result.position}</h5>}
                            </div>
                            <hr/>
                    </div>

                ))
            )}
        </div>
    )
}


export default CheckGrammar;