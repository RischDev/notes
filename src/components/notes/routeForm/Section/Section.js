/** @format */

import { useCallback, useRef, useContext, memo } from 'react';
import styles from './styles/Section.Module.css';
import GameContext from '../../../common/GameContext';
import Button from '../../../common/Button';
import Icon from '../../../common/Icon';
import SectionText from './SectionText';
import SectionItem from './SectionItem';
import SectionImage from './SectionImage';
import SectionState from './SectionState';
import SectionFolderEdit from './SectionFolderEdit';
import areShallowEqual from 'are-shallow-equal';

function shouldUpdate(oldProps, newProps) {
    if (areShallowEqual(oldProps.section, newProps.section)) {
        return true;
    }

    return false;
}

const Section = memo((props) => {
    const gameInfo = useContext(GameContext);

    const updateText = useCallback(
        (text, id) => {
            // Stringify then parse JSON to create deep copy.
            let newSection = JSON.parse(JSON.stringify(props.section));
            newSection.text[id] = text;
            props.setSection.current(newSection, props.section.id);
        },
        [props],
    );
    const updateTextRef = useRef();
    updateTextRef.current = updateText;

    const addText = useCallback(
        (e) => {
            // Stringify then parse JSON to create deep copy.
            e.preventDefault();

            let newSection = JSON.parse(JSON.stringify(props.section));
            newSection.text.push({
                id: newSection.text.length,
                text: '',
            });
            props.setSection.current(newSection, props.section.id);
        },
        [props],
    );

    const moveTextUp = useCallback(
        (id) => {
            // Stringify then parse JSON to create deep copy.
            let newSection = JSON.parse(JSON.stringify(props.section));

            let chosenText = newSection.text[id];
            chosenText.id = id - 1;
            let aboveText = newSection.text[id - 1];
            aboveText.id = id;

            newSection.text[id] = aboveText;
            newSection.text[id - 1] = chosenText;

            props.setSection.current(newSection, props.section.id);
        },
        [props],
    );
    const moveTextUpRef = useRef();
    moveTextUpRef.current = moveTextUp;

    const moveTextDown = useCallback(
        (id) => {
            // Stringify then parse JSON to create deep copy.
            let newSection = JSON.parse(JSON.stringify(props.section));

            let chosenText = newSection.text[id];
            chosenText.id = id + 1;
            let belowText = newSection.text[id + 1];
            belowText.id = id;

            newSection.text[id] = belowText;
            newSection.text[id + 1] = chosenText;

            props.setSection.current(newSection, props.section.id);
        },
        [props],
    );
    const moveTextDownRef = useRef();
    moveTextDownRef.current = moveTextDown;

    const deleteText = useCallback(
        (id) => {
            // Stringify then parse JSON to create deep copy.
            let newSection = JSON.parse(JSON.stringify(props.section));

            for (let i = id + 1; i < newSection.text.length; i++) {
                newSection.text[i].id--;
            }

            newSection.text.splice(id, 1);

            props.setSection.current(newSection, props.section.id);
        },
        [props],
    );
    const deleteTextRef = useRef();
    deleteTextRef.current = deleteText;

    const updateItem = useCallback(
        (item, id) => {
            // Stringify then parse JSON to create deep copy.
            const newSection = JSON.parse(JSON.stringify(props.section));
            newSection.items[id] = item;
            props.setSection.current(newSection, props.section.id);
        },
        [props],
    );
    const updateItemRef = useRef();
    updateItemRef.current = updateItem;

    const addItem = useCallback(() => {
        // Stringify then parse JSON to create deep copy.
        let newSection = JSON.parse(JSON.stringify(props.section));
        newSection.items.push({
            id: newSection.items.length,
            value: 0,
        });
        props.setSection.current(newSection, props.section.id);
    }, [props]);

    const moveItemUp = useCallback(
        (id) => {
            // Stringify then parse JSON to create deep copy.
            let newSection = JSON.parse(JSON.stringify(props.section));

            let chosenItem = newSection.items[id];
            chosenItem.id = id - 1;
            let aboveItem = newSection.items[id - 1];
            aboveItem.id = id;

            newSection.items[id] = aboveItem;
            newSection.items[id - 1] = chosenItem;

            props.setSection.current(newSection, props.section.id);
        },
        [props],
    );
    const moveItemUpRef = useRef();
    moveItemUpRef.current = moveItemUp;

    const moveItemDown = useCallback(
        (id) => {
            // Stringify then parse JSON to create deep copy.
            let newSection = JSON.parse(JSON.stringify(props.section));

            let chosenItem = newSection.items[id];
            chosenItem.id = id + 1;
            let belowItem = newSection.items[id + 1];
            belowItem.id = id;

            newSection.items[id] = belowItem;
            newSection.items[id + 1] = chosenItem;

            props.setSection.current(newSection, props.section.id);
        },
        [props],
    );
    const moveItemDownRef = useRef();
    moveItemDownRef.current = moveItemDown;

    const deleteItem = useCallback(
        (id) => {
            // Stringify then parse JSON to create deep copy.
            let newSection = JSON.parse(JSON.stringify(props.section));

            for (let i = id + 1; i < newSection.items.length; i++) {
                newSection.items[i].id--;
            }

            newSection.items.splice(id, 1);

            props.setSection.current(newSection, props.section.id);
        },
        [props],
    );
    const deleteItemRef = useRef();
    deleteItemRef.current = deleteItem;

    const updateImage = useCallback(
        (image) => {
            // Stringify then parse JSON to create deep copy.
            let newSection = JSON.parse(JSON.stringify(props.section));
            newSection.image = image;
            props.setSection.current(newSection, props.section.id);
        },
        [props],
    );

    const deleteImage = useCallback(() => {
        // Stringify then parse JSON to create deep copy.
        let newSection = JSON.parse(JSON.stringify(props.section));
        newSection.image = null;
        props.setSection.current(newSection, props.section.id);
    }, [props]);

    const updateState = useCallback(
        (state) => {
            // Stringify then parse JSON to create deep copy.
            let newSection = JSON.parse(JSON.stringify(props.section));
            newSection.state = state;
            props.setSection.current(newSection, props.section.id);
        },
        [props],
    );

    const addState = useCallback(
        (e) => {
            // Stringify then parse JSON to create deep copy.
            let newSection = JSON.parse(JSON.stringify(props.section));
            newSection.state = props.getLastState.current(props.section.id);
            props.setSection.current(newSection, props.section.id);
        },
        [props],
    );

    const deleteState = useCallback(() => {
        // Stringify then parse JSON to create deep copy.
        let newSection = JSON.parse(JSON.stringify(props.section));
        newSection.state = null;
        props.setSection.current(newSection, props.section.id);
    }, [props]);

    const updateFolderEdit = (folderEdit) => {
        // JSON stringify, then JSON parse to make a deep copy.
        let newSection = JSON.parse(JSON.stringify(props.section));
        newSection.folderEdit = folderEdit;
        props.setSection.current(newSection, props.section.id);
    };

    const addFolderEdit = useCallback(
        (e) => {
            // Stringify then parse JSON to create deep copy.
            let newSection = JSON.parse(JSON.stringify(props.section));
            newSection.folderEdit = props.getLastFolderEdit.current(
                props.section.id,
            );
            props.setSection.current(newSection, props.section.id);
        },
        [props],
    );

    const deleteFolderEdit = useCallback(
        (e) => {
            // Stringify then parse JSON to create deep copy.
            let newSection = JSON.parse(JSON.stringify(props.section));
            newSection.folderEdit = null;
            props.setSection.current(newSection, props.section.id);
        },
        [props],
    );

    const insertSection = useCallback(
        (e) => {
            props.addSection.current(props.section.id + 1);
        },
        [props],
    );

    return (
        <div id={'section-' + props.section.id} className={`${styles.section}`}>
            <div className={`${styles.sectionHeader}`}>
                <h3 className={`${styles.header}`}>
                    Section {props.section.id + 1}
                </h3>
                <Icon
                    src="/icons/up.png"
                    id={'moveSectionUp-' + props.section.id}
                    size="small"
                    altText="Up"
                    hover={true}
                    hidden={props.section.id === 0}
                    onClick={() => {
                        props.moveSectionUp.current(props.section.id);
                    }}
                />
                <Icon
                    src="/icons/down.png"
                    id={'moveSectionDown-' + props.section.id}
                    size="small"
                    altText="Down"
                    hover={true}
                    hidden={props.section.id === props.max}
                    onClick={() => {
                        props.moveSectionDown.current(props.section.id);
                    }}
                />
                <Icon
                    src="/icons/delete.png"
                    id={'deleteSection-' + props.section.id}
                    size="small"
                    altText="X"
                    hover={true}
                    grayscale={true}
                    onClick={() => {
                        props.deleteSection.current(props.section.id);
                    }}
                />
            </div>
            <div className={`${styles.wrapper}`}>
                <div className={`${styles.textContainer}`}>
                    <h4>Text</h4>
                    {props.section.text.map((text) => (
                        <SectionText
                            key={'text-' + text.id}
                            sectionId={props.section.id}
                            text={text}
                            max={props.section.text.length - 1}
                            updateText={updateTextRef}
                            moveTextUp={moveTextUpRef}
                            moveTextDown={moveTextDownRef}
                            deleteText={deleteTextRef}
                        />
                    ))}
                    <Button text="Add Text" size="medium" onClick={addText} />
                </div>
                <div className={`${styles.itemsContainer}`}>
                    <h4>{gameInfo.name}s</h4>
                    {props.section.items.map((item) => (
                        <SectionItem
                            key={'item-' + item.id}
                            item={item}
                            max={props.section.items.length - 1}
                            updateItem={updateItemRef}
                            moveItemUp={moveItemUpRef}
                            moveItemDown={moveItemDownRef}
                            deleteItem={deleteItemRef}
                        />
                    ))}
                    <Button
                        text={'Add ' + gameInfo.name}
                        size="medium"
                        onClick={addItem}
                    />
                </div>
            </div>
            <div className={`${styles.wrapper}`}>
                <div className={`${styles.imageContainer}`}>
                    <h4>Image</h4>
                    <SectionImage
                        image={props.section.image}
                        updateImage={updateImage}
                        deleteImage={deleteImage}
                    />
                </div>
                <div className={`${styles.stateContainer}`}>
                    <h4>State</h4>
                    <SectionState
                        state={props.section.state}
                        updateState={updateState}
                        deleteState={deleteState}
                        addState={addState}
                    />
                </div>
                <div className={`${styles.folderEditContainer}`}>
                    <h4>Folder Edit</h4>
                    <SectionFolderEdit
                        folderEdit={props.section.folderEdit}
                        updateFolderEdit={updateFolderEdit}
                        deleteFolderEdit={deleteFolderEdit}
                        addFolderEdit={addFolderEdit}
                    />
                </div>
            </div>
            <Button
                text="Add Section"
                id={'addSection-' + (props.section.id + 1)}
                size="medium"
                onClick={insertSection}
            />
        </div>
    );
}, shouldUpdate);

export default Section;
