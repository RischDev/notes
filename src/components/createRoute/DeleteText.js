import React from 'react';

class DeleteText extends React.Component {
    render() {
        if (this.props.textId === 0) {
            return (
                <span className="delete"> </span>
            );
        }

        return (
            <img id={"deleteText-" + this.props.sectionId + "-" + this.props.textId} className="delete" onClick={this.props.deleteText} src="/notes/icons/delete.png" alt="X" />
        )
    }
}

export default DeleteText;