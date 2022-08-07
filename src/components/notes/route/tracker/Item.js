/** @format */

import { useContext } from 'react';
import Modifiers from './Modifiers';
import NotesContext from '../../../common/NotesContext';
import styles from './styles/Item.Module.css';
import themeMMBN from './styles/themes/MMBN/MMBN-Item.Module.css';
import themeMMSF from './styles/themes/MMSF/MMSF-Item.Module.css';

function Item(props) {
    const {
        notes: { game },
    } = useContext(NotesContext);

    let theme = {};
    if (game.includes('MMBN') || game.includes('OSS')) {
        theme = themeMMBN;
    } else if (game.includes('MMSF')) {
        theme = themeMMSF;
    }

    const updateFound = () => {
        props.updateTracker(props.id, null);
    };

    if (props.id >= props.type.low && props.id <= props.type.high) {
        const foundClass = props.found ? styles.found : '';

        return (
            <div>
                <div
                    id={props.id}
                    className={`${styles.item} ${theme[props.type.id]} ${
                        theme.item
                    } ${foundClass}`}
                    onClick={updateFound}>
                    <div className={`${styles.title} ${theme.title}`}>
                        {(props.id - props.low + 1).toString().padStart(3, '0')}{' '}
                        {props.name}
                    </div>
                    <img
                        className={`${styles.itemArt} ${theme.itemArt}`}
                        src={'/items/' + game + '/' + props.id + '.png'}
                        alt={props.name + ' art'}
                    />
                </div>
                <Modifiers
                    id={props.id}
                    modifiers={props.modifiers}
                    updateTracker={props.updateTracker}
                />
            </div>
        );
    }

    return null;
}

export default Item;
