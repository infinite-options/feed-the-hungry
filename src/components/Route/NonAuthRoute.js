import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const NonAuthRoute = ({component: Component, isAuth, ...rest}) => {
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            isAuth ?
                <Redirect to="/" />
            : <Component {...props} />
        )} />
    );
};

export default NonAuthRoute;