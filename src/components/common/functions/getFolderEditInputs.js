import getPathsToSlot from './getPathsToSlot';

function getNumInputs(inputs) {
    let count = 0;
    for (const action of inputs) {
        if (action != null ) {
            const actionInputs = action.split(" ");
            for (const input of actionInputs) {
                if (input === "V" || input === "^" || input === "<" || input === ">" || input === "A" || input === "Start" || input === "Select") {
                    count = count + 1;
                }
            }
        }
    }

    return count;
}

export default function getFolderEditInputs(folderEdit, game, actionIndex = 0, cursor = 0, cursorPosition = 0, sortCursor = 0, state = "folder") {
    // If actionIndex equals the length of the folder edit, there are no more actions to test. Return an empty list.
    if (actionIndex === folderEdit.length) {
        return [];
    }
    const gameInfo = require('../../../resources/' + game + '/ItemNames.json');
    const action = folderEdit[actionIndex];

    let inputs = new Array(folderEdit.length);
    let actionInputs = "";
    if (action.item1 !== -1) {
        if (action.action === "Remove") {
            if (state === "pack") {
                actionInputs = actionInputs + "< ";
                state = "folder";
            }

            const paths = getPathsToSlot(game, cursor, cursorPosition, action.item1);
            // If multiple paths returned, we need to test which one works better with the rest of the edit.
            if (paths.length > 1) {
                let bestInputs = Number.MAX_VALUE;
                let bestPath = {}
                for (const path of paths) {
                    const tempInputs = getFolderEditInputs(folderEdit, game, actionIndex + 1, path.cursor, path.cursorPosition, sortCursor, state);
                    if (bestInputs > getNumInputs(tempInputs)) {
                        bestInputs = getNumInputs(tempInputs);
                        bestPath = path;
                        inputs = tempInputs;
                    }
                }
                actionInputs = actionInputs + bestPath.path + "A A ";
            } else {
                actionInputs = actionInputs + paths[0].path + "A A ";
                inputs = getFolderEditInputs(folderEdit, game, actionIndex + 1, paths[0].cursor, paths[0].cursorPosition, sortCursor, state);
            }
            inputs[actionIndex] = actionInputs;
        } else if (action.action === "Add") {
            if (state === "folder") {
                actionInputs = actionInputs + "> ";
                state = "pack";
            }

            actionInputs = actionInputs + "(Press A A on " + gameInfo.Items[action.item1].name + " " + action.modifier1 + ")";
            inputs = getFolderEditInputs(folderEdit, game, actionIndex + 1, cursor, cursorPosition, sortCursor, state);
            inputs[actionIndex] = actionInputs;
        } else if (action.action === "Swap") {
            if (state === "pack") {
                actionInputs = actionInputs + "< ";
                state = "folder";
            }

            const pathsToFirstItem = getPathsToSlot(game, cursor, cursorPosition, action.item1);
            // If multiple paths returned, we need to test which one works better with the rest of the edit.
            if (pathsToFirstItem.length > 1) {
                let bestInputs = Number.MAX_VALUE;
                let bestPath1 = {}
                let bestPath2 = {}
                console.log(pathsToFirstItem);
                for (const path of pathsToFirstItem) {
                    const pathsToSecondItem = getPathsToSlot(game, path.cursor, path.cursorPosition, action.item2);
                    if (pathsToSecondItem.length > 1) {
                        for (const path2 of pathsToSecondItem) {
                            const tempInputs = getFolderEditInputs(folderEdit, game, actionIndex + 1, path2.cursor, path2.cursorPosition, sortCursor, state);
                            tempInputs[actionIndex] = actionInputs + path.path + "A " + path2.path + "A ";

                            console.log(getNumInputs(tempInputs));
                            if (bestInputs > getNumInputs(tempInputs)) {
                                bestInputs = getNumInputs(tempInputs);
                                bestPath1 = path;
                                bestPath2 = path2;
                                inputs = tempInputs;
                            }
                        }
                    } else {
                        const tempInputs = getFolderEditInputs(folderEdit, game, actionIndex + 1, pathsToSecondItem[0].cursor, pathsToSecondItem[0].cursorPosition, sortCursor, state);

                        console.log(bestInputs);
                        console.log(bestInputs > getNumInputs(tempInputs));
                        if (bestInputs > getNumInputs(tempInputs)) {
                            bestInputs = getNumInputs(tempInputs);
                            bestPath1 = path;
                            bestPath2 = pathsToSecondItem[0];
                            inputs = tempInputs;
                        }
                    }
                }
                actionInputs = actionInputs + bestPath1.path + "A " + bestPath2.path + "A ";
            } else {
                actionInputs = actionInputs + pathsToFirstItem[0].path + "A ";

                const pathsToSecondItem = getPathsToSlot(game, pathsToFirstItem[0].cursor, pathsToFirstItem[0].cursorPosition, action.item2);
                if (pathsToSecondItem.length > 1) {
                    let bestInputs = Number.MAX_VALUE;
                    let bestPath = {}
                    for (const path of pathsToSecondItem) {
                        const tempInputs = getFolderEditInputs(folderEdit, game, actionIndex + 1, path.cursor, path.cursorPosition, sortCursor, state);

                        if (bestInputs > getNumInputs(tempInputs)) {
                            bestInputs = getNumInputs(tempInputs);
                            bestPath = path;
                            inputs = tempInputs;
                        }
                    }
                    actionInputs = actionInputs + bestPath.path + "A ";
                } else {
                    actionInputs = actionInputs + pathsToSecondItem[0].path + "A ";

                    inputs = getFolderEditInputs(folderEdit, game, actionIndex + 1, pathsToSecondItem[0].cursor, pathsToSecondItem[0].cursorPosition, sortCursor, state);
                }
            }
            inputs[actionIndex] = actionInputs;
        } else if (action.action === "Replace") {
            // If in folder, find the chip to be replaced, swap to pack, and select the new chip
            // If in pack, find the new chip, swap to folder, and select the chip to be replaced.
            if (state === "folder") {
                state = "pack";
                const paths = getPathsToSlot(game, cursor, cursorPosition, action.item1);
                // If multiple paths returned, we need to test which one works better with the rest of the edit.
                if (paths.length > 1) {
                    let bestInputs = Number.MAX_VALUE;
                    let bestPath = {}
                    for (const path of paths) {
                        const tempInputs = getFolderEditInputs(folderEdit, game, actionIndex + 1, path.cursor, path.cursorPosition, sortCursor, state);
                        if (bestInputs > getNumInputs(tempInputs)) {
                            bestInputs = getNumInputs(tempInputs);
                            bestPath = path;
                            inputs = tempInputs;
                        }
                    }
                    actionInputs = actionInputs + bestPath.path + "A ";
                } else {
                    actionInputs = actionInputs + paths[0].path + "A ";
                    inputs = getFolderEditInputs(folderEdit, game, actionIndex + 1, paths[0].cursor, paths[0].cursorPosition, sortCursor, state);
                }

                actionInputs = actionInputs + "> (Press A on " + gameInfo.Items[action.item2].name + " " + action.modifier2 + ") ";
            } else if (state === "pack") {
                state = "folder";
                actionInputs = actionInputs + "(Press A on " + gameInfo.Items[action.item2].name + " " + action.modifier2 + ") < ";

                const paths = getPathsToSlot(game, cursor, cursorPosition, action.item1);
                // If multiple paths returned, we need to test which one works better with the rest of the edit.
                if (paths.length > 1) {
                    let bestInputs = Number.MAX_VALUE;
                    let bestPath = {}
                    for (const path of paths) {
                        const tempInputs = getFolderEditInputs(folderEdit, game, actionIndex + 1, path.cursor, path.cursorPosition, sortCursor, state);
                        if (bestInputs > getNumInputs(tempInputs)) {
                            bestInputs = getNumInputs(tempInputs);
                            bestPath = path;
                            inputs = tempInputs;
                        }
                    }
                    actionInputs = actionInputs + bestPath.path + "A ";
                } else {
                    actionInputs = actionInputs + paths[0].path + "A ";
                    inputs = getFolderEditInputs(folderEdit, game, actionIndex + 1, paths[0].cursor, paths[0].cursorPosition, sortCursor, state);
                }
            }

            inputs[actionIndex] = actionInputs;
        } else if (action.action === "Reg" || action.action === "Default") {
            if (state === "pack") {
                actionInputs = actionInputs + "< ";
                state = "folder";
            }

            const paths = getPathsToSlot(game, cursor, cursorPosition, action.item1);
            // If multiple paths returned, we need to test which one works better with the rest of the edit.
            if (paths.length > 1) {
                let bestInputs = Number.MAX_VALUE;
                let bestPath = {}
                for (const path of paths) {
                    const tempInputs = getFolderEditInputs(folderEdit, game, actionIndex + 1, path.cursor, path.cursorPosition, sortCursor, state);
                    if (bestInputs > getNumInputs(tempInputs)) {
                        bestInputs = getNumInputs(tempInputs);
                        bestPath = path;
                        inputs = tempInputs;
                    }
                }
                // BN6 requires extra inputs after Select. SF3 is instead Y.
                if (game === "MMBN6") {
                    actionInputs = actionInputs + bestPath.path + "Select ";
                } else if (game === "MMSF3") {
                    actionInputs = actionInputs + bestPath.path + "Y ";
                } else {
                    actionInputs = actionInputs + bestPath.path + "Select ";
                }
            } else {
                // BN6 requires extra inputs after Select. SF3 is instead Y.
                if (game === "MMBN6") {
                    actionInputs = actionInputs + paths[0].path + "Select A (advance text) A";
                } else if (game === "MMSF3") {
                    actionInputs = actionInputs + paths[0].path + "Y ";
                } else {
                    actionInputs = actionInputs + paths[0].path + "Select ";
                }
                inputs = getFolderEditInputs(folderEdit, game, actionIndex + 1, paths[0].cursor, paths[0].cursorPosition, sortCursor, state);
            }
            inputs[actionIndex] = actionInputs;
        } else if (action.action === "Sort") {
            if (state === "pack") {
                actionInputs = actionInputs + "< ";
                state = "folder";
            }

            actionInputs = actionInputs + "Start ";

            const sortTypes = [...gameInfo.sortTypes];
            // We need to remove one of the Alphabet sorts from the list, since the game can only sort by one Alphabet.
            if (action.item1 === "Alphabet (JP)") {
                sortTypes.splice(sortTypes.indexOf("Alphabet"), 1);
            } else {
                sortTypes.splice(sortTypes.indexOf("Alphabet (JP)"), 1);
            }

            // If the distance between the cursor and the desired sort is less than half the number of possible
            // sorts, go directly to it. Otherwise, wrap around.
            const numInputs = sortCursor - sortTypes.indexOf(action.item1);
            if (Math.abs(numInputs) <= (sortTypes.length / 2)) {
                // If positive difference, go up. Otherwise, go down.
                if (Math.sign(numInputs) > 0) {
                    for (let i = 0; i < Math.abs(numInputs); i++) {
                        actionInputs = actionInputs + "^ ";
                    }
                } else if (Math.sign(numInputs) < 0) {
                    for (let i = 0; i < Math.abs(numInputs); i++) {
                        actionInputs = actionInputs + "V ";
                    }
                }
            } else {
                const inverseInputs = sortTypes.length - Math.abs(numInputs)
                // If positive difference, go down. Otherwise, go up. (Opposite of other situation).
                if (Math.sign(numInputs) > 0) {
                    for (let i = 0; i < Math.abs(inverseInputs); i++) {
                        actionInputs = actionInputs + "V ";
                    }
                } else if (Math.sign(numInputs) < 0) {
                    for (let i = 0; i < Math.abs(inverseInputs); i++) {
                        actionInputs = actionInputs + "^ ";
                    }
                }
            }
            actionInputs = actionInputs + "A ";
            // For reverse sorts, press A a 2nd time.
            if (action.item2) {
                actionInputs = actionInputs + "A ";
            }
            actionInputs = actionInputs + "B ";
            inputs = getFolderEditInputs(folderEdit, game, actionIndex + 1, cursor, cursorPosition, sortTypes.indexOf(action.item1), state);
            inputs[actionIndex] = actionInputs;
        } else if (action.action === "Tag") {
            if (state === "pack") {
                actionInputs = actionInputs + "< ";
                state = "folder";
            }
            actionInputs = actionInputs + "Select V A (advance text) "

            const pathsToFirstItem = getPathsToSlot(game, cursor, cursorPosition, action.item1);
            // If multiple paths returned, we need to test which one works better with the rest of the edit.
            if (pathsToFirstItem.length > 1) {
                let bestInputs = Number.MAX_VALUE;
                let bestPath1 = {}
                let bestPath2 = {}
                console.log(pathsToFirstItem);
                for (const path of pathsToFirstItem) {
                    const pathsToSecondItem = getPathsToSlot(game, path.cursor, path.cursorPosition, action.item2);
                    if (pathsToSecondItem.length > 1) {
                        for (const path2 of pathsToSecondItem) {
                            const tempInputs = getFolderEditInputs(folderEdit, game, actionIndex + 1, path2.cursor, path2.cursorPosition, sortCursor, state);
                            tempInputs[actionIndex] = actionInputs + path.path + "A " + path2.path + "A ";

                            console.log(getNumInputs(tempInputs));
                            if (bestInputs > getNumInputs(tempInputs)) {
                                bestInputs = getNumInputs(tempInputs);
                                bestPath1 = path;
                                bestPath2 = path2;
                                inputs = tempInputs;
                            }
                        }
                    } else {
                        const tempInputs = getFolderEditInputs(folderEdit, game, actionIndex + 1, pathsToSecondItem[0].cursor, pathsToSecondItem[0].cursorPosition, sortCursor, state);

                        console.log(bestInputs);
                        console.log(bestInputs > getNumInputs(tempInputs));
                        if (bestInputs > getNumInputs(tempInputs)) {
                            bestInputs = getNumInputs(tempInputs);
                            bestPath1 = path;
                            bestPath2 = pathsToSecondItem[0];
                            inputs = tempInputs;
                        }
                    }
                }
                actionInputs = actionInputs + bestPath1.path + "A (advance text) " + bestPath2.path + "A ";
            } else {
                actionInputs = actionInputs + pathsToFirstItem[0].path + "A (advance text) ";

                const pathsToSecondItem = getPathsToSlot(game, pathsToFirstItem[0].cursor, pathsToFirstItem[0].cursorPosition, action.item2);
                if (pathsToSecondItem.length > 1) {
                    let bestInputs = Number.MAX_VALUE;
                    let bestPath = {}
                    for (const path of pathsToSecondItem) {
                        const tempInputs = getFolderEditInputs(folderEdit, game, actionIndex + 1, path.cursor, path.cursorPosition, sortCursor, state);

                        if (bestInputs > getNumInputs(tempInputs)) {
                            bestInputs = getNumInputs(tempInputs);
                            bestPath = path;
                            inputs = tempInputs;
                        }
                    }
                    actionInputs = actionInputs + bestPath.path + "A ";
                } else {
                    actionInputs = actionInputs + pathsToSecondItem[0].path + "A ";

                    inputs = getFolderEditInputs(folderEdit, game, actionIndex + 1, pathsToSecondItem[0].cursor, pathsToSecondItem[0].cursorPosition, sortCursor, state);
                }
            }
            inputs[actionIndex] = actionInputs;
        } else if (action.action === "Favorite") {
            // Currently ignoring Favorite, as the inputs are different between SF1 and 2, and is not currently
            // super important to optimizing folder edits.
            // TODO: Implement Favorites
        }
        return inputs;
    } else {
        // Return an empty list of inputs if item1 is invalid.
        return [];
    }
}
