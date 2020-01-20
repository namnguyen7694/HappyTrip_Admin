import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";
import AlertDialog from "../../Utils/alertDialog";
import Grid from "@material-ui/core/Grid";
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    margin: 40
  },

  title: {
    color: "#6b8a78"
  },
  info: {
    marginBottom: 12
  },
  detail: {
    marginBottom: 6,
    color: "green"
  },
  image: {
    width: 200,
    height: 200,
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
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item md={6}>
            <Typography variant="h4" className={classes.title} gutterBottom>
              {company.name}
            </Typography>
            <Typography color="textPrimary">
              Loại xe : {company.carType.join(", ")}
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
                    {stt.name}
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
          Edit Company
        </Button>
        <AlertDialog
          id={company._id}
          deleteAction={props.deleteCompany}
          type={"Company"}
        />
      </CardActions>
    </Card>
  );
};

export default withRouter(SimpleCard);
