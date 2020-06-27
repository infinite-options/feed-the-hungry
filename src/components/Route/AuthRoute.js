import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({component: Component, isAuth, bankAPI, ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isAuth ?
                <Component {...props} {...bankAPI} />
            : <Redirect to="/login" />
        )} />
    );
};

export default AuthRoute;