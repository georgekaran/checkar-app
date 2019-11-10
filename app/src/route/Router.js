import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux'

import { store } from '../store/createStore'
import CustomRoute from './CustomRoute';
import Home from '../pages/Home';
import Login from '../pages/Login';

const isAuth = true;

const Router = () => {
    return (
        <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        {isAuth ? (
                            <CustomRoute exact path="/" component={Home}
                            isAuth={false} isPrivate={false} />
                        ) : (
                        <CustomRoute exact path="/" component={Login}
                            isAuth={false} isPrivate={false} />
                        )}
                        <Route component={<div>Not Found</div>} />
                    </Switch>
                </BrowserRouter>
        </Provider>
    )
}

export default Router