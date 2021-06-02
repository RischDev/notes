import React from 'react';

class MoveTextDown extends React.PureComponent {
    constructor(props) {
        super(props);

        this.moveText = this.moveText.bind(this);
        this.moveItem = this.moveItem.bind(this);
        this.moveSection = this.moveSection.bind(this);
    }

    moveText(e) {
        const id = e.target.id.split("-");
        const sectionId = parseInt(id[1]);
        const textId = parseInt(id[2]);

       this.props.moveTextDown(sectionId, textId);
    }

    moveItem(e) {
        const id = e.target.id.split("-");
        const sectionId = parseInt(id[1]);
        const itemId = parseInt(id[2]);

       this.props.moveItemDown(sectionId, itemId);
    }

    moveSection(e) {
        const id = e.target.id.split("-");
        const sectionId = parseInt(id[1]);

        this.props.moveSectionDown(sectionId);
    }

    render() {
        if (this.props.type === "text") {
            if (this.props.textId !== this.props.max) {
                return (
                    <img id={"moveTextDown-" + this.props.sectionId + "-" + this.props.textId} className="icon" onClick={this.moveText} src="/notes/icons/down.png" alt="Down" />
                )
            }

            return <img id={"moveTextDown-" + this.props.sectionId + "-" + this.props.textId} className="icon hidden" onClick={this.moveText} src="/notes/icons/down.png" alt="Down" />;
        } else if (this.props.type === "item") {
            if (this.props.itemId !== this.props.max) {
                return (
                    <img id={"moveItemDown-" + this.props.sectionId + "-" + this.props.itemId} className="icon" onClick={this.moveItem} src="/notes/icons/down.png" alt="Down" />
                )
            }

            return <img id={"moveItemDown-" + this.props.sectionId + "-" + this.props.itemId} className="icon hidden" onClick={this.moveItem} src="/notes/icons/down.png" alt="Down" />;
        } else if (this.props.type === "section") {
            if (this.props.sectionId !== this.props.max) {
                return (
                    <img id={"moveSectionDown-" + this.props.sectionId} className="icon" onClick={this.moveSection} src="/notes/icons/down.png" alt="Down" />
                )
            }

            return <img id={"moveSectionDown-" + this.props.sectionId} className="icon hidden" onClick={this.moveSection} src="/notes/icons/down.png" alt="Down" />;
        }

        return null;
    }
}

export default MoveTextDown;