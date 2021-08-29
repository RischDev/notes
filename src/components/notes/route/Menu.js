import React from 'react';
import styles from "./styles/Menu.Module.css";
import Button from "../../common/Button";

class Menu extends React.Component {
    render() {
        let showNotesText = this.props.showNotes ? "Hide Notes" : "Show Notes";
        let showTrackerText = this.props.showTracker ? "Hide Tracker" : "Show Tracker";
        let modeText = this.props.mode === "presenter" ? "Swap to List Mode" : "Swap to Presenter Mode";

        return (
            <div className={`card ${styles.menu}`}>
                <Button text="Reset Tracker" size="medium" onClick={this.props.resetTracker} />
                <Button text={showNotesText} size="medium" onClick={this.props.updateNotesDisplay} />
                <Button text={showTrackerText} size="medium" onClick={this.props.updateTrackerDisplay} />
                <Button text={modeText} size="large" onClick={this.props.changeMode} />
            </div>
        );
    }
}

export default Menu;