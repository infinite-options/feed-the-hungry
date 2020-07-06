import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { OrderContext }  from 'components/Context/OrderContext';

const NonAuthRoute = ({component: Component, ...rest}) => {
    const context = useContext(OrderContext);

    return (
        <Route {...rest} render={props => (
            context.isAuth ?
                <Redirect to="/" />
            : <Component {...props} />
        )} />
    );
};

export default NonAuthRoute;