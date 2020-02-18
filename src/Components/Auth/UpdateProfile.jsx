import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import _ from "lodash";
import { updateUser } from "../../Actions/auth";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import ErrorSnackBar from "./../Utils/errorSnackBar";
class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      password2: "",
      fullName: "",
      error: ""
    };
  }

  componentDidMount() {
    this.setState({
      email: this.props.user.email,
      fullName: this.props.user.fullName
    });
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      error: ""
    });
  };
  onSubmit = e => {
    e.preventDefault();
    const { email, password, password2, fullName } = this.state;
    this.props
      .updateUser({ email, password, password2, fullName })
      .then(() => {
        this.props.history.push("/profile");
      })
      .catch(err => {
        this.setState({
          error: err
        });
      });
  };

  render() {
    const { email, password, password2, fullName } = this.state;
    return (
      <Grid
        style={{ paddingTop: 100 }}
        container
        direction="row"
        justify="center"
        alignItems="flex-end"
      >
        <Grid item xs={8} sm={6} md={4}>
          <h2 className="title_addnew">CẬP NHẬT THÔNG TIN TÀI KHOẢN</h2>
          <form autoComplete="off">
            <div>
              {_.get(this.state, "error.response.data.email") && (
                <ErrorSnackBar
                  error={_.get(this.state, "error.response.data.email", "")}
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
              {_.get(this.state, "error.response.data.password") && (
                <ErrorSnackBar
                  error={_.get(this.state, "error.response.data.password", "")}
                />
              )}
              {_.get(this.state, "error.response.data.message") && (
                <ErrorSnackBar
                  error={_.get(this.state, "error.response.data.message", "")}
                />
              )}
              <TextField
                id="password"
                type="password"
                color="primary"
                name="password"
                value={password}
                size="medium"
                label="Mật khẩu cũ"
                variant="outlined"
                style={{ margin: "15px", width: "70%" }}
                onChange={this.onChange}
              />
            </div>
            <div>
              {_.get(this.state, "error.response.data.password2") && (
                <ErrorSnackBar
                  error={_.get(this.state, "error.response.data.password2", "")}
                />
              )}
              <TextField
                id="password2"
                type="password"
                color="primary"
                name="password2"
                value={password2}
                size="medium"
                label="Mật khẩu mới"
                variant="outlined"
                style={{ margin: "15px", width: "70%" }}
                onChange={this.onChange}
              />
            </div>

            <div>
              {_.get(this.state, "error.response.data.fullName") && (
                <ErrorSnackBar
                  error={_.get(this.state, "error.response.data.fullName", "")}
                />
              )}
              <TextField
                id="fullName"
                color="primary"
                name="fullName"
                value={fullName}
                size="medium"
                label="Nhập họ tên"
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
              Lưu thay đổi
            </Button>
            <Button
              type="submit"
              variant="contained"
              style={{ margin: "15px" }}
              onClick={ () => this.props.history.push('/profile')}
            >
              Hủy
            </Button>
          </form>
        </Grid>
      </Grid>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.auth.profile
  };
};

export default connect(mapStateToProps, { updateUser })(UpdateProfile);
