import { useState, useEffect, useRef, createRef } from 'react';
import Section from './Section/Section';

import styles from './styles/SectionList.Module.css';

function SectionList(props) {
    const [numSections, setNumSections] = useState(10);

    const sectionRefs = useRef([]);
    props.sections.map((section) =>
        sectionRefs.current[section.id] = createRef()
    );

    const renderNewSections = (entries, observer) => {
        const [ entry ] = entries;

        if (entry.isIntersecting && numSections !== props.sections.length) {
            setNumSections(prevNumSections => Math.min(prevNumSections + 10, props.sections.length));
        }
    }
    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.3
    }

    const observer = useRef(new IntersectionObserver(renderNewSections, options));

    useEffect(() => {
        observer.current.disconnect();
        if (numSections !== props.sections.length) {
            observer.current.observe(sectionRefs.current[numSections - 1].current);
        }
    }, [numSections, props.sections, sectionRefs, observer]);

    return (
        <div className={`${styles.sectionList}`}>
            {props.sections.slice(0, numSections).map((section) =>
                <Section
                    key={"section-" + section.id}
                    sectionRef={sectionRefs.current[section.id]}
                    section={section}
                    max={props.sections.length - 1}
                    game={props.game}
                    updateRoute={props.updateRoute}
                    moveSectionUp={props.moveSectionUp}
                    moveSectionDown={props.moveSectionDown}
                    addSection={props.addSection}
                    deleteSection={props.deleteSection}
                />
            )}
            <div className="bottom-buffer"> </div>
        </div>
    );
}

export default SectionList;