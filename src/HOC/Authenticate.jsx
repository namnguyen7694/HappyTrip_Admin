import React from 'react'; 
import {withRouter} from 'react-router-dom'; 
import { connect } from 'react-redux';
import isAuthenticate from '../Components/Utils/isAuthenticate';

export default function(ComposedComponent) {
  class Authenticate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: {}
        }
    }
    
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.auth.isAuthenticate !== prevState.auth.isAuthenticate && !isAuthenticate()) {
            if (!nextProps.auth.isAuthenticate) {
                nextProps.history.push('/');
            }
        }
            
        return {
            auth : nextProps.auth
        }
    }
    
    render() {
      return (
        <div>
          <ComposedComponent />
        </div>
      );
    }
  }

  const mapStatetoProps = (state) => {
      return {
          auth : state.auth
      }
  }

  return withRouter(connect(mapStatetoProps,null)(Authenticate));  
}