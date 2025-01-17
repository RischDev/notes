/** @format */

import { useContext } from 'react';
import styles from './styles/SmallItem.module.css';
import themeMMBN from './styles/themes/MMBN/MMBN-SmallItem.module.css';
import themeMMSF from './styles/themes/MMSF/MMSF-SmallItem.module.css';
import SmallModifiers from './SmallModifiers';
import NotesContext from '../../../common/NotesContext';

function SmallItem(props) {
    const {
        notes: { game },
    } = useContext(NotesContext);

    let theme = {};
    if (game.includes('MMBN')) {
        theme = themeMMBN;
    } else if (game.includes('MMSF')) {
        theme = themeMMSF;
    }

    let Items = require('../../../../resources/' + game + '/ItemNames.json');

    const updateFound = () => {
        props.updateTracker(props.id, null);
    };

    const foundClass = props.found ? styles.found : '';
    let typeClass = '';
    for (let i = 0; i < Items.types.length; i++) {
        let type = Items.types[i];
        if (props.id >= type.low && props.id <= type.high) {
            typeClass = type.id;
            break;
        }
    }
    return (
        <div className={`${styles.wrapper}`}>
            <div
                id={'section-' + props.sectionId + '-item-' + props.id}
                className={`${styles.item} ${theme.item} ${theme[typeClass]} ${foundClass}`}
                onClick={updateFound}>
                <div className={`${styles.title} ${theme.title}`}>
                    {Items.Items[props.id].name}
                </div>
                <img
                    className={`${styles.itemArt} ${theme.itemArt}`}
                    src={'/items/' + game + '/' + props.id + '.png'}
                    alt={Items.Items[props.id] + ' art'}
                />
            </div>
            <SmallModifiers
                id={props.id}
                sectionId={props.sectionId}
                modifiers={props.modifiers}
                updateTracker={props.updateTracker}
            />
        </div>
    );
}

export default SmallItem;
