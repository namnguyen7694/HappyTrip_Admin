import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link, withRouter } from "react-router-dom";
import AlertDialog from "../../Utils/alertDialog";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import NumberFormat from "react-number-format";
import Moment from "react-moment";

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    margin: 20
  },

  title: {
    color: "#6b8a78",
    textDecoration: "none",
    fontSize : "24px"
  },
  link: {
    color: "#767b06d6",
    textDecoration: "none",
    fontSize : "16px"
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

const SimpleCard = props => {
  const classes = useStyles();
  const { trip } = props;
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
            <Link to={`/manager/trips/${trip._id}`} className={classes.title}>
              {trip.fromStation.province} - {trip.toStation.province}
            </Link>
            <Typography variant="h6" gutterBottom>
              <Link
                to={`/manager/companies/${trip.company._id}`}
                className={classes.link}
              >
                {trip.company.name}
              </Link>
            </Typography>
            <Typography color="textSecondary">{trip.carType}</Typography>
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
              Điểm xuất phát :{" "}
              <Link
                to={`/manager/stations/${trip.fromStation._id}`}
                className={classes.link}
              >
                {trip.fromStation.name}
              </Link>
            </Typography>
            <Typography color="textPrimary">
              Điểm đến :{" "}
              <Link
                to={`/manager/stations/${trip.toStation._id}`}
                className={classes.link}
              >
                {trip.toStation.name}
              </Link>
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
            <Typography color="textSecondary">
              Số ghế trống: {trip.seats.filter(e => !e.isBooked).length} /{" "}
              {trip.seats.length}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="contained"
          style={{ marginLeft: "auto" }}
          onClick={() =>
            props.history.push(`/manager/trips/${trip._id}/edittrip`)
          }
        >
          Chỉnh sửa
        </Button>
        <AlertDialog
          id={trip._id}
          deleteAction={props.deleteTrip}
          type={"Chuyến đi"}
        />
      </CardActions>
    </Card>
  );
};

export default withRouter(SimpleCard);
