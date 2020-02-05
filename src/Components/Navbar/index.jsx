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
            <Typography variant="h6">
              Chào mừng <Link to="/profile">{isAuthenticate ? profile.fullName : ""}</Link>
            </Typography>

            {isAuthenticate && (
              <div style={{marginLeft : "auto"}}>
              <Button
                color="inherit"
                onClick={() => {
                  this.props.logout();
                  this.props.history.push("/");
                }}
              >
                Đăng xuất
              </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withRouter(connect(null, { logout })(Navbar));
