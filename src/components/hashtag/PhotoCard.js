import React, { useState } from 'react';
import { usePlayer } from '../../contexts/player/playerContext';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import { styled } from '@material-ui/styles';
import { IconButton } from '@material-ui/core';
import { PlayCircleFilledRounded, Favorite, ExpandMoreOutlined } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'

const PhotoCard = ({ post, index }) => {



  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto'
  }));

  const fmtMSS = (s) => {
    return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + ~~s;
  };

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const { SetCurrent, currentSong, songs } = usePlayer();

  const { username, postLikes, projectTitle, postText, profilePicture, projectLength, projectAudioLink, projectImageLink } = post;

  return (
    <div>
      <Card
        style={{ backgroundColor: ' #ffface' }}
        elevation={1}
      >
        <CardHeader
          titleTypographyProps={{ variant: 'body1' }}
          subheaderTypographyProps={{ variant: 'body2' }}
          title={post.projectTitle}
          subheader={fmtMSS(projectLength)}
          action={
            <IconButton
              onClick={() => {
                songs.push(post);
                SetCurrent(songs.length - 1);
              }}
              role='photoCardPlay'
            >
              <PlayCircleFilledRounded />
            </IconButton>
          }
        />

        <CardMedia
          component="img"
          height="180"
          image={projectImageLink ? projectImageLink : 'https://i.pinimg.com/236x/1b/32/3e/1b323e0b909bdfa943208f3aad2ba8bb--designers.jpg'}
          alt="Project photo"
        />
        <CardActions disableSpacing>
          <Avatar
            alt="Profile Picture "
            src={profilePicture}
            sx={{ width: '48px', height: '48px' }}
          />
          {username}
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
          >
            <ExpandMoreOutlined />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              {postText}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div >
  );
};

export default PhotoCard;







