import React from 'react';

class DeleteItem extends React.PureComponent {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        const id = e.target.id.split("-");
        const sectionId = parseInt(id[1]);
        const itemId = parseInt(id[2]);

       this.props.deleteItem(sectionId, itemId);
    }

    render() {
        return (
            <img id={"deleteItem-" + this.props.sectionId + "-" + this.props.itemId} className="delete" onClick={this.onClick} src="/notes/icons/delete.png" alt="X"/>
        )
    }
}

export default DeleteItem;