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
import { createStation } from "../../../Actions/station";
import { getCompanies } from "../../../Actions/company";
import ErrorSnackBar from "../../Utils/errorSnackBar";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 300,
      width: 300
    }
  }
};

class AddStation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      province: "",
      address: "",
      companies: [],
      List: [],
      error: {}
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { name, province, address, companies } = this.state;
    const data = { name, province, address, companies };
    this.props
      .createStation(data)
      .then(() => this.props.history.push("./"))
      .catch(err => {
        this.setState({ error: err });
      });
  };

  componentDidMount() {
    this.props.getCompanies().then(() => {
      this.setState({ List: this.props.companies });
    });
  }

  render() {
    const { name, address, province, companies, List } = this.state;
    return (
      <div className="add_station">
        <h1 className="title_addnew">Add Sation</h1>
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
              label="Station Name"
              variant="outlined"
              style={{ margin: "15px", width: "40%" }}
              onChange={this.onChange}
            />
          </div>
          <div>
            {_.get(this.state, "error.response.data.address") && (
              <ErrorSnackBar
                error={_.get(this.state, "error.response.data.address", "")}
              />
            )}
            <TextField
              id="address"
              name="address"
              value={address}
              label="Station Address"
              variant="outlined"
              style={{ margin: "15px", width: "40%" }}
              onChange={this.onChange}
            />
          </div>
          <div>
            {_.get(this.state, "error.response.data.province") && (
              <ErrorSnackBar
                error={_.get(this.state, "error.response.data.province", "")}
              />
            )}
            <TextField
              id="province"
              name="province"
              value={province}
              label="Station province"
              variant="outlined"
              style={{ margin: "15px", width: "40%" }}
              onChange={this.onChange}
            />
          </div>
          <div>
            <FormControl style={{ minWidth: 200, maxWidth: 300 }}>
              <InputLabel>Select Company</InputLabel>
              <Select
                multiple
                name="companies"
                value={companies}
                onChange={this.onChange}
                input={<Input />}
                renderValue={selected => {
                  return List.filter(com => selected.indexOf(com._id) > -1)
                    .map(com => com.name)
                    .join(", ");
                }}
                MenuProps={MenuProps}
              >
                {List.map(company => (
                  <MenuItem key={company._id} value={company._id}>
                    <Checkbox checked={companies.indexOf(company._id) > -1} />
                    <ListItemText primary={company.name} />
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
            Save Station
          </Button>
          <Button
            variant="contained"
            style={{ margin: "15px" }}
            onClick={() => this.props.history.push("./")}
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
    companies: state.companies
  };
};

export default connect(mapStateToProps, { createStation, getCompanies })(
  AddStation
);