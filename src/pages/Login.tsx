import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import "../styles/login-styles.css";

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch('http://localhost:5001/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            navigate('/dashboard');
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred');
            }
        }
    };

    return (
        <div className="login-page">
            <h2 className="sign">Welcome Please Login</h2>
            {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
            <form className="form1" onSubmit={handleLogin}>
                <input
                    className="un"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <div className="password-input">
                    <input
                        className="pass"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <span onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                    </span>
                </div>
                <button className="submit" type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <a href="/register">Register here</a>
            </p>
        </div>
    );
};

export default Login;
