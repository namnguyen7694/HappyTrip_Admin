import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { getTripById } from "./../../Actions/trip";
import { createTicket, cancelBooking } from "./../../Actions/ticket";
import ErrorSnackBar from "./../Utils/errorSnackBar";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Grid from "@material-ui/core/Grid";

class Booking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trip: {},
      seatCodes: [],
      seatDisable: [],
      error: ""
    };
  }

  bookingTickets = () => {
    const { trip, seatCodes } = this.state;
    const data = {
      tripId: trip._id,
      seatCodes
    };
    this.props
      .createTicket(data)
      .then(() => this.props.history.push("./"))
      .catch(err => console.log(err));
  };

  selectSeat = seatCode => {
    this.setState({ error: "" });
    if (this.state.seatDisable.indexOf(seatCode) > -1) {
      this.setState({
        error: `Seat ${seatCode} is not avaiable, please select another seat`
      });
    } else if (this.state.seatCodes.indexOf(seatCode) === -1) {
      this.setState({
        seatCodes: [...this.state.seatCodes, seatCode]
      });
    } else {
      this.setState({
        seatCodes: _.pull(this.state.seatCodes, seatCode)
      });
    }
  };

  backgroundSeat = seat => {
    if (this.state.seatDisable.indexOf(seat) > -1) return "secondary";
    else if (this.state.seatCodes.indexOf(seat) > -1) return "primary";
    else return "";
  };

  componentDidMount() {
    const { tripId } = this.props;
    this.props
      .getTripById(tripId)
      .then(() =>
        this.setState({
          trip: this.props.trip,
          seatDisable: this.props.trip.seats
            .filter(s => s.isBooked === true)
            .map(s => s.code)
        })
      )
      .catch(err => console.log(err));
  }

  renderSeats = () => {
    const Seats = _.get(this.state, "trip.seats", []);

    if (Seats.length === 8) {
      return (
        <div>
          <ButtonGroup
            variant="contained"
            aria-label="contained primary button group"
          >
            {Seats.map((s, index) => {
              return (
                <Button
                  color={this.backgroundSeat(s.code)}
                  key={index}
                  onClick={() => this.selectSeat(s.code)}
                >
                  {s.code}
                </Button>
              );
            })}
          </ButtonGroup>
        </div>
      );
    } else if (Seats.length === 40) {
      return (
        <div>
          <ButtonGroup
            variant="contained"
            aria-label="contained primary button group"
          >
            {Seats.slice(0, 10).map((s, index) => {
              return (
                <Button
                  color={this.backgroundSeat(s.code)}
                  key={index}
                  onClick={() => this.selectSeat(s.code)}
                >
                  {s.code}
                </Button>
              );
            })}
          </ButtonGroup>
          <ButtonGroup
            variant="contained"
            aria-label="contained primary button group"
          >
            {Seats.slice(10, 20).map((s, index) => {
              return (
                <Button
                  color={this.backgroundSeat(s.code)}
                  key={index}
                  onClick={() => this.selectSeat(s.code)}
                >
                  {s.code}
                </Button>
              );
            })}
          </ButtonGroup>
          <ButtonGroup
            variant="contained"
            aria-label="contained primary button group"
            style={{ marginTop: "20px" }}
          >
            {Seats.slice(20, 30).map((s, index) => {
              return (
                <Button
                  color={this.backgroundSeat(s.code)}
                  key={index}
                  onClick={() => this.selectSeat(s.code)}
                >
                  {s.code}
                </Button>
              );
            })}
          </ButtonGroup>
          <ButtonGroup
            variant="contained"
            aria-label="contained primary button group"
          >
            {Seats.slice(30, 40).map((s, index) => {
              return (
                <Button
                  color={this.backgroundSeat(s.code)}
                  key={index}
                  onClick={() => this.selectSeat(s.code)}
                >
                  {s.code}
                </Button>
              );
            })}
          </ButtonGroup>
        </div>
      );
    } else
      return (
        <div>
          <ButtonGroup
            variant="contained"
            aria-label="contained primary button group"
          >
            {Seats.slice(0, 10).map((s, index) => {
              return (
                <Button
                  color={this.backgroundSeat(s.code)}
                  key={index}
                  onClick={() => this.selectSeat(s.code)}
                >
                  {s.code}
                </Button>
              );
            })}
          </ButtonGroup>

          <ButtonGroup
            variant="contained"
            aria-label="contained primary button group"
            style={{ marginTop: "20px" }}
          >
            {Seats.slice(10, 20).map((s, index) => {
              return (
                <Button
                  color={this.backgroundSeat(s.code)}
                  key={index}
                  onClick={() => this.selectSeat(s.code)}
                >
                  {s.code}
                </Button>
              );
            })}
          </ButtonGroup>
        </div>
      );
  };

  render() {
    return (
      <Grid container direction="row" justify="center" alignItems="center">
        {_.get(this.state, "error") && (
          <ErrorSnackBar error={_.get(this.state, "error", "")} />
        )}
        <Grid container direction="row" justify="center" alignItems="center">
          {this.renderSeats()}
        </Grid>
        <Button
          color="primary"
          variant="contained"
          onClick={this.bookingTickets}
          style = {{margin : "10px"}}
        >
          Đặt vé
        </Button>
        <Button variant="contained" onClick={this.props.cancelBooking}>
          Đóng
        </Button>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    trip: state.layout.tripEditing
  };
};

export default connect(mapStateToProps, {
  getTripById,
  createTicket,
  cancelBooking
})(Booking);
