import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import PersonIcon from '@material-ui/icons/Person';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Manager(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" >
        <ListItem button onClick= { () => props.history.push('/manager/stations')}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Stations Manager" />
        </ListItem>
        <ListItem button onClick= { () => props.history.push('/manager/companies')}>
          <ListItemIcon>
            <EmojiTransportationIcon />
          </ListItemIcon>
          <ListItemText primary="Company Manager" />
        </ListItem>
        <ListItem button onClick= { () => props.history.push('/manager/trips')}>
          <ListItemIcon>
            <DirectionsBusIcon />
          </ListItemIcon>
          <ListItemText primary="Trips Manager" />
        </ListItem>
        <ListItem button onClick= { () => props.history.push('/manager/tickets')}>
          <ListItemIcon>
            <ConfirmationNumberIcon />
          </ListItemIcon>
          <ListItemText primary="Tickets Manager" />
        </ListItem>
        <ListItem button onClick= { () => props.history.push('/manager/users')}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Users Manager" />
        </ListItem>
      </List>
    </div>
  );
}