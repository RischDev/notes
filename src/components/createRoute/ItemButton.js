import React from 'react';

class ItemButton extends React.Component {
    constructor(props) {
        super(props);

        this.addItem = this.addItem.bind(this);
    }

    addItem(e) {
        e.preventDefault();

        this.props.addItem(this.props.id)
    }

    render() {
        return(
            <button className="btn" onClick={this.addItem}>Add {this.props.itemName}</button>
        );
    }
}

export default ItemButton;