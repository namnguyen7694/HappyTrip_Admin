import React, { Component } from "react";
import TripList from "./Trip";
import Button from "@material-ui/core/Button";

class Explore extends Component {
  render() {
    return (
      <div>
        <h3>Wellcome to Vexere.com</h3>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "15px" }}
          onClick={() => this.props.history.push('/ticketmanager')}
        >
          Ticket Manager
        </Button>
        <TripList />
      </div>
    );
  }
}

export default Explore;
