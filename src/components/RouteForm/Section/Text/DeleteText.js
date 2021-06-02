import React from 'react';

class DeleteText extends React.PureComponent {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        const id = e.target.id.split("-");
        const sectionId = parseInt(id[1]);
        const textId = parseInt(id[2]);

       this.props.deleteText(sectionId, textId);
    }

    render() {
        return (
            <img id={"deleteText-" + this.props.sectionId + "-" + this.props.textId} className="icon" onClick={this.onClick} src="/notes/icons/delete.png" alt="X" />
        )
    }
}

export default DeleteText;