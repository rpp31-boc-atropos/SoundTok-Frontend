import React, {useState} from 'react';
// import { useAuth } from '../../contexts/AuthContext.jsx';
import Song from './Song.jsx';
import Draft from './Draft.jsx';
import dummySongs from './dummySongs.jsx';
import dummyDrafts from './dummyDrafts.jsx';

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
      <button onClick={() => setTab('Posts')} >Posts</button>
      {isCurrentUser ?
        <button onClick={() => setTab('Drafts')}>Drafts</button>
        : null}
      {/* <p>User from context: {user}</p> */}
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
    </>
  );
};

export default UserPosts;

