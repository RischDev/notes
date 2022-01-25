import { useContext, memo } from 'react';
import styles from'./styles/SectionText.Module.css';
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
    } else if (oldProps.updateText !== newProps.updateText) {
        return false;
    }

    return true;
}

const SectionText = memo((props) => {
    const game = useContext(GameContext);

    const onTextUpdate = (e) => {
        const newText = JSON.parse(JSON.stringify(props.text));
        newText.text = e.target.value;
        props.updateText(newText, props.text.id)
    }

    const updateItem = (item) => {
        const newText = JSON.parse(JSON.stringify(props.text));
        if (item !== "") {
            newText.item = item;
        } else {
            newText.item = null;
        }
        props.updateText(newText, props.text.id)
    }

    const updateModifier = (modifier) => {
        const newText = JSON.parse(JSON.stringify(props.text));
        newText.modifier = modifier;
        props.updateText(newText, props.text.id)
    }

    return(
        <div>
            <textarea className={`${styles.textarea}`} value={props.text.text} placeholder="Text" onChange={onTextUpdate} />
            <ItemDropdown type="text" item={props.text.item} game={game} updateItem={updateItem} />
            <ModifierDropdown type="text" item={props.text.item} modifier={props.text.modifier} updateModifier={updateModifier} />
            <Icon src="/icons/up.png" id={"moveTextUp-" + props.text.id} size="small" hover={true} hidden={props.text.id === 0} altText="Up" onClick={ () => props.moveTextUp(props.text.id) } />
            <Icon src="/icons/down.png" id={"moveTextDown-" + props.text.id} size="small" hover={true} hidden={props.text.id === props.max} altText="Down" onClick={ () => props.moveTextDown(props.text.id) } />
            <Icon src="/icons/delete.png" id={"deleteText-" + props.text.id} size="small" hover={true} hidden={false} altText="X" onClick={ () => props.deleteText(props.text.id) } />
        </div>
    );
}, shouldUpdate);

export default SectionText;