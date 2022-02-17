import React, {useState, useEffect} from 'react';
import BioModal from './BioModal.jsx';
// import { useAuth } from '../../contexts/AuthContext.jsx';
import styled from 'styled-components';
const axios = require('axios');

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

// const UserProfile = ({isCurrentUser, setIsCurrentUser, profileName}) => {
const UserProfile = ({isCurrentUser, setIsCurrentUser, profileName}) => {

  // const { user } = useAuth();

  //add state for bio
  // const [username, setUsername] = useState('searchedName' || 'ownProfile');
  const [profileURL, setProfileURL] = useState('Loading profile photo');
  const [bio, setBio] = useState('Loading bio info');
  const [isOpen, setModal] = useState(false);

  const closeModal = () => {
    setModal(false);
  };

  const handleUpdateBio = (bio) => {
    setBio(bio);
    //


  };


  // useEffect(() => {
  //   //Api call to get bio
  //   axios.get('/profile', {
  //     params: {
  //       user: profileName
  //     }
  //   })
  //     .then((response) => {
  //       setProfileURL(response.photo);
  //       setBio(response.bio);
  //     })
  //     .catch((err) => {  //move error handling to server
  //       //make pop-up
  //       console.log(err);
  //     });
  // });


  return (
    <ProfileWrapper>
      <ProfilePic alt='logo'
        src='https://yahoofantasysports-res.cloudinary.com/image/upload/fantasy-logos/25311153506_9fdda2493f.jpg'>
      </ProfilePic>
      <ProfileHeader>@Faye</ProfileHeader>
      {/* <p>User from context: {user}</p> */}
      <ButtonWrapper>
        {isCurrentUser ?
          <Button onClick={() => setModal(true)}>Edit profile</Button>
          : null}
        <Button onClick={() => setIsCurrentUser(!isCurrentUser)}>Log in/out</Button>
      </ButtonWrapper>
      {(isOpen && isCurrentUser) ?
        <BioModal
          isOpen={isOpen}
          currentBio={bio}
          closeModal={closeModal.bind(this)}
          handleUpdateBio={handleUpdateBio}>
        </BioModal> : null}
      <ProfileText>{bio}</ProfileText>
    </ProfileWrapper>
  );
};

export default UserProfile;
