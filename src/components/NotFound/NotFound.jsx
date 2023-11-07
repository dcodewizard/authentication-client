import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.scss';

export function NotFound() {
  return (
    <div className="not-found-container">
      <p className="not-found-message">Oops! This page seems to have gone on vacation.</p>
      <p className="not-found-funny">Come back soon, but first, let's get you back to the Sign-In page.</p>
      <Link to="/signin" className="sign-in-link">Sign In</Link>
    </div>
  );
}
