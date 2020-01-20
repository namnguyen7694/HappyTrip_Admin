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
import { getCompanyById, updateCompany} from "../../../Actions/company";
import { getStations } from "../../../Actions/station";
import ErrorSnackBar from "../../Utils/errorSnackBar";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 300,
      width: 300
    }
  }
};

const ListCar = [
    "Limousine",
    "VIP",
    "Regular"
]

class EditCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      carType: [],
      image: "",
      stations: [],
      List: [],
      error: {},
      _id: ""
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { name, carType, stations, image, _id } = this.state;
    const data = { name, carType, stations, image, _id };
    this.props
      .updateCompany(data)
      .then(() => this.props.history.push("./../"))
      .catch(err => {
        this.setState({ error: err });
      });
  };

  componentDidMount() {
    const companyId = this.props.match.params.id;

    this.props.getStations().then(() => {
      this.setState({ List: this.props.stations });
    });

    this.props.getCompanyById(companyId).then(() => {
      const company = this.props.companyEditing;
      const stationId = company.stations.map(stt => stt._id);
      this.setState({
        name: company.name,
        carType: company.carType,
        stations: stationId,
        image: company.image,
        _id: company._id
      });
    });
  }

  render() {
    const { name, carType, stations, List, image } = this.state;
    return (
      <div className="add_station">
        <h1>Edit Company</h1>
        <form autoComplete="off" onSubmit={this.onSubmit}>
          <div>
            {_.get(this.state, "error.response.data.name") && (
              <ErrorSnackBar
                error={_.get(this.state, "error.response.data.name", "")}
              />
            )}
            <TextField
              id="name"
              name="name"
              value={name}
              label="Company Name"
              variant="outlined"
              style={{ margin: "15px", width: "40%" }}
              onChange={this.onChange}
            />
          </div>

          <div>
            <TextField
              id="image"
              name="image"
              value={image}
              label="Company image"
              variant="outlined"
              style={{ margin: "15px", width: "40%" }}
              onChange={this.onChange}
            />
          </div>

          <div>
            {_.get(this.state, "error.response.data.carType") && (
              <ErrorSnackBar
                error={_.get(this.state, "error.response.data.carType", "")}
              />
            )}
            <FormControl style={{ minWidth: 200, maxWidth: 300 }}>
              <InputLabel>Select Car Type</InputLabel>
              <Select
                multiple
                name="carType"
                value={carType}
                onChange={this.onChange}
                input={<Input />}
                renderValue={selected => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {ListCar.map(car => (
                  <MenuItem key={car} value={car}>
                    <Checkbox checked={carType.indexOf(car) > -1} />
                    <ListItemText primary={car} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div>
            <FormControl style={{ minWidth: 200, maxWidth: 300 }}>
              <InputLabel>Select Stations</InputLabel>
              <Select
                multiple
                name="stations"
                value={stations}
                onChange={this.onChange}
                input={<Input />}
                renderValue={selected => {
                  return List.filter(stt => selected.indexOf(stt._id) > -1)
                    .map(stt => stt.name)
                    .join(", ");
                }}
                MenuProps={MenuProps}
              >
                {List.map(station => (
                  <MenuItem key={station._id} value={station._id}>
                    <Checkbox checked={stations.indexOf(station._id) > -1} />
                    <ListItemText primary={station.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ margin: "15px" }}
            onClick={() => this.onSubmit}
          >
            Save Company
          </Button>
          <Button
            variant="contained"
            style={{ margin: "15px" }}
            onClick={() => this.props.history.push("./../")}
          >
            Cancel
          </Button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    companyEditing: state.layout.companyEditing,
    stations: state.stations
  };
};

export default connect(mapStateToProps, { getStations, getCompanyById, updateCompany })(
    EditCompany
);
