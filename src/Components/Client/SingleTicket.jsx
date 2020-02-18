import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AlertDialog from "../Utils/alertDialog";
import NumberFormat from "react-number-format";
import Moment from "react-moment";
import _ from "lodash";

class SingleTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trip: {}
    };
  }
  componentDidMount = async () => {
    const tripId = this.props.ticket.tripId._id;
    await this.props.getTrip(tripId);
    this.setState({ trip: this.props.trip });
  };
  render() {
    const { ticket } = this.props;
    const { trip } = this.state;
    return (
      <Card style={{ minWidth: "275px", margin: "20px" }}>
        <CardContent>
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="flex-start"
          >
            <Grid item md={6} className="content__grid">
              <Typography variant="h5" style={{color: "#c9620f"}} gutterBottom>
                {_.get(trip, "fromStation.province", "")} -{" "}
                {_.get(trip, "toStation.province", "")}
              </Typography>
              <Typography  color="textSecondary">
                Nhà xe: {_.get(trip, "company.name", "")}
              </Typography>
              <Typography style={{ marginBottom: "12px" }} color="textSecondary">
                  Loại ghế ngồi : {_.get(trip, "carType", "")}
                </Typography>
              <Typography color="textPrimary">
                Điểm xuất phát: {_.get(trip, "fromStation.name", "")}
              </Typography>
              <Typography color="textPrimary">
                Điểm đến: {_.get(trip, "toStation.name", "")}
              </Typography>
              <Typography style={{ marginBottom: "12px" }} color="textPrimary">
                Giờ khởi hành:{" "}
                <Moment format=" HH:mm DD/MM/YYYY">
                  {_.get(trip, "startTime", "")}
                </Moment>
              </Typography>
            </Grid>
            <Grid item md={6} className="content__grid">
            <Typography  color="textSecondary">
                Giá vé:
                <NumberFormat
                  value={_.get(trip, "price", "")}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" VND"}
                />
              </Typography>
              <Typography color="textSecondary">
                Mã số ghế: {ticket.seats.map(seat => seat.code).join(", ")}
              </Typography>
              <Typography variant="h6" color="textPrimary">
                Tổng tiền vé :{" "}
                <NumberFormat
                  value={ticket.totalPrice}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" VND"}
                />
              </Typography>
              <Typography style={{ marginTop: "16px" }} color="textPrimary">
                Số điện thoại : {ticket.phone ? ticket.phone : ""}
              </Typography>
              <Typography color="textPrimary">
                Địa chỉ : {ticket.address ? ticket.address : ""}
              </Typography>
              <Typography color="textPrimary">
                Ghi chú : {ticket.note ? ticket.note : ""}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <div style={{ marginLeft: "auto" }}>
            <AlertDialog
              id={ticket._id}
              deleteAction={this.props.deleteTicket}
              type={"Vé"}
            />
          </div>
        </CardActions>
      </Card>
    );
  }
}
const mapStateToProps = state => {
  return {
    trip: state.layout.tripEditing
  };
};
export default connect(mapStateToProps, null)(SingleTicket);
