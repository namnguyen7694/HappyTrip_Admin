import React from "react";
import { Route, Redirect } from "react-router-dom";
import isAuthenticate from './isAuthenticate';

const AdminRoute = ({ component: Component, ...rest }) => (
    // props means components passed down to this private route component
    <Route
        {...rest}
        render={props =>
            (isAuthenticate() && isAuthenticate().decoded.userType === 'admin' ) ? (
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

export default AdminRoute;
