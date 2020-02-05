import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AlertDialog from "../Utils/alertDialog";
import NumberFormat from 'react-number-format';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    margin: 20
  },

  title: {
    fontSize: 18
  },
  pos: {
    marginBottom: 12
  }
});

export default function SimpleCard(props) {
  const classes = useStyles();
  const { ticket } = props;
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.pos} color="textPrimary">
          Người đặt vé: {ticket.userId.fullName}
        </Typography>
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
            deleteAction={props.deleteMyTicket}
            type={"Vé"}
          />
        </div>
      </CardActions>
    </Card>
  );
}
