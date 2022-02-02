import React from 'react';
import { Link } from 'react-router-dom';


// Any undefined path will be redirected to this page
//Click the link to go back to the home page

const NotFound = () => {
  return (
    <>
      <h1>404 Not Found</h1>
      <Link to="/">Go Back to the Home Page</Link>
    </>
  );
};

export default NotFound;
