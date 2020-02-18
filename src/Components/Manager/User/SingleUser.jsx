import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {Link, withRouter } from "react-router-dom";
import AlertDialog from "../../Utils/alertDialog";
import Grid from "@material-ui/core/Grid";
import useStyles from '../../Utils/style';

const SimpleCard = props => {
  const classes = useStyles();
  const { user } = props;
  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid container direction="row" justify="space-evenly" alignItems="flex-start">
            <Link to={`/manager/users/${user._id}`} className={classes.title}>
              Họ tên: {user.fullName}
            </Link>
            <Typography variant="h6" gutterBottom>
              Email: {user.email}
            </Typography>
            
        </Grid>
      </CardContent>
      <CardActions >
        <div style={{ marginLeft: "auto" }}> 
        <AlertDialog
          id={user._id}
          deleteAction={props.deleteUser}
          type={"Người dùng"}
        />
        </div>
      </CardActions>
    </Card>
  );
};

export default withRouter(SimpleCard);
