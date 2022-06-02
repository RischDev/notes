/** @format */

import React from 'react';
import styles from './styles/SectionItem.Module.css';
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
    } else if (oldProps.updateItem !== newProps.updateItem) {
        return false;
    }

    return true;
}

const SectionItem = React.memo((props) => {
    const updateItem = (item) => {
        const newItem = JSON.parse(JSON.stringify(props.item));
        newItem.value = item;
        props.updateItem(newItem, props.item.id);
    };

    const updateModifier = (modifier) => {
        const newItem = JSON.parse(JSON.stringify(props.item));
        newItem.modifier = modifier;
        props.updateItem(newItem, props.item.id);
    };

    return (
        <div className={`${styles.wrapper}`}>
            <ItemDropdown
                type="section"
                item={props.item.value}
                updateItem={updateItem}
            />
            <ModifierDropdown
                type="section"
                item={props.item.value}
                modifier={props.item.modifier}
                updateModifier={updateModifier}
            />
            <Icon
                src="/icons/up.png"
                size="small"
                hover={true}
                hidden={props.item.id === 0}
                altText="Up"
                onClick={() => props.moveItemUp(props.item.id)}
            />
            <Icon
                src="/icons/down.png"
                size="small"
                hover={true}
                hidden={props.item.id === props.max}
                altText="Down"
                onClick={() => props.moveItemDown(props.item.id)}
            />
            <Icon
                src="/icons/delete.png"
                size="small"
                hover={true}
                hidden={false}
                grayscale={true}
                altText="X"
                onClick={() => props.deleteItem(props.item.id)}
            />
        </div>
    );
}, shouldUpdate);

export default SectionItem;
