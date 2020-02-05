import React, { Component } from "react";
import TripList from "./Trip";
import Button from "@material-ui/core/Button";

class Explore extends Component {
  render() {
    return (
      <div>
        <h2>Chào mừng bạn đến Vexere.com</h2>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "15px" }}
          onClick={() => this.props.history.push('/ticketmanager')}
        >
          Quản lý vé xe đã đặt
        </Button>
        <TripList />
      </div>
    );
  }
}

export default Explore;
