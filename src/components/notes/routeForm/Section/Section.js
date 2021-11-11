import React from 'react';
import styles from './styles/Section.Module.css';
import Button from '../../../common/Button';
import Icon from '../../../common/Icon';
import SectionText from './SectionText';
import SectionItem from './SectionItem';
import SectionImage from './SectionImage';
import SectionState from './SectionState';

class CreateSection extends React.Component {
    constructor(props) {
        super(props);

        this.updateText = this.updateText.bind(this);
        this.updateItems = this.updateItems.bind(this);
        this.updateImage = this.updateImage.bind(this);
        this.updateState = this.updateState.bind(this);
        this.addText = this.addText.bind(this);
        this.addItem = this.addItem.bind(this);
        this.addState = this.addState.bind(this);
        this.moveTextUp = this.moveTextUp.bind(this);
        this.moveTextDown = this.moveTextDown.bind(this);
        this.moveItemUp = this.moveItemUp.bind(this);
        this.moveItemDown = this.moveItemDown.bind(this);
        this.deleteText = this.deleteText.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.deleteState = this.deleteState.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.game !== nextProps.game) {
            return true;
        }

        if (this.props.max !== nextProps.max) {
            return true;
        }

        if (this.props.section.text.length !== nextProps.section.text.length) {
            return true;
        } else {
            for (let i = 0; i < nextProps.section.text.length; i++) {
                if (this.props.section.text[i].text !== nextProps.section.text[i].text) {
                    return true;
                } else if (this.props.section.text[i].item !== nextProps.section.text[i].item) {
                   return true;
                } else if (this.props.section.text[i].modifier !== nextProps.section.text[i].modifier) {
                    return true;
                }
            }
        }

        if (this.props.section.items.length !== nextProps.section.items.length) {
            return true;
        } else {
            for (let i = 0; i < nextProps.section.items.length; i++) {
                if (this.props.section.items[i].value !== nextProps.section.items[i].value) {
                    return true;
                } else if (this.props.section.items[i].modifier !== nextProps.section.items[i].modifier) {
                    return true;
                }
            }
        }

        if (this.props.section.image !== nextProps.section.image) {
            return true;
        }

        if (this.props.section.state !== nextProps.section.state) {
            return true;
        }

        return false;
    }

    updateText(sectionId, textId, textValue, itemValue, modifierValue) {
        // Stringify then parse JSON to create deep copy.
        let newSection = JSON.parse(JSON.stringify(this.props.section));

        if (textId != null) {
            if (textValue != null) {
                newSection.text[textId].text = textValue;
            }

            if (itemValue != null) {
                if (itemValue === "") {
                    newSection.text[textId].item = null;
                } else {
                    newSection.text[textId].item = itemValue;
                }
            }

            if (modifierValue != null) {
                newSection.text[textId].modifier = modifierValue;
            }
        }

        this.props.updateRoute(sectionId, newSection);
    }

    updateItems(sectionId, itemId, itemValue, modifierValue) {
        // Stringify then parse JSON to create deep copy.
        let newSection = JSON.parse(JSON.stringify(this.props.section));

        if (itemId != null) {
            if (itemValue != null) {
                newSection.items[itemId].value = itemValue;
            }

            if (modifierValue != null) {
                newSection.items[itemId].modifier = modifierValue;
            }
        }

        this.props.updateRoute(sectionId, newSection);
    }

    updateImage(sectionId, image) {
        // Stringify then parse JSON to create deep copy.
        let newSection = JSON.parse(JSON.stringify(this.props.section));

        newSection.image = image;

        this.props.updateRoute(sectionId, newSection);
    }

    updateState(sectionId, state) {
        // Stringify then parse JSON to create deep copy.
        let newSection = JSON.parse(JSON.stringify(this.props.section));

        newSection.state = state;

        this.props.updateRoute(sectionId, newSection);
    }

    addText(e) {
        // Stringify then parse JSON to create deep copy.
        e.preventDefault();

        let newSection = JSON.parse(JSON.stringify(this.props.section));

        newSection.text.push({
            id: newSection.text.length,
            text: ""
        });

        this.props.updateRoute(this.props.section.id, newSection);
    }

    addItem(e) {
        e.preventDefault();

        // Stringify then parse JSON to create deep copy.
        let newSection = JSON.parse(JSON.stringify(this.props.section));

        newSection.items.push({
            id: newSection.items.length,
            value: 0
        });

        this.props.updateRoute(this.props.section.id, newSection);
    }

    addState(e) {
        e.preventDefault();

        // Stringify then parse JSON to create deep copy.
        let newSection = JSON.parse(JSON.stringify(this.props.section));

        // Check previous sections for the last state value
        let state = null;
        for (let i = this.props.section.id - 1; i >= 0; i--) {
            if (this.props.sections[i].state != null) {
                state = this.props.sections[i].state;
                break;
            }
        }

        if (state == null) {
            state = this.props.initialState;
        }

        newSection.state = state;

        this.props.updateRoute(this.props.section.id, newSection);
     }

    moveTextUp(e) {
        e.preventDefault();

        const nameParts = e.target.id.split("-");
        const textId = parseInt(nameParts[1]);

        // Stringify then parse JSON to create deep copy.
        let newSection = JSON.parse(JSON.stringify(this.props.section));

        let chosenText = newSection.text[textId];
        chosenText.id = textId - 1;
        let aboveText = newSection.text[textId - 1];
        aboveText.id = textId;

        newSection.text[textId] = aboveText;
        newSection.text[textId - 1] = chosenText;

        this.props.updateRoute(this.props.section.id, newSection);
    }

    moveTextDown(e) {
        e.preventDefault();

        const nameParts = e.target.id.split("-");
        const textId = parseInt(nameParts[1]);

        // Stringify then parse JSON to create deep copy.
        let newSection = JSON.parse(JSON.stringify(this.props.section));

        let chosenText = newSection.text[textId];
        chosenText.id = textId + 1;
        let belowText = newSection.text[textId + 1];
        belowText.id = textId;

        newSection.text[textId] = belowText;
        newSection.text[textId + 1] = chosenText;

        this.props.updateRoute(this.props.section.id, newSection);
    }

    moveItemUp(e) {
        e.preventDefault();

        const nameParts = e.target.id.split("-");
        const itemId = parseInt(nameParts[1]);

        // Stringify then parse JSON to create deep copy.
        let newSection = JSON.parse(JSON.stringify(this.props.section));

        let chosenItem = newSection.items[itemId];
        chosenItem.id = itemId - 1;
        let aboveItem = newSection.items[itemId - 1];
        aboveItem.id = itemId;

        newSection.items[itemId] = aboveItem;
        newSection.items[itemId - 1] = chosenItem;

        this.props.updateRoute(this.props.section.id, newSection);
    }

    moveItemDown(e) {
        e.preventDefault();

        const nameParts = e.target.id.split("-");
        const itemId = parseInt(nameParts[1]);

        // Stringify then parse JSON to create deep copy.
        let newSection = JSON.parse(JSON.stringify(this.props.section));

        let chosenItem = newSection.items[itemId];
        chosenItem.id = itemId + 1;
        let belowItem = newSection.items[itemId + 1];
        belowItem.id = itemId;

        newSection.items[itemId] = belowItem;
        newSection.items[itemId + 1] = chosenItem;

        this.props.updateRoute(this.props.section.id, newSection);
    }

    deleteText(e) {
        e.preventDefault();

        const nameParts = e.target.id.split("-");
        const textId = parseInt(nameParts[1]);

        // Stringify then parse JSON to create deep copy.
        let newSection = JSON.parse(JSON.stringify(this.props.section));

        for (let i = textId + 1; i < newSection.text.length; i++) {
            newSection.text[i].id--;
        }

        newSection.text.splice(textId, 1);

        this.props.updateRoute(this.props.section.id, newSection);
    }

    deleteItem(e) {
        e.preventDefault();

        const nameParts = e.target.id.split("-");
        const itemId = parseInt(nameParts[1]);

        // Stringify then parse JSON to create deep copy.
        let newSection = JSON.parse(JSON.stringify(this.props.section));

        for (let i = itemId + 1; i < newSection.items.length; i++) {
            newSection.items[i].id--;
        }

        newSection.items.splice(itemId, 1);

        this.props.updateRoute(this.props.section.id, newSection);
    }

    deleteImage(e) {
        e.preventDefault();

        // Stringify then parse JSON to create deep copy.
        let newSection = JSON.parse(JSON.stringify(this.props.section));

        newSection.image = null;

        this.props.updateRoute(this.props.section.id, newSection);
    }

    deleteState(e) {
        e.preventDefault();

        // Stringify then parse JSON to create deep copy.
        let newSection = JSON.parse(JSON.stringify(this.props.section));

        newSection.state = null;

        this.props.updateRoute(this.props.section.id, newSection);
    }

    render() {
        let Items = require('../../../../resources/ItemNames.json');
        if (this.props.game !== "" && this.props.game != null) {
            Items = require('../../../../resources/' + this.props.game + '/ItemNames.json');
        }

        const addStateButton = (!this.props.section.state && this.props.game) ? <Button text="Add State" size="medium" onClick={this.addState} /> : "";

        return(
            <div id={"section-" + this.props.section.id} ref={this.props.sectionRef} className={`${styles.section}`}>
                <h3 className={`${styles.header}`}>Section {this.props.section.id + 1}</h3>
                <Icon src="/icons/up.png" id={"moveSectionUp-" + this.props.section.id} size="small" altText="Up" hover={true} hidden={this.props.section.id === 0} onClick={this.props.moveSectionUp} />
                <Icon src="/icons/down.png" id={"moveSectionDown-" + this.props.section.id} size="small" altText="Down" hover={true} hidden={this.props.section.id === this.props.max} onClick={this.props.moveSectionDown} />
                <Icon src="/icons/delete.png" id={"deleteSection-" + this.props.section.id} size="small" altText="X" hover={true} onClick={this.props.deleteSection} />
                <div className={`${styles.wrapper}`}>
                    <div className="col-6">
                        {this.props.section.text.map((text) =>
                            <SectionText
                                key={"text-" + text.id}
                                sectionId={this.props.section.id}
                                text={text}
                                max={this.props.section.text.length - 1}
                                game={this.props.game}
                                updateText={this.updateText}
                                moveTextUp={this.moveTextUp}
                                moveTextDown={this.moveTextDown}
                                deleteText={this.deleteText}
                            />
                        )}
                    </div>
                    <div className="col-3">
                        {this.props.section.items.map((item) =>
                            <SectionItem
                                key={"item-" + item.id}
                                sectionId={this.props.section.id}
                                item={item}
                                game={this.props.game}
                                max={this.props.section.items.length - 1}
                                updateItems={this.updateItems}
                                moveItemUp={this.moveItemUp}
                                moveItemDown={this.moveItemDown}
                                deleteItem={this.deleteItem}
                            />
                        )}
                    </div>
                    <div className="col-3">
                        <SectionImage sectionId={this.props.section.id} image={this.props.section.image} updateImage={this.updateImage} deleteImage={this.deleteImage} />
                        <SectionState sectionId={this.props.section.id} state={this.props.section.state} updateState={this.updateState} deleteState={this.deleteState} />
                    </div>
                </div>
                <div className={`${styles.wrapper}`}>
                    <div className="col-6">
                        <Button text="Add Text" size="medium" onClick={this.addText} />
                    </div>
                    <div className="col-3">
                         <Button text={"Add " + Items.name} size="medium" onClick={this.addItem} />
                    </div>
                    <div className="col-3">
                        {addStateButton}
                    </div>
                </div>
                <Button text="Add Section" id={"addSection-" + (this.props.section.id + 1)} size="medium"onClick={this.props.addSection} />
            </div>
        );
    }
}

export default CreateSection;