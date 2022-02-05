// Embedded to the Studio

import React from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';

const Upload = () => {

  const { user } = useAuth();

  return (
    <>
      <h1>Upload Page</h1>
      <p>User from context: {user}</p>

    </>
  );
};

export default Upload;