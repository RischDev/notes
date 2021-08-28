import React from 'react';
import Modifiers from './Modifiers';
import styles from './styles/Item.Module.css';
import themeMMBN from './styles/themes/MMBN/MMBN-Item.Module.css';
import themeMMSF from './styles/themes/MMSF/MMSF-Item.Module.css';

class Item extends React.Component {
    constructor(props) {
        super(props);

        this.theme = {};
        if (props.game.includes("MMBN")) {
            this.theme = themeMMBN;
        } else if (props.game.includes("MMSF")) {
            this.theme = themeMMSF;
        }

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
            const foundClass = this.props.found ? styles.found : "";

            return(
                <div>
                    <div id={this.state.id} className={`${styles.item} ${this.theme[this.state.type.name]} ${this.theme.item} ${foundClass}`} onClick={this.updateFound}>
                        <div className={`${styles.title} ${this.theme.title}`}>{(this.state.id - this.props.low + 1).toString().padStart(3, "0")} {this.state.name}</div>
                        <img className={`${styles.itemArt} ${this.theme.itemArt}`} src={"/items/" + this.state.game + "/" + this.state.id + ".png"} alt={this.state.name + " art"} />
                    </div>
                    <Modifiers id={this.state.id} modifiers={this.props.modifiers} game={this.state.game} updateTracker={this.props.updateTracker} foundModifiers={this.props.foundModifiers} />
                </div>
            );
        }

        return null;
    }
}

export default Item;