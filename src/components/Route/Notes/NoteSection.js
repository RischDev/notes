import React from 'react';
import SmallItem from './SmallItem';

function Text(props) {
    const text = props.text;
    const foundItems = props.foundItems;
    const foundModifiers = props.foundModifiers;

    if (text.item != null && foundItems.includes(text.item)) {
        if ((text.modifier == null) || foundModifiers[text.item].includes(text.modifier)) {
            return (
                <li className="strikethrough">{text.text}</li>
            );
        }
    }

    return (
        <li>{text.text}</li>
    );
}

function ItemsList(props) {
    const items = props.items;

    let Items = require('../../../resources/' + props.game + '/ItemNames.json');

    let itemsList;

    if (Items.modifiers) {
        let completedItems = [];

        for (let i = 0; i < items.length; i++) {
            let item = items[i];

            if (!completedItems.some(o => o.value === item.value)) {
                let modifiers = [];

                for (let j = 0; j < items.length; j++) {
                    let item2 = items[j];

                    if (item2.value === item.value) {
                        modifiers.push(item2.modifier);
                    }
                }

                completedItems.push({
                    value: item.value,
                    modifiers: modifiers
                })
            }
        }

        itemsList = completedItems.map((item) =>
                        <SmallItem key={"small-item-" + item.value} id={item.value} updateTracker={props.updateTracker} game={props.game} modifiers={item.modifiers} found={props.foundItems.includes(item.value)} foundModifiers={props.foundModifiers} />
                    );
    } else {
        itemsList = items.map((item) =>
                        <SmallItem key={"small-item-" + item.value} id={item.value} updateTracker={props.updateTracker} game={props.game} found={props.foundItems.includes(item.value)} foundModifiers={props.foundModifiers} />
                    );
    }

    if (items.length > 0) {
        return (
            <div className="col-2">
                <div className="potential-items-list">
                    Potential {Items.name + "s"}
                </div>
                <div className="item-list">
                    {itemsList}
                </div>
           </div>
        );
    }
    return (
        <div className="col-2"> </div>
    );
}

function Image(props) {
    const image = props.image;

    if (image != null) {
        return (
            <div className="col-6">
                <img className="section-image" src={image} alt="" />
            </div>
        );
    }

    return (
        <div className="col-6"> </div>
    );
}

class NoteSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: props.text,
            image: props.image,
            items: props.items,
            game: props.game
        }
    }

    render() {
        return (
            <div className="wrapper">
                <div className="col-4">
                    <ul>
                        {this.state.text.map((text) =>
                            <Text key={"text-" + text.id} text={text} foundItems={this.props.foundItems} foundModifiers={this.props.foundModifiers} />
                        )}
                    </ul>
                </div>
                <ItemsList items={this.state.items} updateTracker={this.props.updateTracker} game={this.state.game} foundItems={this.props.foundItems} foundModifiers={this.props.foundModifiers} />
                <Image image={this.state.image} />
            </div>
        );
    }
}

export default NoteSection;