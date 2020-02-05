import React, { Component } from "react";
import { connect } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { getUsers, deleteUser } from "./../../../Actions/auth";
import SingleUser from './SingleUser';

class User extends Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="md">
          <h1 className="title_addnew">QUẢN LÝ NGƯỜI DÙNG</h1>
          
          {this.props.users.filter(u => u.userType === "client").map((user, index) => {
            return (
              <SingleUser
                user={user}
                key={index}
                deleteUser={this.props.deleteUser}
              />
            );
          })}
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users
  };
};

export default connect(mapStateToProps, { getUsers, deleteUser })(User);
