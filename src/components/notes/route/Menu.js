import React from 'react';
import styles from "./styles/Menu.Module.css";
import Button from "../../common/Button";
import useMatchMedia from '../../common/Functions';

function Menu(props) {
    let modeText = props.mode === "presenter" ? "Swap to List Mode" : "Swap to Presenter Mode";

    let previewButton = "";
    if (props.preview) {
        previewButton = <Button text="Edit Route" size="medium" onClick={props.swapPreview} />;
    }

    // If on mobile, use a different button layout where users can only swap notes and tracker.
    if (useMatchMedia('(max-width: 600px)')) {
        let notesText = props.showNotes ? "Show Tracker" : "Show Notes";
        return (
            <div className={`card ${styles.menu}`}>
                <Button text="Reset Tracker" size="medium" onClick={props.resetTracker} />
                <Button text={notesText} size="medium" onClick={props.swapNotesAndTracker} />
                <Button text={modeText} size="large" onClick={props.changeMode} />
                {previewButton}
            </div>
        );
    } else {
        let showNotesText = props.showNotes ? "Hide Notes" : "Show Notes";
        let showTrackerText = props.showTracker ? "Hide Tracker" : "Show Tracker";

        return (
            <div className={`card ${styles.menu}`}>
                <Button text="Reset Tracker" size="medium" onClick={props.resetTracker} />
                <Button text={showNotesText} size="medium" onClick={props.updateNotesDisplay} />
                <Button text={showTrackerText} size="medium" onClick={props.updateTrackerDisplay} />
                <Button text={modeText} size="large" onClick={props.changeMode} />
                {previewButton}
            </div>
        );
    }
}

export default Menu;