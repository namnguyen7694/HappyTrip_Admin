import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
class InformationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: this.props.info.phone || "",
      address: this.props.info.address || "",
      note: this.props.info.note || "",
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    }, () =>{
        const {phone, address, note} = this.state;
        this.props.setInfo({phone, address, note});
    });
  };

  render() {
    const {phone, address, note} = this.state;
    return (
      <div className="add_station">
        <form autoComplete="off">
            <TextField
              id="phone"
              name="phone"
              value={phone}
              label="Số điện thoại"
              variant="outlined"
              style={{ margin: "15px", width: "40%" }}
              onChange={this.onChange}
            />
            <TextField
              id="address"
              name="address"
              value={address}
              label="Địa chỉ"
              variant="outlined"
              style={{ margin: "15px", width: "40%" }}
              onChange={this.onChange}
            />
            <TextField
              id="note"
              name="note"
              value={note}
              label="Ghi chú"
              variant="outlined"
              style={{ margin: "15px", width: "40%" }}
              onChange={this.onChange}
            />
        </form>
      </div>
    );
  }
}

export default InformationForm;
