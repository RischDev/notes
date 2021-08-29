import React from 'react';
import styles from './styles/Tracker.Module.css';
import Item from './Item';

class Tracker extends React.Component {
    render() {
        const fullSizeClass = this.props.fullSize ? styles.fullSize : "";

        let Items = require('../../../../resources/' + this.props.game + '/ItemNames.json');

        if (this.props.display) {
            return(
                <div className={`${styles.tracker} ${fullSizeClass}`}>
                    {Items.types.map((type) =>
                        <div key={"type-" + type.name} className={`card ${styles.section}`}>
                            <div className={styles.header}>
                                <h2>{type.name}</h2>
                            </div>
                            <div id="Items" className={styles.list}>
                                {Items.Items.map((item) =>
                                    <Item key={"item-" + item.id} id={item.id} name={item.name} type={type} low={type.low} modifiers={item.modifiers} updateTracker={this.props.updateTracker} game={this.props.game} found={this.props.foundItems.includes(item.id)} foundModifiers={this.props.foundModifiers} />
                                )}
                            </div>
                        </div>
                    )}
                </div>
            );
        }

        return null;
    }
}

export default Tracker;