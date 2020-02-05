import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Trip from './Trip/Trip';

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
      <Trip/>
    </div>
  );
}