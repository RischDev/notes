/** @format */

import { useState, useEffect, useCallback, useRef, useContext } from 'react';
import RouteContext from '../../common/RouteContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import Section from './Section/Section';

import styles from './styles/SectionList.Module.css';

function SectionList(props) {
    const { route, numSections, setContext } = useContext(RouteContext);

    const [displayedSections, setDisplayedSections] = useState(
        route.sections.slice(0, numSections),
    );
    const addMoreSections = () => {
        setDisplayedSections(
            route.sections.slice(
                0,
                Math.min(numSections + 10, route.sections.length),
            ),
        );
        setContext({
            numSections: Math.min(numSections + 10, route.sections.length),
        });
    };

    useEffect(() => {
        setDisplayedSections(route.sections.slice(0, numSections));
    }, [route.sections, numSections]);

    const setSection = (section, id) => {
        const newSections = [...route.sections];
        newSections[id] = section;
        setContext({ route: { ...route, sections: newSections } });
    };
    const setSectionRef = useRef();
    setSectionRef.current = setSection;

    const addSection = useCallback(
        (id) => {
            let newSections = [...route.sections];
            let newSection = {
                id: id,
                text: [],
                items: [],
            };

            newSections.splice(id, 0, newSection);

            for (let i = id + 1; i < newSections.length; i++) {
                newSections[i].id++;
            }

            setContext({
                route: { ...route, sections: newSections },
                numSections: numSections + 1,
            });
        },
        [route, setContext, numSections],
    );
    const addSectionRef = useRef();
    addSectionRef.current = addSection;

    const moveSectionUp = useCallback(
        (id) => {
            // Stringify then parse JSON to create deep copy.
            let newSections = JSON.parse(JSON.stringify(route.sections));

            let chosenSection = newSections[id];
            chosenSection.id = id - 1;
            let aboveSection = newSections[id - 1];
            aboveSection.id = id;

            newSections[id] = aboveSection;
            newSections[id - 1] = chosenSection;

            setContext({ route: { ...route, sections: newSections } });
        },
        [route, setContext],
    );
    const moveSectionUpRef = useRef();
    moveSectionUpRef.current = moveSectionUp;

    const moveSectionDown = useCallback(
        (id) => {
            // Stringify then parse JSON to create deep copy.
            let newSections = JSON.parse(JSON.stringify(route.sections));

            let chosenSection = newSections[id];
            chosenSection.id = id + 1;
            let belowSection = newSections[id + 1];
            belowSection.id = id;

            newSections[id] = belowSection;
            newSections[id + 1] = chosenSection;

            setContext({ route: { ...route, sections: newSections } });
        },
        [route, setContext],
    );
    const moveSectionDownRef = useRef();
    moveSectionDownRef.current = moveSectionDown;

    const deleteSection = useCallback(
        (id) => {
            // JSON stringify, then JSON parse to make a deep copy.
            let newSections = JSON.parse(JSON.stringify(route.sections));

            for (let i = id + 1; i < newSections.length; i++) {
                newSections[i].id--;
            }

            newSections.splice(id, 1);

            setContext({ route: { ...route, sections: newSections } });
        },
        [route, setContext],
    );
    const deleteSectionRef = useRef();
    deleteSectionRef.current = deleteSection;

    const getLastState = useCallback(
        (id) => {
            // Check previous sections for the last state value
            let state = null;
            for (let i = id - 1; i >= 0; i--) {
                if (route.sections[i].state != null) {
                    state = JSON.parse(JSON.stringify(route.sections[i].state));
                    break;
                }
            }

            // If no state was found, use initialState
            if (state == null) {
                state = JSON.parse(JSON.stringify(route.initialState));
            }

            return state;
        },
        [route],
    );
    const getLastStateRef = useRef();
    getLastStateRef.current = getLastState;

    const getLastFolderEdit = useCallback(
        (id) => {
            // Check previous sections for the last folder edit value
            let folderEdit = null;
            for (let i = id - 1; i >= 0; i--) {
                if (route.sections[i].folderEdit != null) {
                    folderEdit = JSON.parse(
                        JSON.stringify(route.sections[i].folderEdit),
                    );
                    break;
                }
            }

            // If no state was found, use initialState
            if (folderEdit == null) {
                folderEdit = JSON.parse(
                    JSON.stringify(route.initialFolderEdit),
                );
            }

            // Setup the previous folder to be the same as the starting folder, and clear the folder edit.
            folderEdit.prevFolder = folderEdit.folder;
            folderEdit.value = [
                {
                    id: 0,
                    action: '',
                    item1: -1,
                    modifier1: '',
                    item2: -1,
                    modifier2: '',
                },
            ];

            return folderEdit;
        },
        [route],
    );
    const getLastFolderEditRef = useRef();
    getLastFolderEditRef.current = getLastFolderEdit;

    return (
        <div id="scrollableDiv" className={`${styles.sectionList}`}>
            <InfiniteScroll
                dataLength={displayedSections}
                next={addMoreSections}
                hasMore={route.sections.length > displayedSections.length}
                loader={'Loading...'}
                scrollableTarget={'scrollableDiv'}>
                {displayedSections.map((section) => (
                    <Section
                        key={'section-' + section.id}
                        section={section}
                        setSection={setSectionRef}
                        max={route.sections.length - 1}
                        moveSectionUp={moveSectionUpRef}
                        moveSectionDown={moveSectionDownRef}
                        addSection={addSectionRef}
                        deleteSection={deleteSectionRef}
                        getLastState={getLastStateRef}
                        getLastFolderEdit={getLastFolderEditRef}
                    />
                ))}
                <div className="bottom-buffer"> </div>
            </InfiniteScroll>
        </div>
    );
}

export default SectionList;
