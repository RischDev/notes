import React from 'react';
import TextButton from './Text/TextButton';
import ItemButton from './Items/ItemButton';
import MoveUp from './MoveUp';
import MoveDown from './MoveDown';
import DeleteSection from './DeleteSection';
import SectionText from './Text/SectionText';
import SectionItem from './Items/SectionItem';
import SectionImage from './Image/SectionImage';
import AddSection from './AddSection';

class CreateSection extends React.Component {
    constructor(props) {
        super(props);

        this.updateText = this.updateText.bind(this);
        this.updateItems = this.updateItems.bind(this);
        this.updateImage = this.updateImage.bind(this);
        this.addText = this.addText.bind(this);
        this.addItem = this.addItem.bind(this);
        this.moveTextUp = this.moveTextUp.bind(this);
        this.moveTextDown = this.moveTextDown.bind(this);
        this.moveItemUp = this.moveItemUp.bind(this);
        this.moveItemDown = this.moveItemDown.bind(this);
        this.deleteText = this.deleteText.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
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

    addText(sectionId) {
        // Stringify then parse JSON to create deep copy.
        let newSection = JSON.parse(JSON.stringify(this.props.section));

        newSection.text.push({
            id: newSection.text.length,
            text: ""
        });

        this.props.updateRoute(sectionId, newSection);
    }

    addItem(sectionId) {
        // Stringify then parse JSON to create deep copy.
        let newSection = JSON.parse(JSON.stringify(this.props.section));

        newSection.items.push({
            id: newSection.items.length,
            value: 0
        });

        this.props.updateRoute(sectionId, newSection);
    }

    moveTextUp(sectionId, textId) {
        // Stringify then parse JSON to create deep copy.
        let newSection = JSON.parse(JSON.stringify(this.props.section));

        let chosenText = newSection.text[textId];
        chosenText.id = textId - 1;
        let aboveText = newSection.text[textId - 1];
        aboveText.id = textId;

        newSection.text[textId] = aboveText;
        newSection.text[textId - 1] = chosenText;

        this.props.updateRoute(sectionId, newSection);
    }

    moveTextDown(sectionId, textId) {
        // Stringify then parse JSON to create deep copy.
        let newSection = JSON.parse(JSON.stringify(this.props.section));

        let chosenText = newSection.text[textId];
        chosenText.id = textId + 1;
        let belowText = newSection.text[textId + 1];
        belowText.id = textId;

        newSection.text[textId] = belowText;
        newSection.text[textId + 1] = chosenText;

        this.props.updateRoute(sectionId, newSection);
    }

    moveItemUp(sectionId, itemId) {
        // Stringify then parse JSON to create deep copy.
        let newSection = JSON.parse(JSON.stringify(this.props.section));

        let chosenItem = newSection.items[itemId];
        chosenItem.id = itemId - 1;
        let aboveItem = newSection.items[itemId - 1];
        aboveItem.id = itemId;

        newSection.items[itemId] = aboveItem;
        newSection.items[itemId - 1] = chosenItem;

        this.props.updateRoute(sectionId, newSection);
    }

    moveItemDown(sectionId, itemId) {
        // Stringify then parse JSON to create deep copy.
        let newSection = JSON.parse(JSON.stringify(this.props.section));

        let chosenItem = newSection.items[itemId];
        chosenItem.id = itemId + 1;
        let belowItem = newSection.items[itemId + 1];
        belowItem.id = itemId;

        newSection.items[itemId] = belowItem;
        newSection.items[itemId + 1] = chosenItem;

        this.props.updateRoute(sectionId, newSection);
    }

    deleteText(sectionId, textId) {
        // Stringify then parse JSON to create deep copy.
        let newSection = JSON.parse(JSON.stringify(this.props.section));

        for (let i = textId + 1; i < newSection.text.length; i++) {
            newSection.text[i].id--;
        }

        newSection.text.splice(textId, 1);

        this.props.updateRoute(sectionId, newSection);
    }

    deleteItem(sectionId, itemId) {
        // Stringify then parse JSON to create deep copy.
        let newSection = JSON.parse(JSON.stringify(this.props.section));

        for (let i = itemId + 1; i < newSection.items.length; i++) {
            newSection.items[i].id--;
        }

        newSection.items.splice(itemId, 1);

        this.props.updateRoute(sectionId, newSection);
    }

    deleteImage(sectionId) {
        // Stringify then parse JSON to create deep copy.
        let newSection = JSON.parse(JSON.stringify(this.props.section));

        newSection.image = null;

        this.props.updateRoute(sectionId, newSection);
    }

    render() {
        let Items = require('../../../resources/ItemNames.json');
        if (this.props.game !== "" && this.props.game != null) {
            Items = require('../../../resources/' + this.props.game + '/ItemNames.json');
        }

        return(
            <div id={"section-" + this.props.section.id} className="formSection">
                <h3 className="sectionHeader">Section {this.props.section.id + 1}</h3>
                <MoveUp sectionId={this.props.section.id} type="section" moveSectionUp={this.props.moveSectionUp} />
                <MoveDown sectionId={this.props.section.id} type="section" max={this.props.max} moveSectionDown={this.props.moveSectionDown} />
                <DeleteSection sectionId={this.props.section.id} deleteSection={this.props.deleteSection} />
                <div className="wrapper">
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
                    <SectionImage sectionId={this.props.section.id} image={this.props.section.image} updateImage={this.updateImage} deleteImage={this.deleteImage} />
                </div>
                <div className="wrapper">
                    <div className="col-6">
                        <TextButton addText={this.addText} sectionId={this.props.section.id} />
                    </div>
                    <div className="col-3">
                         <ItemButton addItem={this.addItem} sectionId={this.props.section.id} itemName={Items.name} />
                    </div>
                    <div className="col-3">

                    </div>
                </div>
                <AddSection sectionId={this.props.section.id} addSection={this.props.addSection} />
            </div>
        );
    }
}

export default CreateSection;