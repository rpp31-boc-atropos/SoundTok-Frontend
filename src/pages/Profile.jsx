import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import EditProfile from '../components/EditProfile.jsx';
import ViewProfile from '../components/ViewProfile.jsx';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {

  const { user } = useAuth0();

  //Nested routes
  return (
    <>
      <h1>Profile Page</h1>
      <p>User from context: {user}</p>

      <ul className='nav'>
        <li>
          <Link to='viewprofile'>View Profile</Link>
        </li>
        <li>
          <Link to='editprofile'>Edit Profile</Link>
        </li>
      </ul>


      <Routes>
        <Route path='viewprofile' element={<ViewProfile />} />
        <Route path='editprofile' element={<EditProfile />} />
      </Routes>

    </>
  );
};

export default Profile;
