import React, {useState, useEffect} from 'react';
// import { useAuth } from '../../contexts/AuthContext.jsx';
import Song from './Song.jsx';
import Draft from './Draft.jsx';
import dummySongs from './dummySongs.jsx';
import dummyDrafts from './dummyDrafts.jsx';
import styled from 'styled-components';
const axios = require('axios');

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
  flex-direction: row;
  justify-content:space-around;
  height: 600px;
  width: 1000px;
  margin-top: 10px;
  flex-wrap: wrap;
`;

// const UserPosts = ({isCurrentUser}) => {
const UserPosts = ({isCurrentUser, setIsCurrentUser, profileName}) => {
  // const { user } = useAuth();
  const [tab, setTab] = useState('Posts');
  const [songs, setSongs] = useState(dummySongs);
  const [drafts, setDrafts] = useState(dummyDrafts);
  // const {projectsToDelete, setProjectsToDelete} = useState([]); - stretch goal - delete multiple songs
  const [username, setUsername] = useState('leggo'); //update with Context when available


  const removeProject = (projectId, source) => {
    // needs call to remove from db. stretch goal - select and remove multiple songs
    // to-dos: add confirmation popup, add select boxes to select multiple songs before clicking a separate delete button
    // cut this section after post request is implemented
    //Modifying directly in state instead of waiting for response for faster user experience
    if (source === 'Posts') {
      setSongs(songs.filter(song => song.projectId !== projectId));
    } else {
      setDrafts(drafts.filter(draft => draft.projectId !== projectId));
    }

    // axios.post('/deleteProjects', projectsToDelete)
    let formData = {
      source: source,
      projectId: projectId //will eventually be [songsToDelete]
    };

    // axios.delete('/deleteProject', {data: formData})
    //   .then(function (response) {
    //     // console.log(response);
    //     console.log('Project successfully deleted');
    //     if (source === 'Posts') {
    //       //will need to filter out all songIds in the array
    //       // setSongs(songs.filter(song => song.projectId !== projectId));
    //     } else {
    //       // setDrafts(drafts.filter(draft => draft.projectId !== projectId));
    //     }
    //   })
    //   .catch(function (error) {
    //     //pop-up with with message - please review error and try again
    //     //could make popup - warning
    //     // console.log('Project failed to delete. Please refresh the page and try again');
    //     console.log(error);
    //   });

    const optionGetPosts = {
      // method: 'PUT',
      url: 'api.soundtok.live/removePost',
      data: formData
    };

    axios.delete(optionGetPosts)
      .then((response) => {
        console.log('response', response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // const optionGetPosts = {
    //   method: 'GET',
    //   url: 'api.soundtok.live/getProfileData/projects/stella',
    // };

    // axios.get(optionGetPosts)
    //   .then((response) => {
    //     // setSongs(response.data);
    //     console.log('response: ', response.data);
    //     // setSongs(response.data);
    //   })
    //   .catch((err) => {
    //     //make pop-up
    //     console.log(err);
    //   });
    let location = window.location.href;
    let userProfile = location.slice((window.location.href.indexOf('profile') + 8));
    // console.log('endpoint', userProfile);

    if (userProfile !== '') {
      setUsername(userProfile);
    } else {
      userProfile = username;
      setIsCurrentUser(true);
    }
    // setUsername(userProfile);

    // axios.get(`/profile/${profileName}`, {
    axios.get(`/profile`, {
      params: {
        // username: 'leggo'
        username: userProfile
      }
    })
      .then((response) => {
        // console.log('post response', response.data.projectdata);
        setSongs(response.data.projectdata);

      })
      .catch((err) => {
        console.log(err);
      });


    // if (isCurrentUser) {  //update after team sets up sample draft data
    //   axios.get('/userDrafts', {
    //     params: {
    //       username: profileName
    //     }
    //   })
    //     .then((response) => {
    //       // setDrafts(response.data);
    //       console.log('response: ', response.data);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }
  }, []);

  return (
    <>
      <ButtonWrapper>
        <Button onClick={() => setTab('Posts')} >Posts</Button>
        {isCurrentUser ?
          <Button onClick={() => setTab('Drafts')}>Drafts</Button>
          : null}
      </ButtonWrapper>
      {/* <p>User from context: {user}</p> */}
      <PostWrapper>
        {(tab === 'Posts' || !isCurrentUser) ? songs.map((song, i) => {
          return (
            <Song
              key={i}
              songId={song.projectId}
              songImage={song.projectImage}
              projectTitle={song.projectTitle}
              songDescription={song.projectDescription}
              projectAudioLink={song.projectAudioLink}
              projectLength={song.projectLength}
              tags={song.tags}
              removeSong={removeProject}
              isCurrentUser={isCurrentUser}
            ></Song>
          );
        }) : null}
        {(tab === 'Drafts' && isCurrentUser) ? drafts.map((draft, i) => {
          return (
            <Draft
              key={i}
              songId={draft.projectId}
              username={draft.username}
              songImage={draft.projectImage}
              projectTitle={draft.projectTitle}
              songDescription={draft.projectDescription}
              projectAudioLink={draft.projectAudioLink}
              projectLength={draft.projectLength}
              tags={draft.tags}
              removeDraft={removeProject}
            ></Draft>
          );
        }) : null}
      </PostWrapper>
    </>
  );
};

export default UserPosts;

