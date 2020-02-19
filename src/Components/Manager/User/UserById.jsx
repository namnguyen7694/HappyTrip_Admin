import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getUserById, deleteUser } from "./../../../Actions/auth";
import { getTickets } from "./../../../Actions/ticket";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AlertDialog from "../../Utils/alertDialog";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import classes from '../../Utils/classes.json';
import _ from "lodash";

class UserById extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      tickets: []
    };
  }
  classes = classes;

  deleteUser = id => {
    this.props.deleteUser(id);
    this.props.history.push("./");
  };

  componentDidMount = async () => {
    const userId = this.props.match.params.id;
    await this.props.getUserById(userId);
    await this.props.getTickets();
    await this.setState({
      user: this.props.userEditing,
      tickets: this.props.tickets
    });

  };
  render() {
    const { user, tickets } = this.state;
    return (
      <Container>
        <Card style={this.classes.card}>
          <CardContent>
            <Grid
              container
              direction="row"
              justify="space-evenly"
              alignItems="flex-start"
            >
              <Grid item md={6}>
                <Typography
                  variant="h5"
                  style={this.classes.title}
                  gutterBottom
                >
                  {_.get(user, "fullName")}
                </Typography>
                <Typography color="textSecondary">
                  Email : {_.get(user, "email")}
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography color="textSecondary">
                  Mã vé xe đã đặt :{" "}
                  {tickets
                    .filter(ticket => ticket.userId._id === user._id)
                    .map((t, key) => (
                        <Link
                         key={key}
                          to={`/manager/tickets/${t._id}`}
                          style={classes.link}
                        >
                          {t._id}
                        </Link>
                    ))}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              style={{ marginLeft: "auto" }}
              onClick={() => this.props.history.push("./")}
            >
              Trở về
            </Button>
            <AlertDialog
              id={_.get(user, "_id")}
              deleteAction={this.deleteUser}
              type={"Người dùng"}
            />
          </CardActions>
        </Card>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    userEditing: state.layout.userEditing,
    tickets: state.tickets
  };
};

export default connect(mapStateToProps, { getUserById, deleteUser, getTickets })(UserById);
