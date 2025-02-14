import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/apiConstants';
import axios from 'axios';
import './LoginForm.css';

const LoginForm = (props) => {
    const [formData, setFormData]= useState({
        email: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const onLogin = async () => {
        const payload = {
            "email": formData.email,
            "password": formData.password
        }
        try{
            const response =  await axios.post(`${API_BASE_URL}/users/login`, payload);
            localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
            alert("Login successful!");
            redirectToHome();
            setErrorMessage(""); // Clear errors on success
        } catch (error) {
            console.log(error);
            if (error.response) {
                setErrorMessage(error.response.data.error || "Something went wrong!");
            } else {    
                setErrorMessage("Network error. Please try again.");
            }
        }
    }

    const redirectToHome = () => {
        navigate('/home');
    }

    const redirectToRegister = () => {
        navigate('/register');
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        await onLogin();
    };

    return (
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <h2 className="card-header">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        name='email'
                        value={formData.email}
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name='password'
                        className="form-control"
                        value={formData.password}
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </div>
                <button type="submit" className="mt-3 btn loginBtn">Login</button>
            </form>
            <div className="mt-3 registerMessage">
                <span>Don't have an account? </span>
                <span className="registerText" onClick={() => redirectToRegister()}>Register</span> 
            </div>
            <div className="mt-3">
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </div>
        </div>
    );
};

export default LoginForm;