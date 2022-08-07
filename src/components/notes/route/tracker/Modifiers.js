/** @format */

import { useContext } from 'react';
import NotesContext from '../../../common/NotesContext';
import styles from './styles/Modifiers.Module.css';
import themeMMBN from './styles/themes/MMBN/MMBN-Modifiers.Module.css';

function Modifier(props) {
    const foundClass = props.foundModifiers[props.id].includes(props.modifier)
        ? styles.found
        : '';
    return (
        <div
            id={'modifier-' + props.id + '-' + props.modifier}
            className={`${styles.modifier} ${styles[props.game]} ${foundClass}`}
            onClick={() => props.updateFound(props.modifier)}>
            {props.modifier}{' '}
        </div>
    );
}

function Modifiers(props) {
    const {
        notes: { game },
        foundModifiers,
    } = useContext(NotesContext);

    let theme = {};
    if (game.includes('MMBN') || game.includes('OSS')) {
        theme = themeMMBN;
    }

    const updateFound = (modifier) => {
        props.updateTracker(props.id, modifier);
    };

    if (props.modifiers != null && props.modifiers.length > 0) {
        return (
            <div className={`${styles.modifiers} ${theme.modifiers}`}>
                {props.modifiers.map((modifier) => (
                    <Modifier
                        key={'modifier-' + modifier}
                        id={props.id}
                        modifier={modifier}
                        foundModifiers={foundModifiers}
                        game={game}
                        updateFound={updateFound}
                    />
                ))}
            </div>
        );
    }
    return null;
}

export default Modifiers;
