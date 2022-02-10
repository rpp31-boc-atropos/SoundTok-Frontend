import * as React from 'react';
import styled from 'styled-components';

const WritePostWrapper = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  box-sizing: border-box;
  border-bottom: 1px solid var(--font-line-color-yellow-transparent);
`;

const ProfilePicButton = styled.button``;

const ProfilePic = styled.img`
  width: 48px;
  height: 48px;
  margin-right: 12px;
  border-radius: 100%;
  box-sizing: border-box;
  border: 2px solid var(--font-line-color-yellow);
`;

const Form = styled.form`
  width: 100%;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const Inputs = styled.div`
  display: inherit;
  flex-direction: row;
`;

const ProjectTitle = styled.input`
  width: 100%;
  font-size: inherit;
  margin-bottom: 4px;
`;

const TextInput = styled.textarea`
  width: 100%;
  min-height: 20px;
  max-height: 96px;
  background: none;
  box-sizing: border-box;
  border-top: 1px solid var(--font-line-color-yellow-transparent);
  border-bottom: 1px solid var(--font-line-color-yellow);
  padding-bottom: 12px;
  font-family: inherit;
  font-size: 20px;
  color: var(--font-line-color-yellow);
  overflow-wrap: break-word;
`;

const CharacterCount = styled.span`
  font-size: 12px;
  color: var(--font-line-color-yellow-transparent);
`;

const AudioInputArea = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 12px;
  box-sizing: border-box;
  background: var(--main-color-blue-light);
  margin-left: 12px;
`;

const Submit = styled.button`
  width: 96px;
  align-self: flex-end;
  text-align: center;
  border: 1px solid white;
`;

const WritePost = () => {
  const maxCharacters = 140;
  const [textCharacterCount, setTextCharacterCount] = React.useState(0);

  const handleTitleCharacterCount = (event) => {
    event.preventDefault();
    const count = event.target.value.length;
    if (count > maxCharacters) {
      event.target.value = event.target.value.slice(0, maxCharacters);
    }
  };

  const handleTextCharacterCount = (event) => {
    event.preventDefault();
    const count = event.target.value.length;
    if (count > maxCharacters) {
      event.target.value = event.target.value.slice(0, maxCharacters);
      setTextCharacterCount(maxCharacters);
    } else {
      setTextCharacterCount(count);
    }
  };

  return (
    <WritePostWrapper>
      <ProfilePicButton>
        <ProfilePic src='https://i.pinimg.com/474x/a3/89/f5/a389f597020f361f7f6d9b79323598fc.jpg'></ProfilePic>
      </ProfilePicButton>
      <Form>
        <FlexColumn>
          <Inputs>
            <FlexColumn>
              <label htmlFor='project-title'>
                <ProjectTitle
                  type='text'
                  id='project-title'
                  name='projectTitle'
                  maxlength='60'
                  rows='1'
                  cols='60'
                  placeholder='Project Title'
                  onChange={handleTitleCharacterCount}
                ></ProjectTitle>
              </label>
              <label htmlFor='post-text'>
                <TextInput
                  id='post-text'
                  name='postText'
                  maxlength='140'
                  rows='2'
                  cols='70'
                  placeholder='Share your sound'
                  onChange={handleTextCharacterCount}
                ></TextInput>
              </label>
              <CharacterCount>
                <span>{textCharacterCount}</span>/140
              </CharacterCount>
            </FlexColumn>
            <AudioInputArea>
              <label htmlFor='post-audio'>
                <input
                  type='file'
                  id='post-audio'
                  name='projectAudioLink'
                  accept='audio/*'
                ></input>
              </label>
            </AudioInputArea>
          </Inputs>
          <Submit type='submit'>Post</Submit>
        </FlexColumn>
      </Form>
    </WritePostWrapper>
  );
};

export default WritePost;
