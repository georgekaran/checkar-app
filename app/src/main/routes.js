import React from "react";

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Main from '../components/Main/index';
import UsersList from '../components/Users/UsersList';
import UserForm from '../components/Users/UserForm';
import Profile from '../components/Profile/Profile';
import ClientsList from '../components/Client/ClientsList';
import Client from '../components/Client/Client';
import Home from '../components/Home';

import ProjectDashboard from '../components/Projects/Dashboard/ProjectDashboardIndex';
import BrowseProjects from '../components/Projects/Browse/BrowseProjects';
import CreateProject from '../components/Projects/Create/CreateProject';

import CompanyForm from '../components/Company/CompanyForm';
import CompanyList from '../components/Company/CompanyList';

import TypeUserForm from '../components/TypeUser/TypeUserForm';
import TypeUserList from '../components/TypeUser/TypeUserList';

export default () => (
    <Router>
        <Main>
            <Switch>

                <Route path="/profile"><Profile/></Route>

                <Route path="/projects/create" component={CreateProject} />
                <Route path="/projects/:id" component={ProjectDashboard} />
                <Route path="/projects" component={BrowseProjects} />

                <Route path="/typesUser/create" component={TypeUserForm} />
                <Route path="/typesUser/:id" component={TypeUserForm} />
                <Route path="/typesUser" component={TypeUserList} />

                <Route path="/users/create" component={UserForm} />
                <Route path="/users/:id" component={UserForm} />
                <Route path="/users" component={UsersList} />

                <Route path="/companys/create" component={CompanyForm} />
                <Route path="/companys/:id" component={CompanyForm} />
                <Route path="/companys" component={CompanyList} />

                <Route path="/clients/create" component={Client} />
                <Route path="/clients/:id" component={Client} />
                <Route path="/clients" component={ClientsList} />

                <Route path="/"><Home/></Route>

            </Switch>
        </Main>
    </Router>
)
