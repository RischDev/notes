import React from 'react';

class MoveSectionUp extends React.PureComponent {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        const id = e.target.id.split("-");
        const sectionId = parseInt(id[1]);

       this.props.moveSectionUp(sectionId);
    }

    render() {
        if (this.props.sectionId !== 0) {
            return (
                <img id={"moveSectionUp-" + this.props.sectionId + "-" + this.props.textId} className="icon" onClick={this.onClick} src="/notes/icons/up.png" alt="Up" />
            )
        }

        return <img id={"moveSectionUp-" + this.props.sectionId + "-" + this.props.textId} className="icon hidden" onClick={this.onClick} src="/notes/icons/up.png" alt="Up" />;
    }
}

export default MoveSectionUp;