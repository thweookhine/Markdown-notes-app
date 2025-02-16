import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import './Header.css';
const Header = ({ title, isAuthenticated, setIsAuthenticated }) => {

    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    const location = useLocation();
    const navigate = useNavigate();

    let pageTitle = capitalize(location.pathname.substring(1, location.pathname.length))
    if (location.pathname === '/') {
        pageTitle = 'Welcome'
    }

    const handleLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN_NAME);
        setIsAuthenticated(false)
        navigate('/login');
    }

    return (
        <nav className='navbar navbar-dark bg-dark'>
            <div className='container-fluid'>
                <span className="navbar-brand h3 title" onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>
                    {title || pageTitle}
                </span>
                <div className='d-flex'>
                    {isAuthenticated &&
                        <button className='btn btn-lightseagreen me-2' onClick={() => navigate('/createNote')}>Create Note</button>
                    }
                    {isAuthenticated &&
                        <button className='btn btn-lightseagreen me-2' onClick={() => navigate('/uploadNoteFile')}>Upload Note File</button>
                    }
                    <button className='btn btn-danger' onClick={() => handleLogout()}>Logout</button>
                </div>
            </div>
        </nav>
    );
};


export default Header