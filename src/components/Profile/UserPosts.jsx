import React, {useState} from 'react';
// import { useAuth } from '../../contexts/AuthContext.jsx';
import Song from './Song.jsx';
import Draft from './Draft.jsx';

const UserPosts = () => {

  // const { user } = useAuth();
  const [tab, setTab] = useState('Posts');

  return (
    <>
      <h2>Post Section</h2>

      {/* <div onClick={updateTab} >Posts</div> */}
      <div onClick={() => setTab('Posts')} >Posts</div>
      <div onClick={() => setTab('Drafts')}>Drafts</div>
      {/* <p>User from context: {user}</p> */}
      {(tab === 'Posts') ? <Song></Song> : null}
      {(tab === 'Posts') ? <Song></Song> : null}
      {(tab === 'Drafts') ? <Draft></Draft> : null}
    </>
  );
};

export default UserPosts;

