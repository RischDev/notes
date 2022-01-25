/** @format */

import { useContext } from 'react';
import RouteContext from '../../../common/RouteContext';
import styles from "./styles/ModifierDropdown.Module.css";

function ModifierDropdown(props) {
    const {
        route: {
            game
        }
    } = useContext(RouteContext);

    const onModifierUpdate = (e) => {
        let value = e.target.value;
        props.updateModifier(value);
    }

    let Items = require('../../../../resources/ItemNames.json');
    if (game !== "" && game != null) {
        Items = require('../../../../resources/' + game + '/ItemNames.json');
    }

    if (!Items.modifiers) {
        return null;
    }

    if (props.item != null) {
        if (Items.Items[props.item] == null) {
            return(
                <select className={`${styles.select}`} value={props.modifier} onChange={onModifierUpdate}>
                    <option value=""> </option>
                </select>
            );
        }

        return(
            <select className={`${styles.select}`} value={props.modifier} onChange={onModifierUpdate}>
                <option value=""> </option>
                {Items.Items[props.item].modifiers.map((modifier) =>
                    <option value={modifier} key={"text-modifier-" + modifier}>{modifier}</option>
                )}
            </select>
        );
    }

    return(
        <span className={`${styles.buffer}`} />
    );
}

export default ModifierDropdown;
