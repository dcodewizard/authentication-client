import React, { useState } from 'react';
import './SignInForm.scss';
import { signIn } from '../../api/api';
import { useAuth } from '../providers/Authprovider';
import { useNavigate } from 'react-router-dom';

function SignInForm() {
  const navigate = useNavigate();
  const { login, errorHandler, Loader, error, isLoading} = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Loader(true);

    try {
      const response = await signIn(formData);
      console.log('Sign-in successful:', response);
      await login(); // Call the login function from the context to set isAuthenticated to true
      navigate('/application');
    } catch (error) {
      errorHandler('login Failed')
    } finally {
      Loader(false);
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
