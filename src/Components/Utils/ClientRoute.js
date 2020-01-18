import React from "react";
import { Route, Redirect } from "react-router-dom";
import isAuthenticate from './isAuthenticate';

const ClientRoute = ({ component: Component, ...rest }) => (
    // props means components passed down to this private route component
    <Route
        {...rest}
        render={props =>
            (isAuthenticate() && isAuthenticate().decoded.userType === 'client' ) ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/notfound",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default ClientRoute;
