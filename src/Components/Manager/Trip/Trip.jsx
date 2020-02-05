import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as tripActions from '../../../Actions/trip';
import SingleTrip from './SingleTrip';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

class Trip extends Component {

    componentDidMount() {
        this.props.getTrips()
    }

    render() {
        return (
          <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md">
              <h1 className="title_addnew">QUẢN LÝ CHUYẾN ĐI</h1>
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  this.props.history.push("/manager/trips/addtrip")
                }
              >
                Thêm chuyến đi
              </Button>
              {this.props.trips.map((trip, index) => {
                return (
                  <SingleTrip
                    trip={trip}
                    key={index}
                    deleteTrip={this.props.deleteTrip}
                    getTripById={this.props.getTripById}
                  />
                );
              })}
            </Container>
          </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        trips: state.trips
    }
}

export default connect(mapStateToProps, tripActions)(Trip)