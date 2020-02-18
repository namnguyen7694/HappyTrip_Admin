import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import _ from "lodash";
import { login } from "../../Actions/auth";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import ErrorSnackBar from './../Utils/errorSnackBar';
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
      [e.target.name]: e.target.value,
      error: ""
    });
  };
  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props
      .login({ email, password })
      .then(() => {
        this.props.history.push("./");
      })
      .catch(err => {
        this.setState({
          error: err
        });
      });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className=" login-page">
        <Grid
          style={{ paddingTop: 100 }}
          container
          direction="row"
          justify="center"
          alignItems="flex-end"
        >
          <Grid item xs={8} sm={6} md={4}>
            <Paper style={{ backgroundColor: "#dee6e5cc" }}>
              <h1>Chào mừng bạn đến với VEXERE.COM</h1>
              <h3>Đăng nhập</h3>
              <form autoComplete="off">
                <div>
                {_.get(this.state, "error.err.response.data.email") && (
                    <ErrorSnackBar
                      error={_.get(this.state, "error.err.response.data.email", "")}
                    />
                  )}
                  <TextField
                    id="email"
                    name="email"
                    autoFocus={true}
                    color="primary"
                    value={email}
                    size="medium"
                    label="Email"
                    variant="outlined"
                    style={{ margin: "15px", width: "70%" }}
                    onChange={this.onChange}
                  />
                </div>
                <div>
                {_.get(this.state, "error.err.response.data.password") && (
                    <ErrorSnackBar
                      error={_.get(this.state, "error.err.response.data.password", "")}
                    />
                  )}
                  <TextField
                    id="password"
                    type="password"
                    color="primary"
                    name="password"
                    value={password}
                    size="medium"
                    label="Mật khẩu"
                    variant="outlined"
                    style={{ margin: "15px", width: "70%" }}
                    onChange={this.onChange}
                  />
                </div>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ margin: "15px" }}
                  onClick={this.onSubmit}
                >
                  Đăng nhập
                </Button>
                <Typography>
                  Chưa có tài khoản ?{" "}
                  <Button
                    type="submit"
                    variant="outlined"
                    color="secondary"
                    style={{ margin: "15px" }}
                    onClick={() => this.props.history.push("./signup")}
                  >
                    Đăng ký mới
                  </Button>
                </Typography>
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
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(null, { login })(Login);
