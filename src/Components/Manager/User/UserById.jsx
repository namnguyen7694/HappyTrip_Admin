import React, { Component } from 'react';
import { connect } from "react-redux";
import { getUserById, deleteUser } from "./../../../Actions/auth";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AlertDialog from "../../Utils/alertDialog";
import Grid from "@material-ui/core/Grid";
import _ from 'lodash';

class UserById extends Component {
    constructor(props) {
        super(props);
        this.state = {
          user: {}
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

      deleteUser = (id) => {
        this.props.deleteUser(id);
        this.props.history.push('./')
      }
    
    componentDidMount = async () => {
        const userId = this.props.match.params.id;
        await this.props.getUserById(userId);
        await this.setState({
            user: this.props.userEditing
        });
    }
    render() {
        const {user} = this.state;
        return (
            <Card style={this.classes.card}>
        <CardContent>
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="flex-start"
          >
            
              <Typography variant="h5" style={this.classes.title} gutterBottom>
                {_.get(user, "fullName")}
              </Typography>
              <Typography color="textSecondary">
                Email : {_.get(user, "email")}
              </Typography>
              
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
          <AlertDialog
            id={_.get(user, "_id")}
            deleteAction={this.deleteUser}
            type={"Người dùng"}
          />
        </CardActions>
      </Card>
        );
    }
}

const mapStateToProps = state => {
    return {
        userEditing: state.layout.userEditing
    };
  };

export default connect(mapStateToProps, {getUserById, deleteUser})(UserById);