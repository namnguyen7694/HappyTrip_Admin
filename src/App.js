import React, {Component} from 'react';
import {BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Login from './Components/Auth/Login';
import SignUp from './Components/Auth/SignUp';
import Sidebar from './Components/Manager/SideBar';
import Navbar from './Components/Navbar';
import setAuthToken from './Components/Utils/setAuthToken';
import {setCurrentUser} from './Actions/auth';
import { connect } from 'react-redux';
import AdminRoute from './Components/Utils/AdminRoute';
import ClientRoute from './Components/Utils/ClientRoute';
import isAuthenticate from './Components/Utils/isAuthenticate';
import Profile from './Components/Auth/Profile';
import UpdateProfile from './Components/Auth/UpdateProfile';
import User from './Components/Manager/User/User';
import UserById from './Components/Manager/User/UserById';
import Station from './Components/Manager/Station/Station';
import AddStation from './Components/Manager/Station/AddStation';
import EditStation from './Components/Manager/Station/EditStation';
import StationById from './Components/Manager/Station/StationById';
import Company from './Components/Manager/Company/Company';
import AddCompany from './Components/Manager/Company/AddCompany';
import EditCompany from './Components/Manager/Company/EditCompany';
import CompanyById from './Components/Manager/Company/CompanyById';
import Trip from './Components/Manager/Trip/Trip';
import TripById from './Components/Manager/Trip/TripById';
import AddTrip from './Components/Manager/Trip/AddTrip';
import EditTrip from './Components/Manager/Trip/EditTrip';
import Ticket from './Components/Manager/Ticket/Ticket';
import TicketById from './Components/Manager/Ticket/TicketById';
import TicketManager from './Components/Client/TicketManager';
import Explore from './Components/Client/Explore';
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
        { (isAuthenticate && profile.userType ==='admin') && <Sidebar {...this.props}/>}
        { (isAuthenticate && profile.userType ==='client') && <Navbar {...this.props}/>}
        <Switch>
          <Route path='/' exact render= {(props) => {
            if (isAuthenticate && profile.userType ==='admin') return <Trip {...props}/>;
            if (isAuthenticate && profile.userType ==='client') return <Explore {...props}/>;
            return <Redirect to='/login'/>
          }}
          />
          <Route path='/login' exact render= {(props) => {
            if (isAuthenticate) return <Redirect to='/'/>
            return <Login {...props}/>
          }}
          />
          <AdminRoute path = '/manager/trips' exact component = {Trip}/>
          <AdminRoute path = '/manager/trips/addtrip' exact component = {AddTrip}/>
          <AdminRoute path = '/manager/trips/:id/edittrip' exact component = {EditTrip}/>
          <AdminRoute path = '/manager/trips/:id' exact component = {TripById}/>
          <ClientRoute path = '/profile' exact component = {Profile}/>
          <ClientRoute path = '/updateprofile' exact component = {UpdateProfile}/>
          <AdminRoute path = '/manager/tickets' exact component = {Ticket}/>
          <AdminRoute path = '/manager/tickets/:id' exact component = {TicketById}/>
          <AdminRoute path = '/manager/stations' exact component = {Station}/>
          <AdminRoute path = '/manager/stations/addstation' exact component = {AddStation}/>
          <AdminRoute path = '/manager/stations/:id/editstation' exact component = {EditStation}/>
          <AdminRoute path = '/manager/stations/:id/' exact component = {StationById}/>
          <AdminRoute path = '/manager/companies' exact component = {Company}/>
          <AdminRoute path = '/manager/companies/addcompany' exact component = {AddCompany}/>
          <AdminRoute path = '/manager/companies/:id/editcompany' exact component = {EditCompany}/>
          <AdminRoute path = '/manager/companies/:id/' exact component = {CompanyById}/>
          <AdminRoute path = '/manager/users' exact component = {User}/>
          <AdminRoute path = '/manager/users/:id' exact component = {UserById}/>
          <ClientRoute path = '/ticketmanager' exact component = {TicketManager}/>
          <Route path = '/signup' component = {SignUp}/>
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
