/** @format */

import { useContext } from 'react';
import NotesContext from '../../../common/NotesContext';
import ReactMarkdown from 'react-markdown';
import styles from './styles/Text.Module.css';

function Text(props) {
    const { foundItems, foundModifiers } = useContext(NotesContext);

    if (props.text.item != null && foundItems.includes(props.text.item)) {
        if (
            props.text.modifier == null ||
            foundModifiers[props.text.item].includes(props.text.modifier)
        ) {
            return (
                <div
                    data-id={
                        process.env.NODE_ENV === 'development'
                            ? 'section-' +
                              props.sectionId +
                              '-text-' +
                              props.text.id
                            : null
                    }
                    className={`${styles.text} ${styles.found}`}>
                    <ReactMarkdown children={props.text.text} />
                </div>
            );
        }
    }

    return (
        <div
            data-id={
                process.env.NODE_ENV === 'development'
                    ? 'section-' + props.sectionId + '-text-' + props.text.id
                    : null
            }
            className={`${styles.text}`}>
            <ReactMarkdown children={props.text.text} />
        </div>
    );
}

export default Text;
