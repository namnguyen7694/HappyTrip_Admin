import React, { Component } from "react";
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
import _ from 'lodash';
import { getCompanyById, deleteCompany } from "../../../Actions/company";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AlertDialog from "../../Utils/alertDialog";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";

class CompanyById extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: {}
    };
  }

  classes = {
    card: {
      minWidth: 275,
      margin: 20
    },

    title: {
      color: "#6b8a78"
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
  };

  deleteCompany = (id) => {
    this.props.deleteCompany(id);
    this.props.history.push('./')
  }

  componentDidMount = async () => {
    const companyId = this.props.match.params.id;
    await this.props.getCompanyById(companyId);
    await this.setState({
        company: this.props.companyEditing
    });
  };
  render() {
    const { company } = this.state;
    return (
      <Card style={this.classes.card}>
        <CardContent>
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="flex-start"
          >
            <Grid item md={6}>
              <Typography variant="h5" style={this.classes.title} gutterBottom>
                {_.get(company, "name")}
              </Typography>
              <Typography color="textPrimary">
                Loại ghế : {_.get(company, "carType", []).join(", ")}
              </Typography>
              <ButtonBase style={this.classes.image}>
                <img
                  style={this.classes.img}
                  alt="complex"
                  src={
                    _.get(company, "image")
                      ? _.get(company, "image")
                      : "https://chothuexedulichtphcm.vn/wp-content/uploads/2018/05/cho-thue%CC%82-xe-29-cho%CC%82%CC%83-ta%CC%A3i-%C4%90o%CC%82%CC%80ng-Tha%CC%81p-gia%CC%81-re%CC%89.jpg"
                  }
                />
              </ButtonBase>
            </Grid>
            <Grid item md={6}>
            <Typography variant="h6" color="textPrimary">
              Danh sách bến xe :{" "}
              {_.get(company, "stations", []).map((stt, index) => {
                return (
                  <Typography key={index} color="textSecondary">
                    <Link to={`/manager/stations/${stt._id}`} style = {this.classes.link}>
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
                `/manager/companies/${_.get(company, "_id")}/editcompany`
              )
            }
          >
            Chỉnh sửa
          </Button>
          <AlertDialog
            id={_.get(company, "_id")}
            deleteAction={this.deleteCompany}
            type={"Nhà xe"}
          />
        </CardActions>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    companyEditing: state.layout.companyEditing
  };
};

export default connect(mapStateToProps, { getCompanyById, deleteCompany })(CompanyById);
