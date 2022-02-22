import * as React from 'react';
import axios from 'axios';
import dummy from '../components/home/dummy.jsx';

const PostsContext = React.createContext();

const PostsProvider = ({ children }) => {
  const [isPostUpdated, setIsPostUpdated] = React.useState(false);
  const [posts, setPosts] = React.useState(dummy);

  // QUERY FOR ALL POSTS
  React.useEffect(async () => {
    const result = await axios('http://54.91.250.255:1234/');

    setPosts(result.data);
  }, [isPostUpdated]);

  const postsContextValue = {
    isPostUpdated,
    setIsPostUpdated,
    posts,
    setPosts,
  };

  return (
    <PostsContext.Provider value={postsContextValue}>
      {children}
    </PostsContext.Provider>
  );
};

const usePosts = () => React.useContext(PostsContext);

export { PostsProvider, usePosts };
