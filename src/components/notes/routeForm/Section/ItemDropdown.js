/** @format */

import { useContext, memo } from 'react';
import GameContext from '../../../common/GameContext';
import styles from './styles/ItemDropdown.Module.css';
import Button from '../../../common/Button';

function shouldUpdate(oldProps, newProps) {
    if (oldProps.item !== newProps.item) {
        return false;
    }

    return true;
}

const ItemDropdown = memo((props) => {
    const gameInfo = useContext(GameContext);

    const onUpdateItem = (e) => {
        let value = e.target.value;

        if (value !== '') {
            value = parseInt(value);
        }

        props.updateItem(value);
    }

    const addDropdown = (e) => {
        e.preventDefault();

        props.updateItem(0);
    }

    if (props.item != null) {
        if (props.type === "text") {
            return(
                <select className={`${styles.select}`} value={props.item} onChange={onUpdateItem}>
                    <option value="">Remove {gameInfo.name}</option>
                    {gameInfo.Items.map((item) =>
                        <option value={item.id} key={"text-item-" + item.id}>{item.name}</option>
                    )}
                </select>
            );
        } else if (props.type === "section") {
            return(
                <select className={`${styles.select}`} value={props.item} onChange={onUpdateItem}>
                    <option value="">Select {gameInfo.name}</option>
                    {gameInfo.Items.map((item) =>
                        <option value={item.id} key={"section-item-" + item.id}>{item.name}</option>
                    )}
                </select>
            );
        }
    } else {
        if (props.type === "text") {
            return(
                <span className={`${styles.buffer}`}>
                    <Button text={"Add " + gameInfo.name} size="medium" onClick={addDropdown} />
                </span>
            );
        }
    }

    return null;
}, shouldUpdate);

export default ItemDropdown;
