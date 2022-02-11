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

  return (
    <>
      <h2>Post Section</h2>

      {/* <div onClick={updateTab} >Posts</div> */}
      <button onClick={() => setTab('Posts')} >Posts</button>
      {isCurrentUser ?
        <button onClick={() => setTab('Drafts')}>Drafts</button>
        : null}
      {/* <p>User from context: {user}</p> */}
      {songs.map((song, i) => {
        return (
          <Song
            key={i}
            username={song.username}
            profilePicture={song.profilePicture}
            projectTitle={song.projectTitle}
            postDescription={song.postText}
            projectAudioLink={song.projectAudioLink}
            projectLength={song.projectLength}
            tags={song.tags}
          ></Song>
        );
      })}

      {/* {(tab === 'Posts') ? <Song></Song> : null}
      {(tab === 'Posts') ? <Song></Song> : null} */}
      {(tab === 'Drafts') ? <Draft></Draft> : null}
    </>
  );
};

export default UserPosts;

