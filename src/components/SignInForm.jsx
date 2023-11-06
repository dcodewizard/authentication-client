import React, { useState } from 'react';
import './SignInForm.scss';
import { signIn } from '../api/api';
import { useNavigate } from 'react-router-dom';

function SignInForm({ setIsAuthenticated }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await signIn(formData);

      if (response) {
        console.log('Sign-in successful:', response);
        setIsAuthenticated(true);
        navigate('/application');
      } else {
        setError('Sign-in failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Sign-in failed:', error);
      setError('Sign-in failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="signin-container">
      <h2 className="signin-title">Sign In</h2>
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="custom-signin-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="custom-input"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="custom-input"
          required
        />
        <button type="submit" className="custom-button" disabled={isLoading}>
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}

export default SignInForm;
