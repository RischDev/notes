import React from 'react';
import styles from './styles/NoteSection.Module.css';
import SmallItem from './SmallItem';
import Icon from '../../../common/Icon';

function Text(props) {
    const text = props.text;
    const foundItems = props.foundItems;
    const foundModifiers = props.foundModifiers;

    if (text.item != null && foundItems.includes(text.item)) {
        if ((text.modifier == null) || foundModifiers[text.item].includes(text.modifier)) {
            return (
                <li className={`${styles.found}`}>{text.text}</li>
            );
        }
    }

    return (
        <li>{text.text}</li>
    );
}

function ItemsList(props) {
    const items = props.items;

    let Items = require('../../../../resources/' + props.game + '/ItemNames.json');

    let itemsList;

    if (Items.modifiers) {
        let completedItems = [];

        for (let i = 0; i < items.length; i++) {
            let item = items[i];

            if (!completedItems.some(o => o.value === item.value)) {
                let modifiers = [];

                for (let j = 0; j < items.length; j++) {
                    let item2 = items[j];

                    if (item2.value === item.value && item2.modifier && item2.modifier !== "" && item2.modifier != null) {
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
            <div className="col-2 col-m-12">
                <div className={styles.header}>
                    Potential {Items.name + "s"}
                </div>
                <div className={styles.itemList}>
                    {itemsList}
                </div>
           </div>
        );
    }
    return (
        <div className="col-2 col-m-12"> </div>
    );
}

function Image(props) {
    const image = props.image;

    if (image != null) {
        return (
            <div className="col-6 col-m-12">
                <img className={styles.image} src={image} alt="" />
            </div>
        );
    }

    return (
        <div className="col-6 col-m-12"> </div>
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
        if (this.props.mode === "list") {
            return (
                <div id={"section-" + this.props.sectionId} className={`${styles.wrapper} card`} ref={this.props.noteRef}>
                    <div className="col-4 col-m-12">
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
        } else if (this.props.mode === "presenter") {
            return (
                <div id={"section-" + this.props.sectionId} className={`${styles.wrapper} card`} ref={this.props.noteRef}>
                    <div className="col-12 col-m-12">
                        <Icon src="/icons/previous.png" size="large" altText="Previous" hover={true} hidden={false} onClick={this.props.previousSection} />
                        <Icon src="/icons/next.png" size="large" altText="Next" hover={true} hidden={false} float={"right"} onClick={this.props.nextSection} />
                    </div>
                    <div className="col-4 col-m-12">
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

        return null;
    }
}

export default NoteSection;