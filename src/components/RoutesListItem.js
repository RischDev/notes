import React from 'react';

class RoutesListItem extends React.Component {
    constructor(props) {
        super(props);

        this.clickRoute = this.clickRoute.bind(this);
        this.editRoute = this.editRoute.bind(this);
    }

    clickRoute() {
        this.props.selectRoute(this.props.route.path);
    }

    editRoute() {
        this.props.selectEditRoute(this.props.route.path);
    }

    render() {
        return(
            <div className="wrapper">
                <div className="route-overview" onClick={this.clickRoute}>{this.props.route.title}</div>
                <img src="/notes/icons/edit.png" alt="Edit" className="edit" onClick={this.editRoute} />
            </div>
        );
    }
}

export default RoutesListItem;