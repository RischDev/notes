import React from 'react';

class DeleteSection extends React.PureComponent {
    render() {
        return (
            <img id={"deleteSection-" + this.props.sectionId + "-"} className="deleteSection" onClick={this.props.deleteSection} src="/notes/icons/delete.png" alt="X" />
        )
    }
}

export default DeleteSection;