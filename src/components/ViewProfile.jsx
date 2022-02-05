import React from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';

const ViewProfile = () => {

  const { user } = useAuth();

  return (
    <>
      <h2>View Profile Page</h2>
      <p>User from context: {user}</p>

    </>
  );
};

export default ViewProfile;
