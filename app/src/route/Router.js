import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux'

import { store } from '../store/createStore'
import CustomRoute from './CustomRoute';
import Home from '../pages/Home';
import Login from '../pages/Login';

const isAuth = false;

const testComponent = () => (<div>HOME</div>);

const Router = () => {
    return (
        <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        {isAuth ? (
                           <Route
                            path="/"
                            component={Home}
                            render={({ match: { url } }) => (
                                <>
                                <Route path={`${url}/`} component={testComponent} exact />
                                <Route path={`${url}/home`} component={testComponent} />
                                <Route path={`${url}/users`} component={testComponent} />
                                </>
                            )}
                            />
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