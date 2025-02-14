import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import './Header.css';
const Header = ({ title }) => {

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

    const renderLogout = () => {
        if (location.pathname === '/home') {
            return (
                <div className='ml-auto'>
                    <button className='btn btn-danger' onClick={() => handleLogout()}>Logout</button>
                </div>
            )
        }
    }

    const handleLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN_NAME);
        navigate('/login');
    }

    return (
        <nav className='navbar navbar-dark'>
                <span className="h3">{title || pageTitle}</span>
                {renderLogout()}
        </nav>
    );
};


export default Header