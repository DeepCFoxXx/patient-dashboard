import React, { useState } from 'react';
import { RegistrationFormProps } from '../types/globalTypes';

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (password !== confirmPassword) {
          alert("Passwords do not match.");
          return;
      }
      onSubmit(username, password);
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
        <div className="input-group">
            <input
                className="registration-un"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />
            <input
                className="registration-pass"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <input
                className="registration-confirm-pass"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required
            />
        </div>
        <button className="registration-submit" type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
