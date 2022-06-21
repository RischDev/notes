/** @format */

import performFolderEditSort from './performFolderEditSort';

export default function performFolderEditAction(folder, action, gameInfo) {
    const newFolder = JSON.parse(JSON.stringify(folder));

    if (action.item1 !== -1) {
        if (action.action === 'Remove') {
            newFolder[action.item1].item = -1;
            newFolder[action.item1].modifier = null;
        } else if (action.action === 'Add') {
            for (const item of folder) {
                if (item.item === -1) {
                    newFolder[item.slot].item = action.item1;
                    newFolder[item.slot].modifier = action.modifier1;
                    break;
                }
            }
        } else if (action.action === 'Swap') {
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
        } else if (action.action === 'Replace') {
            if (action.item2 !== -1) {
                newFolder[action.item1].item = action.item2;
                newFolder[action.item1].modifier = action.modifier2;
            }
        } else if (action.action === 'Reg' || action.action === 'Default') {
            // Unreg everything else
            for (let i = 0; i < newFolder.length; i++) {
                newFolder[i].regged = false;
            }
            newFolder[action.item1].regged = true;
        } else if (action.action === 'Tag') {
            // Tag only does something if 2 items are selected.
            if (action.item1 !== -1 && action.item2 !== -1) {
                // Untag everything else
                for (let i = 0; i < newFolder.length; i++) {
                    newFolder[i].tagged = false;
                }
                // Mark items as tagged first. Then, move items around to put them next to each other.
                newFolder[action.item1].tagged = true;
                newFolder[action.item2].tagged = true;

                // Whichever item is picked first goes on top. However, if item1 is above item2 in the folder, item1 will not
                // move. But if item 2 is above item1, item1 moves up one slot because of item2 moving below.
                if (parseInt(action.item1) < parseInt(action.item2)) {
                    for (
                        let i = parseInt(action.item2);
                        i > parseInt(action.item1) + 1;
                        i--
                    ) {
                        let tempItem = newFolder[i];
                        newFolder[i] = newFolder[i - 1];
                        newFolder[i].slot = newFolder[i].slot + 1;
                        newFolder[i - 1] = tempItem;
                        newFolder[i - 1].slot = newFolder[i - 1].slot - 1;
                    }
                } else {
                    for (
                        let i = parseInt(action.item2);
                        i < parseInt(action.item1);
                        i++
                    ) {
                        let tempItem = newFolder[i];
                        newFolder[i] = newFolder[i + 1];
                        newFolder[i].slot = newFolder[i].slot - 1;
                        newFolder[i + 1] = tempItem;
                        newFolder[i + 1].slot = newFolder[i + 1].slot + 1;
                    }
                }
            }
        } else if (action.action === 'Sort') {
            performFolderEditSort(
                newFolder,
                action.item1,
                action.item2,
                gameInfo,
            );
        }
        // TODO: Implement Favorites
    }

    return newFolder;
}
