import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { logout } from "../../Actions/auth";

class Navbar extends Component {
  render() {
    const { auth } = this.props;
    const { isAuthenticate, profile } = auth;
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={() => this.props.history.push("/")}>
              <img
                src="https://storage.googleapis.com/fe-production/icon_vxr_full.svg"
                alt="logo"
              />
            </IconButton>
            <Typography variant="h6" style={{ marginRight: "15px" }}>
              {isAuthenticate ? "Da dang nhap" : "Chua dang nhap"}
            </Typography>
            <Typography variant="h6">
              <Link to="/profile">{isAuthenticate ? profile.email : ""}</Link>
            </Typography>

            {isAuthenticate && (
              <Button
                color="inherit"
                onClick={() => {
                  this.props.logout();
                  this.props.history.push("/");
                }}
              >
                Logout
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth //state "auth" from Store --> return to Props "auth"
  };
};

export default withRouter(connect(mapStateToProps, { logout })(Navbar));
