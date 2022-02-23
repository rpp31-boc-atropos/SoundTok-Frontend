import React, {useEffect, useState} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

import DeleteIcon from '@material-ui/icons/Delete';
import Folder from '@material-ui/icons/Folder';
import Add from '@material-ui/icons/Add';

import {Draft} from './Styles/styles.js';
import fakeData from './fakeDraftData.js';


const DraftList = ({ setDraft, newDraft }) => {

  const [draftList, setDraftList] = useState(null);

  useEffect(() => {

    //axios get drafts from API
    setDraftList(fakeData);

  }, []);

  if (draftList === null) {
    return null;
  }

  return (
    <div>
      <List dense={false}>
        {/* <Draft>
          <ListItem button onClick={newDraft}>
            <ListItemAvatar>
              <Avatar>
                <Add />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary='New Draft'
            />
          </ListItem>
        </Draft> */}
        {draftList.map((item, index) => (<DraftItem key={index} draft={item} setDraft={setDraft} />))}
      </List>
    </div>
  );
};

const DraftItem = ({draft, setDraft}) => {

  console.log(draft.name);
  const clickDraft = (event) => {
    console.log('loading: ', draft.name);
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
          primary={draft.name}
          secondary={draft.date}
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