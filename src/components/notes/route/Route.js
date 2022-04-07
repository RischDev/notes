/** @format */

import { useState, useCallback, useContext, Suspense } from 'react';
import styles from './styles/Route.Module.css';
import Menu from './Menu';
import Notes from './notes/Notes';
import Tracker from './tracker/Tracker';
import { useMatchMedia } from '../../common/Functions';
import RouteContext from '../../common/RouteContext';
import NotesContext from '../../common/NotesContext';
import useSuspenseResource from '../../common/useSuspense';

function Route(props) {
    let path = '';
    if (props.match != null) {
        path = props.match.params.routePath;
    }

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

const getInitialState = (notes, isMobile) => {
    let initialTrackerDisplay = true;
    let initialMode = "list";
    // If on mobile, swap to presenter mode by default and hide the tracker
    if (isMobile) {
        initialTrackerDisplay = false;
        initialMode = "presenter"
    }

    const Items = require('../../../resources/' + notes.game + '/ItemNames.json');

    let initialFoundItems = JSON.parse(localStorage.getItem("foundItems-" + notes.game));
    let initialFoundModifiers = JSON.parse(localStorage.getItem("foundModifiers-" + notes.game));

    // Update foundItems and foundModifiers if nothing was in local storage
    if (initialFoundItems == null || initialFoundItems.length === 0) {
        initialFoundItems = JSON.parse(JSON.stringify(require('../../../resources/' + notes.game + '/DefaultFoundItems.json')));
    }

    if (Items.modifiers && initialFoundModifiers == null) {
        initialFoundModifiers = JSON.parse(JSON.stringify(require('../../../resources/' + notes.game + '/DefaultFoundModifiers.json')));
    }

    return {
        notes: notes,
        showNotes: true,
        showTracker: initialTrackerDisplay,
        mode: initialMode,
        foundItems: initialFoundItems,
        foundModifiers: initialFoundModifiers,
        folderEditView: "Differences"
    }
}

function RouteImpl(props) {
    const routeContext = useContext(RouteContext);
    let notes;
    if (routeContext.route != null) {
        notes = routeContext.route;
    } else {
        notes = props.notesResource.read();
    }

    const [state, setState] = useState(getInitialState(notes, useMatchMedia('(max-width: 600px)')))

    const setContext = useCallback(
        updates => {
            setState({...state, ...updates});
        },
        [state, setState]
    );

    const getContextValue = useCallback(
        () => ({
            ...state,
            setContext
        }),
        [state, setContext]
    );

    const updateTracker = useCallback(
        (id, modifier) => {
            let newFoundItems = [...state.foundItems];
            let newFoundModifiers = state.foundModifiers !== null ? [...state.foundModifiers] : null;
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

            setState({ ...state, foundItems: newFoundItems, foundModifiers: newFoundModifiers });

            localStorage.setItem("foundItems-" + state.notes.game, JSON.stringify(newFoundItems));
            localStorage.setItem("foundModifiers-" + state.notes.game, JSON.stringify(newFoundModifiers));
        },
        [state, setState]
    );

    return (
        <div className={`${styles.wrapper}`}>
            <NotesContext.Provider value={getContextValue()}>
                <Menu preview={routeContext.preview} swapPreview={props.swapPreview} />
                <Notes  updateTracker={updateTracker} />
                <Tracker updateTracker={updateTracker} />
            </NotesContext.Provider>
        </div>
    );
}

export default Route;
