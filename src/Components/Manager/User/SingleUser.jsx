import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {Link, withRouter } from "react-router-dom";
import AlertDialog from "../../Utils/alertDialog";
import Grid from "@material-ui/core/Grid";

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
  image: {
    width: 200,
    height: 160,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
});

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