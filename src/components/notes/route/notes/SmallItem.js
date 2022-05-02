/** @format */

import React from 'react';
import styles from './styles/SmallItem.Module.css';
import themeMMBN from './styles/themes/MMBN/MMBN-SmallItem.Module.css';
import themeMMSF from './styles/themes/MMSF/MMSF-SmallItem.Module.css';
import SmallModifiers from './SmallModifiers';

class SmallItem extends React.Component {
    constructor(props) {
        super(props);

        this.theme = {};
        if (props.game.includes('MMBN')) {
            this.theme = themeMMBN;
        } else if (props.game.includes('MMSF')) {
            this.theme = themeMMSF;
        }

        let Items = require('../../../../resources/' +
            props.game +
            '/ItemNames.json');
        let name = '';
        let className = '';
        if (Items.Items[props.id] != null) {
            name = Items.Items[props.id].name;
        }
        for (let i = 0; i < Items.types.length; i++) {
            let type = Items.types[i];
            if (props.id >= type.low && props.id <= type.high) {
                className = type.id;
                break;
            }
        }

        this.state = {
            id: props.id,
            name: name,
            class: className,
            game: props.game,
        };

        this.updateFound = this.updateFound.bind(this);
    }

    updateFound() {
        this.props.updateTracker(this.state.id, null);
    }

    render() {
        const foundClass = this.props.found ? styles.found : '';
        return (
            <div>
                <div
                    id={this.state.id}
                    className={`${styles.item} ${this.theme.item} ${
                        this.theme[this.state.class]
                    } ${foundClass}`}
                    onClick={this.updateFound}>
                    <div className={`${styles.title} ${this.theme.title}`}>
                        {this.state.name}
                    </div>
                    <img
                        className={`${styles.itemArt} ${this.theme.itemArt}`}
                        src={
                            '/items/' +
                            this.state.game +
                            '/' +
                            this.state.id +
                            '.png'
                        }
                        alt={this.state.name + ' art'}
                    />
                </div>
                <SmallModifiers
                    id={this.state.id}
                    modifiers={this.props.modifiers}
                    game={this.state.game}
                    updateTracker={this.props.updateTracker}
                    foundModifiers={this.props.foundModifiers}
                />
            </div>
        );
    }
}

export default SmallItem;
