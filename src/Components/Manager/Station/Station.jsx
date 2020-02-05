import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as stationActions from '../../../Actions/station';
import SingleStation from './SingleStation';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

class Station extends Component {

    componentDidMount() {
        this.props.getStations()
    }

    render() {
        return (
          <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md">
              <h1 className="title_addnew">QUẢN LÝ BẾN XE</h1>
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  this.props.history.push("/manager/stations/addstation")
                }
              >
                Thêm Bến xe
              </Button>
              {this.props.stations.map((station, index) => {
                return (
                  <SingleStation
                    station={station}
                    key={index}
                    deleteStation={this.props.deleteStation}
                    getStationById={this.props.getStationById}
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
        stations: state.stations
    }
}

export default connect(mapStateToProps, stationActions)(Station)