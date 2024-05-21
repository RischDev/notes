/** @format */

import { useState, useCallback, useMemo, Suspense } from 'react';
import styles from './styles/RouteForm.module.css';
import Route from '../route/Route';
import SectionList from './SectionList';
import RouteInfo from './RouteInfo';
import useSuspenseResource from '../../common/functions/useSuspense';
import RouteContext from '../../common/RouteContext';
import GameContext from '../../common/GameContext';

const equal = require('deep-equal');

function RouteForm(props) {
    const path = props.match.params.path;

    const notesResource = useSuspenseResource(async () => {
        const response = await fetch(
            `${process.env.PUBLIC_URL}/notes/${path}.json`,
        );

        return await response.json();
    }, [path]);

    return (
        <Suspense fallback="Loading...">
            <RouteFormImpl {...props} notesResource={notesResource} />
        </Suspense>
    );
}

const getInitialState = (path, game, route) => {
    // If no game is specified, try setting the game based on the initial route object.
    if (game == null) {
        game = route.game;
    }

    let gameInfo = require('../../../resources/ItemNames.json');
    if (game !== '' && game != null) {
        gameInfo = require('../../../resources/' + game + '/ItemNames.json');
    }

    // If initial state is different, the state variables need to be updated in the route.
    if (
        route.game != null &&
        !equal(route.initialState, gameInfo.initialState)
    ) {
        route.initialState = gameInfo.initialState;

        // Update state variables in each section to add new keys.
        for (const section of route.sections) {
            if (section.state) {
                for (let key of gameInfo.initialState.keys) {
                    if (!section.state.keys.includes(key)) {
                        section.state[key] = gameInfo.initialState[key];
                    }
                }

                section.state.keys = gameInfo.initialState.keys;
            }
        }
    }

    return {
        route: {
            title: path != null ? route.title : '',
            path: path,
            game: path != null ? route.game : game,
            version: path != null ? route.version : '1.0',
            initialState: game != null ? gameInfo.initialState : {},
            initialFolderEdit: game != null ? gameInfo.initialFolderEdit : {},
            sections:
                path != null
                    ? route.sections
                    : [
                          {
                              id: 0,
                              text: [],
                              items: [],
                          },
                      ],
        },
        gameInfo: gameInfo,
        preview: false,
        numSections: path != null ? Math.min(10, route.sections.length) : 1,
    };
};

function RouteFormImpl(props) {
    let initialPath = props.match.params.path;
    let initialGame = props.match.params.gameId;
    let initialRoute = {};
    if (initialPath != null) {
        initialRoute = props.notesResource.read();
    }

    const [state, setState] = useState(
        getInitialState(initialPath, initialGame, initialRoute),
    );
    const gameContext = useMemo(() => {
        return state.gameInfo;
    }, [state.gameInfo]);

    const setContext = useCallback(
        (updates) => {
            setState({ ...state, ...updates });
        },
        [state, setState],
    );

    const getContextValue = useCallback(
        () => ({
            ...state,
            setContext,
        }),
        [state, setContext],
    );

    const setNewRoute = (newRoute) => {
        newRoute.preview = false;
        newRoute.numSections = Math.min(10, newRoute.sections.length);

        // If initial state is different, the state variables need to be updated
        if (!equal(newRoute.initialState, state.gameInfo.initialState)) {
            newRoute.initialState = state.gameInfo.initialState;

            // Update state variables in each section to add new keys.
            for (const section of newRoute.sections) {
                if (section.state) {
                    for (let key of state.gameInfo.initialState.keys) {
                        if (!section.state.keys.includes(key)) {
                            section.state[key] =
                                state.gameInfo.initialState[key];
                        }
                    }

                    section.state.keys = state.gameInfo.initialState.keys;
                }
            }
        }

        setState({ ...state, route: newRoute });
    };

    const loadLastRouteEdit = (e) => {
        e.preventDefault();

        let newRoute = JSON.parse(localStorage.getItem('lastRouteEdit'));

        if (newRoute != null) {
            setNewRoute(newRoute);
        } else {
            alert(
                'Error: No route found in local storage. Either there is nothing to load, or your route may have been too large. When your route gets large, try downloading the JSON file periodically to save your progress.',
            );
        }
    };

    const swapPreview = () => {
        setState((prevState) => ({
            ...state,
            preview: !prevState.preview,
        }));
    };

    if (state.preview) {
        return (
            <div>
                <RouteContext.Provider value={getContextValue()}>
                    <Route swapPreview={swapPreview} />
                </RouteContext.Provider>
            </div>
        );
    } else {
        return (
            <form className={`${styles.wrapper} ${styles.form}`}>
                <RouteContext.Provider value={getContextValue()}>
                    <GameContext.Provider value={gameContext}>
                        <RouteInfo
                            loadLastRouteEdit={loadLastRouteEdit}
                            swapPreview={swapPreview}
                        />

                        <SectionList sections={state.route.sections} />
                    </GameContext.Provider>
                </RouteContext.Provider>
            </form>
        );
    }
}

export default RouteForm;
