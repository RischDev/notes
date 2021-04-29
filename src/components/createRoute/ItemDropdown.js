import React from 'react';

class ItemDropdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            type: props.type,
            sectionId: props.sectionId,
            textId: props.textId,
            itemId: props.itemId,
            value: props.value,
            game: props.game
        }

        this.onChange = this.props.onChange.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({
            type: props.type,
            sectionId: props.sectionId,
            textId: props.textId,
            itemId: props.itemId,
            value: props.value,
            game: props.game
        });
    }

    render() {
        let Items = require('../../resources/ItemNames.json');
        if (this.state.game !== "" && this.state.game != null) {
            Items = require('../../resources/' + this.state.game + '/ItemNames.json');
        }

        if (this.state.type === "text") {
            return(
                <select className="item-select" name={"textItem-" + this.state.sectionId + "-" + this.state.textId} value={this.state.value} onChange={this.onChange}>
                    <option value="">Link to?</option>
                    {Items.Items.map((item) =>
                        <option value={item.id}>{item.name}</option>
                    )}
                </select>
            );
        } else if (this.state.type === "section") {
            return(
                <select className="item-select" name={"sectionItem-" + this.state.sectionId + "-" + this.state.itemId} value={this.state.value} onChange={this.onChange}>
                    <option value="">Select {Items.name}</option>
                    {Items.Items.map((item) =>
                        <option value={item.id}>{item.name}</option>
                    )}
                </select>
            );
        }

        return null;
    }
}

export default ItemDropdown;