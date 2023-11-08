import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignInForm from '../pages/SignIn/SignInForm';
import SignUpForm from '../pages/SignUp/SignUpForm';
import ApplicationPage from '../pages/ApplicationPage';
import PrivateRoute from '../routes/PrivateRoute';
import NotFound from '../pages/NotFound/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/signin" element={<SignInForm />} />
      <Route path="/application" element={<PrivateRoute element={<ApplicationPage />} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
