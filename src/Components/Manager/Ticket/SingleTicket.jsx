import React from "react";
import _ from 'lodash';
import {Link} from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AlertDialog from "./../../Utils/alertDialog";
import NumberFormat from 'react-number-format';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    margin: 20
  },

  title: {
    color: "#6b8a78",
    textDecoration: "none",
    fontSize : "24px"
  },
  pos: {
    color: "#b10e0ec7",
    textDecoration: "none",
    display: "block",
    fontSize : "20px"
  }
});

export default function SimpleCard(props) {
  const classes = useStyles();
  const { ticket } = props;
  return (
    <Card className={classes.card}>
      <CardContent>
        
           <Link to={`/manager/tickets/${ticket._id}`} className={classes.pos}>
           Mã số vé: {_.get(ticket, "_id", "Khác") }
          </Link> 
           <Link to={`/manager/trips/${ticket.tripId._id}`} className={classes.pos}>
           Mã chuyến đi: {_.get(ticket, "tripId._id", "Khác") }
          </Link> 
        
        <Link to={`/manager/users/${ticket.userId._id}`} className={classes.title} color="textPrimary">
          Người đặt vé: {_.get(ticket, "userId.fullName", "Khác") }
        </Link>
        <Typography variant="h6" color="textSecondary">
          Mã số ghế: {ticket.seats.map(seat => seat.code).join(", ")}
        </Typography>
        <Typography color="textPrimary">
          Tiền vé :{" "}
          <NumberFormat
            value={ticket.totalPrice}
            displayType={"text"}
            thousandSeparator={true}
            suffix={" VND"}
          />
        </Typography>
        <Typography color="textPrimary">
          Ghi chú : {ticket.note ? ticket.note : ""}
        </Typography>
      </CardContent>
      <CardActions>
        <div style={{ marginLeft: "auto" }}>
          <AlertDialog
            id={ticket._id}
            deleteAction={props.deleteTicket}
            type={"Vé"}
          />
        </div>
      </CardActions>
    </Card>
  );
}
