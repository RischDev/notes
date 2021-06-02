import React from 'react';
import Modifiers from './Modifiers';

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            name: props.name,
            type: props.type,
            game: props.game
        }

        this.updateFound = this.updateFound.bind(this);
    }

    updateFound() {
        this.props.updateTracker(this.state.id, null);
    }

    render() {
        if (this.state.id >= this.state.type.low && this.state.id <= this.state.type.high) {
            const foundClass = this.props.found ? " found" : "";
            const classes = "item " + this.state.type.name + foundClass;
            return(
                <div>
                    <div id={this.state.id} className={classes} onClick={this.updateFound}>
                        <div className="title">{(this.state.id - this.props.low + 1).toString().padStart(3, "0")} {this.state.name}</div>
                        <img className="item-art" src={"/notes/items/" + this.state.game + "/" + this.state.id + ".png"} alt={this.state.name + " art"} />
                    </div>
                    <Modifiers id={this.state.id} modifiers={this.props.modifiers} updateTracker={this.props.updateTracker} foundModifiers={this.props.foundModifiers} />
                </div>
            );
        }

        return null;
    }
}

export default Item;