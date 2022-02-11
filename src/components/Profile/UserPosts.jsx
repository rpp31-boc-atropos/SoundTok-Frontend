import React, {useState} from 'react';
// import { useAuth } from '../../contexts/AuthContext.jsx';
import Song from './Song.jsx';
import Draft from './Draft.jsx';
import dummySongs from './dummySongs.jsx';
import dummyDrafts from './dummyDrafts.jsx';
import styled from 'styled-components';

const Button = styled.button`
  color: rgb(255, 250, 206);
  border: 2px solid rgb(255, 250, 206);
  margin: 0px 10px;
  padding: 2px 5px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const PostWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const BigWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 600px;
  width: 1000px;
  margin-top: 10px;
`;

const UserPosts = ({isCurrentUser}) => {

  // const { user } = useAuth();
  const [tab, setTab] = useState('Posts');
  const [songs, setSongs] = useState(dummySongs);
  const [drafts, setDrafts] = useState(dummyDrafts);

  const removeSong = (songId, source) => {
    // needs call to remove from db. stretch goal - select and remove multiple songs
    if (source === 'Posts') {
      setSongs(songs.filter(song => song.songId !== songId));
    } else {
      setDrafts(drafts.filter(draft => draft.songId !== songId));
    }
  };

  return (
    <>
      <h2>Post Section</h2>
      <ButtonWrapper>
        <Button onClick={() => setTab('Posts')} >Posts</Button>
        {isCurrentUser ?
          <Button onClick={() => setTab('Drafts')}>Drafts</Button>
          : null}
      </ButtonWrapper>
      {/* <p>User from context: {user}</p> */}
      <BigWrapper>
        <PostWrapper>
          {(tab === 'Posts' || !isCurrentUser) ? songs.map((song, i) => {
            return (
              <Song
                key={i}
                songId={song.songId}
                username={song.username}
                profilePicture={song.profilePicture}
                projectTitle={song.projectTitle}
                postDescription={song.postText}
                projectAudioLink={song.projectAudioLink}
                projectLength={song.projectLength}
                tags={song.tags}
                removeSong={removeSong}
              ></Song>
            );
          }) : null}

          {(tab === 'Drafts' && isCurrentUser) ? drafts.map((draft, i) => {
            return (
              <Draft
                key={i}
                songId={draft.songId}
                username={draft.username}
                profilePicture={draft.profilePicture}
                projectTitle={draft.projectTitle}
                postDescription={draft.postText}
                projectAudioLink={draft.projectAudioLink}
                projectLength={draft.projectLength}
                tags={draft.tags}
                removeDraft={removeSong}
              ></Draft>
            );
          }) : null}
              </PostWrapper>
      </BigWrapper>
    </>
  );
};

export default UserPosts;

