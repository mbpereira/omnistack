import React from 'react'
import { Switch, BrowserRouter, Route } from 'react-router-dom'
import { Booking, Main, Show } from './pages'

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/spots" exact component={Show} />
                <Route path="/spots/:spot_id/bookings" component={Booking} />
            </Switch>
        </BrowserRouter>
    )
}
