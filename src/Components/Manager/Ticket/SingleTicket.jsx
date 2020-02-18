import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AlertDialog from "./../../Utils/alertDialog";
import NumberFormat from "react-number-format";
import useStyles from "../../Utils/style";

export default function SimpleCard(props) {
  const classes = useStyles();
  const { ticket } = props;
  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="flex-start"
        >
          <Grid item md={6} className="content__grid">
            <Typography variant="h6" color="textSecondary">
              Mã số vé:
              <Link
                to={`/manager/tickets/${ticket._id}`}
                className={classes.link}
              >
                {_.get(ticket, "_id", "Khác")}
              </Link>
            </Typography>
            <Link
              to={`/manager/users/${ticket.userId._id}`}
              className={classes.link}
              color="textPrimary"
            >
              Người đặt vé: {_.get(ticket, "userId.fullName", "Khác")}
            </Link>
            <Typography style={{ marginTop: "16px" }} color="textPrimary">
              Số điện thoại : {_.get(ticket, "phone", "")}
            </Typography>
            <Typography color="textPrimary">
              Địa chỉ : {_.get(ticket, "address", "")}
            </Typography>
          </Grid>
          <Grid item md={6} className="content__grid">
            <Typography variant="h6" color="textSecondary">
              Mã số ghế: {ticket.seats.map(seat => seat.code).join(", ")}
            </Typography>
            <Typography variant="h6" color="secondary">
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
          </Grid>
        </Grid>
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
