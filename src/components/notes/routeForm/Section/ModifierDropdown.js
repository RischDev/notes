/** @format */

import { useContext } from 'react';
import GameContext from '../../../common/GameContext';
import styles from './styles/ModifierDropdown.Module.css';

function ModifierDropdown(props) {
    const gameInfo = useContext(GameContext);

    const onModifierUpdate = (e) => {
        let value = e.target.value;
        props.updateModifier.current(value);
    };

    if (!gameInfo.modifiers) {
        return null;
    }

    if (props.item != null) {
        if (gameInfo.Items[props.item] == null) {
            return (
                <select
                    className={`${styles.select}`}
                    value={props.modifier}
                    onChange={onModifierUpdate}>
                    <option value=""> </option>
                </select>
            );
        }

        return (
            <select
                className={`${styles.select}`}
                value={props.modifier}
                onChange={onModifierUpdate}>
                <option value=""> </option>
                {gameInfo.Items[props.item].modifiers.map((modifier) => (
                    <option value={modifier} key={'text-modifier-' + modifier}>
                        {modifier}
                    </option>
                ))}
            </select>
        );
    }

    return <span className={`${styles.buffer}`} />;
}

export default ModifierDropdown;
