import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as tripActions from '../../Actions/trip';
import SingleTrip from './SingleTrip';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

class TripList extends Component {

    componentDidMount() {
        this.props.getTrips()
    }

    render() {
        return (
          <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md">
              <h1 className="title_addnew">Danh sách chuyến đi</h1>
              
              {this.props.trips.map((trip, index) => {
                return (
                  <SingleTrip
                    trip={trip}
                    key={index}
                    deleteTrip={this.props.deleteTrip}
                    getTripById={this.props.getTripById}
                    tripEditing={this.props.tripEditing}
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
        trips: state.trips,
        tripEditing: state.layout.tripEditing
    }
}

export default connect(mapStateToProps, tripActions)(TripList)