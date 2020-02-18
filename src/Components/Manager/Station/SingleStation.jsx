import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {Link, withRouter } from "react-router-dom";
import AlertDialog from "../../Utils/alertDialog";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";

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
  link: {
    color: "#767b06d6",
    textDecoration: "none",
    fontSize : "16px"
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
});

const SimpleCard = props => {
  const classes = useStyles();
  const { station } = props;
  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid container direction="row" justify="space-evenly" alignItems="flex-start">
          <Grid item md={6}>
            <Link to={`/manager/stations/${station._id}`} className={classes.title}>
              {station.name}
            </Link>
            <Typography color="textSecondary">
              Địa chỉ : {station.address}
            </Typography>
            <Typography color="textSecondary">
              Tỉnh : {station.province}
            </Typography>
            <ButtonBase className={classes.image}>
              <img
                className={classes.img}
                alt="complex"
                src={
                  station.image
                    ? station.image
                    : "https://upload.wikimedia.org/wikipedia/vi/1/1a/Nh%C3%A0_ga_b%E1%BA%BFn_xe_mi%E1%BB%81n_%C4%90%C3%B4ng.JPG"
                }
              />
            </ButtonBase>
          </Grid>
          <Grid item md={6}>
            <Typography variant="h6" color="textPrimary">
              Danh sách nhà xe :{" "}
              {station.companies.map((com, index) => {
                return (
                  <Typography key={index} color="textSecondary">
                    <Link to={`/manager/companies/${com._id}`} className={classes.link}>
                    {com.name}
                    </Link>
                  </Typography>
                );
              })}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="contained"
          style={{ marginLeft: "auto" }}
          onClick={() =>
            props.history.push(`/manager/stations/${station._id}/editstation`)
          }
        >
          Chỉnh sửa
        </Button>
        <AlertDialog
          id={station._id}
          deleteAction={props.deleteStation}
          type={"Bến xe"}
        />
      </CardActions>
    </Card>
  );
};

export default withRouter(SimpleCard);
