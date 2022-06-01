export default function getPathsToSlot(game, cursor, cursorPosition, goal) {
    const gameInfo = require('../../../resources/' + game + '/ItemNames.json');
    const pathsToSlot = [{
        path: "",
        cursor: cursor,
        cursorPosition: cursorPosition
    }];

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