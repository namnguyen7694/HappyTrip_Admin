import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getTickets, createTicket} from '../../../Actions/ticket';
import SingleTicket from './SingleTicket';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

class Ticket extends Component {

    componentDidMount() {
        this.props.getTickets()
    }

    render() {
        return (
          <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md">
              <h1>Tickets Manager</h1>
              <Button variant="contained" color="primary"
                onClick={() => {
                  this.props.createTicket({
                    tripId: "5e0eb4213076b7a35098bbf8",
                    seatCodes: ["A05", "A06"]
                  });
                }}
              >
                Create Ticket
             </Button>
                {this.props.tickets.map((ticket, index) => {
                    return (
                    <SingleTicket ticket={ticket} key= {index}/>
                    )
                })}
              
            </Container>
          </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tickets: state.tickets
    }
}

export default connect(mapStateToProps, {getTickets, createTicket})(Ticket)