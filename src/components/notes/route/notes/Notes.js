import React from 'react';
import NoteSection from './NoteSection';
import styles from './styles/Notes.Module.css';

class Notes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            display: true,
            fullSize: false,
            section: 0,
            sectionTop: 37,
            scrollPosition: 0,
        }

        this.notesRef = React.createRef();

        this.sectionRefs = new Array(this.props.notes.sections.length);
        this.props.notes.sections.map((section) =>
            this.sectionRefs[section.id] = React.createRef()
        );

        this.onScroll = this.onScroll.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    onScroll(e) {
        let scrollPosition = e.target.scrollTop;
        let newSectionTop = this.state.sectionTop;

        let i = 0;
        if (scrollPosition > this.state.scrollPosition && this.state.section !== this.props.notes.sections.length) {
            while (scrollPosition > (newSectionTop + this.sectionRefs[this.state.section + i].current.clientHeight)) {
                newSectionTop = newSectionTop + this.sectionRefs[this.state.section + i].current.clientHeight;
                i++;

                if (this.state.section + i === this.props.notes.sections.length) {
                    break;
                }
            }
        } else if (scrollPosition < this.state.scrollPosition && this.state.section !== 0) {
            while (scrollPosition < newSectionTop) {
                i--;
                newSectionTop = newSectionTop - this.sectionRefs[this.state.section + i].current.clientHeight;

                if (this.state.section + i === 0) {
                    break;
                }
            }
        }

        this.setState({
            section: this.state.section + i,
            sectionTop: newSectionTop,
            scrollPosition: scrollPosition
        })
    }

    handleKeyPress(e) {
        let keyPress = e.key;

        if (keyPress === "ArrowLeft" && this.state.section !== 0) {
            this.sectionRefs[this.state.section - 1].current.scrollIntoView({behavior: 'smooth'});
        } else if (keyPress === "ArrowRight" && this.state.section !== this.props.notes.sections.length) {
            this.sectionRefs[this.state.section + 1].current.scrollIntoView({behavior: 'smooth'});
        }
    }

    render() {
        const fullSizeClass = this.props.fullSize ? styles.fullSize : "";
        let menu;
        if (this.props.fullSize) {
            menu = <img className="expand right" src="/icons/collapse-left.png" alt="Show Tracker" onClick={this.props.updateTrackerDisplay} />;
        } else {
            menu = <img className="collapse" src="/icons/collapse-left.png" alt="Hide Notes" onClick={this.props.updateNotesDisplay} />;
        }

        if (this.props.display) {
            return(
                <div onScroll={this.onScroll} onKeyDown={this.handleKeyPress} className={`${styles.notes} ${fullSizeClass}`} ref={this.notesRef} tabIndex="0">
                    <div className={styles.menu}>
                        {menu}
                    </div>
                    {this.props.notes.sections.map((section) =>
                        <NoteSection
                            key={"section-" + section.id}
                            sectionId={section.id}
                            noteRef={this.sectionRefs[section.id]}
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