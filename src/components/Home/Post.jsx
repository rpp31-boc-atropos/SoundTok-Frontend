import * as React from 'react';
import styled from 'styled-components';

const Post = styled.div`
  width: 100%;
  padding: 16px 12px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  box-sizing: border-box;
`;

const ProfilePic = styled.img`
  width: 48px;
  height: 48px;
  margin-right: 12px;
  border: 1px solid white;
  border-radius: 100%;
  box-sizing: border-box;
`;

const PostContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid white;
  box-sizing: border-box;
`;

const PostHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 1px solid white;
  box-sizing: border-box;
`;

const PostUsernameAndTime = styled.div`
  border: 1px solid white;
  box-sizing: border-box;
`;

const PostText = styled.div`
`;

const PostCharacterCount = styled.div`
  font-size: 12px;
  text-align: right;
  box-sizing: border-box;
`;

const PostAudioInfo = styled.div`
  margin-top: 12px;
  font-size: 12px;
`;

const PostAudio = styled.div`
  background: var(--main-color-blue-light);
  width: 100%;
  height: 96px;
  border-radius: 16px;
  box-sizing: border-box;
`;

const Component = () => {
  return (
    <Post>
      <ProfilePic src="https://i.pinimg.com/474x/a3/89/f5/a389f597020f361f7f6d9b79323598fc.jpg">
      </ProfilePic>
      <PostContent>
        <PostHeader>
          <PostUsernameAndTime>@atrophos · 3h</PostUsernameAndTime>
          <i className="ri-sound-module-line"></i>
        </PostHeader>
        <PostText>i've been waiting to release this for
          so long. pls no hate thx
        </PostText>
        {/* <PostCharacterCount>13/140</PostCharacterCount> */}
        <PostAudioInfo>group meow · 1:38</PostAudioInfo>
        <PostAudio></PostAudio>
      </PostContent>
    </Post>
  );
};

export default Component;