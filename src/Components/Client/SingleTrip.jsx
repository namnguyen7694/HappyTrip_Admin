import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {withRouter} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import Booking from './Booking';
import NumberFormat from 'react-number-format';
import Moment from 'react-moment';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    margin: 20 
  },
 
  title: {
    color: "#6b8a78"
  },
  image: {
    width: 200,
    height: 160
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  }
});

const SimpleCard = (props) => {
  const classes = useStyles();
  const {trip, tripEditing} = props;
  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="flex-start"
        >
          <Grid item md={6}>
            <Typography variant="h5" className={classes.title} gutterBottom>
              {trip.fromStation.province} - {trip.toStation.province}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {trip.company.name}
            </Typography>
            <ButtonBase className={classes.image}>
              <img
                className={classes.img}
                alt="complex"
                src={
                  trip.company.image
                    ? trip.company.image
                    : "https://upload.wikimedia.org/wikipedia/vi/1/1a/Nh%C3%A0_ga_b%E1%BA%BFn_xe_mi%E1%BB%81n_%C4%90%C3%B4ng.JPG"
                }
              />
            </ButtonBase>
          </Grid>
          <Grid item md={6}>
            <Typography color="textPrimary">
              Điểm xuất phát : {trip.fromStation.name}
            </Typography>
            <Typography color="textPrimary">
              Điểm đến : {trip.toStation.name}
            </Typography>
            <Typography color="textPrimary">
              Giá vé :{" "}
              <NumberFormat
                value={trip.price}
                displayType={"text"}
                thousandSeparator={true}
                suffix={" VND"}
              />
            </Typography>
            <Typography color="textPrimary">
              Giờ khởi hành:{" "}
              <Moment format=" HH:mm DD/MM/YYYY">{trip.startTime}</Moment>
            </Typography>
            <Typography color="textSecondary">{trip.carType}</Typography>
            <Typography color="textSecondary">
              Số ghế trống: {trip.seats.filter(e => !e.isBooked).length} /{" "}
              {trip.seats.length}
            </Typography>
          </Grid>
        </Grid>
        <CardActions>
          {tripEditing._id === trip._id ? (
            <Booking tripId={trip._id} />
          ) : (
            <Button
              size="small"
              variant="contained"
              style={{ marginLeft: "auto" }}
              onClick={() => props.getTripById(trip._id)}
            >
              {trip.seats.filter(e => !e.isBooked).length === 0
                ? "Hết ghế "
                : "Chọn ghế"}
            </Button>
          )}
        </CardActions>
      </CardContent>
    </Card>
  );
}

export default withRouter(SimpleCard);