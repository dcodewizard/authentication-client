import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInForm from './components/SignIn/SignInForm';
import SignUpForm from './components/SignUp/SignUpForm';
import ApplicationPage from './components/ApplicationPage';
import { AuthProvider } from './components/providers/Authprovider';
import { PrivateRoute } from './components/routes/PrivateRoute';
import { NotFound } from './components/NotFound/NotFound'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/application" element={<PrivateRoute element={<ApplicationPage />} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
