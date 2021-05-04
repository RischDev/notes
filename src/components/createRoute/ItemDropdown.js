import React from 'react';

class ItemDropdown extends React.PureComponent {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.addDropdown = this.addDropdown.bind(this);
    }

    onChange(e) {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        const name = e.target.name.split("-");
        const sectionId = parseInt(name[1]);
        const id = parseInt(name[2]);

        if (this.props.type === "text") {
            this.props.updateText(sectionId, id, null, value, null);
        } else if (this.props.type === "section") {
            this.props.updateItems(sectionId, id, value, null);
        }
    }

    addDropdown(e) {
        const id = e.target.id.split("-");
        const sectionId = parseInt(id[1]);
        const textId = parseInt(id[2]);

        this.props.updateText(sectionId, textId, null, 0, null);
    }

    render() {
        let Items = require('../../resources/ItemNames.json');
        if (this.props.game !== "" && this.props.game != null) {
            Items = require('../../resources/' + this.props.game + '/ItemNames.json');
        }

        if (this.props.value != null) {
            if (this.props.type === "text") {
                return(
                    <select className="item-select" name={"textItem-" + this.props.sectionId + "-" + this.props.textId} value={this.props.value} onChange={this.onChange}>
                        <option value="">Remove {Items.name}</option>
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
        } else {
            if (this.props.type === "text") {
                return(
                    <img id={"addItemDropdown-" + this.props.sectionId + "-" + this.props.textId} className="addDropdown" onClick={this.addDropdown} src="/notes/icons/add.png" alt="+" />
                );
            }
        }

        return null;
    }
}

export default ItemDropdown;