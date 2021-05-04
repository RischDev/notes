import React from 'react';

class DeleteImage extends React.PureComponent {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        const id = e.target.id.split("-");
        const sectionId = parseInt(id[1]);

       this.props.deleteImage(sectionId);
    }

    render() {
        if (this.props.image != null) {
            return (
                <img id={"deleteImage-" + this.props.sectionId} className="delete" onClick={this.onClick} src="/notes/icons/delete.png" alt="X"/>
            )
        }

        return null;
    }
}

export default DeleteImage;