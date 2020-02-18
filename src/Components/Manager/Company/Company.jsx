import React, { Component } from "react";
import { connect } from "react-redux";
import { getCompanies, deleteCompany } from "../../../Actions/company";
import { getStations } from "../../../Actions/station";
import { changeAlias } from "./../../Utils/changeAlias";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
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
import SingleCompany from "./SingleCompany";
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

const ListCar = [
  "Ghế ngồi VIP 8 chỗ",
  "Giường nằm VIP 20 chỗ",
  "Ghế ngồi thường 16 chỗ",
  "Ghế ngồi thường 40 chỗ"
];

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: "",
      List: [],
      stationsFilter: [],
      carTypeFilter: []
    };
  }
  componentDidMount() {
    this.props.getCompanies();
    this.props.getStations().then(() => {
      this.setState({
        List: this.props.stations
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
      stationsFilter: [],
      carTypeFilter: []
    })
  }

  render() {
    const { companyName, List, stationsFilter, carTypeFilter } = this.state;

    let searchCompany = [];
    const companies = this.props.companies;

    // search by company name
    companies.filter(com => {
      let name = changeAlias(com.name);
      if (name.indexOf(changeAlias(companyName)) > -1) {
        searchCompany = [...searchCompany, com];
      }
      return com;
    });

    // filter by station
    const filterByStation = companies.filter(com =>
      stationsFilter.every(
        stt => com.stations.map(stt => stt._id).indexOf(stt) > -1
      )
    );

    //filter by CarType
    const filterByCarType = companies.filter(com =>
      carTypeFilter.every(type => com.carType.indexOf(type) > -1)
    );
    const renderCompany = _.intersection(
      searchCompany,
      filterByCarType,
      filterByStation
    );

    return (
      <React.Fragment>
        <CssBaseline />
        <h1 className="title_addnew">QUẢN LÝ NHÀ XE</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            this.props.history.push("/manager/companies/addcompany")
          }
        >
          Thêm Nhà xe
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
              <h3 className="title_addnew">{`Tổng số kết quả : ${renderCompany.length}`}</h3>
              <Button
                style={{ justifyContent: "center" }}
                variant="contained"
                onClick={() => this.cancelFilter()}
              >
                Hủy
              </Button>
              <CardContent>
                <TextField
                  id="companyName"
                  name="companyName"
                  value={companyName}
                  label="Tìm nhà xe"
                  variant="outlined"
                  style={{ margin: "15px", width: "80%" }}
                  onChange={this.onChange}
                />
                <FormControl style={{  margin: "15px", width: "80%"  }}>
                  <InputLabel>Bến xe</InputLabel>
                  <Select
                    multiple
                    name="stationsFilter"
                    value={stationsFilter}
                    onChange={this.onChange}
                    input={<Input />}
                    renderValue={selected => (
                      <div style={{ display: "flex", flexWrap: "wrap" }}>
                        {List.filter(stt => selected.indexOf(stt._id) > -1).map(
                          stt => (
                            <Chip
                              key={stt._id}
                              label={stt.name}
                              style={{ margin: 2 }}
                            />
                          )
                        )}
                      </div>
                    )}
                    MenuProps={MenuProps}
                  >
                    {List.map(station => (
                      <MenuItem key={station._id} value={station._id}>
                        <Checkbox
                          checked={stationsFilter.indexOf(station._id) > -1}
                        />
                        <ListItemText primary={station.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl style={{  margin: "15px", width: "80%"  }}>
                  <InputLabel>Loại ghế ngồi</InputLabel>
                  <Select
                    multiple
                    name="carTypeFilter"
                    value={carTypeFilter}
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
                    {ListCar.map(car => (
                      <MenuItem key={car} value={car}>
                        <Checkbox checked={carTypeFilter.indexOf(car) > -1} />
                        <ListItemText primary={car} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </CardContent>
              <CardActions></CardActions>
            </Card>
          </Grid>
          <Grid item md={7}>
            {renderCompany.map((company, index) => {
              return (
                <SingleCompany
                  company={company}
                  key={index}
                  deleteCompany={this.props.deleteCompany}
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
    companies: state.companies,
    stations: state.stations
  };
};

export default connect(mapStateToProps, {
  getCompanies,
  deleteCompany,
  getStations
})(Company);
