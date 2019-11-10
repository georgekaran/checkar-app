import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const CustomRoute = ({ component: Component, isPrivate, isAuth, ...rest }) => (
    <Route
        {...rest}
        render={props => 
            isPrivate ? isAuth : !isAuth 
                    ? ( <Component {...props} /> ) 
                    : ( <Redirect to={{ pathname: "/dashboard", state: { from: props.location } }} /> )
        }
    />
);

export default CustomRoute