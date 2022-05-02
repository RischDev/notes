/** @format */

import React from 'react';
import styles from './styles/RoutesList.Module.css';
import RoutesListItem from './RoutesListItem';
import Button from '../common/Button';

let routes = require('../../notes/routes.json');

class RoutesList extends React.Component {
    constructor(props) {
        super(props);

        let gameId = props.match.params.gameId;
        let gameRoutes = routes[gameId];

        if (gameRoutes == null) {
            this.props.history.push('/notes');
        }

        this.state = {
            gameId: props.match.params.gameId,
            gameName: gameRoutes.name,
            routes: gameRoutes.routes,
        };

        this.createRoute = this.createRoute.bind(this);
    }

    createRoute() {
        this.props.history.push('/notes/createRoute/' + this.state.gameId);
    }

    render() {
        return (
            <div className="page">
                <div className={styles.wrapper}>
                    <div className={'col-3 col-m-12 card'}>
                        <h3>{this.state.gameName}</h3>
                        <img
                            className={styles.gameArt}
                            src={'/gameArt/' + this.state.gameId + '.png'}
                            alt={this.state.gameId + '.png'}
                        />
                    </div>
                    <div className={'col-8 col-m-12 card'}>
                        <h1>Routes</h1>
                        <div className={styles.wrapper + ' ' + styles.header}>
                            <div className="col-5 col-m-6">Route Name</div>
                            <div className="col-2 hidden-mobile">Category</div>
                            <div className="col-2 col-m-4">Author</div>
                            <div className="col-2 hidden-mobile">Version</div>
                            <div className="col-1 col-m-2">Edit</div>
                        </div>
                        {this.state.routes.map((route) => (
                            <RoutesListItem
                                gameId={this.state.gameId}
                                key={route.path}
                                path={route.path}
                            />
                        ))}
                        <Button
                            text="Create New Route"
                            size="medium"
                            onClick={this.createRoute}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default RoutesList;
