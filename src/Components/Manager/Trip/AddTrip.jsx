import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import _ from "lodash";
import { connect } from "react-redux";
import { createTrip } from "../../../Actions/trip";
import { getAdviseCompany } from "../../../Actions/company";
import { getStations } from "../../../Actions/station";
import ErrorSnackBar from "../../Utils/errorSnackBar";
import TimePicker from './TimePicker';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 300,
      width: 300
    }
  }
};

class AddTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stationList: [],
      fromStation: "",
      toStation: "",
      adviceCompany: [],
      company: "",
      ListCar: [],
      carType: "",
      startTime: "",
      price: "",
      error: {}
    };
  }

  onChangeStation = e => {
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
      if (this.state.fromStation && this.state.toStation) {
        const {fromStation, toStation} = this.state;
        const data = {fromStation, toStation};
        this.props
          .getAdviseCompany(data)
          .then(() =>
            this.setState({
              adviceCompany: this.props.adviceCompany,
              company: "",
              carType: ""
            })
          )
          .catch(err => console.log(err));
      };
    });
  };

  onChangeCompany = e => {
    this.setState({
      [e.target.name]: e.target.value
    } , () => {
      let company = this.state.adviceCompany.find(c => c._id === this.state.company);
      this.setState({ ListCar: company.carType, carType: "" });
    })
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onChangeDate = (date) => {
    this.setState({startTime : date})
  }

  onSubmit = e => {
    e.preventDefault();
    const { fromStation, toStation, company, carType, price, startTime } = this.state;
    const data = { fromStation, toStation, company, carType, price, startTime };
    this.props
      .createTrip(data)
      .then(() => this.props.history.push("./"))
      .catch(err => {
        this.setState({ error: err });
      });
  };

  componentDidMount() {
    this.props.getStations().then(() => {
      this.setState({ stationList: this.props.stations });
    });
  }

  render() {
    const {
      stationList,
      fromStation,
      toStation,
      adviceCompany,
      company,
      ListCar,
      carType,
      price
    } = this.state;
    return (
      <div className="add_station">
        <h1 className="title_addnew">Thêm chuyến đi</h1>
        <form autoComplete="off" onSubmit={this.onSubmit}>
          <div>
          {_.get(this.state, "error.response.data.fromStation") && (
              <ErrorSnackBar
                error={_.get(this.state, "error.response.data.fromStation", "")}
              />
            )}
            <FormControl style={{  margin: "15px", width: "30%" }}>
              <InputLabel>Điểm xuất phát</InputLabel>
              <Select
                name="fromStation"
                value={fromStation}
                onChange={this.onChangeStation}
                input={<Input />}
                renderValue={selected => {
                  const stt = stationList.find(stt => stt._id === selected);
                  return stt.name;
                }}
                MenuProps={MenuProps}
              >
                {stationList.map(station => (
                  <MenuItem key={station._id} value={station._id}>
                    <Checkbox checked={fromStation === station._id} />
                    <ListItemText primary={station.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div>
          {_.get(this.state, "error.response.data.toStation") && (
              <ErrorSnackBar
                error={_.get(this.state, "error.response.data.toStation", "")}
              />
            )}
            <FormControl style={{  margin: "15px", width: "30%" }}>
              <InputLabel>Điểm đến</InputLabel>
              <Select
                name="toStation"
                value={toStation}
                onChange={this.onChangeStation}
                input={<Input />}
                renderValue={selected => {
                  const stt = stationList.find(stt => stt._id === selected);
                  return stt.name;
                }}
                MenuProps={MenuProps}
              >
                {stationList.map(station => (
                  <MenuItem key={station._id} value={station._id}>
                    <Checkbox checked={toStation === station._id} />
                    <ListItemText primary={station.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div>
          {_.get(this.state, "error.response.data.company") && (
              <ErrorSnackBar
                error={_.get(this.state, "error.response.data.company", "")}
              />
            )}
            <FormControl style={{  margin: "15px", width: "30%" }}>
              <InputLabel>Nhà xe</InputLabel>
              <Select
                name="company"
                value={company}
                onChange={this.onChangeCompany}
                input={<Input />}
                renderValue={selected => {
                  const com = adviceCompany.find(com => com._id === selected);
                  return com.name;
                }}
                MenuProps={MenuProps}
              >
                {adviceCompany.map(com => (
                  <MenuItem key={com._id} value={com._id}>
                    <Checkbox checked={company === com._id} />
                    <ListItemText primary={com.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div>

          {_.get(this.state, "error.response.data.carType") && (
              <ErrorSnackBar
                error={_.get(this.state, "error.response.data.carType", "")}
              />
            )}
            <FormControl style={{  margin: "15px", width: "30%" }}>
              <InputLabel>Loại ghế ngồi</InputLabel>
              <Select
                name="carType"
                value={carType}
                onChange={this.onChange}
                input={<Input />}
                renderValue={selected => selected}
                MenuProps={MenuProps}
              >
                {ListCar.map(car => (
                  <MenuItem key={car} value={car}>
                    <Checkbox checked={carType === car} />
                    <ListItemText primary={car} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div>
            {_.get(this.state, "error.response.data.price") && (
              <ErrorSnackBar
                error={_.get(this.state, "error.response.data.price", "")}
              />
            )}
            <TextField
              id="price"
              name="price"
              value={price}
              label="Giá vé"
              variant="outlined"
              style={{ margin: "15px", width: "30%" }}
              onChange={this.onChange}
            />
          </div>
          
          <TimePicker onChange={date => this.onChangeDate(date)}/>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ margin: "15px" }}
            onClick={() => this.onSubmit}
          >
            Lưu
          </Button>
          <Button
            variant="contained"
            style={{ margin: "15px" }}
            onClick={() => this.props.history.push("./")}
          >
            Hủy
          </Button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    stations: state.stations,
    adviceCompany: state.layout.adviceCompany
  };
};

export default connect(mapStateToProps, {
  createTrip,
  getStations,
  getAdviseCompany
})(AddTrip);
