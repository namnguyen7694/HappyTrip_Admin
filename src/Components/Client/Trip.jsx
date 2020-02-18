import React, { Component } from "react";
import { connect } from "react-redux";
import { getTrips, getTripById, deleteTrip } from "../../Actions/trip";
import { getStations } from "../../Actions/station";
import { getCompanies } from "../../Actions/company";
import SingleTrip from "./SingleTrip";
import CssBaseline from "@material-ui/core/CssBaseline";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Chip from "@material-ui/core/Chip";
import {changeAlias} from '../Utils/changeAlias';
import _ from "lodash";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 300,
      width: 300
    }
  }
};

class TripList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tripName: "",
      companiesList: [],
      stationsList: [],
      provinceList: [],
      companiesFilter: [],
      fromStationFilter: [],
      fromProvinceFilter: [],
      toStationFilter: [],
      toProvinceFilter: []
    };
  }
  componentDidMount() {
    this.props.getTrips();
    this.props.getCompanies().then(() => {
      this.setState({
        companiesList: this.props.companies
      });
    });
    this.props.getStations().then(() => {
      this.setState({
        stationsList: this.props.stations,
        provinceList: _.uniq(this.props.stations.map(stt => stt.province))
      });
    });
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  cancelFilter = () => {
    this.setState({
      companiesFilter: [],
      fromStationFilter: [],
      fromProvinceFilter: [],
      toStationFilter: [],
      toProvinceFilter: []
    });
  };

  render() {
    const {
      tripName,
      companiesList,
      stationsList,
      provinceList,
      companiesFilter,
      fromStationFilter,
      toStationFilter,
      fromProvinceFilter,
      toProvinceFilter
    } = this.state;

    // search by Trip name
    const trips = this.props.trips;

    let searchTrip = [];
    if (tripName) {
      trips.filter(trip => {
        let name =
          changeAlias(trip.fromStation.province) +
          changeAlias(trip.toStation.province);
        if (name.indexOf(changeAlias(tripName)) > -1) {
          searchTrip = [...searchTrip, trip];
        }
        return trip;
      });
    } else {
      searchTrip = trips;
    }

    // filter by company
    let filterByCompany = [];
    if (companiesFilter.length > 0) {
      filterByCompany = trips.filter(
        trip => companiesFilter.indexOf(trip.company._id) > -1
      );
    } else {
      filterByCompany = trips;
    }

    // filter by from province
    let filterByFromProvince = [];
    if (fromProvinceFilter.length > 0) {
      filterByFromProvince = trips.filter(
        trip => fromProvinceFilter.indexOf(trip.fromStation.province) > -1
      );
    } else {
      filterByFromProvince = trips;
    }

    // filter by to province
    let filterByToProvince = [];
    if (toProvinceFilter.length > 0) {
      filterByToProvince = trips.filter(
        trip => toProvinceFilter.indexOf(trip.toStation.province) > -1
      );
    } else {
      filterByToProvince = trips;
    }

    // filter by from station
    let filterByFromStation = [];
    if (fromStationFilter.length > 0) {
      filterByFromStation = trips.filter(
        trip => fromStationFilter.indexOf(trip.fromStation._id) > -1
      );
    } else {
      filterByFromStation = trips;
    }

    // filter by to station
    let filterByToStation = [];
    if (toStationFilter.length > 0) {
      filterByToStation = trips.filter(
        trip => toStationFilter.indexOf(trip.toStation._id) > -1
      );
    } else {
      filterByToStation = trips;
    }

    const renderTrip = _.intersection(
      searchTrip,
      filterByCompany,
      filterByFromProvince,
      filterByToProvince,
      filterByFromStation,
      filterByToStation
    );

    return (
      <React.Fragment>
        <CssBaseline />
          <h1 className="title_addnew">Danh sách chuyến đi</h1>
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="flex-start"
          >
            <Grid item md={1}></Grid>
            <Grid item md={3}>
              <Card>
                <h2 className="title_addnew">BỘ LỌC & TÌM KIẾM</h2>
                <h3 className="title_addnew">{`Tổng số kết quả : ${renderTrip.length}`}</h3>

                <Button
                  style={{ justifyContent: "center" }}
                  variant="contained"
                  onClick={() => this.cancelFilter()}
                >
                  Hủy
                </Button>
                <CardContent>
                  <TextField
                    id="tripName"
                    name="tripName"
                    value={tripName}
                    label="Tìm chuyến đi"
                    variant="outlined"
                    style={{ margin: "15px", width: "80%" }}
                    onChange={this.onChange}
                  />

                  <FormControl style={{ margin: "15px", width: "80%" }}>
                    <InputLabel>Nhà xe</InputLabel>
                    <Select
                      multiple
                      name="companiesFilter"
                      value={companiesFilter}
                      onChange={this.onChange}
                      input={<Input />}
                      renderValue={selected => (
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                          {companiesList
                            .filter(com => selected.indexOf(com._id) > -1)
                            .map(com => (
                              <Chip
                                key={com._id}
                                label={com.name}
                                style={{ margin: 2 }}
                              />
                            ))}
                        </div>
                      )}
                      MenuProps={MenuProps}
                    >
                      {companiesList.map(company => (
                        <MenuItem key={company._id} value={company._id}>
                          <Checkbox
                            checked={companiesFilter.indexOf(company._id) > -1}
                          />
                          <ListItemText primary={company.name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl style={{ margin: "15px", width: "80%" }}>
                    <InputLabel>Nơi đi</InputLabel>
                    <Select
                      multiple
                      name="fromProvinceFilter"
                      value={fromProvinceFilter}
                      onChange={this.onChange}
                      input={<Input />}
                      renderValue={selected => (
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                          {selected.map(value => (
                            <Chip
                              key={value}
                              label={value}
                              style={{ margin: 2 }}
                            />
                          ))}
                        </div>
                      )}
                      MenuProps={MenuProps}
                    >
                      {provinceList.map(province => (
                        <MenuItem key={province} value={province}>
                          <Checkbox
                            checked={fromProvinceFilter.indexOf(province) > -1}
                          />
                          <ListItemText primary={province} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl style={{ margin: "15px", width: "80%" }}>
                    <InputLabel>Nơi đến</InputLabel>
                    <Select
                      multiple
                      name="toProvinceFilter"
                      value={toProvinceFilter}
                      onChange={this.onChange}
                      input={<Input />}
                      renderValue={selected => (
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                          {selected.map(value => (
                            <Chip
                              key={value}
                              label={value}
                              style={{ margin: 2 }}
                            />
                          ))}
                        </div>
                      )}
                      MenuProps={MenuProps}
                    >
                      {provinceList.map(province => (
                        <MenuItem key={province} value={province}>
                          <Checkbox
                            checked={toProvinceFilter.indexOf(province) > -1}
                          />
                          <ListItemText primary={province} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl style={{ margin: "15px", width: "80%" }}>
                    <InputLabel>Điểm đón khách</InputLabel>
                    <Select
                      multiple
                      name="fromStationFilter"
                      value={fromStationFilter}
                      onChange={this.onChange}
                      input={<Input />}
                      renderValue={selected => (
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                          {stationsList
                            .filter(stt => selected.indexOf(stt._id) > -1)
                            .map(stt => (
                              <Chip
                                key={stt._id}
                                label={stt.name}
                                style={{ margin: 2 }}
                              />
                            ))}
                        </div>
                      )}
                      MenuProps={MenuProps}
                    >
                      {stationsList.map(station => (
                        <MenuItem key={station._id} value={station._id}>
                          <Checkbox
                            checked={
                              fromStationFilter.indexOf(station._id) > -1
                            }
                          />
                          <ListItemText primary={station.name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl style={{ margin: "15px", width: "80%" }}>
                    <InputLabel>Điểm trả khách</InputLabel>
                    <Select
                      multiple
                      name="toStationFilter"
                      value={toStationFilter}
                      onChange={this.onChange}
                      input={<Input />}
                      renderValue={selected => (
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                          {stationsList
                            .filter(stt => selected.indexOf(stt._id) > -1)
                            .map(stt => (
                              <Chip
                                key={stt._id}
                                label={stt.name}
                                style={{ margin: 2 }}
                              />
                            ))}
                        </div>
                      )}
                      MenuProps={MenuProps}
                    >
                      {stationsList.map(station => (
                        <MenuItem key={station._id} value={station._id}>
                          <Checkbox
                            checked={toStationFilter.indexOf(station._id) > -1}
                          />
                          <ListItemText primary={station.name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={8}>
              {renderTrip.map((trip, index) => {
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
            </Grid>
          </Grid>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    trips: state.trips,
    tripEditing: state.layout.tripEditing,
    stations: state.stations,
    companies: state.companies
  };
};

export default connect(mapStateToProps, {
  getTrips,
  getTripById,
  deleteTrip,
  getStations,
  getCompanies
})(TripList);
