import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ProfilePicture = ({username, profilePicture}) => {
  return (
    <Link to={'/profile/' + username}>
      <ProfilePic src={profilePicture}></ProfilePic>
    </Link>
  );
};

const ProfilePic = styled.img`
  width: 48px;
  height: 48px;
  margin-right: 12px;
  border-radius: 100%;
  box-sizing: border-box;
  border: 2px solid var(--font-line-color-yellow);
  overflow: hidden;
`;

export default ProfilePicture;