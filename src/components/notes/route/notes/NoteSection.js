/** @format */

import { useContext, memo } from 'react';
import styles from './styles/NoteSection.Module.css';
import Text from './Text';
import ItemsList from './ItemsList';
import Image from './Image';
import State from './State';
import FolderEdit from './FolderEdit';
import Icon from '../../../common/Icon';
import NotesContext from '../../../common/NotesContext';
import areShallowEqual from 'are-shallow-equal';

function shouldUpdate(oldProps, newProps) {
    if (areShallowEqual(oldProps, newProps)) {
        return true;
    }

    return false;
}

const NoteSection = memo((props) => {
    const {
        notes: { game },
        mode,
        foundItems,
        foundModifiers,
    } = useContext(NotesContext);

    if (mode === 'list') {
        return (
            <div
                id={'section-' + props.section.id}
                className={`${styles.section} card`}
                ref={props.noteRef}>
                <div className={`${styles.textContainer} col-m-12`}>
                    {props.section.text.map((text) => (
                        <Text
                            key={'text-' + text.id}
                            text={text}
                            foundItems={foundItems}
                            foundModifiers={foundModifiers}
                        />
                    ))}
                </div>
                <Image
                    image={props.section.image}
                    onClick={props.fullscreenImage}
                />
                <ItemsList
                    items={props.section.items}
                    updateTracker={props.updateTracker}
                    game={game}
                    foundItems={foundItems}
                    foundModifiers={foundModifiers}
                />
                <State state={props.section.state} game={game} />
                <FolderEdit folderEdit={props.section.folderEdit} />
            </div>
        );
    } else if (mode === 'presenter') {
        return (
            <div
                id={'section-' + props.section.id}
                className={`${styles.section} card`}
                ref={props.noteRef}>
                <div className="col-12 col-m-12">
                    <Icon
                        src="/icons/previous.png"
                        size="large"
                        altText="Previous"
                        hover={true}
                        hidden={false}
                        onClick={props.previousSection}
                    />
                    <Icon
                        src="/icons/next.png"
                        size="large"
                        altText="Next"
                        hover={true}
                        hidden={false}
                        float={'right'}
                        onClick={props.nextSection}
                    />
                </div>
                <div className={`${styles.textContainer} col-m-12`}>
                    {props.section.text.map((text) => (
                        <Text
                            key={'text-' + text.id}
                            text={text}
                            foundItems={foundItems}
                            foundModifiers={foundModifiers}
                        />
                    ))}
                </div>
                <Image
                    image={props.section.image}
                    onClick={props.fullscreenImage}
                />
                <ItemsList
                    items={props.section.items}
                    updateTracker={props.updateTracker}
                    game={game}
                    foundItems={foundItems}
                    foundModifiers={foundModifiers}
                />
                <State state={props.section.state} game={game} />
                <FolderEdit folderEdit={props.section.folderEdit} />
            </div>
        );
    }

    return null;
}, shouldUpdate);

export default NoteSection;
