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
            sectionTop: 5,
            scrollPosition: 0,
        }

        this.notesRef = React.createRef();

        this.sectionRefs = new Array(this.props.notes.sections.length);
        this.props.notes.sections.map((section) =>
            this.sectionRefs[section.id] = React.createRef()
        );

        this.onScroll = this.onScroll.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.previousSection = this.previousSection.bind(this);
        this.nextSection = this.nextSection.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.mode === "list" && this.props.mode !== prevProps.mode) {
            this.sectionRefs[this.state.section].current.scrollIntoView({behavior: 'instant'});
        }
    }

    onScroll(e) {
        let scrollPosition = e.target.scrollTop;
        let newSectionTop = this.state.sectionTop;

        let i = 0;
        if (scrollPosition > this.state.scrollPosition && this.state.section !== this.props.notes.sections.length) {
            while (scrollPosition >= Math.floor(newSectionTop + this.sectionRefs[this.state.section + i].current.getBoundingClientRect().height + 10)) {
                newSectionTop = newSectionTop + Math.floor(this.sectionRefs[this.state.section + i].current.getBoundingClientRect().height + 10);
                i++;

                if (this.state.section + i === this.props.notes.sections.length) {
                    break;
                }
            }
        } else if (scrollPosition < this.state.scrollPosition && this.state.section !== 0) {
            while (scrollPosition < newSectionTop) {
                i--;
                newSectionTop = newSectionTop - this.sectionRefs[this.state.section + i].current.getBoundingClientRect().height - 10;

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
        e.preventDefault();

        if (keyPress === "ArrowLeft" && this.state.section !== 0) {
            if (this.props.mode === "list") {
                this.sectionRefs[this.state.section - 1].current.scrollIntoView({behavior: 'smooth'});
            } else if (this.props.mode === "presenter") {
                this.setState({
                    section: this.state.section - 1
                });
            }
        } else if ((keyPress === " " || keyPress === "ArrowRight") && this.state.section !== this.props.notes.sections.length - 1) {
            if (this.props.mode === "list") {
                this.sectionRefs[this.state.section + 1].current.scrollIntoView({behavior: 'smooth'});
            } else if (this.props.mode === "presenter") {
                this.setState({
                    section: this.state.section + 1
                });
            }
        }
    }

    previousSection(e) {
        e.preventDefault();

        if (this.state.section !== 0) {
            this.setState({
                section: this.state.section - 1
            });
        }
    }

    nextSection(e) {
        e.preventDefault();

        if (this.state.section !== this.props.notes.sections.length - 1) {
            this.setState({
                section: this.state.section + 1
            });
        }
    }

    render() {
        const fullSizeClass = this.props.fullSize ? styles.fullSize : "";

        if (this.props.display) {
            if (this.props.mode === "list") {
                return(
                    <div onScroll={this.onScroll} onKeyDown={this.handleKeyPress} className={`${styles.notes} ${fullSizeClass}`} ref={this.notesRef} tabIndex="0">
                        {this.props.notes.sections.map((section) =>
                            <NoteSection
                                key={"section-" + section.id}
                                sectionId={section.id}
                                noteRef={this.sectionRefs[section.id]}
                                text={section.text}
                                image={section.image}
                                items={section.items}
                                mode={this.props.mode}
                                game={this.props.notes.game}
                                foundItems={this.props.foundItems}
                                foundModifiers={this.props.foundModifiers}
                                updateTracker={this.props.updateTracker}
                            />
                        )}
                    </div>
                );
            } else if (this.props.mode === "presenter") {
                const section = this.props.notes.sections[this.state.section];

                return(
                    <div onKeyDown={this.handleKeyPress} className={`${styles.notes} ${fullSizeClass}`} ref={this.notesRef} tabIndex="0">
                        <NoteSection
                            key={"section-" + section.id}
                            sectionId={section.id}
                            noteRef={this.sectionRefs[section.id]}
                            text={section.text}
                            image={section.image}
                            items={section.items}
                            mode={this.props.mode}
                            game={this.props.notes.game}
                            foundItems={this.props.foundItems}
                            foundModifiers={this.props.foundModifiers}
                            updateTracker={this.props.updateTracker}
                            previousSection={this.previousSection}
                            nextSection={this.nextSection}
                        />
                    </div>
                )
            }
        }

        return null;
    }
}

export default Notes;