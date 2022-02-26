import React, {useState, useEffect} from 'react';
import BioModal from './BioModal.jsx';
// import { useAuth } from '../../contexts/AuthContext.jsx';
import dummyProfile from './dummyProfile.jsx';
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
  const [profilePicture, setProfilePicture] = useState(dummyProfile.profilePicture);
  const [bio, setBio] = useState(dummyProfile.bio);
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
    // formData.append('upload_preset', CLOUDINARY_PROFILE_PRESET);
    formData.append('upload_preset', 'zua1tfa6');

    // console.log('newPhoto', newPhoto);

    axios.post('https://api.cloudinary.com/v1_1/rickkcloudinary/image/upload', formData)
      .then((response) => {
        // console.log('cloud photo link', response.data.secure_url);
        // console.log('new profile pic in state', profilePicture);
        return response.data.secure_url;
      })
      .catch((error) => {
        console.log(error);
      })
      .then((newPicture) => {
        setBio(bio);
        setProfilePicture(newPicture);
        // console.log('hopefully url', newPicture);

        // console.log('new profile url', profilePicture);
        let tempData = {
          username: username,
          profilePicture: newPicture,
          bio: bio
        };

        console.log(tempData);

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
    // console.log('location:', newLocation);
    setCurrentLocation(userProfile);
    // setProfileName(userProfile);
    // console.log('current location', currentLocation);
    // const location = useLocation();
    // console.log('location: ', location);

    // console.log('userprofile ', userProfile);
    if (userProfile !== '') {
      setUsername(userProfile);
    } else {
      userProfile = username;
    }

    axios.get('/profile/', {
      params: {
        // username: 'leggo'
        username: userProfile
      }
    })
      .then((response) => {
        // console.log('profileresponse', response.data);
        setProfilePicture(response.data.profilePicture);
        // console.log('getting bio back: ', response.data);
        setBio(response.data.userBio); //Maggie is working on adding this
      })
      .catch((err) => {
        console.log(err);
      });
  }, [profileName]);

  //move to higher level
  // React.useEffect(() => {
  //   const optionGetPosts = {
  //     method: 'GET',
  //     url: 'api.soundtok.live/getProfileData/projects/stella',
  //   };

  //   axios.get(optionGetPosts)
  //     .then((response) => {
  //       console.log('response', response);
  //       // setProfilePicture(response.data.profilePicture);
  //       // setBio(response.data.bio);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // });

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