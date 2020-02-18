import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";
import { getTripById, deleteTrip } from "../../../Actions/trip";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AlertDialog from "../../Utils/alertDialog";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import NumberFormat from "react-number-format";
import Moment from "react-moment";

class TripById extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trip: {}
    };
  }

  classes = {
    card: {
      minWidth: 275,
      margin: 20
    },

    title: {
      color: "#6b8a78"
    },
    link: {
      color: "#767b06d6",
      textDecoration: "none",
      fontSize: "16px"
    },
    image: {
      width: 400,
      height: 320
    },
    img: {
      margin: "auto",
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%"
    }
  };

  deleteTrip = id => {
    this.props.deleteTrip(id);
    this.props.history.push("./");
  };

  componentDidMount = async () => {
    const tripId = this.props.match.params.id;
    await this.props.getTripById(tripId);
    await this.setState({
      trip: this.props.tripEditing
    });
  };
  render() {
    const { trip } = this.state;
    return (
      <Card style={this.classes.card}>
        <CardContent>
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="flex-start"
          >
            <Grid item md={8}>
              <Typography variant="h5" style={this.classes.title} gutterBottom>
                {_.get(trip, "fromStation.province")} -{" "}
                {_.get(trip, "toStation.province")}
              </Typography>
              <Typography variant="h6" gutterBottom>
                <Link
                  to={`/manager/companies/${_.get(trip, "company._id")}`}
                  style={this.classes.link}
                >
                  {_.get(trip, "company.name")}
                </Link>
              </Typography>
              <Typography color="textSecondary">
                {_.get(trip, "carType")}
              </Typography>
              <ButtonBase style={this.classes.image}>
                <img
                  style={this.classes.img}
                  alt="complex"
                  src={
                    _.get(trip, "company.image")
                      ? _.get(trip, "company.image")
                      : "https://upload.wikimedia.org/wikipedia/vi/1/1a/Nh%C3%A0_ga_b%E1%BA%BFn_xe_mi%E1%BB%81n_%C4%90%C3%B4ng.JPG"
                  }
                />
              </ButtonBase>
            </Grid>
            <Grid item md={4}>
              <Typography color="textPrimary">
                Điểm xuất phát :{" "}
                <Link
                  to={`/manager/stations/${_.get(trip, "fromStation._id")}`}
                  style={this.classes.link}
                >
                  {_.get(trip, "fromStation.name")}
                </Link>
              </Typography>
              <Typography color="textPrimary">
                Điểm đến :{" "}
                <Link
                  to={`/manager/stations/${_.get(trip, "toStation._id")}`}
                  style={this.classes.link}
                >
                  {_.get(trip, "toStation.name")}
                </Link>
              </Typography>
              <Typography color="textPrimary">
                Giá vé :{" "}
                <NumberFormat
                  value={_.get(trip, "price")}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" VND"}
                />
              </Typography>
              <Typography color="textPrimary">
                Giờ khởi hành:{" "}
                <Moment format=" HH:mm DD/MM/YYYY">
                  {_.get(trip, "startTime")}
                </Moment>
              </Typography>
              <Typography color="textSecondary">
                Số ghế trống:{" "}
                {_.get(trip, "seats", []).filter(e => !e.isBooked).length} /{" "}
                {_.get(trip, "seats", []).length}
              </Typography>
              <Typography color="textSecondary">
                Ghế trống:{" "}
                {_.get(trip, "seats", [])
                  .filter(e => !e.isBooked)
                  .map(e => e.code)
                  .join(", ")}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            style={{ marginLeft: "auto" }}
            onClick={() => this.props.history.push("./")}
          >
            Trở về
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={() =>
              this.props.history.push(
                `/manager/trips/${_.get(trip, "_id")}/edittrip`
              )
            }
          >
            Chỉnh sửa
          </Button>
          <AlertDialog
            id={_.get(trip, "_id")}
            deleteAction={this.deleteTrip}
            type={"Chuyến đi"}
          />
        </CardActions>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    tripEditing: state.layout.tripEditing
  };
};

export default connect(mapStateToProps, { getTripById, deleteTrip })(TripById);
