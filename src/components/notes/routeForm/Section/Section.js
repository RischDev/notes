/** @format */

import { useCallback, useContext } from 'react';
import styles from './styles/Section.Module.css';
import GameContext from '../../../common/GameContext';
import Button from '../../../common/Button';
import Icon from '../../../common/Icon';
import SectionText from './SectionText';
import SectionItem from './SectionItem';
import SectionImage from './SectionImage';
import SectionState from './SectionState';

function Section(props) {
    const game = useContext(GameContext);

    const updateText = useCallback((text, id) => {
        // Stringify then parse JSON to create deep copy.
        let newSection = JSON.parse(JSON.stringify(props.section));
        newSection.text[id] = text;
        props.setSection(newSection, props.section.id);
    }, [props]);

    const addText = useCallback((e) => {
        // Stringify then parse JSON to create deep copy.
        e.preventDefault();

        let newSection = JSON.parse(JSON.stringify(props.section));
        newSection.text.push({
            id: newSection.text.length,
            text: '',
        });
        props.setSection(newSection, props.section.id)
    }, [props]);

    const moveTextUp = useCallback((id) => {
        // Stringify then parse JSON to create deep copy.
        let newSection = JSON.parse(JSON.stringify(props.section));

        let chosenText = newSection.text[id];
        chosenText.id = id - 1;
        let aboveText = newSection.text[id - 1];
        aboveText.id = id;

        newSection.text[id] = aboveText;
        newSection.text[id - 1] = chosenText;

        props.setSection(newSection, props.section.id);
    }, [props]);

    const moveTextDown = useCallback((id) => {
        // Stringify then parse JSON to create deep copy.
        let newSection = JSON.parse(JSON.stringify(props.section));

        let chosenText = newSection.text[id];
        chosenText.id = id + 1;
        let belowText = newSection.text[id + 1];
        belowText.id = id;

        newSection.text[id] = belowText;
        newSection.text[id + 1] = chosenText;

        props.setSection(newSection, props.section.id);
    }, [props]);

    const deleteText = useCallback((id) => {
        // Stringify then parse JSON to create deep copy.
        let newSection = JSON.parse(JSON.stringify(props.section));

        for (let i = id + 1; i < newSection.text.length; i++) {
            newSection.text[i].id--;
        }

        newSection.text.splice(id, 1);

        props.setSection(newSection, props.section.id);
    }, [props]);

    const updateItem = useCallback((item, id) => {
        // Stringify then parse JSON to create deep copy.
        const newSection = JSON.parse(JSON.stringify(props.section));
        newSection.items[id] = item;
        props.setSection(newSection, props.section.id)
    }, [props]);

    const addItem = useCallback(() => {
        // Stringify then parse JSON to create deep copy.
        let newSection = JSON.parse(JSON.stringify(props.section));
        newSection.items.push({
            id: newSection.items.length,
            value: 0
        });
        props.setSection(newSection, props.section.id)
    }, [props]);

    const moveItemUp = useCallback((id) => {
        // Stringify then parse JSON to create deep copy.
        let newSection = JSON.parse(JSON.stringify(props.section));

        let chosenItem = newSection.items[id];
        chosenItem.id = id - 1;
        let aboveItem = newSection.items[id - 1];
        aboveItem.id = id;

        newSection.items[id] = aboveItem;
        newSection.items[id - 1] = chosenItem;

        props.setSection(newSection, props.section.id)
    }, [props]);

    const moveItemDown = useCallback((id) => {
        // Stringify then parse JSON to create deep copy.
        let newSection = JSON.parse(JSON.stringify(props.section));

        let chosenItem = newSection.items[id];
        chosenItem.id = id + 1;
        let belowItem = newSection.items[id + 1];
        belowItem.id = id;

        newSection.items[id] = belowItem;
        newSection.items[id + 1] = chosenItem;

        props.setSection(newSection, props.section.id);
    }, [props]);

    const deleteItem = useCallback((id) =>  {
        // Stringify then parse JSON to create deep copy.
        let newSection = JSON.parse(JSON.stringify(props.section));

        for (let i = id + 1; i < newSection.items.length; i++) {
            newSection.items[i].id--;
        }

        newSection.items.splice(id, 1);

        props.setSection(newSection, props.section.id);
    }, [props]);

    const updateImage = useCallback((image) => {
        // Stringify then parse JSON to create deep copy.
        let newSection = JSON.parse(JSON.stringify(props.section));
        newSection.image = image;
        props.setSection(newSection, props.section.id)
    }, [props]);

    const deleteImage = useCallback(() => {
        // Stringify then parse JSON to create deep copy.
        let newSection = JSON.parse(JSON.stringify(props.section));
        newSection.image = null;
        props.setSection(newSection, props.section.id);
    }, [props]);

    const updateState = useCallback((state) => {
        // Stringify then parse JSON to create deep copy.
        let newSection = JSON.parse(JSON.stringify(props.section));
        newSection.state = state;
        props.setSection(newSection, props.section.id);
    }, [props]);

    const addState = useCallback((e) => {
        // Stringify then parse JSON to create deep copy.
        let newSection = JSON.parse(JSON.stringify(props.section));
        newSection.state = props.getLastState(props.section.id);
        props.setSection(newSection, props.section.id);
    }, [props]);

    const deleteState = useCallback(() => {
        // Stringify then parse JSON to create deep copy.
        let newSection = JSON.parse(JSON.stringify(props.section));
        newSection.state = null;
        props.setSection(newSection, props.section.id);
    }, [props]);

    let Items = require('../../../../resources/ItemNames.json');
    if (game !== "" && game != null) {
        Items = require('../../../../resources/' + game + '/ItemNames.json');
    }

    const addStateButton = (!props.section.state && game) ? <Button text="Add State" size="medium" onClick={addState} /> : "";

    return(
        <div id={"section-" + props.section.id} className={`${styles.section}`}>
            <h3 className={`${styles.header}`}>Section {props.section.id + 1}</h3>
            <Icon src="/icons/up.png" id={"moveSectionUp-" + props.section.id} size="small" altText="Up" hover={true} hidden={props.section.id === 0} onClick={ () => { props.moveSectionUp(props.section.id) } } />
            <Icon src="/icons/down.png" id={"moveSectionDown-" + props.section.id} size="small" altText="Down" hover={true} hidden={props.section.id === props.max} onClick={ () => { props.moveSectionDown(props.section.id) } } />
            <Icon src="/icons/delete.png" id={"deleteSection-" + props.section.id} size="small" altText="X" hover={true} onClick={ () => { props.deleteSection(props.section.id) } } />
            <div className={`${styles.wrapper}`}>
                <div className="col-6">
                    {props.section.text.map((text) =>
                        <SectionText
                            key={"text-" + text.id}
                            sectionId={props.section.id}
                            text={text}
                            max={props.section.text.length - 1}
                            updateText={updateText}
                            moveTextUp={moveTextUp}
                            moveTextDown={moveTextDown}
                            deleteText={deleteText}
                        />
                    )}
                </div>
                <div className="col-3">
                    {props.section.items.map((item) =>
                        <SectionItem
                            key={"item-" + item.id}
                            item={item}
                            max={props.section.items.length - 1}
                            updateItem={updateItem}
                            moveItemUp={moveItemUp}
                            moveItemDown={moveItemDown}
                            deleteItem={deleteItem}
                        />
                    )}
                </div>
                <div className="col-3">
                    <SectionImage image={props.section.image} updateImage={updateImage} deleteImage={deleteImage} />
                    <SectionState sectionId={props.section.id} state={props.section.state} updateState={updateState} deleteState={deleteState} />
                </div>
            </div>
            <div className={`${styles.wrapper}`}>
                <div className="col-6">
                    <Button text="Add Text" size="medium" onClick={addText} />
                </div>
                <div className="col-3">
                     <Button text={"Add " + Items.name} size="medium" onClick={addItem} />
                </div>
                <div className="col-3">
                    {addStateButton}
                </div>
            </div>
            <Button text="Add Section" id={"addSection-" + (props.section.id + 1)} size="medium" onClick={ () => { props.addSection(props.section.id + 1) } } />
        </div>
    );
}

export default Section;
