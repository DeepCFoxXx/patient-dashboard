import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { LoginFormProps } from '../types/globalTypes';

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, error }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await onSubmit(username, password);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
      </div>
      <div className="password-input">
        <label>Password:</label>
        <input
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
      {error && <p className="error">{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
