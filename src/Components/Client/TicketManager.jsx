import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getMyTickets, deleteMyTicket} from '../../Actions/ticket';
import SingleTicket from './SingleTicket';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

class Ticket extends Component {

    componentDidMount() {
        this.props.getMyTickets()
    }

    render() {
        return (
          <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md">
            <h1 className="title_addnew">DANH SÁCH VÉ XE ĐÃ ĐẶT</h1>
                {this.props.tickets.map((ticket, index) => {
                    return (
                    <SingleTicket ticket={ticket} key= {index} deleteMyTicket={this.props.deleteMyTicket} />
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

export default connect(mapStateToProps, {getMyTickets, deleteMyTicket})(Ticket)