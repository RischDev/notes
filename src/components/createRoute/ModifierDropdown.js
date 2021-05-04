import React from 'react';

class ModifierDropdown extends React.PureComponent {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        const name = e.target.name.split("-");
        const sectionId = parseInt(name[1]);
        const id = parseInt(name[2]);

        if (this.props.type === "text") {
            this.props.updateText(sectionId, id, null, null, value);
        } else if (this.props.type === "section") {
            this.props.updateItems(sectionId, id, null, value);
        }
    }

    render() {
        let Items = require('../../resources/ItemNames.json');
        if (this.props.game !== "" && this.props.game != null) {
            Items = require('../../resources/' + this.props.game + '/ItemNames.json');
        }

        if (!Items.modifiers) {
            return null;
        }

        if (this.props.itemValue != null) {
            if (Items.Items[this.props.itemValue] == null) {
                if (this.props.type === "text") {
                    return(
                        <select name={"textModifier-" + this.props.sectionId + "-" + this.props.textId} className="modifier-select" value={this.props.value} onChange={this.onChange}>
                            <option value=""> </option>
                        </select>
                    );
                } else if (this.props.type === "section") {
                    return(
                        <select name={"sectionModifier-" + this.props.sectionId + "-" + this.props.itemId} className="modifier-select" value={this.props.value} onChange={this.onChange}>
                            <option value=""> </option>
                        </select>
                    );
                }
            }

            if (this.props.type === "text") {
                return(
                    <select name={"textModifier-" + this.props.sectionId + "-" + this.props.textId} className="modifier-select" value={this.props.value} onChange={this.onChange}>
                        <option value=""> </option>
                        {Items.Items[this.props.itemValue].modifiers.map((modifier) =>
                            <option value={modifier} key={"text-modifier-" + modifier}>{modifier}</option>
                        )}
                    </select>
                );
            } else if (this.props.type === "section") {
                return(
                    <select name={"sectionModifier-" + this.props.sectionId + "-" + this.props.itemId} className="modifier-select" value={this.props.value} onChange={this.onChange}>
                        <option value=""> </option>
                        {Items.Items[this.props.itemValue].modifiers.map((modifier) =>
                            <option value={modifier} key={"text-modifier-" + modifier}>{modifier}</option>
                        )}
                    </select>
                );
            }
        }

        return(
            <span className="modifier-select-buffer" />
        );
    }
}

export default ModifierDropdown;