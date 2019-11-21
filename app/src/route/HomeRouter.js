import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";

export default () => {
    let { path } = useRouteMatch();
    return (
        <Router>
            <Switch>
                <Route exact path={path}>
                </Route>
                <Route path={`${path}/:nestedPageName`}>
                </Route>
            </Switch>
        </Router>
    )  
}