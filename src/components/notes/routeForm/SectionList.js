/** @format */

import { useState, useEffect, useContext } from 'react';
import RouteContext from '../../common/RouteContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import Section from './Section/Section';

import styles from './styles/SectionList.Module.css';

function SectionList(props) {
    const {
        route,
        setContext
    } = useContext(RouteContext);

    const [numSections, setNumSections] = useState(Math.min(10, route.sections.length));

    const [displayedSections, setDisplayedSections] = useState(route.sections.slice(0, numSections));
    const addMoreSections = () => {
        setDisplayedSections(route.sections.slice(0, Math.min(numSections + 10, route.sections.length)))
        setNumSections(Math.min(numSections + 10, route.sections.length));
    }

    useEffect(() => {
        setDisplayedSections(route.sections.slice(0, numSections));
    }, [route.sections, numSections]);

    const setSection = (section, id) => {
        const newSections = [...route.sections];
        newSections[id] = section;
        setContext({ route: { ...route, sections: newSections } });
    }

    const addSection = (id) => {
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

        setContext({ route: { ...route, sections: newSections } });
        setNumSections(numSections + 1);
    }

    const moveSectionUp = (id) => {
        // Stringify then parse JSON to create deep copy.
        let newSections = JSON.parse(JSON.stringify(route.sections));

        let chosenSection = newSections[id];
        chosenSection.id = id - 1;
        let aboveSection = newSections[id - 1];
        aboveSection.id = id;

        newSections[id] = aboveSection;
        newSections[id - 1] = chosenSection;

        setContext({ route: { ...route, sections: newSections } });
    }

    const moveSectionDown = (id) => {
        // Stringify then parse JSON to create deep copy.
        let newSections = JSON.parse(JSON.stringify(route.sections));

        let chosenSection = newSections[id];
        chosenSection.id = id + 1;
        let belowSection = newSections[id + 1];
        belowSection.id = id;

        newSections[id] = belowSection;
        newSections[id + 1] = chosenSection;

        setContext({ route: { ...route, sections: newSections } });
    }

    const deleteSection = (id) => {
        // JSON stringify, then JSON parse to make a deep copy.
        let newSections = JSON.parse(JSON.stringify(route.sections));

        for (let i = id + 1; i < newSections.length; i++) {
            newSections[i].id--;
        }

        newSections.splice(id, 1);

        setContext({ route: { ...route, sections: newSections } });
    }

    const getLastState = (id) => {
        // Check previous sections for the last state value
        let state = null;
        for (let i = id - 1; i >= 0; i--) {
            if (route.sections[i].state != null) {
                state = route.sections[i].state;
                break;
            }
        }

        // If no state was found, use initialState
        if (state == null) {
            state = route.initialState;

            // Setup the previous folder to be the same as the starting folder, and default folder edit to false.
            state.PrevFolder = state.Folder;
        }

        return state;
    }

    return (
        <div id="scrollableDiv" className={`${styles.sectionList}`}>
            <InfiniteScroll
                dataLength={displayedSections}
                next={addMoreSections}
                hasMore={route.sections.length > displayedSections.length}
                loader={"Loading..."}
                scrollableTarget={"scrollableDiv"}
            >
                {displayedSections.map((section) =>
                    <Section
                        key={"section-" + section.id}
                        section={section}
                        setSection={setSection}
                        initialState={route.initialState}
                        max={route.sections.length - 1}
                        updateRoute={props.updateRoute}
                        moveSectionUp={moveSectionUp}
                        moveSectionDown={moveSectionDown}
                        addSection={addSection}
                        deleteSection={deleteSection}
                        getLastState={getLastState}
                    />
                )}
                <div className="bottom-buffer"> </div>
            </InfiniteScroll>
        </div>
    );
}

export default SectionList;
