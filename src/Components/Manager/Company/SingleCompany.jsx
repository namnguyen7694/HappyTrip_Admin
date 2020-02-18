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
import ButtonBase from '@material-ui/core/ButtonBase';

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
  const { company } = props;
  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid container direction="row" justify="space-evenly" alignItems="flex-start">
          <Grid item md={6}>
            <Link to={`/manager/companies/${company._id}`} className={classes.title}>
              {company.name}
            </Link>
            <Typography color="textPrimary">
              Loại ghế : {company.carType.join(", ")}
            </Typography>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" 
                src={company.image ? company.image
                 : "https://chothuexedulichtphcm.vn/wp-content/uploads/2018/05/cho-thue%CC%82-xe-29-cho%CC%82%CC%83-ta%CC%A3i-%C4%90o%CC%82%CC%80ng-Tha%CC%81p-gia%CC%81-re%CC%89.jpg"} />
            </ButtonBase>
          </Grid>
          <Grid item md={6}>
            <Typography variant="h6" color="textPrimary">
              Danh sách bến xe :{" "}
              {company.stations.map((stt, index) => {
                return (
                  <Typography key={index} color="textSecondary">
                    <Link to={`/manager/stations/${stt._id}`} className = {classes.link}>
                    {stt.name}
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
            props.history.push(`/manager/companies/${company._id}/editcompany`)
          }
        >
          Chỉnh sửa
        </Button>
        <AlertDialog
          id={company._id}
          deleteAction={props.deleteCompany}
          type={"Nhà xe"}
        />
      </CardActions>
    </Card>
  );
};

export default withRouter(SimpleCard);
