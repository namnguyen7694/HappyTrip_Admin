import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getTickets, deleteTicket} from '../../../Actions/ticket';
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
              <h1 className="title_addnew">QUẢN LÝ VÉ XE</h1>
                {this.props.tickets.map((ticket, index) => {
                    return (
                    <SingleTicket ticket={ticket} key= {index} deleteTicket={this.props.deleteTicket} />
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

export default connect(mapStateToProps, {getTickets, deleteTicket})(Ticket)