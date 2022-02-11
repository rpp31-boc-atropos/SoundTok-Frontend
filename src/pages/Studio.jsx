import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import Upload from '../components/Upload.jsx';
import FeedVisualizer from '../components/Studio/FeedVisualizer.jsx';
import { AudioPlayer } from '../components/Studio/Styles/styles.js';
import song from '../../song.mp3';

const Studio = () => {

  const { user } = useAuth();

  //get query from url
  //example, /studio?id=250, get the id number from the query
  const query = new URLSearchParams(useLocation().search);

  //Nested routes
  return (
    <>
      <h1>Studio Page</h1>

      <p>Id from url query: {query.get('id')}</p>

      <p>User from context: {user}</p>


      <ul className='nav'>
        <li>
          <Link to='upload'>Upload File</Link>
        </li>

      </ul>

      <FeedVisualizer />
      <AudioPlayer src={song} controls />

      <Routes>
        <Route path='upload' element={<Upload />} />

      </Routes>

    </>
  );
};

export default Studio;
