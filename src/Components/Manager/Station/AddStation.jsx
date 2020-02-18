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
import Chip from "@material-ui/core/Chip";
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
      image: "",
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
    const { name, province, address, companies, image } = this.state;
    const data = { name, province, address, companies, image };
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
    const { name, address, province, companies, image, List } = this.state;
    return (
      <div className="add_station">
        <h1 className="title_addnew">Thêm Bến xe</h1>
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
              label="Tên Bến xe"
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
              label=" Địa chỉ"
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
              label="Tỉnh/ Thành phố"
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
              label="Link hình ảnh"
              variant="outlined"
              style={{ margin: "15px", width: "40%" }}
              onChange={this.onChange}
            />
          </div>
          <div>
            <FormControl style={{ margin: "15px", width: "40%" }}>
              <InputLabel>Chọn Nhà xe</InputLabel>
              <Select
                multiple
                name="companies"
                value={companies}
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
    companies: state.companies
  };
};

export default connect(mapStateToProps, { createStation, getCompanies })(
  AddStation
);
