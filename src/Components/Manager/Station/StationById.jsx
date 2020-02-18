import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";
import { getStationById, deleteStation } from "../../../Actions/station";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AlertDialog from "../../Utils/alertDialog";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import Container from "@material-ui/core/Container";
import classes from '../../Utils/classes.json';

class StationById extends Component {
  constructor(props) {
    super(props);
    this.state = {
      station: {}
    };
  }

  classes = classes;

  deleteStation = id => {
    this.props.deleteStation(id);
    this.props.history.push("./");
  };

  componentDidMount = async () => {
    const stationId = this.props.match.params.id;
    await this.props.getStationById(stationId);
    await this.setState({
      station: this.props.stationEditing
    });
  };
  render() {
    const { station } = this.state;
    return (
      <Container>
        <Card style={this.classes.card}>
          <CardContent>
            <Grid
              container
              direction="row"
              justify="space-evenly"
              alignItems="flex-start"
            >
              <Grid item md={6}>
                <Typography
                  variant="h5"
                  style={this.classes.title}
                  gutterBottom
                >
                  {_.get(station, "name")}
                </Typography>
                <Typography color="textSecondary">
                  Địa chỉ : {_.get(station, "address")}
                </Typography>
                <Typography color="textSecondary">
                  Tỉnh : {_.get(station, "province")}
                </Typography>
                <ButtonBase style={this.classes.image}>
                  <img
                    style={this.classes.img}
                    alt="complex"
                    src={
                      _.get(station, "image")
                        ? _.get(station, "image")
                        : "https://upload.wikimedia.org/wikipedia/vi/1/1a/Nh%C3%A0_ga_b%E1%BA%BFn_xe_mi%E1%BB%81n_%C4%90%C3%B4ng.JPG"
                    }
                  />
                </ButtonBase>
              </Grid>
              <Grid item md={6}>
                <Typography variant="h6" color="textPrimary">
                  Danh sách nhà xe :{" "}
                  {_.get(station, "companies", []).map((com, index) => {
                    return (
                      <Typography key={index} color="textSecondary">
                        <Link
                          to={`/manager/companies/${com._id}`}
                          style={this.classes.link}
                        >
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
              variant="contained"
              style={{ marginLeft: "auto" }}
              onClick={() => this.props.history.push("./")}
            >
              Trở về
            </Button>
            <Button
              size="small"
              variant="contained"
              onClick={() =>
                this.props.history.push(
                  `/manager/stations/${_.get(station, "_id")}/editstation`
                )
              }
            >
              Chỉnh sửa
            </Button>
            <AlertDialog
              id={_.get(station, "_id")}
              deleteAction={this.deleteStation}
              type={"Bến xe"}
            />
          </CardActions>
        </Card>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    stationEditing: state.layout.stationEditing
  };
};

export default connect(mapStateToProps, { getStationById, deleteStation })(
  StationById
);
