import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
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

class TicketById extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticket: {}
    };
  }
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
              <Grid item md={6}>
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
              </Grid>
              <Grid item md={6}>
                <Typography color="textSecondary">
                  Người đặt vé :{" "}
                  {_.get(ticket[0], "userId.fullName", "")} -  {_.get(ticket[0], "userId.email", "")}
                </Typography>
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
                <Typography color="textPrimary">
                  Tổng tiền vé :{" "}
                  <NumberFormat
                    value={_.get(ticket[0], "totalPrice")}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" VND"}
                  />
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
