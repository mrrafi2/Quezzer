import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function AdminRoute({ children }) {
  const { currentUser } = useAuth();
  if (currentUser === null) return null;       
  if (!currentUser.isAdmin) return <Navigate to="/" />;
  return children;
}
