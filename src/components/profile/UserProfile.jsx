import React, {useState, useEffect} from 'react';
import BioModal from './BioModal.jsx';
// import { useAuth } from '../../contexts/AuthContext.jsx';
// import dummyProfile from './dummyProfile.jsx';
// import { useLocation } from 'react-router-dom';

import styled from 'styled-components';
const axios = require('axios');
// import CLOUDINARY_PROFILE_PRESET from '../../config/config.js';

const ButtonWrapper = styled.div`
  padding-bottom: 20px;
  justify-content: center;
`;

const Button = styled.button`
  color: rgb(255, 250, 206);
  border: 2px solid rgb(255, 250, 206);
  margin: 0px 10px;
  padding: 2px 5px;
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 40px;
  justify-content: center;
  align-items: center;
`;

const ProfileHeader = styled.h2`
  display: flex;
  justify-content: center;
`;

const ProfilePic = styled.img`
  display: flex;
  justify-content: center;
  width: 200px;
  height: 200px;
  margin-top: 12px;
  border-radius: 100%;
  box-sizing: border-box;
  border: 2px solid var(--font-line-color-yellow);
  overflow: hidden;
`;

const ProfileText = styled.div`
  display: flex;
  justify-content: center;
`;

// const UserProfile = ({isCurrentUser, setIsCurrentUser, location, profileName}) => {
const UserProfile = ({isCurrentUser, setIsCurrentUser, profileName, setProfileName}) => {
  // const { user } = useAuth();
  const [username, setUsername] = useState('leggo'); //update with Context when available
  const [profilePicture, setProfilePicture] = useState('');
  const [bio, setBio] = useState('');
  const [isOpen, setModal] = useState(false);
  // const [location, setLocation] = useLocation();
  // const {location} = useLocation();
  const [currentLocation, setCurrentLocation] = useState('');


  const closeModal = () => {
    setModal(false);
  };

  const handleUpdateProfile = (newPhoto, bio) => {
    const formData = new FormData();
    formData.append('file', newPhoto);
    formData.append('upload_preset', 'zua1tfa6');

    axios.post('https://api.cloudinary.com/v1_1/rickkcloudinary/image/upload', formData)
      .then((response) => {
        return response.data.secure_url;
      })
      .catch((error) => {
        console.log(error);
      })
      .then((newPicture) => {
        setBio(bio);
        setProfilePicture(newPicture);
        let tempData = {
          username: username,
          profilePicture: newPicture,
          bio: bio
        };

        axios.put('/updateProfile/', tempData)
          .then((response) => {
            console.log('response', response);
            // setProfilePicture(response.data.profilePicture);
            // setBio(response.data.bio);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    let newLocation = window.location.href;
    let userProfile = newLocation.slice((window.location.href.indexOf('profile') + 8));

    setCurrentLocation(userProfile);

    if (userProfile !== '') {
      setUsername(userProfile);
    } else {
      userProfile = username;
    }

    axios.get('/profile/', {
      params: {
        username: userProfile
      }
    })
      .then((response) => {
        setProfilePicture(response.data.profilePicture);
        setBio(response.data.userBio); //Maggie is working on adding this
      })
      .catch((err) => {
        console.log(err);
      });
  }, [profileName]);

  return (
    <ProfileWrapper>
      <ProfilePic alt='logo'
        src={profilePicture}>
      </ProfilePic>
      <ProfileHeader>{`@${profileName}`}</ProfileHeader>
      <ButtonWrapper>
        {isCurrentUser ?
          <Button onClick={() => setModal(true)}>Edit profile</Button>
          : null}
        {/* <Button onClick={() => setIsCurrentUser(!isCurrentUser)}>Log in/out</Button> */}
      </ButtonWrapper>
      {(isOpen && isCurrentUser) ?
        <BioModal
          isOpen={isOpen}
          currentBio={bio}
          closeModal={closeModal.bind(this)}
          handleUpdateProfile={handleUpdateProfile}
          profilePicture={profilePicture}>
        </BioModal> : null}
      <ProfileText>{bio}</ProfileText>
    </ProfileWrapper>
  );
};

export default UserProfile;