import React from 'react';

class MoveTextUp extends React.PureComponent {
    constructor(props) {
        super(props);

        this.moveText = this.moveText.bind(this);
        this.moveItem = this.moveItem.bind(this);
    }

    moveText(e) {
        const id = e.target.id.split("-");
        const sectionId = parseInt(id[1]);
        const textId = parseInt(id[2]);

       this.props.moveTextUp(sectionId, textId);
    }

    moveItem(e) {
        const id = e.target.id.split("-");
        const sectionId = parseInt(id[1]);
        const itemId = parseInt(id[2]);

       this.props.moveItemUp(sectionId, itemId);
    }

    render() {
        if (this.props.type === "text") {
            if (this.props.textId !== 0) {
                return (
                    <img id={"moveTextUp-" + this.props.sectionId + "-" + this.props.textId} className="icon" onClick={this.moveText} src="/notes/icons/up.png" alt="Up" />
                )
            }

            return <img id={"moveTextUp-" + this.props.sectionId + "-" + this.props.textId} className="icon hidden" onClick={this.moveText} src="/notes/icons/up.png" alt="Up" />;
        } else if (this.props.type === "item") {
            if (this.props.itemId !== 0) {
                return (
                    <img id={"moveItemUp-" + this.props.sectionId + "-" + this.props.itemId} className="icon" onClick={this.moveItem} src="/notes/icons/up.png" alt="Up" />
                )
            }

            return <img id={"moveItemUp-" + this.props.sectionId + "-" + this.props.itemId} className="icon hidden" onClick={this.moveItem} src="/notes/icons/up.png" alt="Up" />;
        }

        return null;
    }
}

export default MoveTextUp;