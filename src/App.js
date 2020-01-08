import React, {Component} from 'react';
import {BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './Components/Auth/Login'
import Navbar from './Components/Navbar';
import './App.css';
import Manager from './Components/Manager';
import setAuthToken from './Components/Utils/setAuthToken';
import {setCurrentUser} from './Actions/auth';
import { connect } from 'react-redux';
import PrivateRoute from './Components/Utils/PrivateRouter';
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
    const {isAuthenticate} = auth;
    return (
      <div className="App">
      <BrowserRouter>
        {isAuthenticate &&  <Navbar {...this.props}/>}
        <Switch>
          <Route path='/' exact render= {(props) => {
            if (isAuthenticate) return <Redirect to='/manager'/>
            return <Login {...props}/>
          }}
          />
          <PrivateRoute path = '/manager' exact component = {Manager}/>
          <PrivateRoute path = '/profile' exact component = {Profile}/>
          <PrivateRoute path = '/manager/tickets' exact component = {Ticket}/>
          <PrivateRoute path = '/manager/stations' exact component = {Station}/>
          <PrivateRoute path = '/manager/stations/addstation' exact component = {AddStation}/>
          <PrivateRoute path = '/manager/stations/:id/editstation' exact component = {EditStation}/>
          <PrivateRoute path = '/manager/companies' exact component = {Company}/>
          <PrivateRoute path = '/manager/companies/addcompany' exact component = {AddCompany}/>
          <PrivateRoute path = '/manager/companies/:id/editcompany' exact component = {EditCompany}/>
          <PrivateRoute path = '/manager/trips' exact component = {Trip}/>
          <PrivateRoute path = '/manager/trips/addtrip' exact component = {AddTrip}/>
          <PrivateRoute path = '/manager/trips/:id/edittrip' exact component = {EditTrip}/>
          <PrivateRoute path = '/manager/users' exact component = {User}/>
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
