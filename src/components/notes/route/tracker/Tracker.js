/** @format */

import { useContext } from 'react';
import styles from './styles/Tracker.Module.css';
import Item from './Item';
import NotesContext from '../../../common/NotesContext';

function Tracker(props) {
    const {
        notes: { game },
        showNotes,
        showTracker,
        foundItems,
    } = useContext(NotesContext);

    const fullSizeClass = !showNotes ? styles.fullSize : '';

    let Items = require('../../../../resources/' + game + '/ItemNames.json');

    if (showTracker) {
        return (
            <div
                data-id={
                    process.env.NODE_ENV === 'development'
                        ? 'tracker-container'
                        : null
                }
                className={`${styles.tracker}
                ${fullSizeClass}`}>
                {Items.types.map((type) => (
                    <div
                        key={'type-' + type.name}
                        className={`card ${styles.section}`}>
                        <div className={styles.header}>{type.name}</div>
                        <div id="Items" className={styles.list}>
                            {Items.Items.map((item) => (
                                <Item
                                    key={'item-' + item.id}
                                    id={item.id}
                                    name={item.name}
                                    type={type}
                                    low={type.low}
                                    modifiers={item.modifiers}
                                    updateTracker={props.updateTracker}
                                    found={foundItems.includes(item.id)}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return null;
}

export default Tracker;
