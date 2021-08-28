import React from 'react';
import styles from './styles/RoutesListItem.Module.css';
import Icon from '../common/Icon';

import { Link } from "react-router-dom";

class RoutesListItem extends React.Component {
    constructor(props) {
        super(props);

        let path = props.path
        let route = require('../../notes/' + path + '.json');

        this.state = {
            gameId: props.gameId,
            path: path,
            route: route
        }
    }

    render() {
        return(
            <Link to={"/notes/game/" + this.state.gameId + "/route/" + this.state.path} className={styles.wrapper}>
                <div className="col-5">
                    {this.state.route.title}
                </div>
                <div className="col-2">
                    {this.state.route.category}
                </div>
                <div className="col-2">
                    {this.state.route.author}
                </div>
                <div className="col-2">
                    {this.state.route.version}
                </div>
                <div className="col-1">
                    <Link to={"/notes/editRoute/" + this.state.path}>
                        <Icon src="/icons/edit.png" size="small" altText="Edit" hover={true} hidden={false} />
                    </Link>
                </div>
            </Link>
        );
    }
}

export default RoutesListItem;