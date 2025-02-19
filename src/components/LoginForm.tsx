import React, { useState } from 'react';
import { LoginFormProps } from '../types/globalTypes';

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, error }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await onSubmit(username, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p className="error">{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
