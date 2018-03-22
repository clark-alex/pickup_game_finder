import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard'
import Profile from './components/Profile/Profile'
import CreateGame from './components/CreateGame/CreateGame'
import Games from './components/Games/Games'
export default (
    <Switch>
        <Route path='/' component={Login} exact />
        <Route path='/Dashboard' component={Dashboard} />
        <Route path='/profile' component={Profile} />
        <Route path='/CreateGame' component={CreateGame} />
        <Route path='/games/:gameid' component={Games} />
    </Switch>
)