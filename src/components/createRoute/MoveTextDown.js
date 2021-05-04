import React from 'react';

class MoveTextDown extends React.PureComponent {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        const id = e.target.id.split("-");
        const sectionId = parseInt(id[1]);
        const textId = parseInt(id[2]);

       this.props.moveTextDown(sectionId, textId);
    }

    render() {
        if (this.props.textId !== this.props.max) {
            return (
                <img id={"moveTextDown-" + this.props.sectionId + "-" + this.props.textId} className="icon" onClick={this.onClick} src="/notes/icons/down.png" alt="Down" />
            )
        }

        return <img id={"moveTextDown-" + this.props.sectionId + "-" + this.props.textId} className="icon hidden" onClick={this.onClick} src="/notes/icons/down.png" alt="Down" />;
    }
}

export default MoveTextDown;