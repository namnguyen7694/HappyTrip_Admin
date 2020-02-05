import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { getTripById } from "./../../Actions/trip";
import { createTicket, cancelBooking } from "./../../Actions/ticket";
import ErrorSnackBar from "./../Utils/errorSnackBar";
import Grid from "@material-ui/core/Grid";
import HorizontalStepper from './Stepper';

class Booking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trip: {},
      seatCodes: [],
      info: {},
      seatDisable: []
    };
  }

  bookingTickets = () => {
    const { trip, seatCodes, info } = this.state;
    const data = {
      tripId: trip._id,
      info,
      seatCodes
    };
    this.props
      .createTicket(data)
      .then(() => this.props.getTripById(this.props.tripId))
      .then(() => {
          this.setState({
            trip: this.props.trip,
            seatDisable: this.props.trip.seats
              .filter(s => s.isBooked === true)
              .map(s => s.code)
          })
      })
      .catch(err => console.log(err));
  };

  setInfo = (info) => {
    this.setState({info})
  }

  selectSeat = (seatCodes) => {
      this.setState({
        seatCodes
      })
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

  render() {
    return (
      <Grid container direction="row" justify="center" alignItems="center">
        {_.get(this.state, "error") && (
          <ErrorSnackBar error={_.get(this.state, "error", "")} />
        )}
        <Grid container direction="row" justify="center" alignItems="center">
          <HorizontalStepper
            trip={this.state.trip}
            seatDisable={this.state.seatDisable}
            seatCodes={this.state.seatCodes}
            info={this.state.info}
            setInfo={this.setInfo}
            selectSeat={this.selectSeat}
            bookingTickets={this.bookingTickets}
          />
        </Grid>
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
