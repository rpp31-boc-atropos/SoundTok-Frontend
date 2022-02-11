import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
<<<<<<< HEAD
import { useAuth } from '../contexts/AuthContext.jsx';
=======
import { useAuth0} from '@auth0/auth0-react';
>>>>>>> main
import Upload from '../components/Upload.jsx';


const Studio = () => {

<<<<<<< HEAD
  const { user } = useAuth();
=======
  const { user } = useAuth0();

>>>>>>> main
  //get query from url
  //example, /studio?id=250, get the id number from the query
  const query = new URLSearchParams(useLocation().search);

  //Nested routes
  return (
    <>
      <h1>Studio Page</h1>

      <p>Id from url query: {query.get('id')}</p>

      {user && (
        <div> {user.given_name}</div>
      )}

      <ul className='nav'>
        <li>
          <Link to='upload'>Upload File</Link>
        </li>

      </ul>

      {/* <FeedVisualizer />
      <ButtonSeparator>
        <button onClick={loadSong1}>Load Post 1 Track</button>
        <button onClick={loadSong2}>Load Post 2 Track</button>
      </ButtonSeparator>
     */}

      <Routes>
        <Route path='upload' element={<Upload />} />

      </Routes>

    </>
  );
};

export default Studio;
