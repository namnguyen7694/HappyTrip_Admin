import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Link } from "react-router-dom";
import { getTicketById, deleteTicket } from "../../../Actions/ticket";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AlertDialog from "../../Utils/alertDialog";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import NumberFormat from "react-number-format";
import Moment from "react-moment";
import classes from '../../Utils/classes.json';

class TicketById extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticket: {}
    };
  }
  classes = classes;

  deleteTicket = id => {
    this.props.deleteTicket(id);
    this.props.history.push("./");
  };

  componentDidMount = async () => {
    const ticketId = this.props.match.params.id;
    await this.props.getTicketById(ticketId);
    await this.setState({
      ticket: this.props.ticketEditing
    });
  };
  render() {
    const { ticket } = this.state;
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
              <Grid item md={6} className="content__grid">
                <Typography
                  variant="h5"
                  style={this.classes.title}
                  gutterBottom
                >
                  {_.get(ticket[1], "fromStation.province", "")} -{" "}
                  {_.get(ticket[1], "toStation.province", "")}
                </Typography>
                <Typography color="textSecondary">
                  Nhà xe : {_.get(ticket[1], "company.name", "")}
                </Typography>
                <Typography color="textSecondary">
                  Giờ khởi hành :<Moment format=" HH:mm DD/MM/YYYY">{_.get(ticket[1], "startTime", "")}</Moment> 
                </Typography>
                <Typography color="textSecondary">
                  Loại ghế ngồi : {_.get(ticket[1], "carType", "")}
                </Typography>
                <Typography style={{ marginTop: "16px" }} color="textPrimary">
                  Người đặt vé :{" "}
                  <Link style={this.classes.link} to={`/manager/users/${_.get(ticket[0], "userId._id", "")}`}>
                  {_.get(ticket[0], "userId.fullName", "")}
                  </Link> 
                </Typography>
                <Typography color="textPrimary">
                  Email :{" "}
                  {_.get(ticket[0], "userId.email", "")}
                </Typography>
              </Grid>
              <Grid item md={6} className="content__grid">
                <Typography color="textSecondary">
                  Mã số ghế :{" "}
                  {_.get(ticket[0], "seats", [])
                    .map(seat => seat.code)
                    .join(", ")}
                </Typography>
                <Typography color="textPrimary">
                  Giá vé :{" "}
                  <NumberFormat
                    value={_.get(ticket[1], "price")}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" VND"}
                  />
                </Typography>
                <Typography variant="h6" color="textPrimary">
                  Tổng tiền vé :{" "}
                  <NumberFormat
                    value={_.get(ticket[0], "totalPrice")}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" VND"}
                  />
                </Typography>
                <Typography style={{ marginTop: "16px" }} color="textPrimary">
                Số điện thoại : {_.get(ticket[0], "phone", "")}
              </Typography>
              <Typography color="textPrimary">
                Địa chỉ : {_.get(ticket[0], "address", "")}
              </Typography>
              <Typography color="textPrimary">
                Ghi chú : {_.get(ticket[0], "note", "")}
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
              id={_.get(ticket[0], "_id")}
              deleteAction={this.deleteTicket}
              type={"Vé"}
            />
          </CardActions>
        </Card>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    ticketEditing: state.layout.ticketEditing
  };
};

export default connect(mapStateToProps, { getTicketById, deleteTicket })(
  TicketById
);
