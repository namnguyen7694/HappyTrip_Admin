import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {withRouter} from 'react-router-dom';
import AlertDialog from '../../Utils/alertDialog'

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    margin: 40 
  },
 
  title: {
    color: "#6b8a78"
  },
  info: {
    marginBottom: 12,
  },
  detail: {
    marginBottom: 6,
    color: "green"
  },
});

const SimpleCard = (props) => {
  const classes = useStyles();
  const {trip} = props;
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h4" className={classes.title} gutterBottom>
          {trip.fromStation.province} - {trip.toStation.province}
        </Typography>
        <Typography variant="h6" className={classes.info} gutterBottom>
          {trip.company.name}
        </Typography>
        <Typography className={classes.detail} color="textSecondary">
          {trip.carType}
        </Typography>
        <Typography className={classes.detail} color="textSecondary">
         Start Time: {trip.startTime}
        </Typography>
        <Typography className={classes.detail} color="textSecondary">
          Số ghế trống: {trip.seats.filter( e => !e.isBooked).length} / {trip.seats.length}
        </Typography>
        <Typography color="textPrimary">
          Ga đi :  {trip.fromStation.name}
        </Typography>
        <Typography color="textPrimary">
          Ga đến :  {trip.toStation.name}
        </Typography>
        <Typography color="textPrimary">
          Giá vé :  {trip.price}
        </Typography>
        
      </CardContent>
      <CardActions >
        <Button size="small" variant="contained" style={{marginLeft :  "auto"}}
        onClick={ () => props.history.push(`/manager/trips/${trip._id}/edittrip`)}
        >Edit Trip</Button>
        <AlertDialog id={trip._id} deleteAction = {props.deleteTrip} type={"Trip"}/>
      </CardActions>
    </Card>
  );
}

export default withRouter(SimpleCard);