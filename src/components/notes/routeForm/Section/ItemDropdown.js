import React from 'react';
import styles from './styles/ItemDropdown.Module.css';
import Icon from '../../../common/Icon';

class ItemDropdown extends React.PureComponent {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.addDropdown = this.addDropdown.bind(this);
    }

    onChange(e) {
        let value = e.target.value;

        if (value !== "") {
            value = parseInt(value);
        }

        if (this.props.type === "text") {
            this.props.updateText(this.props.sectionId, this.props.textId, null, value, null);
        } else if (this.props.type === "section") {
            this.props.updateItems(this.props.sectionId, this.props.itemId, value, null);
        }
    }

    addDropdown(e) {
        e.preventDefault();

        this.props.updateText(this.props.sectionId, this.props.textId, null, 0, null);
    }

    render() {
        let Items = require('../../../../resources/ItemNames.json');
        if (this.props.game !== "" && this.props.game != null) {
            Items = require('../../../../resources/' + this.props.game + '/ItemNames.json');
        }

        if (this.props.value != null) {
            if (this.props.type === "text") {
                return(
                    <select className={`${styles.select}`} name={"textItem-" + this.props.sectionId + "-" + this.props.textId} value={this.props.value} onChange={this.onChange}>
                        <option value="">Remove {Items.name}</option>
                        {Items.Items.map((item) =>
                            <option value={item.id} key={"text-item-" + item.id}>{item.name}</option>
                        )}
                    </select>
                );
            } else if (this.props.type === "section") {
                return(
                    <select className={`${styles.select}`} name={"sectionItem-" + this.props.sectionId + "-" + this.props.itemId} value={this.props.value} onChange={this.onChange}>
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
                    <span className={`${styles.buffer}`}>
                        <Icon src="/icons/add.png" id={"addItemDropdown-" + this.props.textId} size="small" hover={true} hidden={false} altText="+" onClick={this.addDropdown} />
                    </span>
                );
            }
        }

        return null;
    }
}

export default ItemDropdown;