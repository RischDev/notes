/** @format */

import { useState, useEffect } from 'react';

/**
 * Example:
 *
 * const isSmallScreen = useMatchMedia('(max-width: 600px)');
 */
export function useMatchMedia(query) {
    const [matches, setMatches] = useState(
        () => window.matchMedia(query).matches,
    );

    useEffect(() => {
        const mediaQueryList = window.matchMedia(query);
        const callback = (e) => setMatches(e.matches);

        mediaQueryList.addListener(callback);
        return function cleanup() {
            mediaQueryList.removeListener(callback);
        };
    }, [query, setMatches]);

    return matches;
}

function performFolderEditSort(folder, sortType, reverse, gameInfo) {
    if (sortType === "ID") {
        folder.sort((slot1, slot2) => {
            if (reverse) {
                if (slot1.item === slot2.item) {
                    return slot1.modifier > slot2.modifier ? 1 : -1;
                } else {
                    return slot1.item < slot2.item ? 1 : -1
                }
            } else {
                if (slot1.item === slot2.item) {
                    return slot1.modifier > slot2.modifier ? 1 : -1;
                } else {
                    return slot1.item > slot2.item ? 1 : -1
                }
            }
        });
    } else if (sortType === "Alphabet") {
        folder.sort((slot1, slot2) => {
            if (reverse) {
                if (slot1.item === slot2.item) {
                    return slot1.modifier > slot2.modifier ? 1 : -1;
                } else {
                    return gameInfo.Items[slot1.item].name < gameInfo.Items[slot2.item].name ? 1 : -1
                }
            } else {
                if (slot1.item === slot2.item) {
                    return slot1.modifier > slot2.modifier ? 1 : -1;
                } else {
                    return gameInfo.Items[slot1.item].name > gameInfo.Items[slot2.item].name ? 1 : -1
                }
            }
        });
    } else if (sortType === "Alphabet (JP)") {
        folder.sort((slot1, slot2) => {
            if (reverse) {
                if (slot1.item === slot2.item) {
                    return slot1.modifier > slot2.modifier ? 1 : -1;
                } else {
                    return gameInfo.Items[slot1.item].nameJP < gameInfo.Items[slot2.item].nameJP ? 1 : -1
                }
            } else {
                if (slot1.item === slot2.item) {
                    return slot1.modifier > slot2.modifier ? 1 : -1;
                } else {
                    return gameInfo.Items[slot1.item].nameJP > gameInfo.Items[slot2.item].nameJP ? 1 : -1
                }
            }
        });
    } else if (sortType === "Code") {
        folder.sort((slot1, slot2) => {
            if (reverse) {
                if (slot1.modifier === slot2.modifier) {
                    return slot1.item > slot2.item ? 1 : -1;
                } else {
                    return slot1.modifier < slot2.modifier ? 1 : -1
                }
            } else {
                if (slot1.modifier === slot2.modifier) {
                    return slot1.item > slot2.item ? 1 : -1;
                } else {
                    return slot1.modifier > slot2.modifier ? 1 : -1
                }
            }
        });
    } else if (sortType === "Attack") {
        folder.sort((slot1, slot2) => {
            if (reverse) {
                if (gameInfo.Items[slot1.item].damageSort === gameInfo.Items[slot2.item].damageSort) {
                    if (slot1.item === slot2.item) {
                        return slot1.modifier > slot2.modifier ? 1 : -1;
                    } else {
                        return slot1.item > slot2.item ? 1 : -1
                    }
                } else {
                    return gameInfo.Items[slot1.item].damageSort > gameInfo.Items[slot2.item].damageSort ? 1 : -1
                }
            } else {
                if (gameInfo.Items[slot1.item].damageSort === gameInfo.Items[slot2.item].damageSort) {
                    if (slot1.item === slot2.item) {
                        return slot1.modifier > slot2.modifier ? 1 : -1;
                    } else {
                        return slot1.item > slot2.item ? 1 : -1
                    }
                } else {
                    return gameInfo.Items[slot1.item].damageSort < gameInfo.Items[slot2.item].damageSort ? 1 : -1
                }
            }
        });
    } else if (sortType === "Element") {
        folder.sort((slot1, slot2) => {
            if (reverse) {
                if (gameInfo.elementOrder[gameInfo.Items[slot1.item].element] === gameInfo.elementOrder[gameInfo.Items[slot2.item].element]) {
                    if (slot1.item === slot2.item) {
                        return slot1.modifier > slot2.modifier ? 1 : -1;
                    } else {
                        return slot1.item > slot2.item ? 1 : -1
                    }
                } else {
                    return gameInfo.elementOrder[gameInfo.Items[slot1.item].element] < gameInfo.elementOrder[gameInfo.Items[slot2.item].element] ? 1 : -1
                }
            } else {
                if (gameInfo.elementOrder[gameInfo.Items[slot1.item].element] === gameInfo.elementOrder[gameInfo.Items[slot2.item].element]) {
                    if (slot1.item === slot2.item) {
                        return slot1.modifier > slot2.modifier ? 1 : -1;
                    } else {
                        return slot1.item > slot2.item ? 1 : -1
                    }
                } else {
                    return gameInfo.elementOrder[gameInfo.Items[slot1.item].element] > gameInfo.elementOrder[gameInfo.Items[slot2.item].element] ? 1 : -1
                }
            }
        });
    } else if (sortType === "Quantity") {
        // Count number of each item in the folder
        const counts = {}
        for (const slot of folder) {
            if (counts[slot.item]) {
                counts[slot.item][slot.modifier] = counts[slot.item][slot.modifier] ? counts[slot.item][slot.modifier] + 1 : 1;
            } else {
                counts[slot.item] = {};
                counts[slot.item][slot.modifier] = 1;
            }
        }

        folder.sort((slot1, slot2) => {
            if (reverse) {
                if (counts[slot1.item][slot1.modifier] === counts[slot2.item][slot2.modifier]) {
                    if (slot1.item === slot2.item) {
                        return slot1.modifier > slot2.modifier ? 1 : -1;
                    } else {
                        return slot1.item > slot2.item ? 1 : -1
                    }
                } else {
                    return counts[slot1.item][slot1.modifier] > counts[slot2.item][slot2.modifier] ? 1 : -1
                }
            } else {
                if (counts[slot1.item][slot1.modifier] === counts[slot2.item][slot2.modifier]) {
                    if (slot1.item === slot2.item) {
                        return slot1.modifier > slot2.modifier ? 1 : -1;
                    } else {
                        return slot1.item > slot2.item ? 1 : -1
                    }
                } else {
                    return counts[slot1.item][slot1.modifier] < counts[slot2.item][slot2.modifier] ? 1 : -1
                }
            }
        });
    } else if (sortType === "Capacity" || sortType === "MB") {
        folder.sort((slot1, slot2) => {
            if (reverse) {
                if (gameInfo.Items[slot1.item].capacity === gameInfo.Items[slot2.item].capacity) {
                    if (slot1.item === slot2.item) {
                        return slot1.modifier > slot2.modifier ? 1 : -1;
                    } else {
                        return slot1.item > slot2.item ? 1 : -1
                    }
                } else {
                    return gameInfo.Items[slot1.item].capacity < gameInfo.Items[slot2.item].capacity ? 1 : -1
                }
            } else {
                if (gameInfo.Items[slot1.item].capacity === gameInfo.Items[slot2.item].capacity) {
                    if (slot1.item === slot2.item) {
                        return slot1.modifier > slot2.modifier ? 1 : -1;
                    } else {
                        return slot1.item > slot2.item ? 1 : -1
                    }
                } else {
                    return gameInfo.Items[slot1.item].capacity > gameInfo.Items[slot2.item].capacity ? 1 : -1
                }
            }
        });
    }

    // Actually update the slots based on the new order
    let i = 0;
    for (const slot of folder) {
        slot.slot = i;
        i = i + 1;
    }
}

export function performFolderEditAction(folder, action, gameInfo) {
    const newFolder = JSON.parse(JSON.stringify(folder));

    if (action.item1 !== -1) {
        if (action.action === "Remove") {
            newFolder[action.item1].item = -1;
            newFolder[action.item1].modifier = null;
        } else if (action.action === "Add") {
            for (const item of folder) {
                if (item.item === -1) {
                    newFolder[item.slot].item = action.item1;
                    newFolder[item.slot].modifier = action.modifier1;
                    break;
                }
            }
        } else if (action.action === "Swap") {
            if (action.item2 !== -1) {
                const slot1 = newFolder[action.item1];
                const slot2 = newFolder[action.item2];

                // Swap the slots.
                slot1.slot = action.item2;
                slot2.slot = action.item1;

                //Swap positions in array
                newFolder[action.item1] = slot2;
                newFolder[action.item2] = slot1;
            }
        } else if (action.action === "Replace") {
            if (action.item2 !== -1) {
                newFolder[action.item1].item = action.item2;
                newFolder[action.item1].modifier = action.modifier2;
            }
        } else if (action.action === "Reg") {
            // Unreg everything else
            for (let i = 0; i < newFolder.length; i++) {
                newFolder[i].regged = false;
            }
            newFolder[action.item1].regged = true;
        } else if (action.action === "Sort") {
            performFolderEditSort(newFolder, action.item1, action.item2, gameInfo)
        }
    }

    return newFolder;
}

export function getNewFolder(folderEdit, folder, gameInfo) {
    let newFolder = JSON.parse(JSON.stringify(folder));
    for (const action of folderEdit.value) {
        newFolder = performFolderEditAction(newFolder, action, gameInfo);
    }

    return newFolder;
}

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

function getPathsToSlot(game, cursor, cursorPosition, goal) {
    const gameInfo = require('../../resources/' + game + '/ItemNames.json');
    const pathsToSlot = [{
        path: "",
        cursor: cursor,
        cursorPosition: cursorPosition
    }];

    console.log("Cursor: " + cursor);
    console.log("Goal: " + goal);

    for (const path of pathsToSlot) {
        let numInputs = 0;
        while (parseInt(path.cursor) !== parseInt(goal) && numInputs <= 100) {
            // If the difference is negative, we're moving the cursor down. If its positive, we're moving the cursor up.
            if (Math.sign(path.cursor - goal) === -1) {
                // Check if pressing R will get you closer to the slot
                if ((path.cursor - path.cursorPosition + (2 * gameInfo.itemsShown) - 1) <= 29
                    && (Math.abs((path.cursor + gameInfo.itemsShown) - goal) + 1) <= Math.abs(path.cursor - goal)) {
                    // If pressing R will be equal in inputs to pressing just down, create a new path to track with the R press, then move on with a down input.
                    if ((Math.abs((path.cursor + gameInfo.itemsShown) - goal) + 1) === Math.abs(path.cursor - goal)) {
                        pathsToSlot.push({
                            path: path.path + "R ",
                            cursor: path.cursor + gameInfo.itemsShown,
                            cursorPosition: path.cursorPosition
                        });
                        path.path = path.path + "V ";
                        path.cursor = path.cursor + 1;
                        path.cursorPosition = Math.min(path.cursorPosition + 1, gameInfo.itemsShown - 1);
                    } else {
                        path.path = path.path + "R ";
                        path.cursor = path.cursor + gameInfo.itemsShown;
                    }
                } else {
                    // Check if pressing R will get you closer to the slot in the situation that you're close to the bottom of the folder
                    if ((path.cursor - path.cursorPosition + (2 * gameInfo.itemsShown) - 1) > 29
                        && (Math.abs((30 - gameInfo.itemsShown + path.cursorPosition) - goal) + 1) <= Math.abs(path.cursor - goal)
                        && (path.cursor !== (30 - gameInfo.itemsShown + path.cursorPosition))) {
                        // If pressing R will be equal in inputs to pressing just down, create a new path to track with the R press, then move on with a down input.
                        if ((Math.abs((30 - gameInfo.itemsShown + path.cursorPosition) - goal) + 1) === Math.abs(path.cursor - goal)) {
                            pathsToSlot.push({
                                path: path.path + "R ",
                                cursor: (30 - gameInfo.itemsShown + path.cursorPosition),
                                cursorPosition: path.cursorPosition
                            });
                            path.path = path.path + "V ";
                            path.cursor = path.cursor + 1;
                            path.cursorPosition = Math.min(path.cursorPosition + 1, gameInfo.itemsShown - 1);
                        } else {
                            path.path = path.path + "R ";
                            path.cursor = (30 - gameInfo.itemsShown + path.cursorPosition);
                        }
                    } else {
                        // If we get here, pressing R will not be helpful, so just press down.
                        console.log("Attempting to move down once");
                        path.path = path.path + "V ";
                        path.cursor = path.cursor + 1;
                        path.cursorPosition = Math.min(path.cursorPosition + 1, gameInfo.itemsShown - 1);
                    }
                }
            } else if (Math.sign(path.cursor - goal) === 1) {
                // Check if pressing L will get you closer to the slot
                if ((path.cursor - path.cursorPosition - gameInfo.itemsShown) >= 0
                    && (Math.abs((path.cursor - gameInfo.itemsShown) - goal) + 1) <= Math.abs(path.cursor - goal)) {
                    // If pressing L will be equal in inputs to pressing just down, create a new path to track with the R press, then move on with a down input.
                    if ((Math.abs((path.cursor - gameInfo.itemsShown) - goal) + 1) === Math.abs(path.cursor - goal)) {
                        pathsToSlot.push({
                            path: path.path + "L ",
                            cursor: path.cursor - gameInfo.itemsShown,
                            cursorPosition: path.cursorPosition
                        });
                        path.path = path.path + "^ ";
                        path.cursor = path.cursor - 1;
                        path.cursorPosition = Math.max(path.cursorPosition - 1, 0);
                    } else {
                        path.path = path.path + "L ";
                        path.cursor = path.cursor - gameInfo.itemsShown;
                    }
                } else {
                    // Check if pressing L will get you closer to the slot in the situation that you're close to the bottom of the folder
                    if ((path.cursor - path.cursorPosition - gameInfo.itemsShown) < 0
                        && (Math.abs((path.cursorPosition) - goal) + 1) <= Math.abs(path.cursor - goal)
                        && (path.cursor !== cursorPosition)) {
                        // If pressing R will be equal in inputs to pressing just down, create a new path to track with the R press, then move on with a down input.
                        if ((Math.abs(path.cursorPosition - goal) + 1) <= Math.abs(path.cursor - goal)) {
                            pathsToSlot.push({
                                path: path.path + "L ",
                                cursor: 0 + path.cursorPosition,
                                cursorPosition: path.cursorPosition
                            });
                            path.path = path.path + "^ ";
                            path.cursor = path.cursor - 1;
                            path.cursorPosition = Math.max(path.cursorPosition - 1, 0);
                        } else {
                            path.path = path.path + "L ";
                            path.cursor = (0 + path.cursorPosition);
                        }
                    } else {
                        // If we get here, pressing R will not be helpful, so just press down.
                        path.path = path.path + "^ ";
                        path.cursor = path.cursor - 1;
                        path.cursorPosition = Math.max(path.cursorPosition - 1, 0);
                    }
                }
            }
            numInputs = numInputs + 1;
        }
        if (numInputs >= 100) {
            break;
        }
    }

    return pathsToSlot;
}

export function getFolderEditInputs(folderEdit, game, actionIndex = 0, cursor = 0, cursorPosition = 0, sortCursor = 0, state = "folder") {
    // If actionIndex equals the length of the folder edit, there are no more actions to test. Return an empty list.
    if (actionIndex === folderEdit.length) {
        return [];
    }
    const gameInfo = require('../../resources/' + game + '/ItemNames.json');
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
            console.log("Finding Swap action inputs");
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
            // TODO: BN6 and SF3 have different buttons to press to actually reg a chip/card
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
                if (game === "BN6") {
                    actionInputs = actionInputs + bestPath.path + "Select ";
                } else if (game === "SF3") {
                    actionInputs = actionInputs + bestPath.path + "Y ";
                } else {
                    actionInputs = actionInputs + bestPath.path + "Select ";
                }
                actionInputs = actionInputs + bestPath.path + "Select ";
            } else {
                actionInputs = actionInputs + paths[0].path + "Select ";
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
            console.log(action)
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
        } else if (action.action === "Favorite") {
            // Currently ignoring Favorite, as the inputs are different between SF1 and 2, and is not currently
            // super important to optimizing folder edits.
        }
        return inputs;
    } else {
        // Return an empty list of inputs if item1 is invalid.
        return [];
    }
}
