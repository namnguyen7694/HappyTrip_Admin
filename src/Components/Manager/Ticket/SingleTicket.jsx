import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    margin: 40 
  },
 
  title: {
    fontSize: 18,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard(props) {
  const classes = useStyles();
  const {ticket} = props;
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textPrimary" gutterBottom>
         Mã Chuyến đi:  {ticket.tripId._id} 
        </Typography>
       
        <Typography className={classes.pos} color="textSecondary">
          Người đặt vé: {ticket.userId.fullName}
        </Typography>
        
        <Typography color="textPrimary">
          Mã số ghế:  {ticket.seats.map ((seat, index) => {
              return (
                <Typography key={index} color="textPrimary">
                  {seat.code}
                </Typography>
              );
          })}
        </Typography>
        <Typography color="textPrimary">
          Tiền vé :  {ticket.totalPrice}
        </Typography>
        
      </CardContent>
      <Typography component="div">
      <CardActions >
        <Button size="small" variant="contained" style={{marginLeft :  "auto"}} >Edit Ticket</Button>
        <Button size="small" variant="contained" color="secondary">Delete Ticket</Button>
      </CardActions>

      </Typography>
    </Card>
  );
}