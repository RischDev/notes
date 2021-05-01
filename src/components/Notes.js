import React from 'react';
import NoteSection from './NoteSection';

class Notes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            display: true,
            fullSize: false
        }
    }

    render() {
        const fullSizeClass = this.props.fullSize ? " fullSize" : "";
        let header;
        if (this.props.fullSize) {
            header = <img className="expand right" src="/notes/icons/collapse-left.png" alt="Show Tracker" onClick={this.props.updateTrackerDisplay} />;
        } else {
            header = <img className="collapse" src="/notes/icons/collapse-left.png" alt="Hide Notes" onClick={this.props.updateNotesDisplay} />;
        }

        if (this.props.display) {
            return(
                <div className={"notes" + fullSizeClass}>
                    <div className="header">
                        {header}
                    </div>
                    {this.props.notes.sections.map((section) =>
                        <NoteSection
                            key={"section-" + section.id}
                            text={section.text}
                            image={section.image}
                            items={section.items}
                            game={this.props.notes.game}
                            foundItems={this.props.foundItems}
                            foundModifiers={this.props.foundModifiers}
                            updateTracker={this.props.updateTracker}
                        />
                    )}
                </div>
            );
        }

        return null;
    }
}

export default Notes;