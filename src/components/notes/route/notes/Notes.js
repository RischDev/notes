/** @format */

import React from 'react';
import NoteSection from './NoteSection';
import styles from './styles/Notes.Module.css';
/*
// Create refs for each section. Needed for observer
    const sectionRefs = new Array(notes.sections.length);
    notes.sections.map((section) =>
        sectionRefs[section.id] = React.createRef()
    );

    //Display only the first 20 sections. Once the final element is in view, increase the number by 20 until all sections are rendered
    const [numSections, setNumSections] = useState(20);
    const renderNewSections = (entries, observer) => {
        const [ entry ] = entries;

        if (entry.isIntersecting && numSections !== notes.sections.length) {
            setNumSections(prevNumSections => Math.min(prevNumSection + 20, notes.sections.length));
            observer.observe(sectionRefs[numSections - 1].current);
        }
    }
    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5
    }
    const observer = new IntersectionObserver(renderNewSections, options);
    observer.observe(sectionRefs[19].current);
    */

class Notes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            section: 0,
            sectionTop: 5,
            scrollPosition: 0,
            numSections: Math.min(10, this.props.notes.sections.length),
        };

        this.notesRef = React.createRef();

        this.sectionRefs = new Array(this.props.notes.sections.length);
        this.props.notes.sections.map(
            (section) => (this.sectionRefs[section.id] = React.createRef()),
        );

        const renderNewSections = (entries, observer) => {
            const [entry] = entries;

            if (
                entry.isIntersecting &&
                this.state.numSections !== this.props.notes.sections.length
            ) {
                this.setState({
                    numSections: Math.min(
                        this.state.numSections + 10,
                        this.props.notes.sections.length,
                    ),
                });
            }
        };
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2,
        };

        this.observer = new IntersectionObserver(renderNewSections, options);

        this.onScroll = this.onScroll.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.previousSection = this.previousSection.bind(this);
        this.nextSection = this.nextSection.bind(this);
    }

    componentDidMount() {
        // Update observer to the latest. Only matter in list view
        if (
            this.state.numSections < this.props.notes.sections.length &&
            this.props.mode === 'list'
        ) {
            this.observer.observe(
                this.sectionRefs[this.state.numSections - 1].current,
            );
        }
    }

    componentDidUpdate(prevProps) {
        if (
            this.props.mode === 'list' &&
            this.props.display &&
            (this.props.mode !== prevProps.mode || !prevProps.display)
        ) {
            this.sectionRefs[this.state.section].current.scrollIntoView({
                behavior: 'instant',
            });
        }

        // Update observer to the latest. Only matter in list view
        this.observer.disconnect();
        if (
            this.state.numSections < this.props.notes.sections.length &&
            this.props.mode === 'list' &&
            this.props.display
        ) {
            this.observer.observe(
                this.sectionRefs[this.state.numSections - 1].current,
            );
        }
    }

    onScroll(e) {
        let scrollPosition = e.target.scrollTop;
        let newSectionTop = this.state.sectionTop;

        let i = 0;
        if (
            scrollPosition > this.state.scrollPosition &&
            this.state.section !== this.props.notes.sections.length
        ) {
            while (
                scrollPosition >=
                Math.floor(
                    newSectionTop +
                        this.sectionRefs[
                            this.state.section + i
                        ].current.getBoundingClientRect().height +
                        10,
                )
            ) {
                newSectionTop =
                    newSectionTop +
                    Math.floor(
                        this.sectionRefs[
                            this.state.section + i
                        ].current.getBoundingClientRect().height + 10,
                    );
                i++;

                if (
                    this.state.section + i ===
                    this.props.notes.sections.length
                ) {
                    break;
                }
            }
        } else if (
            scrollPosition < this.state.scrollPosition &&
            this.state.section !== 0
        ) {
            while (scrollPosition < newSectionTop) {
                i--;
                newSectionTop =
                    newSectionTop -
                    this.sectionRefs[
                        this.state.section + i
                    ].current.getBoundingClientRect().height -
                    10;

                if (this.state.section + i === 0) {
                    break;
                }
            }
        }

        this.setState({
            section: this.state.section + i,
            sectionTop: newSectionTop,
            scrollPosition: scrollPosition,
        });
    }

    handleKeyPress(e) {
        let keyPress = e.key;
        if (
            keyPress === 'ArrowLeft' ||
            keyPress === 'ArrowRight' ||
            keyPress === ' '
        ) {
            e.preventDefault();
        }

        if (keyPress === 'ArrowLeft' && this.state.section !== 0) {
            if (this.props.mode === 'list') {
                this.sectionRefs[this.state.section - 1].current.scrollIntoView(
                    { behavior: 'smooth' },
                );
            } else if (this.props.mode === 'presenter') {
                this.setState({
                    section: this.state.section - 1,
                });
            }
        } else if (
            (keyPress === ' ' || keyPress === 'ArrowRight') &&
            this.state.section !== this.props.notes.sections.length - 1
        ) {
            if (this.props.mode === 'list') {
                this.sectionRefs[this.state.section + 1].current.scrollIntoView(
                    { behavior: 'smooth' },
                );
            } else if (this.props.mode === 'presenter') {
                this.setState({
                    section: this.state.section + 1,
                });
            }
        }
    }

    previousSection(e) {
        e.preventDefault();

        if (this.state.section !== 0) {
            this.setState({
                section: this.state.section - 1,
            });
        }
    }

    nextSection(e) {
        e.preventDefault();

        if (this.state.section !== this.props.notes.sections.length - 1) {
            this.setState({
                section: this.state.section + 1,
            });
        }
    }

    render() {
        const fullSizeClass = this.props.fullSize ? styles.fullSize : '';

        if (this.props.display) {
            if (this.props.mode === 'list') {
                return (
                    <div
                        onScroll={this.onScroll}
                        onKeyDown={this.handleKeyPress}
                        className={`${styles.notes} ${fullSizeClass}`}
                        ref={this.notesRef}
                        tabIndex="0">
                        {this.props.notes.sections
                            .slice(0, this.state.numSections)
                            .map((section) => (
                                <NoteSection
                                    key={'section-' + section.id}
                                    sectionId={section.id}
                                    noteRef={this.sectionRefs[section.id]}
                                    text={section.text}
                                    image={section.image}
                                    state={section.state}
                                    items={section.items}
                                    mode={this.props.mode}
                                    game={this.props.notes.game}
                                    foundItems={this.props.foundItems}
                                    foundModifiers={this.props.foundModifiers}
                                    updateTracker={this.props.updateTracker}
                                />
                            ))}
                    </div>
                );
            } else if (this.props.mode === 'presenter') {
                const section = this.props.notes.sections[this.state.section];

                return (
                    <div
                        onKeyDown={this.handleKeyPress}
                        className={`${styles.notes} ${fullSizeClass}`}
                        ref={this.notesRef}
                        tabIndex="0">
                        <NoteSection
                            key={'section-' + section.id}
                            sectionId={section.id}
                            noteRef={this.sectionRefs[section.id]}
                            text={section.text}
                            image={section.image}
                            state={section.state}
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
                );
            }
        }

        return null;
    }
}

export default Notes;
