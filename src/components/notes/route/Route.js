import React from 'react';
import styles from './styles/Route.Module.css';
import Menu from './Menu';
import Notes from './notes/Notes';
import Tracker from './tracker/Tracker';

class Route extends React.Component {
    constructor(props) {
        super(props);

        let path = props.match.params.routePath;

        let notes = require('../../../notes/' + path + '.json');
        let Items = require('../../../resources/' + notes.game + '/ItemNames.json');

        let initialFoundItems = JSON.parse(localStorage.getItem("foundItems-" + notes.game));
        if (initialFoundItems == null || initialFoundItems.length === 0) {
            initialFoundItems = JSON.parse(JSON.stringify(require('../../../resources/' + notes.game + '/DefaultFoundItems.json')));
        }

        let initialFoundModifiers = JSON.parse(localStorage.getItem("foundModifiers-" + notes.game))
        if (Items.modifiers && initialFoundModifiers == null) {
            initialFoundModifiers = JSON.parse(JSON.stringify(require('../../../resources/' + notes.game + '/DefaultFoundModifiers.json')));
        }

        this.state = {
            showNotes: true,
            showTracker: true,
            mode: "list",
            foundItems: initialFoundItems,
            foundModifiers: initialFoundModifiers,
            notes: notes
        }

        this.changeMode = this.changeMode.bind(this);
        this.updateTracker = this.updateTracker.bind(this);
        this.resetTracker = this.resetTracker.bind(this);
        this.updateNotesDisplay = this.updateNotesDisplay.bind(this);
        this.updateTrackerDisplay = this.updateTrackerDisplay.bind(this);
    }

    changeMode () {
        if (this.state.mode === "list") {
            this.setState({
                mode: "presenter"
            })
        } else if (this.state.mode === "presenter") {
            this.setState({
                mode: "list"
            })
        }
    }

    updateTracker(id, modifier) {
        let newFoundItems = this.state.foundItems;
        let newFoundModifiers = this.state.foundModifiers;
        if (modifier == null) {
            if (newFoundItems.includes(id)) {
                newFoundItems.splice(newFoundItems.indexOf(id), 1);
                if (newFoundModifiers != null) {
                    newFoundModifiers[id] = [];
                }
            } else {
                newFoundItems.push(id);
            }
        } else {
            if (newFoundModifiers[id].includes(modifier)) {
                newFoundModifiers[id].splice(newFoundModifiers[id].indexOf(modifier), 1);
                if (newFoundModifiers[id].length === 0) {
                    newFoundItems.splice(newFoundItems.indexOf(id), 1);
                }
            } else {
                newFoundModifiers[id].push(modifier);
                if (!newFoundItems.includes(id)) {
                    newFoundItems.push(id);
                }
            }
        }

        this.setState({
            foundItems: newFoundItems
        });

        localStorage.setItem("foundItems-" + this.state.notes.game, JSON.stringify(newFoundItems));
        localStorage.setItem("foundModifiers-" + this.state.notes.game, JSON.stringify(newFoundModifiers));
    }

    resetTracker() {
        const newFoundItems = JSON.parse(JSON.stringify(require('../../../resources/' + this.state.notes.game + '/DefaultFoundItems.json')));
        let newFoundModifiers = this.state.foundModifiers;
        if (newFoundModifiers != null)  {
            newFoundModifiers = JSON.parse(JSON.stringify(require('../../../resources/' + this.state.notes.game + '/DefaultFoundModifiers.json')));
        }

        this.setState({
            foundItems: newFoundItems,
            foundModifiers: newFoundModifiers
        });

        localStorage.setItem("foundItems-" + this.state.notes.game, JSON.stringify(newFoundItems));
        localStorage.setItem("foundModifiers-" + this.state.notes.game, JSON.stringify(newFoundModifiers));
    }

    updateNotesDisplay() {
        this.setState({
            showNotes: !this.state.showNotes
        });
        console.log(this.state);
    }

    updateTrackerDisplay() {
        this.setState({
            showTracker: !this.state.showTracker
        });
        console.log(this.state);
    }

    render() {
        return (
            <div className={`${styles.wrapper}`}>
                <Menu
                    showNotes={this.state.showNotes}
                    showTracker={this.state.showTracker}
                    resetTracker={this.resetTracker}
                    mode={this.state.mode}
                    changeMode={this.changeMode}
                    updateNotesDisplay={this.updateNotesDisplay}
                    updateTrackerDisplay={this.updateTrackerDisplay}
                />
                <Notes
                    display={this.state.showNotes}
                    fullSize={!this.state.showTracker}
                    mode={this.state.mode}
                    notes={this.state.notes}
                    foundItems={this.state.foundItems}
                    foundModifiers={this.state.foundModifiers}
                    updateTracker={this.updateTracker}
                />

                <Tracker
                    display={this.state.showTracker}
                    fullSize={!this.state.showNotes}
                    game={this.state.notes.game}
                    foundItems={this.state.foundItems}
                    foundModifiers={this.state.foundModifiers}
                    updateTracker={this.updateTracker}
                />
            </div>
        );
    }
}

export default Route;