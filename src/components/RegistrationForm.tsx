import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { RegistrationFormProps } from '../types/globalTypes';

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        <div className="password-input">
          <input
            className="registration-pass"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <span onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer' }}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <div className="password-input">
          <input
            className="registration-confirm-pass"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />
          <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ cursor: 'pointer' }}>
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
      </div>
      <button className="registration-submit" type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
