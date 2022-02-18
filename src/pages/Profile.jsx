<<<<<<< HEAD
import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import EditProfile from "../components/Profile/EditProfile.jsx";
import UserProfile from "../components/Profile/UserProfile.jsx";
import UserPosts from "../components/Profile/UserPosts.jsx";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../components/Loading.jsx";
=======
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import EditProfile from '../components/profile/EditProfile.jsx';
import UserProfile from '../components/profile/UserProfile.jsx';
import UserPosts from '../components/profile/UserPosts.jsx';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from '../components/Loading.jsx';

import styled from 'styled-components';
>>>>>>> 96500208eed2957d8f8536824d90bc9c3986f041

import styled from "styled-components";

const ProfilePage = styled.div`
  width: 1000px;
  height: 100%;
  border-left: solid 1px;
  border-right: solid 1px;
  background: var(--main-color-black);
  border-color: var(--font-line-color-yellow-transparent);
`;

const Profile = () => {
  // const { user } = useAuth();
  const [isCurrentUser, setIsCurrentUser] = useState(true);
  const [profileName, setProfileName] = useState('testName');

  // useEffect(() => {
  //   console.log('test main page'); //printing twice here too?
  // });

  //Nested routes
  return (
    <>
      {/* <h1>Profile Page</h1>
      <p>User from context: {user}</p> */}

      <ProfilePage>
        <UserProfile
          isCurrentUser={isCurrentUser}
          setIsCurrentUser={setIsCurrentUser}
          profileName={profileName}
        ></UserProfile>
        <UserPosts
          isCurrentUser={isCurrentUser}
          setIsCurrentUser={setIsCurrentUser}
          profileName={profileName}
        ></UserPosts>
      </ProfilePage>

      {/* <ul className='nav'>
        <li>
          <Link to="userprofile">User Profile</Link>
        </li>
        <li>
          <Link to="editprofile">Edit Profile</Link>
        </li>
      </ul> */}

      <Routes>
        <Route path="userprofile" element={<UserProfile />} />
        <Route path="editprofile" element={<EditProfile />} />
      </Routes>
    </>
  );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <Loading />,
});
