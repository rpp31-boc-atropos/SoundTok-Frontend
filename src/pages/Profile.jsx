import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import EditProfile from '../components/Profile/EditProfile.jsx';
import UserProfile from '../components/Profile/UserProfile.jsx';
import UserPosts from '../components/Profile/UserPosts.jsx';
// import { useAuth } from '../contexts/AuthContext.jsx';
import styled from 'styled-components';

const ProfilePage = styled.div`
  max-width: 1000px;
  height: 100%;
  border-left: solid 1px;
  border-right: solid 1px;
  background: var(--main-color-black);
  border-color: var(--font-line-color-yellow-transparent)
`;

const Profile = () => {

  // const { user } = useAuth();

  //Nested routes
  return (
    <>
      {/* <h1>Profile Page</h1>
      <p>User from context: {user}</p> */}

      <ProfilePage>
        <UserProfile></UserProfile>
        <UserPosts></UserPosts>
      </ProfilePage>


      <ul className='nav'>
        <li>
          <Link to='userprofile'>User Profile</Link>
        </li>
        <li>
          <Link to='editprofile'>Edit Profile</Link>
        </li>
      </ul>


      <Routes>
        <Route path='userprofile' element={<UserProfile />} />
        <Route path='editprofile' element={<EditProfile />} />
      </Routes>

    </>
  );
};

export default Profile;
