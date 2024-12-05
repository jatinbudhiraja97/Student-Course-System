// src/components/Auth/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerStudent } from '../../api/api';
import './Register.css';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentNumber: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    phoneNumber: '',
    email: '',
    program: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerStudent(formData);
      alert('Registration successful');
      navigate('/'); // Redirect to login page after successful registration
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="welcome-section">
        <h1>Welcome to Student Course System</h1>
        <p>Sign up to get started with your personalized course management system.</p>
      </div>
      <div className="register-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {Object.keys(formData).map((field) => (
            <input
              key={field}
              name={field}
              type={field === 'password' ? 'password' : 'text'}
              value={formData[field]}
              onChange={handleChange}
              placeholder={
                field === 'studentNumber'
                  ? 'Student Number'
                  : field.charAt(0).toUpperCase() + field.slice(1)
              }
            />
          ))}
          <button type="submit">Sign up</button>
        </form>
        <div className="redirect-login">
          Already have an account? <a href="/">Log in to your account</a>
        </div>
      </div>
    </div>
  );
}

export default Register;
