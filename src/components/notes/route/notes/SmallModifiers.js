/** @format */

import { useContext } from 'react';
import styles from './styles/SmallModifiers.Module.css';
import themeMMBN from './styles/themes/MMBN/MMBN-SmallModifiers.Module.css';
import NotesContext from '../../../common/NotesContext';

function Modifier(props) {
    const {
        notes: {
            game
        },
        foundModifiers
    } = useContext(NotesContext);

    const foundClass = foundModifiers[props.id].includes(props.modifier) ? styles.found : "";
    return(
        <div id={"modifier-" + props.id + "-" + props.modifier} className={`${styles.modifier} ${styles[game]} ${foundClass}`} onClick={ () => props.updateFound(props.modifier) }>{props.modifier}</div>
    );
}

function SmallModifiers(props) {
    const {
        notes: {
            game
        }
    } = useContext(NotesContext);

    let theme = {};
    if (game.includes("MMBN")) {
        theme = themeMMBN;
    }

    const updateFound = (modifier) => {
        props.updateTracker(props.id, modifier);
    }

    if (props.modifiers != null && props.modifiers.length > 0) {
        return(
            <div className={`${styles.modifiers} ${theme.modifiers}`}>
                {props.modifiers.map((modifier) =>
                    <Modifier key={"small-modifier-" + modifier} id={props.id} modifier={modifier} updateFound={updateFound} />
                )}
            </div>
        );
    }
    return null;
}

export default SmallModifiers;
