import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
//import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
//import IconButton from '@material-ui/core/IconButton';
//import DeleteIcon from '@material-ui/icons/Delete';
import Avatar from '@material-ui/core/Avatar';
import Folder from '@material-ui/icons/Folder';

import { Draft } from './Styles/styles.js';

import { usePosts } from '../../contexts/PostsContext.jsx';

const DraftList = ({ setDraft }) => {

  const { drafts } = usePosts();

  if (drafts === null || drafts === undefined) {
    return null;
  }

  return (
    <div>
      <List dense={false}>
        {drafts.map((item, index) => (<DraftItem key={index} draft={item} setDraft={setDraft} />))}
      </List>
    </div>
  );
};

const DraftItem = ({draft, setDraft}) => {

  const clickDraft = () => {
    setDraft(draft);
  };

  return (
    <Draft>
      <ListItem button onClick={clickDraft}>
        <ListItemAvatar>
          <Avatar>
            <Folder />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          secondaryTypographyProps={{style: {color: 'yellow'}}}
          primary={draft.projectTitle}
          secondary={new Date(draft.timePosted).toLocaleString('en-US')}
        />
        {/* <ListItemSecondaryAction >
          <IconButton aria-label="Delete" m={0} onClick={() => {}}>
            <DeleteIcon color='primary'/>
          </IconButton>
        </ListItemSecondaryAction> */}
      </ListItem>
    </Draft>
  );
};

export default DraftList;