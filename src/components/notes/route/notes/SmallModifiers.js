import React from 'react';
import styles from './styles/SmallModifiers.Module.css';
import themeMMBN from './styles/themes/MMBN/MMBN-SmallModifiers.Module.css';

function Modifier(props) {
    const foundClass = props.foundModifiers[props.id].includes(props.modifier) ? styles.found : "";
    return(
        <div id={"modifier-" + props.id + "-" + props.modifier} className={`${styles.modifier} ${styles[props.game]} ${foundClass}`} onClick={props.onClick}>{props.modifier}</div>
    );
}

class SmallModifiers extends React.Component {
    constructor(props) {
        super(props);

        this.theme = {};
        if (props.game.includes("MMBN")) {
            this.theme = themeMMBN;
        }

        this.updateFound = this.updateFound.bind(this);
    }

    updateFound(e) {
        let modifier = e.target.id.split("-")[2];
        this.props.updateTracker(this.props.id, modifier);
    }

    render() {
       if (this.props.modifiers != null && this.props.modifiers.length > 0) {
            return(
                <div className={`${styles.modifiers} ${this.theme.modifiers}`}>
                    {this.props.modifiers.map((modifier) =>
                        <Modifier key={"small-modifier-" + modifier} id={this.props.id} modifier={modifier} game={this.props.game} foundModifiers={this.props.foundModifiers} onClick={this.updateFound} />
                    )}
                </div>
            );
        }
        return null;
    }
}

export default SmallModifiers;