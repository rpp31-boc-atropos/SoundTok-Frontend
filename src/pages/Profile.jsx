import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import EditProfile from '../components/profile/EditProfile.jsx';
import UserProfile from '../components/profile/UserProfile.jsx';
import UserPosts from '../components/profile/UserPosts.jsx';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from '../components/Loading.jsx';
import { useUserInfo } from '../contexts/UserContext.jsx';


import styled from 'styled-components';

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
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [profileName, setProfileName] = useState('testName');
  const { email, username } = useUserInfo();
  // const { email, username, isNewProfile, setIsNewProfile } = useUserInfo();
  let location = useLocation();

  useEffect(() => {
    console.log('user email', email); //this is the logged in username
    console.log('user name', username); //this is the logged in username


    let newLocation = window.location.href;
    let userProfile = newLocation.slice((window.location.href.indexOf('profile') + 8));
    // console.log('location:', location);
    // console.log('pathname', location.pathname);
    // console.log('pathname', location.pathname.split('/').pop());
    setProfileName(location.pathname.split('/').pop());
    if (location.pathname.split('/').pop() === username) {
      // console.log('viewing own page');
      setIsCurrentUser(true);
    } else {
      // console.log('not your page!', location.pathname.split('/').pop());
      console.log(username);

      setIsCurrentUser(false);
    }

  }, [location]);

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
          setProfileName={setProfileName}
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
