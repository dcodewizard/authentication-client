import React, { useState } from 'react';
import './SignUpForm.scss';
import { signUp } from '../../../api/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../providers/Authprovider';
import Form from '../../providers/Form';

const SignUpForm = () => {
  const navigate = useNavigate();
  const { login, errorHandler, Loader, error, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
  });

  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async () => {
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
      if (error.response && error.response.data && error.response.data.message) {
        errorHandler(error.response.data.message);
      } else {
        errorHandler('Sign-up failed. Please try again later.');
      }
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
      <Form
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        submitText="Sign Up"
        isLoading={isLoading}
      />
    </div>
  );
}

export default SignUpForm;
