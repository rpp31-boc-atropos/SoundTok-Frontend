import React, {useState} from 'react';
import BioModal from './BioModal.jsx';
// import { useAuth } from '../../contexts/AuthContext.jsx';
// import styled from 'styled-components';

const UserProfile = ({isCurrentUser, setIsCurrentUser}) => {

  // const { user } = useAuth();

  //add state for bio
  const [bio, setBio] = useState('I am a mystical corgi and Celtic Rock is my jam');
  //add modal for editing bio
  const [isOpen, setModal] = useState(false);


  const closeModal = () => {
    setModal(false);
  };

  const handleUpdateBio = (bio) => {
    setBio(bio);
  };

  return (
    <>
      <img alt='logo' src='https://yahoofantasysports-res.cloudinary.com/image/upload/fantasy-logos/25311153506_9fdda2493f.jpg'></img>
      <h2>@Faye</h2>
      {/* <p>User from context: {user}</p> */}
      {isCurrentUser ?
        <button onClick={() => setModal(true)}>Edit profile</button>
        : null}
      <button onClick={() => setIsCurrentUser(!isCurrentUser)}>Change isCurrentUser</button>
      {isOpen ?
        <BioModal
          isOpen={isOpen}
          currentBio={bio}
          closeModal={closeModal.bind(this)}
          handleUpdateBio={handleUpdateBio}>
        </BioModal> : null}
      <div>{bio}</div>
    </>
  );
};

export default UserProfile;
