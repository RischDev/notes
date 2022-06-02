/** @format */

import performFolderEditAction from './performFolderEditAction';

export default function getNewFolder(folderEdit, folder, gameInfo) {
    let newFolder = JSON.parse(JSON.stringify(folder));
    for (const action of folderEdit.value) {
        newFolder = performFolderEditAction(newFolder, action, gameInfo);
    }

    return newFolder;
}
