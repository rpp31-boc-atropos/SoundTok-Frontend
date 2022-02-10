import React from 'react';
// import { useAuth } from '../../contexts/AuthContext.jsx';
// import styled from 'styled-components';

const UserProfile = () => {

  // const { user } = useAuth();

  return (
    <>
      <img alt='logo' src='https://yahoofantasysports-res.cloudinary.com/image/upload/fantasy-logos/25311153506_9fdda2493f.jpg'></img>
      <h2>@Faye</h2>
      {/* <p>User from context: {user}</p> */}
      <button>Edit profile</button>
      <div>I am a mystical corgi and Celtic Rock is my jam</div>
    </>
  );
};

export default UserProfile;
