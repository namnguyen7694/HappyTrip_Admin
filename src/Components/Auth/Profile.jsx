import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserById, deleteUser } from "../../Actions/auth";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import _ from "lodash";

class Profile extends Component {
  classes = {
    card: {
      minWidth: 275,
      margin: 20
    },

    title: {
      color: "#6b8a78"
    },
    link: {
      color: "#767b06d6",
      textDecoration: "none",
      fontSize: "16px"
    },
    image: {
      width: 200,
      height: 160
    },
    img: {
      margin: "auto",
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%"
    }
  };

  render() {
    const user = this.props.user;
    return (
      <Container maxWidth="md">
        <h2 className="title_addnew">THÔNG TIN TÀI KHOẢN</h2>
        <Card style={this.classes.card}>
          <CardContent>
            <Grid
              container
              direction="row"
              justify="space-evenly"
              alignItems="flex-start"
            >
              <Typography variant="h5" style={this.classes.title} gutterBottom>
                {_.get(user, "fullName")}
              </Typography>
              <Typography color="textSecondary">
                Email : {_.get(user, "email")}
              </Typography>
            </Grid>
          </CardContent>
          <CardActions>
            <Button
              color="primary"
              variant="contained"
              style={{ marginLeft: "auto" }}
              onClick={() => this.props.history.push(`/updateprofile`)}
            >
              Cập nhật thông tin
            </Button>
            <Button
              variant="contained"
              onClick={() => this.props.history.push("./")}
            >
              Trở về
            </Button>
          </CardActions>
        </Card>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.profile
  };
};

export default connect(mapStateToProps, { getUserById, deleteUser })(Profile);
