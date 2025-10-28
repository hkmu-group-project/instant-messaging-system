import React, { useState } from 'react';
import { authAPI } from '../services/api';
import { validateUsername, validatePassword } from '../utils/validation';
import './Auth.css';

const Register = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState([]);
  const [isChecking, setIsChecking] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear username availability when username changes
    if (name === 'username') {
      setUsernameAvailable(null);
      setErrors([]);
    }
  };

  const checkUsernameAvailability = async () => {
    if (!formData.username) return;

    const validation = validateUsername(formData.username);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsChecking(true);
    try {
      const result = await authAPI.checkUsername(formData.username);
      setUsernameAvailable(result.available);
      if (!result.available) {
        setErrors(['Username is already taken']);
      } else {
        setErrors([]);
      }
    } catch (error) {
      setErrors(['Error checking username availability']);
    }
    setIsChecking(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    // Validate username
    const usernameValidation = validateUsername(formData.username);
    if (!usernameValidation.isValid) {
      setErrors(usernameValidation.errors);
      return;
    }

    // Validate password
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      setErrors(passwordValidation.errors);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors(['Passwords do not match']);
      return;
    }

    if (usernameAvailable === false) {
      setErrors(['Username is not available']);
      return;
    }

    try {
      await authAPI.register({
        username: formData.username,
        password: formData.password
      });
      
      alert('Registration successful! Please login.');
      onSuccess();
    } catch (error) {
      setErrors([error.response?.data?.message || 'Registration failed']);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Join the Chat</h2>
        <p className="auth-subtitle">Create your account to start chatting</p>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className="input-with-check">
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
              />
              <button
                type="button"
                onClick={checkUsernameAvailability}
                disabled={isChecking || !formData.username}
                className="check-btn"
              >
                {isChecking ? 'Checking...' : 'Check'}
              </button>
            </div>
            {usernameAvailable === true && (
              <span className="availability available">✓ Available</span>
            )}
            {usernameAvailable === false && (
              <span className="availability taken">✗ Taken</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>

          {errors.length > 0 && (
            <div className="error-messages">
              {errors.map((error, index) => (
                <div key={index} className="error">{error}</div>
              ))}
            </div>
          )}

          <button type="submit" className="auth-button">
            Create Account
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{' '}
          <button 
            onClick={() => onSuccess()} 
            className="link-button"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
