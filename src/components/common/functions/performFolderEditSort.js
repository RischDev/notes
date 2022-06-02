/** @format */

export default function performFolderEditSort(
    folder,
    sortType,
    reverse,
    gameInfo,
) {
    if (sortType === 'ID') {
        folder.sort((slot1, slot2) => {
            if (reverse) {
                if (slot1.item === slot2.item) {
                    return slot1.modifier > slot2.modifier ? 1 : -1;
                } else {
                    return slot1.item < slot2.item ? 1 : -1;
                }
            } else {
                if (slot1.item === slot2.item) {
                    return slot1.modifier > slot2.modifier ? 1 : -1;
                } else {
                    return slot1.item > slot2.item ? 1 : -1;
                }
            }
        });
    } else if (sortType === 'Alphabet') {
        folder.sort((slot1, slot2) => {
            if (reverse) {
                if (slot1.item === slot2.item) {
                    return slot1.modifier > slot2.modifier ? 1 : -1;
                } else {
                    return gameInfo.Items[slot1.item].name <
                        gameInfo.Items[slot2.item].name
                        ? 1
                        : -1;
                }
            } else {
                if (slot1.item === slot2.item) {
                    return slot1.modifier > slot2.modifier ? 1 : -1;
                } else {
                    return gameInfo.Items[slot1.item].name >
                        gameInfo.Items[slot2.item].name
                        ? 1
                        : -1;
                }
            }
        });
    } else if (sortType === 'Alphabet (JP)') {
        folder.sort((slot1, slot2) => {
            if (reverse) {
                if (slot1.item === slot2.item) {
                    return slot1.modifier > slot2.modifier ? 1 : -1;
                } else {
                    return gameInfo.Items[slot1.item].nameJP <
                        gameInfo.Items[slot2.item].nameJP
                        ? 1
                        : -1;
                }
            } else {
                if (slot1.item === slot2.item) {
                    return slot1.modifier > slot2.modifier ? 1 : -1;
                } else {
                    return gameInfo.Items[slot1.item].nameJP >
                        gameInfo.Items[slot2.item].nameJP
                        ? 1
                        : -1;
                }
            }
        });
    } else if (sortType === 'Code') {
        folder.sort((slot1, slot2) => {
            if (reverse) {
                if (slot1.modifier === slot2.modifier) {
                    return slot1.item > slot2.item ? 1 : -1;
                } else {
                    return slot1.modifier < slot2.modifier ? 1 : -1;
                }
            } else {
                if (slot1.modifier === slot2.modifier) {
                    return slot1.item > slot2.item ? 1 : -1;
                } else {
                    return slot1.modifier > slot2.modifier ? 1 : -1;
                }
            }
        });
    } else if (sortType === 'Attack') {
        folder.sort((slot1, slot2) => {
            if (reverse) {
                if (
                    gameInfo.Items[slot1.item].damageSort ===
                    gameInfo.Items[slot2.item].damageSort
                ) {
                    if (slot1.item === slot2.item) {
                        return slot1.modifier > slot2.modifier ? 1 : -1;
                    } else {
                        return slot1.item > slot2.item ? 1 : -1;
                    }
                } else {
                    return gameInfo.Items[slot1.item].damageSort >
                        gameInfo.Items[slot2.item].damageSort
                        ? 1
                        : -1;
                }
            } else {
                if (
                    gameInfo.Items[slot1.item].damageSort ===
                    gameInfo.Items[slot2.item].damageSort
                ) {
                    if (slot1.item === slot2.item) {
                        return slot1.modifier > slot2.modifier ? 1 : -1;
                    } else {
                        return slot1.item > slot2.item ? 1 : -1;
                    }
                } else {
                    return gameInfo.Items[slot1.item].damageSort <
                        gameInfo.Items[slot2.item].damageSort
                        ? 1
                        : -1;
                }
            }
        });
    } else if (sortType === 'Element') {
        folder.sort((slot1, slot2) => {
            if (reverse) {
                if (
                    gameInfo.elementOrder[
                        gameInfo.Items[slot1.item].element
                    ] ===
                    gameInfo.elementOrder[gameInfo.Items[slot2.item].element]
                ) {
                    if (slot1.item === slot2.item) {
                        return slot1.modifier > slot2.modifier ? 1 : -1;
                    } else {
                        return slot1.item > slot2.item ? 1 : -1;
                    }
                } else {
                    return gameInfo.elementOrder[
                        gameInfo.Items[slot1.item].element
                    ] <
                        gameInfo.elementOrder[
                            gameInfo.Items[slot2.item].element
                        ]
                        ? 1
                        : -1;
                }
            } else {
                if (
                    gameInfo.elementOrder[
                        gameInfo.Items[slot1.item].element
                    ] ===
                    gameInfo.elementOrder[gameInfo.Items[slot2.item].element]
                ) {
                    if (slot1.item === slot2.item) {
                        return slot1.modifier > slot2.modifier ? 1 : -1;
                    } else {
                        return slot1.item > slot2.item ? 1 : -1;
                    }
                } else {
                    return gameInfo.elementOrder[
                        gameInfo.Items[slot1.item].element
                    ] >
                        gameInfo.elementOrder[
                            gameInfo.Items[slot2.item].element
                        ]
                        ? 1
                        : -1;
                }
            }
        });
    } else if (sortType === 'Quantity') {
        // Count number of each item in the folder
        const counts = {};
        for (const slot of folder) {
            if (counts[slot.item]) {
                counts[slot.item][slot.modifier] = counts[slot.item][
                    slot.modifier
                ]
                    ? counts[slot.item][slot.modifier] + 1
                    : 1;
            } else {
                counts[slot.item] = {};
                counts[slot.item][slot.modifier] = 1;
            }
        }

        folder.sort((slot1, slot2) => {
            if (reverse) {
                if (
                    counts[slot1.item][slot1.modifier] ===
                    counts[slot2.item][slot2.modifier]
                ) {
                    if (slot1.item === slot2.item) {
                        return slot1.modifier > slot2.modifier ? 1 : -1;
                    } else {
                        return slot1.item > slot2.item ? 1 : -1;
                    }
                } else {
                    return counts[slot1.item][slot1.modifier] >
                        counts[slot2.item][slot2.modifier]
                        ? 1
                        : -1;
                }
            } else {
                if (
                    counts[slot1.item][slot1.modifier] ===
                    counts[slot2.item][slot2.modifier]
                ) {
                    if (slot1.item === slot2.item) {
                        return slot1.modifier > slot2.modifier ? 1 : -1;
                    } else {
                        return slot1.item > slot2.item ? 1 : -1;
                    }
                } else {
                    return counts[slot1.item][slot1.modifier] <
                        counts[slot2.item][slot2.modifier]
                        ? 1
                        : -1;
                }
            }
        });
    } else if (sortType === 'Capacity' || sortType === 'MB') {
        folder.sort((slot1, slot2) => {
            if (reverse) {
                if (
                    gameInfo.Items[slot1.item].capacity ===
                    gameInfo.Items[slot2.item].capacity
                ) {
                    if (slot1.item === slot2.item) {
                        return slot1.modifier > slot2.modifier ? 1 : -1;
                    } else {
                        return slot1.item > slot2.item ? 1 : -1;
                    }
                } else {
                    return gameInfo.Items[slot1.item].capacity <
                        gameInfo.Items[slot2.item].capacity
                        ? 1
                        : -1;
                }
            } else {
                if (
                    gameInfo.Items[slot1.item].capacity ===
                    gameInfo.Items[slot2.item].capacity
                ) {
                    if (slot1.item === slot2.item) {
                        return slot1.modifier > slot2.modifier ? 1 : -1;
                    } else {
                        return slot1.item > slot2.item ? 1 : -1;
                    }
                } else {
                    return gameInfo.Items[slot1.item].capacity >
                        gameInfo.Items[slot2.item].capacity
                        ? 1
                        : -1;
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
