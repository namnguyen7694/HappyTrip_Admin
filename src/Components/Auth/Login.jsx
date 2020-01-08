import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import _ from 'lodash';
import {login} from '../../Actions/auth';
import {connect} from 'react-redux';
import SnackbarContent from '@material-ui/core/SnackbarContent';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: ""
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    const {email, password} = this.state;
    this.props.login({email, password})
      .then(res => {
        //snackbar
        this.props.history.push('./manager')
      })
      .catch(err => {
        this.setState({
          error: err
        })
      })
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="container login-page">
        <h1>LOGIN</h1>
        <form autoComplete="off" onSubmit={this.onSubmit}>
          <div>
            <TextField
              id="email"
              name="email"
              value={email}
              label="Email"
              variant="outlined"
              style={{ margin: "15px", width: "40%" }}
              onChange={this.onChange}
            />
          </div>
          <div>
            <TextField
              id="password"
              type="password"
              name="password"
              value={password}
              label="Password"
              variant="outlined"
              style={{ margin: "15px", width: "40%" }}
              onChange={this.onChange}
            />
          </div>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ margin: "15px" }}
          >
            Submit
          </Button>
          {!_.isEmpty(this.state.error) && (
            <SnackbarContent
              aria-describedby="client-snackbar"
              message={
                <span id="client-snackbar">
                  {_.get(this.state, "error.message")}
                </span>
              }
            />
          )}
        </form>
      </div>
    );
  }
}

export default connect(null, {login})(Login);
