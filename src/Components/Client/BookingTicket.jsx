import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from "lodash";
import {getTripById} from './../../Actions/trip';
import {createTicket} from './../../Actions/ticket'
import ErrorSnackBar from "./../Utils/errorSnackBar";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

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
    this.props.createTicket(data)
      .then( () => this.props.history.push('./'))
      .catch(err => console.log(err))
  };

  selectSeat = seatCode => {
    this.setState({error : ""})
    if (this.state.seatDisable.indexOf(seatCode) > -1) {
      this.setState({
        error : `Seat ${seatCode} is not avaiable, please select another seat`
      })
    }
    else if (this.state.seatCodes.indexOf(seatCode) === -1) {
      this.setState({
        seatCodes: [...this.state.seatCodes, seatCode]
      });
    }
    else {
      this.setState ({
        seatCodes : _.pull(this.state.seatCodes, seatCode)
      })
    }
  };

  backgroundSeat = (seat) => {
    if (this.state.seatDisable.indexOf(seat) > -1) return "secondary";
    else if (this.state.seatCodes.indexOf(seat) > -1) return "primary";
    else return ""
  }

  componentDidMount() {
    const { tripId } = this.props;
    this.props
      .getTripById(tripId)
      .then(() =>
        this.setState({
          trip: this.props.trip,
          seatDisable : this.props.trip.seats.filter( s => s.isBooked === true).map( s => s.code)
        })
      )
      .catch(err => console.log(err));
  }

  renderSeats = () => {
    const totalSeats = _.get(this.state, "trip.seats", []).length;
    return (
      <div>
        {_.get(this.state, "error") && (
          <ErrorSnackBar error={_.get(this.state, "error", "")} />
        )}
        <ButtonGroup
          variant="contained"
          aria-label="contained primary button group"
        >
        
          {_.get(this.state, "trip.seats", [])
            .slice(0, totalSeats / 2)
            .map((s, index) => {
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
        <br />
        <br />
        <br />
        <ButtonGroup
          variant="contained"
          aria-label="contained primary button group"
        >
        
          {_.get(this.state, "trip.seats", [])
            .slice(totalSeats / 2, totalSeats)
            .map((s, index) => {
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
      <div>
        {this.renderSeats()}
        <br/>
        <Button color="primary" variant="contained" onClick={this.bookingTickets}>Submit</Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    trip: state.layout.tripEditing
  }
}

export default connect(mapStateToProps, {getTripById, createTicket})(Booking);