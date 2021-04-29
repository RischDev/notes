import React from 'react';

class ModifierDropdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            type: props.type,
            sectionId: props.sectionId,
            textId: props.textId,
            itemId: props.itemId,
            game: props.game
        }

        this.onChange = this.props.onChange.bind(this);
    }

    render() {
        let Items = require('../../resources/ItemNames.json');
        if (this.props.game !== "" && this.props.game != null) {
            Items = require('../../resources/' + this.props.game + '/ItemNames.json');
        }

        console.log(Items.modifiers);

        if (!Items.modifiers) {
            return null;
        }

        if (Items.Items[this.props.itemValue] == null) {
            if (this.state.type === "text") {
                return(
                    <select name={"textModifier-" + this.state.sectionId + "-" + this.state.textId} className="modifier-select" value={this.props.value} onChange={this.onChange}>
                        <option value=""> </option>
                    </select>
                );
            } else if (this.state.type === "section") {
                return(
                    <select name={"sectionModifier-" + this.state.sectionId + "-" + this.state.itemId} className="modifier-select" value={this.props.value} onChange={this.onChange}>
                        <option value=""> </option>
                    </select>
                );
            }
        }

        if (this.state.type === "text") {
            return(
                <select name={"textModifier-" + this.state.sectionId + "-" + this.state.textId} className="modifier-select" value={this.props.value} onChange={this.onChange}>
                    <option value=""> </option>
                    {Items.Items[this.props.itemValue].modifiers.map((modifier) =>
                        <option value={modifier}>{modifier}</option>
                    )}
                </select>
            );
        } else if (this.state.type === "section") {
            return(
                <select name={"sectionModifier-" + this.state.sectionId + "-" + this.state.itemId} className="modifier-select" value={this.props.value} onChange={this.onChange}>
                    <option value=""> </option>
                    {Items.Items[this.props.itemValue].modifiers.map((modifier) =>
                        <option value={modifier}>{modifier}</option>
                    )}
                </select>
            );
        }

        return null;
    }
}

export default ModifierDropdown;