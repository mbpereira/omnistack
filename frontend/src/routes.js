import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Login, New, Dashboard } from './pages'


export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/new" component={New} />
            </Switch>
        </BrowserRouter>
    )
}