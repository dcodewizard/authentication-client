import React, { useState } from 'react';
import './SignUpForm.scss';
import { signUp } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/Authprovider';

function SignUpForm() {
  const navigate = useNavigate();
  const { login, errorHandler, Loader, error, isLoading} = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Loader(true);

    if (!isPasswordValid(formData.password)) {
      errorHandler('Password must be at least 8 characters long and include at least 1 letter, 1 number, and 1 special character.');
      Loader(false);
      return;
    }

    try {
      const response = await signUp(formData);
      console.log('Sign-up successful:', response);
      await login();
      navigate('/application');
    } catch (error) {
      console.error('Sign-up failed:', error);
      errorHandler('login Failed')
    } finally {
      Loader(false);
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Sign Up</h2>
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="custom-signup-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="custom-input"
          required
        />
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
          {isLoading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
