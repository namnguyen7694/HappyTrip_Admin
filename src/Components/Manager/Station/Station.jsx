import React, { Component } from "react";
import { connect } from "react-redux";
import { changeAlias } from "./../../Utils/changeAlias";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import { getStations, deleteStation } from "../../../Actions/station";
import { getCompanies } from "../../../Actions/company";
import SingleStation from "./SingleStation";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import _ from "lodash";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 300,
      width: 300
    }
  }
};

class Station extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stationName: "",
      List: [],
      provinceList: [],
      companiesFilter: [],
      provinceFilter: []
    };
  }

  componentDidMount() {
    this.props.getStations();
    this.props.getCompanies().then(() => {
      this.setState({
        List: this.props.companies,
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
      provinceFilter: []
    })
  }

  render() {
    const {
      stationName,
      List,
      companiesFilter,
      provinceList,
      provinceFilter
    } = this.state;

    let searchStation = [];
    const stations = this.props.stations;

    // search by stations name
    stations.filter(stt => {
      let name = changeAlias(stt.name);
      if (name.indexOf(changeAlias(stationName)) > -1) {
        searchStation = [...searchStation, stt];
      }
      return stt;
    });

    // filter by company

    const filterByCompany = stations.filter(stt =>
      companiesFilter.every(
        com => stt.companies.map(com => com._id).indexOf(com) > -1
      )
    );

    // filter by province
    let filterByProvince = [];
    if (provinceFilter.length > 0) {
      filterByProvince = stations.filter(
        stt => provinceFilter.indexOf(stt.province) > -1
      );
    } else {
      filterByProvince = stations;
    }

    const renderStation = _.intersection(
      filterByCompany,
      filterByProvince,
      searchStation
    );

    return (
      <React.Fragment>
        <CssBaseline />
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
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="flex-start"
        >
          <Grid item md={2}></Grid>
          <Grid item md={3}>
            <Card>
              <h2 className="title_addnew">BỘ LỌC & TÌM KIẾM</h2>
              <h3 className="title_addnew">{`Tổng số kết quả : ${renderStation.length}`}</h3>
              <Button
                style={{ justifyContent: "center" }}
                variant="contained"
                onClick={() => this.cancelFilter()}
              >
                Hủy
              </Button>
              <CardContent>
                <TextField
                  id="stationName"
                  name="stationName"
                  value={stationName}
                  label="Tìm theo tên bến xe"
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
                        {List.filter(com => selected.indexOf(com._id) > -1).map(
                          com => (
                            <Chip
                              key={com._id}
                              label={com.name}
                              style={{ margin: 2 }}
                            />
                          )
                        )}
                      </div>
                    )}
                    MenuProps={MenuProps}
                  >
                    {List.map(company => (
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
                  <InputLabel>Tỉnh/thành</InputLabel>
                  <Select
                    multiple
                    name="provinceFilter"
                    value={provinceFilter}
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
                          checked={provinceFilter.indexOf(province) > -1}
                        />
                        <ListItemText primary={province} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={7}>
            {renderStation.map((station, index) => {
              return (
                <SingleStation
                  station={station}
                  key={index}
                  getStationById={this.props.getStationById}
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
    stations: state.stations,
    companies: state.companies
  };
};

export default connect(mapStateToProps, {
  getStations,
  getCompanies,
  deleteStation
})(Station);
