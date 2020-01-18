import React, {Component} from 'react';
import {BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './Components/Auth/Login'
import Navbar from './Components/Navbar';
import './App.css';
import Manager from './Components/Manager';
import setAuthToken from './Components/Utils/setAuthToken';
import {setCurrentUser} from './Actions/auth';
import { connect } from 'react-redux';
import AdminRoute from './Components/Utils/AdminRoute';
import ClientRoute from './Components/Utils/ClientRoute';
import isAuthenticate from './Components/Utils/isAuthenticate';
import Profile from './Components/Profile';
import User from './Components/Manager/User';
import Station from './Components/Manager/Station/Station';
import AddStation from './Components/Manager/Station/AddStation';
import EditStation from './Components/Manager/Station/EditStation';
import Company from './Components/Manager/Company/Company';
import AddCompany from './Components/Manager/Company/AddCompany';
import EditCompany from './Components/Manager/Company/EditCompany';
import Trip from './Components/Manager/Trip/Trip';
import AddTrip from './Components/Manager/Trip/AddTrip';
import EditTrip from './Components/Manager/Trip/EditTrip';
import Ticket from './Components/Manager/Ticket/Ticket';
import Explore from './Components/Client/Explore'
import BookingTicket from './Components/Client/BookingTicket';
import NotFound from './Components/Utils/NotFound'

class App extends Component {
  constructor(props) {
    super(props);
    if(isAuthenticate().token) {
      setAuthToken(isAuthenticate().token);
      props.setCurrentUser(isAuthenticate().decoded);
    }
  }
  
  render() {
    const {auth} = this.props;
    const {isAuthenticate, profile} = auth;
    return (
      <div className="App">
      <BrowserRouter>
        {isAuthenticate &&  <Navbar {...this.props}/>}
        <Switch>
          <Route path='/' exact render= {(props) => {
            if (isAuthenticate && profile.userType ==='admin') return <Redirect to='/manager'/>;
            if (isAuthenticate && profile.userType ==='client') return <Explore {...props}/>;
            return <Redirect to='/login'/>
          }}
          />
          <Route path='/login' exact render= {(props) => {
            if (isAuthenticate) return <Redirect to='/'/>
            return <Login {...props}/>
          }}
          />
          <AdminRoute path = '/manager' exact component = {Manager}/>
          <AdminRoute path = '/profile' exact component = {Profile}/>
          <AdminRoute path = '/manager/tickets' exact component = {Ticket}/>
          <AdminRoute path = '/manager/stations' exact component = {Station}/>
          <AdminRoute path = '/manager/stations/addstation' exact component = {AddStation}/>
          <AdminRoute path = '/manager/stations/:id/editstation' exact component = {EditStation}/>
          <AdminRoute path = '/manager/companies' exact component = {Company}/>
          <AdminRoute path = '/manager/companies/addcompany' exact component = {AddCompany}/>
          <AdminRoute path = '/manager/companies/:id/editcompany' exact component = {EditCompany}/>
          <AdminRoute path = '/manager/trips' exact component = {Trip}/>
          <AdminRoute path = '/manager/trips/addtrip' exact component = {AddTrip}/>
          <AdminRoute path = '/manager/trips/:id/edittrip' exact component = {EditTrip}/>
          <AdminRoute path = '/manager/users' exact component = {User}/>
          <ClientRoute path = '/bookticket/:tripId' exact component = {BookingTicket}/>
          <Route path = '/*' component = {NotFound}/>
          <Route path = '/notfound' component = {NotFound}/>
        </Switch>
      </BrowserRouter>
    </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth : state.auth
  }
}

export default connect(mapStateToProps, {setCurrentUser})(App)
