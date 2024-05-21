/** @format */

import { useRef, memo } from 'react';
import styles from './styles/SectionItem.module.css';
import ItemDropdown from './ItemDropdown';
import ModifierDropdown from './ModifierDropdown';
import Icon from '../../../common/Icon';

function shouldUpdate(oldProps, newProps) {
    if (oldProps.item.id !== newProps.item.id) {
        return false;
    } else if (oldProps.item.value !== newProps.item.value) {
        return false;
    } else if (oldProps.item.modifier !== newProps.item.modifier) {
        return false;
    } else if (oldProps.max !== newProps.max) {
        return false;
    }

    return true;
}

const SectionItem = memo((props) => {
    const updateItem = (item) => {
        const newItem = JSON.parse(JSON.stringify(props.item));
        newItem.value = item;
        props.updateItem.current(newItem, props.item.id);
    };
    const updateItemRef = useRef();
    updateItemRef.current = updateItem;

    const updateModifier = (modifier) => {
        const newItem = JSON.parse(JSON.stringify(props.item));
        newItem.modifier = modifier;
        props.updateItem.current(newItem, props.item.id);
    };
    const updateModifierRef = useRef();
    updateModifierRef.current = updateModifier;

    return (
        <div className={`${styles.wrapper}`}>
            <ItemDropdown
                type="section"
                item={props.item.value}
                updateItem={updateItemRef}
            />
            <ModifierDropdown
                type="section"
                item={props.item.value}
                modifier={props.item.modifier}
                updateModifier={updateModifierRef}
            />
            <Icon
                src="/icons/up.png"
                size="small"
                hover={true}
                hidden={props.item.id === 0}
                altText="Up"
                onClick={() => props.moveItemUp.current(props.item.id)}
            />
            <Icon
                src="/icons/down.png"
                size="small"
                hover={true}
                hidden={props.item.id === props.max}
                altText="Down"
                onClick={() => props.moveItemDown.current(props.item.id)}
            />
            <Icon
                src="/icons/delete.png"
                size="small"
                hover={true}
                hidden={false}
                grayscale={true}
                altText="X"
                onClick={() => props.deleteItem.current(props.item.id)}
            />
        </div>
    );
}, shouldUpdate);

export default SectionItem;
