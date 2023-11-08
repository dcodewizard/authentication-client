import React, { useState } from 'react';
import './SignInForm.scss';
import { signIn } from '../../../api/api';
import { useAuth } from '../../providers/Authprovider';
import { useNavigate } from 'react-router-dom';
import Form from '../../providers/Form';

const SignInForm = () => {
  const navigate = useNavigate();
  const { login, errorHandler, Loader, error, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (formData) => {
    Loader(true);

    try {
      const response = await signIn(formData);
      console.log('Sign-in successful:', response);
      await login();
      navigate('/application');
    } catch (error) {
      errorHandler('Incorrect email or password');
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
      <Form
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        submitText="Sign In"
        isLoading={isLoading}
      />
    </div>
  );
}

export default SignInForm;
