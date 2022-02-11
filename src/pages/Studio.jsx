import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useAuth0} from '@auth0/auth0-react';
import Upload from '../components/Upload.jsx';

const Studio = () => {

  const { user, isAuthenticated } = useAuth0();

  //get query from url
  //example, /studio?id=250, get the id number from the query
  const query = new URLSearchParams(useLocation().search);
  console.log(user);
  console.log(isAuthenticated);

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


      <Routes>
        <Route path='upload' element={<Upload />} />

      </Routes>

    </>
  );
};

export default Studio;
