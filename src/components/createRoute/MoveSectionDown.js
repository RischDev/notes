import React from 'react';

class MoveSectionDown extends React.PureComponent {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        const id = e.target.id.split("-");
        const sectionId = parseInt(id[1]);

       this.props.moveSectionDown(sectionId);
    }

    render() {
        if (this.props.sectionId !== this.props.max) {
            return (
                <img id={"moveSectionDown-" + this.props.sectionId + "-" + this.props.textId} className="icon" onClick={this.onClick} src="/notes/icons/down.png" alt="Up" />
            )
        }

        return <img id={"moveSectionDown-" + this.props.sectionId + "-" + this.props.textId} className="icon hidden" onClick={this.onClick} src="/notes/icons/down.png" alt="Up" />;
    }
}

export default MoveSectionDown;