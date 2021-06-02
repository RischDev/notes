import React from 'react';

function Modifier(props) {
    const foundClass = props.foundModifiers[props.id].includes(props.modifier) ? " found" : "";
    const classes = "small-modifier " + foundClass;
    return(
        <div id={"modifier-" + props.id + "-" + props.modifier} className={classes} onClick={props.onClick}>{props.modifier}</div>
    );
}

class SmallModifiers extends React.Component {
    constructor(props) {
        super(props);

        this.updateFound = this.updateFound.bind(this);
    }

    updateFound(e) {
        let modifier = e.target.id.split("-")[2];
        this.props.updateTracker(this.props.id, modifier);
    }

    render() {
       if (this.props.modifiers != null && this.props.modifiers.length > 0) {
            return(
                <div className="modifiers">
                    {this.props.modifiers.map((modifier) =>
                        <Modifier key={"small-modifier-" + modifier} id={this.props.id} modifier={modifier} foundModifiers={this.props.foundModifiers} onClick={this.updateFound} />
                    )}
                </div>
            );
        }
        return null;
    }
}

export default SmallModifiers;