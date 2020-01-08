import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {withRouter} from 'react-router-dom';
import AlertDialog from '../../Utils/alertDialog'

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    margin: 40 
  },
 
  title: {
    color: "#6b8a78"
  },
  info: {
    marginBottom: 12,
  },
  detail: {
    marginBottom: 6,
    color: "green"
  },
});

const SimpleCard = (props) => {
  const classes = useStyles();
  const {station} = props;
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h4" className={classes.title} gutterBottom>
          {station.name}
        </Typography>
        <Typography color="textSecondary">
          Địa chỉ : {station.address}
        </Typography>
        <Typography className={classes.info} color="textSecondary">
          Tỉnh : {station.province}
        </Typography>
        <Typography variant="h6" color="textPrimary">
          Danh sách nhà xe :{" "}
          {station.companies.map((com, index) => {
            return (
              <Typography key={index} color="textSecondary">
                {com.name}
              </Typography>
            );
          })}
        </Typography>
      </CardContent>
      <CardActions>
        
          <Button
            size="small"
            variant="contained"
            style={{ marginLeft: "auto" }}
            onClick={() => props.history.push(`/manager/stations/${station._id}/editstation`)}
          >
            Edit Station
          </Button>
          <AlertDialog id={station._id} deleteAction = {props.deleteStation} type={"Station"}/>
      </CardActions>
    </Card>
  );
}

export default withRouter(SimpleCard) 