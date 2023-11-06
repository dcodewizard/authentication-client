import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import ApplicationPage from './components/ApplicationPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUpForm setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signin" element={<SignInForm setIsAuthenticated={setIsAuthenticated} />} />
        <Route
          path="/application"
          element={
            isAuthenticated ? (
              <ApplicationPage />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        <Route path="/*" element={<Navigate to="/signin" />} />

      </Routes>
    </Router>
  );
}

export default App;
