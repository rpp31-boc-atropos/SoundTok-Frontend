import React from 'react';
import { usePlayer } from '../../contexts/player/playerContext';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
// import { styled } from '@material-ui/styles';
import { IconButton } from '@material-ui/core';
import { PlayCircleFilledRounded, Favorite } from '@material-ui/icons';
// import { ProjectPhotos } from './ProjectPhotos';



const PhotoCard = ({ post, index }) => {


  const { SetCurrent, currentSong, songs } = usePlayer();

  const { username, postLikes, projectTitle } = post;


  // const getRandomPhoto = () => {
  //   return ProjectPhotos[Math.floor(Math.random() * 8)]
  // }

  return (
    <div>
      <Card
        style={{ backgroundColor: ' #ffface' }}
        elevation={1}
        onClick={() => SetCurrent(index)}
      >
        <CardHeader
          style={{ height: '2vw' }}
          action={
            // <IconButton>
            //   <PlayCircleFilledRounded onClick={() => SetCurrent(index)} />
            // </IconButton>
            <IconButton>
              <Favorite />
            </IconButton>
          }
          title={post.projectTitle}
        />
        <CardMedia
          component="img"
          height="200"
          // image={post.projectPicture ? post.projectPicture : getRandomPhoto()}
          image={post.projectImageLink}
          alt="Project photo"
        />
      </Card>
    </div >
  );
};

export default PhotoCard;