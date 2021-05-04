import React from 'react';

class MoveTextUp extends React.PureComponent {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        const id = e.target.id.split("-");
        const sectionId = parseInt(id[1]);
        const textId = parseInt(id[2]);

       this.props.moveTextUp(sectionId, textId);
    }

    render() {
        if (this.props.textId !== 0) {
            return (
                <img id={"moveTextUp-" + this.props.sectionId + "-" + this.props.textId} className="icon" onClick={this.onClick} src="/notes/icons/up.png" alt="Up" />
            )
        }

        return <img id={"moveTextUp-" + this.props.sectionId + "-" + this.props.textId} className="icon hidden" onClick={this.onClick} src="/notes/icons/up.png" alt="Up" />;
    }
}

export default MoveTextUp;