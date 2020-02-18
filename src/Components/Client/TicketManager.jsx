import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getTickets, deleteTicket} from '../../Actions/ticket';
import {getTripByIdClient} from '../../Actions/trip';
import SingleTicket from './SingleTicket';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

class Ticket extends Component {
    componentDidMount() {
        this.props.getTickets()
    }

    render() {
        return (
          <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md">
            <h1 className="title_addnew">DANH SÁCH VÉ XE ĐÃ ĐẶT</h1>
                {this.props.tickets.filter(ticket => ticket.userId._id === this.props.user.userId).map((ticket, index) => {
                    return (
                    <SingleTicket ticket={ticket} key= {index} getTrip={this.props.getTripByIdClient} deleteTicket={this.props.deleteTicket} />
                    )
                })}
              
            </Container>
          </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tickets: state.tickets,
        user: state.auth.profile
    }
}

export default connect(mapStateToProps, {getTickets, deleteTicket, getTripByIdClient})(Ticket)