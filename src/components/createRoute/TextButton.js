import React from 'react';

class TextButton extends React.Component {
    constructor(props) {
        super(props);

        this.addText = this.addText.bind(this);
    }

    addText(e) {
        e.preventDefault();

        this.props.addText(this.props.id)
    }

    render() {
        return(
            <button className="btn" onClick={this.addText}> Add Text </button>
        );
    }
}

export default TextButton;