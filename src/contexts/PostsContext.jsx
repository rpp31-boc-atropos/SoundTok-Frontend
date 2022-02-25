// modules
import * as React from 'react';
import axios from 'axios';

// contexts
import { useUserInfo } from './UserContext.jsx';

// components
import dummy from '../components/home/dummy.jsx';

const PostsContext = React.createContext();

const PostsProvider = ({ children }) => {
  const { email, username } = useUserInfo();
  const [isPostUpdated, setIsPostUpdated] = React.useState(false);
  const [isDraftUpdated, setIsDraftUpdated] = React.useState(false);
  const [posts, setPosts] = React.useState(dummy);
  const [drafts, setDrafts] = React.useState(null);
  const [selectedProjectId, setSelectedProjectId] = React.useState(null);

  // QUERY FOR ALL POSTS
  React.useEffect(async () => {
    const result = await axios('https://api.soundtok.live/');
    setPosts(result.data);
  }, [isPostUpdated]);

  // QUERY FOR ALL DRAFTS
  React.useEffect(async () => {
    if (email != null) {  // need to wait for Auth0 context to have the email available
      const result = await axios(`https://api.soundtok.live/drafts/${email}`);
      setDrafts(result.data);
    }
  }, [isDraftUpdated, email]);

  const postsContextValue = {
    isPostUpdated,
    setIsPostUpdated,
    isDraftUpdated,
    setIsDraftUpdated,
    posts,
    setPosts,
    drafts,
    setDrafts,
    selectedProjectId,
    setSelectedProjectId
  };

  return (
    <PostsContext.Provider value={postsContextValue}>
      {children}
    </PostsContext.Provider>
  );
};

const usePosts = () => React.useContext(PostsContext);

export { PostsProvider, usePosts };
