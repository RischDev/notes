import { useContext } from 'react';
import styles from './styles/FolderEdit.Module.css';
import NotesContext from '../../../common/NotesContext';
import { performFolderEditAction, getFolderEditInputs } from '../../../common/Functions';

function Action(props) {
    const {
        notes: {
            game
        }
    } = useContext(NotesContext);

    const gameInfo = require('../../../../resources/' + game + '/ItemNames.json');

    // Determine the text for the action based on the action type.
    let text = "";
    if (props.action.action === "Add") {
        text = "Add " + gameInfo.Items[props.action.item1].name + " " + props.action.modifier1;
    } else if (props.action.action === "Remove") {
        console.log(props.folder);
        text = "Remove slot " + (parseInt(props.action.item1) + 1) + " (" + gameInfo.Items[props.folder[props.action.item1].item].name + " " + props.folder[props.action.item1].modifier + ")";
    } else if (props.action.action === "Swap") {
        text = "Swap slot " + (parseInt(props.action.item1) + 1)  + " (" + gameInfo.Items[props.folder[props.action.item1].item].name + " " + props.folder[props.action.item1].modifier + ") with slot " + (parseInt(props.action.item2) + 1)  + " (" + gameInfo.Items[props.folder[props.action.item2].item].name + " " + props.folder[props.action.item2].modifier + ")";
    } else if (props.action.action === "Replace") {
        text = "Replace slot " + (parseInt(props.action.item1) + 1)  + " (" + gameInfo.Items[props.folder[props.action.item1].item].name + " " + props.folder[props.action.item1].modifier + ") with " + gameInfo.Items[props.action.item2].name + " " + props.action.modifier2;
    } else if (props.action.action === "Reg") {
        text = "Reg slot " + (parseInt(props.action.item1) + 1)  + " (" + gameInfo.Items[props.folder[props.action.item1].item].name + " " + props.folder[props.action.item1].modifier + ")";
    }

    return (
        <div className={`${styles.action}`}>
            {text}
        </div>
    )
}

function FolderEdit(props) {
    const {
        notes: {
            game
        },
        folderEditView
    } = useContext(NotesContext);
    
    const gameInfo = require('../../../../resources/' + game + '/ItemNames.json');

    if (props.folderEdit?.shown) {
        if (folderEditView === "Actions") {
            // Create a list of Actions. Use the initial folder in order to list the appropriate information per action
            const actionsList = [];
            let tempFolder = JSON.parse(JSON.stringify(props.folder));

            for (const action of props.folderEdit.value) {
                actionsList.push(<Action key={action.id} action={action} folder={tempFolder} />)

                tempFolder = performFolderEditAction(tempFolder, action, game);
            }

            return (
                <div className={`${styles.wrapper}`}>
                    <h3>Folder Edit</h3>
                    {actionsList}
                </div>
            );
        } else if (folderEditView === "Differences") {
            return (
                <div className={`${styles.wrapper}`}>
                    <h3 className="col-12">Folder Edit</h3>
                    <div className="col-5">
                        <h4>Previous Folder</h4>
                        {props.prevFolder.map((slot) => 
                            <div className="col-12">
                                {(parseInt(slot.slot) + 1).toString().padStart(2, "0")}. {gameInfo.Items[slot.item].name} {slot.modifier}
                            </div>
                        )}
                    </div>
                    <div className="col-2">
                        ->
                    </div>
                    <div className="col-5">
                        <h4>Next Folder</h4>
                        {props.folder.map((slot) =>
                            <div className="col-12">
                                {(parseInt(slot.slot) + 1).toString().padStart(2, "0")}. {gameInfo.Items[slot.item].name} {slot.modifier}
                            </div>
                        )}
                    </div>
                </div>
            )
        } else if (folderEditView === "Inputs") {
            return (
                <div className={`${styles.wrapper}`}>
                    {getFolderEditInputs(props.folderEdit.value, game).map((action) =>
                        <div className="col-12">
                            {action}
                        </div>
                    )}
                </div>
            )
        }
    }

    return null;
}

export default FolderEdit;