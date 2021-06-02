import React from 'react';
import Route from './Route/Route';
import RoutesListItem from './RoutesListItem';
import CreateRoute from './RouteForm/RouteForm';

let routes = require('../notes/routes.json');

class Routes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.selectRoute = this.selectRoute.bind(this);
        this.selectEditRoute = this.selectEditRoute.bind(this);
        this.selectCreateRoute = this.selectCreateRoute.bind(this);
    }

    selectRoute(path) {
        this.setState({
            path: path,
            mode: "view"
        })
    }

    selectEditRoute(path) {
        this.setState({
            path: path,
            mode: "edit"
        })
    }

    selectCreateRoute(path) {
        this.setState({
            path: path,
            mode: "create"
        })
    }

    render() {
        if (this.state.path == null && this.state.mode !== "create") {
            return (
                <div className="wrapper">
                    <h1>Routes</h1>
                    <div className="wrapper">
                        {routes.games.map((game) =>
                            <div className="col-6 routes-list" key={"routes-list-" + game.name}>
                                <h1>{game.name}</h1>
                                {routes[game.value].map((route) =>
                                    <RoutesListItem key={"route-" + route.title} route={route} selectEditRoute={this.selectEditRoute} selectRoute={this.selectRoute} />
                                )}
                            </div>
                        )}
                    </div>
                    <div className="route-overview" onClick={this.selectCreateRoute}>
                        <span>Create new Route</span>
                        <img src="/notes/icons/edit.png" alt="Edit" className="edit" />
                    </div>
                </div>
            );
        } else if (this.state.mode === "create") {
            return (
                <CreateRoute />
            );
        } else if (this.state.mode === "edit") {
              return (
                  <CreateRoute path={this.state.path} />
              );
          }
        return (
            <Route path={this.state.path} />
        );
    }
}

export default Routes;