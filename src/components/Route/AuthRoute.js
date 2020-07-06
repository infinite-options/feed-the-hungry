import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { OrderContext }  from 'components/Context/OrderContext';

const AuthRoute = ({component: Component, ...rest}) => {
    const context = useContext(OrderContext);

    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /login page
        <Route {...rest} render={props => (
            context.isAuth ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export default AuthRoute;