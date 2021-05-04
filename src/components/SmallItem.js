import React from 'react';
import SmallModifiers from './SmallModifiers';

class SmallItem extends React.Component {
    constructor(props) {
        super(props);

        let Items = require('../resources/' + props.game + '/ItemNames.json');
        let name = "";
        let className = "";
        if (Items.Items[props.id] != null) {
            name = Items.Items[props.id].name;
        }
        for (let i = 0; i < Items.types.length; i++) {
            let type = Items.types[i];
            if (props.id >= type.low && props.id <= type.high) {
                className = type.name;
                break;
            }
        }

        this.state = {
            id: props.id,
            name: name,
            class: className,
            game: props.game
        }

        this.updateFound = this.updateFound.bind(this);
    }

    updateFound() {
        this.props.updateTracker(this.state.id, null);
    }

    render() {
        const foundClass = this.props.found ? " found" : "";
        const classes = "small-item " + this.state.class + foundClass;
        return(
            <div>
                <div id={this.state.id} className={classes} onClick={this.updateFound}>
                    <div className="small-title">{this.state.name}</div>
                    <img className="small-item-art" src={"/notes/items/" + this.state.game + "/" + this.state.id + ".png"} alt={this.state.name + " art"} />
                </div>
                <SmallModifiers id={this.state.id} modifiers={this.props.modifiers} updateTracker={this.props.updateTracker} foundModifiers={this.props.foundModifiers} />
            </div>
        );
    }
}

export default SmallItem;