import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/login-styles.css";

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
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
                throw new Error(errorData.message || 'Invalid credentials');
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
            <h2 className="sign">Weclome Please Login</h2>
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
                <input
                    className="pass"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button className="submit" type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
