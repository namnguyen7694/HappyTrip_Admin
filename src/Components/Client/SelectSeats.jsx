import React, { Component } from "react";
import _ from "lodash";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

class SelectSeats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seatCodes: props.seatCodes
    };
  }

  changeSeat = seatCode => {
    if (this.state.seatCodes.indexOf(seatCode) === -1) {
      this.setState(
        {
          seatCodes: [...this.state.seatCodes, seatCode]
        },
        () => this.props.selectSeat(this.state.seatCodes)
      );
    } else {
      this.setState(
        {
          seatCodes: _.pull(this.state.seatCodes, seatCode)
        },
        () => this.props.selectSeat(this.state.seatCodes)
      );
    }
  };

  availableSeat = seat => {
    if (this.props.seatDisable.indexOf(seat) > -1) return false;
    else if (this.props.seatCodes.indexOf(seat) > -1) return "primary";
    else return "";
  };

  renderSeats = () => {
    const Seats = _.get(this.props, "trip.seats", []);
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
                  disabled={this.availableSeat(s.code) === false}
                  color={this.availableSeat(s.code)}
                  key={index}
                  onClick={() => this.changeSeat(s.code)}
                >
                  {s.code}
                </Button>
              );
            })}
          </ButtonGroup>
        </div>
      );
    } else if (Seats.length === 16) {
      return (
        <div>
          <ButtonGroup
            variant="contained"
            aria-label="contained primary button group"
          >
            {Seats.slice(0, 8).map((s, index) => {
              return (
                <Button
                  disabled={this.availableSeat(s.code) === false}
                  color={this.availableSeat(s.code)}
                  key={index}
                  onClick={() => this.changeSeat(s.code)}
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
            {Seats.slice(8, 16).map((s, index) => {
              return (
                <Button
                  disabled={this.availableSeat(s.code) === false}
                  color={this.availableSeat(s.code)}
                  key={index}
                  onClick={() => this.changeSeat(s.code)}
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
                  disabled={this.availableSeat(s.code) === false}
                  color={this.availableSeat(s.code)}
                  key={index}
                  onClick={() => this.changeSeat(s.code)}
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
                  disabled={this.availableSeat(s.code) === false}
                  color={this.availableSeat(s.code)}
                  key={index}
                  onClick={() => this.changeSeat(s.code)}
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
                  disabled={this.availableSeat(s.code) === false}
                  color={this.availableSeat(s.code)}
                  key={index}
                  onClick={() => this.changeSeat(s.code)}
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
                  disabled={this.availableSeat(s.code) === false}
                  color={this.availableSeat(s.code)}
                  key={index}
                  onClick={() => this.changeSeat(s.code)}
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
                  disabled={this.availableSeat(s.code) === false}
                  color={this.availableSeat(s.code)}
                  key={index}
                  onClick={() => this.changeSeat(s.code)}
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
                  disabled={this.availableSeat(s.code) === false}
                  color={this.availableSeat(s.code)}
                  key={index}
                  onClick={() => this.changeSeat(s.code)}
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
    return <div>{this.renderSeats()}</div>;
  }
}

export default SelectSeats;
