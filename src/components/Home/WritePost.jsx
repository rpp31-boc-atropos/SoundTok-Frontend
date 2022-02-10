import * as React from "react";
import styled from "styled-components";

const WritePost = styled.div`
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

const TextInput = styled.textarea`
  width: 100%;
  min-height: 20px;
  max-height: 60px;
  background: none;
  border-style: none;
  box-sizing: border-box;
  border-bottom: 1px solid var(--font-line-color-yellow);
  font-family: inherit;
  font-size: 20px;
  color: var(--font-line-color-yellow);
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
  align-self: flex-end;
`;

// const WritePostContent = styled.div`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   box-sizing: border-box;
// `;

// const WritePostText = styled.form`
//   padding-bottom: 12px;
//   border-bottom: 1px solid var(--font-line-color-yellow);
// `;

// const WritePostTextInput = styled.input`
//   width: 100%;
//   background: none;
//   border-style: none;
// `;

// const WritePostAudioInput = styled.input`
//   width: 36px;
//   height: 36px;
// `;

// const WritePostSubmitButton = styled.button`
// `;

// const WritePostCharacterCount = styled.div`
//   text-align: right;
//   font-size: 12px;
//   color: var(--font-line-color-yellow-transparent);
// `;

const Component = () => {
  return (
    <WritePost>
      <ProfilePicButton>
        <ProfilePic src="https://i.pinimg.com/474x/a3/89/f5/a389f597020f361f7f6d9b79323598fc.jpg"></ProfilePic>
      </ProfilePicButton>
      <Form>
        <FlexColumn>
          <Inputs>
            <label htmlFor="post-text">
              <TextInput
                type="text"
                id="post-text"
                name="postText"
                maxlength="140"
                rows="3"
                cols="50"
                placeholder="Share your sound"
              ></TextInput>
            </label>
            <AudioInputArea>
              <label htmlFor="post-audio">
                <input
                  type="file"
                  id="post-audio"
                  name="projectAudioLink"
                  accept="audio/*"
                ></input>
              </label>
            </AudioInputArea>
          </Inputs>
          <Submit type="submit">Post</Submit>
        </FlexColumn>
      </Form>
    </WritePost>
  );
};

export default Component;
