import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginStudent } from '../../api/api';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await loginStudent(email, password);
            const loginData = response.data.data.loginStudent;
        
            if (loginData) {
                const { token, studentId } = loginData;
                localStorage.setItem('token', token);
                localStorage.setItem('studentId', studentId);
                navigate('/dashboard');
            } else {
                alert("Login failed. Please check your credentials and try again.");
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="login-wrapper">
            <div className="welcome-section">
                <h1>Welcome to Student Course System</h1>
                <p>Log in to access your personalized course dashboard.</p>
            </div>
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Email" 
                        required 
                    />
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Password" 
                        required 
                    />
                    <button type="submit">Login</button>
                </form>
                <div className="redirect-signup">
                    New User? <a href="/register">Signup</a>
                </div>
            </div>
        </div>
    );
}

export default Login;
