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
            <div className={styles.wrapper}>
                <Link to={"/notes/game/" + this.state.gameId + "/route/" + this.state.path} className={`${styles.link} col-5 col-m-6`}>
                    <div>
                        {this.state.route.title}
                    </div>
                </Link>
                <Link to={"/notes/game/" + this.state.gameId + "/route/" + this.state.path} className={`${styles.link} col-2 hidden-mobile`}>
                    <div>
                        {this.state.route.category}
                    </div>
                </Link>
                <Link to={"/notes/game/" + this.state.gameId + "/route/" + this.state.path} className={`${styles.link} col-2 col-m-4`}>
                    <div>
                        {this.state.route.author}
                    </div>
                </Link>
                <Link to={"/notes/game/" + this.state.gameId + "/route/" + this.state.path} className={`${styles.link} col-2 hidden-mobile`}>
                    <div>
                        {this.state.route.version}
                    </div>
                </Link>
                <Link to={"/notes/editRoute/" + this.state.path} className={`${styles.link} col-1 col-m-2`}>
                    <Icon src="/icons/edit.png" size="small" altText="Edit" hover={true} hidden={false} />
                </Link>
            </div>
        );
    }
}

export default RoutesListItem;