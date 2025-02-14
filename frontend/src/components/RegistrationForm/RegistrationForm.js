import React, { useState } from 'react';
import axios from 'axios'
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/apiConstants';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RegistrationForm.css'

const RegistrationForm = (props) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        successMessage: null,
    });
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const registerUser = async () => {
        const payload = {
            "name": formData.username,
            "email": formData.email,
            "password": formData.password
        }
        try{
            const response =  await axios.post(`${API_BASE_URL}/users/signup`, payload);
            alert("Signup successful!");
            redirectToLogin();
            setErrorMessage(""); // Clear errors on success
        }catch(error) {
            if (error.response) {
                setErrorMessage(error.response.data.error || "Something went wrong!");
            } else {
                setErrorMessage("Network error. Please try again.");

            }
        }
    }

    const redirectToLogin = () => {
        navigate('/login')
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(formData.password === formData.confirmPassword) {
            await registerUser()
        }else{
            setErrorMessage("Password and ConfirmPassword doesn't match")
        }
    };

    return (
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <h2 className="card-header">Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn register-btn mt-3">Register</button>
            </form>
            <div className="alert alert-success mt-2" style={{display: formData.successMessage ? 'block' : 'none' }} role="alert">
                {formData.successMessage}
            </div>
            <div className="mt-3 mb-3">
                <span>Already have an account? </span>
                <span className="loginText" onClick={() => redirectToLogin()}>Login here</span> 
            </div>
            <div className="mt-3" >
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </div>
        </div>
    );
};

export default RegistrationForm;