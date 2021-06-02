import React from 'react';

class AddSection extends React.PureComponent {
    render() {
        return (
            <div id={"addSection-" + (this.props.sectionId + 1)} className="addSection" onClick={this.props.addSection}>
                <img onClick={this.props.deleteSection} src="/notes/icons/add.png" alt="+" />
                <span>Add Section</span>
            </div>
        )
    }
}

export default AddSection;