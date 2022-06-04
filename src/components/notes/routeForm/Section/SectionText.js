/** @format */

import { useState, useEffect, useRef, useContext, memo } from 'react';
import styles from './styles/SectionText.Module.css';
import ItemDropdown from './ItemDropdown';
import ModifierDropdown from './ModifierDropdown';
import Icon from '../../../common/Icon';
import GameContext from '../../../common/GameContext';

function shouldUpdate(oldProps, newProps) {
    if (oldProps.text.id !== newProps.text.id) {
        return false;
    } else if (oldProps.text.text !== newProps.text.text) {
        return false;
    } else if (oldProps.text.item !== newProps.text.item) {
        return false;
    } else if (oldProps.text.modifier !== newProps.text.modifier) {
        return false;
    } else if (oldProps.max !== newProps.max) {
        return false;
    }

    return true;
}

const SectionText = memo((props) => {
    const game = useContext(GameContext);

    const [cursor, setCursor] = useState(null);
    const ref = useRef(null);

    useEffect(() => {
        const input = ref.current;
        if (input) {
            input.setSelectionRange(cursor, cursor);
        }
    }, [ref, cursor, props.text.text]);

    const onTextUpdate = (e) => {
        // Remember cursor position
        setCursor(e.target.selectionStart);

        const newText = JSON.parse(JSON.stringify(props.text));
        newText.text = e.target.value;
        props.updateText.current(newText, props.text.id);
    };

    const updateItem = (item) => {
        const newText = JSON.parse(JSON.stringify(props.text));
        if (item !== '') {
            newText.item = item;
        } else {
            newText.item = null;
        }
        props.updateText.current(newText, props.text.id);
    };
    const updateItemRef = useRef();
    updateItemRef.current = updateItem;

    const updateModifier = (modifier) => {
        const newText = JSON.parse(JSON.stringify(props.text));
        newText.modifier = modifier;
        props.updateText.current(newText, props.text.id);
    };
    const updateModifierRef = useRef();
    updateModifierRef.current = updateModifier;

    return (
        <div className={`${styles.wrapper}`}>
            <textarea
                ref={ref}
                className={`${styles.textarea}`}
                value={props.text.text}
                placeholder="Text"
                onChange={onTextUpdate}
            />
            <ItemDropdown
                type="text"
                item={props.text.item}
                game={game}
                updateItem={updateItemRef}
            />
            <ModifierDropdown
                type="text"
                item={props.text.item}
                modifier={props.text.modifier}
                updateModifier={updateModifierRef}
            />
            <Icon
                src="/icons/up.png"
                id={'moveTextUp-' + props.text.id}
                size="small"
                hover={true}
                hidden={props.text.id === 0}
                altText="Up"
                onClick={() => props.moveTextUp.current(props.text.id)}
            />
            <Icon
                src="/icons/down.png"
                id={'moveTextDown-' + props.text.id}
                size="small"
                hover={true}
                hidden={props.text.id === props.max}
                altText="Down"
                onClick={() => props.moveTextDown.current(props.text.id)}
            />
            <Icon
                src="/icons/delete.png"
                id={'deleteText-' + props.text.id}
                size="small"
                hover={true}
                hidden={false}
                grayscale={true}
                altText="X"
                onClick={() => props.deleteText.current(props.text.id)}
            />
        </div>
    );
}, shouldUpdate);

export default SectionText;
