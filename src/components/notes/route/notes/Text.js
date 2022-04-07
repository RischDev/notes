import { useContext } from 'react';
import NotesContext from '../../../common/NotesContext';
import styles from './styles/Text.Module.css';

function Text(props) {
    const {
        foundItems,
        foundModifiers
    } = useContext(NotesContext);

    if (props.text.item != null && foundItems.includes(props.text.item)) {
        if ((props.text.modifier == null) || foundModifiers[props.text.item].includes(props.text.modifier)) {
            return (
                <li className={`${styles.found}`}>{props.text.text}</li>
            );
        }
    }

    return (
        <li>{props.text.text}</li>
    );
}

export default Text;