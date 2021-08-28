import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { Switch } from "react-router-dom";
import { Route as BrowserRoute } from "react-router-dom";

import RoutesList from "./RoutesList";
import Route from "./route/Route";
import RouteForm from './routeForm/RouteForm';
import NotesHome from "./NotesHome";

class NotesTool extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <BrowserRoute path={"/notes/game/:gameId/route/:routePath"} component={Route} />
                    <BrowserRoute path={"/notes/game/:gameId"} component={RoutesList} />
                    <BrowserRoute path={"/notes/editRoute/:path"} component={RouteForm} />
                    <BrowserRoute path={"/notes/createRoute/:gameId"} component={RouteForm} />
                    <BrowserRoute path={"/notes/createRoute"} component={RouteForm} />
                    <BrowserRoute path="/notes" component={NotesHome} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default NotesTool;