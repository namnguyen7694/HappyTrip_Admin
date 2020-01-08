import React from "react";
import { Route, Redirect } from "react-router-dom";
import isAuthenticate from './isAuthenticate';

const PrivateRoute = ({ component: Component, ...rest }) => (
    // props means components passed down to this private route component
    <Route
        {...rest}
        render={props =>
            isAuthenticate() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default PrivateRoute;
