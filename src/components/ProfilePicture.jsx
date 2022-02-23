import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ProfilePicture = ({ username, profilePicture, size }) => {
  return (
    <Link to={'/profile/' + username}>
      <ProfilePic src={profilePicture} size={size}></ProfilePic>
    </Link>
  );
};

const ProfilePic = styled.img`
  width: ${(props) => props.size || 48}px;
  height: ${(props) => props.size || 48}px;
  margin-right: 12px;
  border-radius: 100%;
  box-sizing: border-box;
  border: 1px solid var(--font-line-color-yellow);
  overflow: hidden;

  &:hover {
    border: 2px solid var(--font-line-color-yellow);
  }
`;

export default ProfilePicture;
