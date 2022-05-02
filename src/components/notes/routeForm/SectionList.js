/** @format */

import { useEffect, useCallback, useRef, createRef } from 'react';
import Section from './Section/Section';

import styles from './styles/SectionList.Module.css';

function SectionList(props) {
    const sectionRefs = Array(props.sections.length)
        .fill()
        .map(() => createRef());

    const renderNewSections = useCallback(
        (entries, observer) => {
            const [entry] = entries;

            if (entry.isIntersecting) {
                props.updateNumSections();
            }
        },
        [props],
    );
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3,
    };

    const observer = useRef(
        new IntersectionObserver(renderNewSections, options),
    );

    useEffect(() => {
        observer.current.disconnect();
        if (
            props.numSections < props.sections.length &&
            sectionRefs[props.numSections - 1].current != null
        ) {
            observer.current.observe(
                sectionRefs[props.numSections - 1].current,
            );
        }
    }, [props.numSections, props.sections, sectionRefs, observer]);

    return (
        <div className={`${styles.sectionList}`}>
            {props.sections.slice(0, props.numSections).map((section) => (
                <Section
                    key={'section-' + section.id}
                    sectionRef={sectionRefs[section.id]}
                    section={section}
                    sections={props.sections}
                    initialState={props.initialState}
                    max={props.sections.length - 1}
                    game={props.game}
                    updateRoute={props.updateRoute}
                    moveSectionUp={props.moveSectionUp}
                    moveSectionDown={props.moveSectionDown}
                    addSection={props.addSection}
                    deleteSection={props.deleteSection}
                />
            ))}
            <div className="bottom-buffer"> </div>
        </div>
    );
}

export default SectionList;
