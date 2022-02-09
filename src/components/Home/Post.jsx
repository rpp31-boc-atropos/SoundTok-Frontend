import * as React from 'react';
import styled from 'styled-components';

const Post = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  box-sizing: border-box;
  border-bottom: 1px solid var(--font-line-color-yellow-transparent);
`;

const ProfilePicButton = styled.button`
`;

const ProfilePic = styled.img`
  width: 48px;
  height: 48px;
  margin-right: 12px;
  border-radius: 100%;
  box-sizing: border-box;
  border: 2px solid var(--font-line-color-yellow);
`;

const PostContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const PostHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  margin-bottom: 12px;
`;

const PostUsernameAndTime = styled.button`
  color: var(--font-line-color-yellow-transparent);
`;

const PostRemixButton = styled.button`
  color: var(--font-line-color-yellow-transparent);
  font-size: 16px;

  &:hover {
    color: var(--font-line-color-yellow);
  }
`;

const PostText = styled.div`
`;

const PostAudio = styled.div`
  width: 100%;
  height: 96px;
  margin-top: 12px;
  border-radius: 12px;
  box-sizing: border-box;
  background: var(--main-color-blue-light);
`;

const PostAudioInfo = styled.div`
  font-size: 12px;
  margin-left: 12px;
  color: var(--font-line-color-yellow-transparent);
`;

const Component = () => {
  return (
    <Post>
      <ProfilePicButton>
        <ProfilePic src="https://i.pinimg.com/474x/a3/89/f5/a389f597020f361f7f6d9b79323598fc.jpg"></ProfilePic>
      </ProfilePicButton>
      <PostContent>
        <PostHeader>
          <PostUsernameAndTime>@atrophos · 3h</PostUsernameAndTime>
          <PostRemixButton>
            <i className="ri-sound-module-line"></i>
          </PostRemixButton>
        </PostHeader>
        <PostText>I have been waiting to release this for so long. pls no hate thx. #meow
        </PostText>
        <PostAudio></PostAudio>
        <PostAudioInfo>group meow · <time>1:38</time></PostAudioInfo>
      </PostContent>
    </Post>
  );
};

export default Component;

/* data
{
  profilePicture: "https://i.pinimg.com/474x/a3/89/f5/a389f597020f361f7f6d9b79323598fc.jpg",
  timePosted: "2004-10-19 10:23:54+02", // this would just be when the row gets created. data type called timestamp in pg
  userName: "atrophos",
  postLikes: 123, // STRETCH
  postSaved: false, // STRETCH
  postText: "I have been waiting to release this for so long. pls no hate thx. #meow",
  hashTags: [
    "meow"
  ], // not sure if we need this but when a post is created with a hashtag, think we should send
  the list of hashtags as its own object/array so it can be added to the hashtag table
  projectAudioLink: "someaudiolink",
  projectTitle: "group meow",
  projectLength: "98" // this should be in seconds
}
*/