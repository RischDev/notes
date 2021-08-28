import React from 'react';
import styles from './styles/Tracker.Module.css';
import Item from './Item';
import Button from '../../../common/Button';

class Tracker extends React.Component {
    render() {
        const fullSizeClass = this.props.fullSize ? styles.fullSize : "";

        let Items = require('../../../../resources/' + this.props.game + '/ItemNames.json');

        let menu;
        if (this.props.fullSize) {
            menu = <img className="expand" src="/icons/collapse-right.png" alt="Show Notes" onClick={this.props.updateNotesDisplay} />;
        } else {
            menu = <img className="collapse right" src="/icons/collapse-right.png" alt="Hide Tracker" onClick={this.props.updateTrackerDisplay} />;
        }

        if (this.props.display) {
            return(
                <div className={`${styles.tracker} ${fullSizeClass}`}>
                    <div className={styles.menu}>
                        {menu}
                        <Button text="Reset" size="small" onClick={this.props.resetTracker} />
                    </div>

                    {Items.types.map((type) =>
                        <div key={"type-" + type.name}>
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