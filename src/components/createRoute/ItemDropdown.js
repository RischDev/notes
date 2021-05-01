import React from 'react';

class ItemDropdown extends React.Component {
    constructor(props) {
        super(props);

        this.onChange = this.props.onChange.bind(this);
    }

    render() {
        let Items = require('../../resources/ItemNames.json');
        if (this.props.game !== "" && this.props.game != null) {
            Items = require('../../resources/' + this.props.game + '/ItemNames.json');
        }

        if (this.props.type === "text") {
            return(
                <select className="item-select" name={"textItem-" + this.props.sectionId + "-" + this.props.textId} value={this.props.value} onChange={this.onChange}>
                    <option value="">Link to?</option>
                    {Items.Items.map((item) =>
                        <option value={item.id} key={"text-item-" + item.id}>{item.name}</option>
                    )}
                </select>
            );
        } else if (this.props.type === "section") {
            return(
                <select className="item-select" name={"sectionItem-" + this.props.sectionId + "-" + this.props.itemId} value={this.props.value} onChange={this.onChange}>
                    <option value="">Select {Items.name}</option>
                    {Items.Items.map((item) =>
                        <option value={item.id} key={"section-item-" + item.id}>{item.name}</option>
                    )}
                </select>
            );
        }

        return null;
    }
}

export default ItemDropdown;