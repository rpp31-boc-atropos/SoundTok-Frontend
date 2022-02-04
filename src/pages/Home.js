import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';


const Home = () => {

  const { user } = useAuth();

  //start from the top on each page
  useEffect(() => {
    window.scroll(0, 0);
  });


  return (
    <div>
      <h1>Home Page</h1>
      <p>User from context: {user}</p>

    </div>
  );
};

export default Home;
