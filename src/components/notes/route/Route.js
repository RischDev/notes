import { useState, useCallback, Suspense } from 'react';
import styles from './styles/Route.Module.css';
import Menu from './Menu';
import Notes from './notes/Notes';
import Tracker from './tracker/Tracker';
import useMatchMedia from '../../common/Functions';
import useSuspenseResource from '../../common/useSuspense';

function Route(props) {
    const path = props.match.params.routePath;
    const notesResource = useSuspenseResource(async () => {
        const response = await fetch(
            `${process.env.PUBLIC_URL}/notes/${path}.json`,
        );

        return await response.json();
    }, [path]);

    return (
        <Suspense fallback="Loading...">
            <RouteImpl {...props} notesResource={notesResource} />
        </Suspense>
    );
}

function RouteImpl(props) {
    const notes = props.notesResource.read();
    const Items = require('../../../resources/' + notes.game + '/ItemNames.json');

    let defaultMode = "list";
    let defaultTrackerDisplay = true;
    // If on mobile, swap to presenter mode by default, and hide the tracker
    if (useMatchMedia('(max-width: 600px)')) {
        defaultMode = "presenter";
        defaultTrackerDisplay = false;
    }

    const [showNotes, setShowNotes] = useState(true);
    const [showTracker, setShowTracker] = useState(defaultTrackerDisplay);
    const [mode, setMode] = useState(defaultMode);
    const [foundItems, setFoundItems] = useState(JSON.parse(localStorage.getItem("foundItems-" + notes.game)));
    const [foundModifiers, setFoundModifiers] = useState(JSON.parse(localStorage.getItem("foundModifiers-" + notes.game)));

    // Update foundItems and foundModifiers if nothing was in local storage
    if (foundItems == null || foundItems.length === 0) {
        setFoundItems(JSON.parse(JSON.stringify(require('../../../resources/' + notes.game + '/DefaultFoundItems.json'))));
    }

    if (Items.modifiers && foundModifiers == null) {
        setFoundModifiers(JSON.parse(JSON.stringify(require('../../../resources/' + notes.game + '/DefaultFoundModifiers.json'))));
    }

    const changeMode = useCallback(
        () => {
            setMode(prevMode => prevMode === "list" ? "presenter" : "list");
        },
        []
    );

    const updateTracker = useCallback(
        (id, modifier) => {
            console.log(id + " " + modifier);
            let newFoundItems = [...foundItems];
            let newFoundModifiers = foundModifiers !== null ? [...foundModifiers] : null;
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

            setFoundItems(newFoundItems);
            setFoundModifiers(newFoundModifiers);

            localStorage.setItem("foundItems-" + notes.game, JSON.stringify(newFoundItems));
            localStorage.setItem("foundModifiers-" + notes.game, JSON.stringify(newFoundModifiers));
        },
        [foundItems, foundModifiers, notes]
    );

    const resetTracker = useCallback(
        () => {
            let newFoundItems = JSON.parse(JSON.stringify(require('../../../resources/' + notes.game + '/DefaultFoundItems.json')));
            let newFoundModifiers = foundModifiers;
            if (newFoundModifiers != null)  {
                newFoundModifiers = JSON.parse(JSON.stringify(require('../../../resources/' + notes.game + '/DefaultFoundModifiers.json')));
            }

            setFoundItems(newFoundItems);
            setFoundModifiers(newFoundModifiers);

            localStorage.setItem("foundItems-" + notes.game, JSON.stringify(newFoundItems));
            localStorage.setItem("foundModifiers-" + notes.game, JSON.stringify(newFoundModifiers));
        },
        [foundModifiers, notes]
    );

    const updateNotesDisplay = useCallback(
        () => {
            setShowNotes(prevShowNotes => !prevShowNotes);
        },
        []
    );

    const updateTrackerDisplay = useCallback(
        () => {
            setShowTracker(prevShowTracker => !prevShowTracker);
        },
        []
    );

    const swapNotesAndTracker = useCallback(
        () => {
            setShowNotes(prevShowNotes => !prevShowNotes);
            setShowTracker(prevShowTracker => !prevShowTracker);
        },
        []
    );

    return (
        <div className={`${styles.wrapper}`}>
            <Menu
                showNotes={showNotes}
                showTracker={showTracker}
                resetTracker={resetTracker}
                mode={mode}
                changeMode={changeMode}
                updateNotesDisplay={updateNotesDisplay}
                updateTrackerDisplay={updateTrackerDisplay}
                swapNotesAndTracker={swapNotesAndTracker}
            />
            <Notes
                display={showNotes}
                fullSize={!showTracker}
                mode={mode}
                notes={notes}
                foundItems={foundItems}
                foundModifiers={foundModifiers}
                updateTracker={updateTracker}
            />

            <Tracker
                display={showTracker}
                fullSize={!showNotes}
                game={notes.game}
                foundItems={foundItems}
                foundModifiers={foundModifiers}
                updateTracker={updateTracker}
            />
        </div>
    );
}
/*
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
            mode: defaultMode,
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
*/

export default Route;
