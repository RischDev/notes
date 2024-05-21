/** @format */

import {
    useState,
    useEffect,
    useCallback,
    useContext,
    useMemo,
    createRef,
} from 'react';
import NoteSection from './NoteSection';
import NotesContext from '../../../common/NotesContext';
import styles from './styles/Notes.module.css';

function Notes(props) {
    const { notes, showNotes, showTracker, mode } = useContext(NotesContext);

    const [state, setState] = useState({
        section: 0,
        sectionTop: 5,
        scrollPosition: 0,
    });

    const [numSections, setNumSections] = useState(
        Math.min(10, notes.sections.length),
    );

    const notesRef = createRef();

    const sectionRefs = useMemo(() => {
        const refsArray = new Array(notes.sections.length);
        notes.sections.map((section) => (refsArray[section.id] = createRef()));
        return refsArray;
    }, [notes]);

    const renderNewSections = useCallback(
        (entries, observer) => {
            const [entry] = entries;

            if (entry.isIntersecting && numSections !== notes.sections.length) {
                setNumSections(
                    Math.min(numSections + 10, notes.sections.length),
                );
            }
        },
        [numSections, notes, setNumSections],
    );

    const observer = useMemo(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2,
        };

        return new IntersectionObserver(renderNewSections, options);
    }, [renderNewSections]);

    useEffect(() => {
        if (mode === 'list' && showNotes) {
            // TODO: Find a solution to scroll to the expected section when switching from presenter to list mode.
            if (sectionRefs[state.section].current != null) {
                sectionRefs[state.section].current.scrollIntoView({
                    behavior: 'instant',
                });
            } else {
                setState({ ...state, section: 0 });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mode, showNotes]);

    useEffect(() => {
        observer.disconnect();
        if (
            numSections < notes.sections.length &&
            mode === 'list' &&
            showNotes
        ) {
            observer.observe(sectionRefs[numSections - 1].current);
        }
    }, [mode, showNotes, sectionRefs, numSections, observer, notes]);

    const onScroll = (e) => {
        let scrollPosition = e.target.scrollTop;
        let newSectionTop = state.sectionTop;

        let i = 0;
        if (
            scrollPosition > state.scrollPosition &&
            state.section !== notes.sections.length
        ) {
            while (
                scrollPosition >=
                Math.floor(
                    newSectionTop +
                        sectionRefs[
                            state.section + i
                        ].current.getBoundingClientRect().height +
                        10,
                )
            ) {
                newSectionTop =
                    newSectionTop +
                    Math.floor(
                        sectionRefs[
                            state.section + i
                        ].current.getBoundingClientRect().height + 10,
                    );
                i++;

                if (state.section + i === notes.sections.length) {
                    break;
                }
            }
        } else if (
            scrollPosition < state.scrollPosition &&
            state.section !== 0
        ) {
            while (scrollPosition < newSectionTop) {
                i--;
                newSectionTop =
                    newSectionTop -
                    sectionRefs[
                        state.section + i
                    ].current.getBoundingClientRect().height -
                    10;

                if (state.section + i === 0) {
                    break;
                }
            }
        }

        setState({
            ...state,
            section: state.section + i,
            sectionTop: newSectionTop,
            scrollPosition: scrollPosition,
        });
    };

    const handleKeyPress = (e) => {
        let keyPress = e.key;
        if (
            keyPress === 'ArrowLeft' ||
            keyPress === 'ArrowRight' ||
            keyPress === ' '
        ) {
            e.preventDefault();
        }

        if (keyPress === 'ArrowLeft' && state.section !== 0) {
            if (mode === 'list') {
                sectionRefs[state.section - 1].current.scrollIntoView({
                    behavior: 'smooth',
                });
            } else if (mode === 'presenter') {
                setState({
                    ...state,
                    section: state.section - 1,
                });
            }
        } else if (
            (keyPress === ' ' || keyPress === 'ArrowRight') &&
            state.section !== notes.sections.length - 1
        ) {
            if (mode === 'list') {
                sectionRefs[state.section + 1].current.scrollIntoView({
                    behavior: 'smooth',
                });
            } else if (mode === 'presenter') {
                setState({
                    ...state,
                    section: state.section + 1,
                });
            }
        }
    };

    const previousSection = (e) => {
        e.preventDefault();

        if (state.section !== 0) {
            setState({
                ...state,
                section: state.section - 1,
            });
        }
    };

    const nextSection = (e) => {
        e.preventDefault();

        if (state.section !== notes.sections.length - 1) {
            setState({
                ...state,
                section: state.section + 1,
            });
        }
    };

    const fullSizeClass = !showTracker ? styles.fullSize : '';

    if (showNotes) {
        if (mode === 'list') {
            return (
                <div
                    data-id={
                        process.env.NODE_ENV === 'development'
                            ? 'notes-container'
                            : null
                    }
                    onScroll={onScroll}
                    onKeyDown={handleKeyPress}
                    className={`${styles.notes} ${fullSizeClass}`}
                    ref={notesRef}
                    tabIndex="0">
                    {notes.sections.slice(0, numSections).map((section) => (
                        <NoteSection
                            key={'section-' + section.id}
                            noteRef={sectionRefs[section.id]}
                            section={section}
                            updateTracker={props.updateTracker}
                            fullscreenImage={props.fullscreenImage}
                        />
                    ))}
                </div>
            );
        } else if (mode === 'presenter') {
            const section = notes.sections[state.section];

            return (
                <div
                    data-id={
                        process.env.NODE_ENV === 'development'
                            ? 'notes-container'
                            : null
                    }
                    onKeyDown={handleKeyPress}
                    className={`${styles.notes} ${fullSizeClass}`}
                    ref={notesRef}
                    tabIndex="0">
                    <NoteSection
                        key={'section-' + section.id}
                        noteRef={sectionRefs[section.id]}
                        section={section}
                        updateTracker={props.updateTracker}
                        previousSection={previousSection}
                        nextSection={nextSection}
                        fullscreenImage={props.fullscreenImage}
                    />
                </div>
            );
        }
    }

    return null;
}

export default Notes;
