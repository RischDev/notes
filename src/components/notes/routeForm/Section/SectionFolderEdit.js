import { useContext}  from 'react';
//import Icon from '../../../common/Icon';
import Button from '../../../common/Button';
import GameContext from '../../../common/GameContext';
import { performFolderEditAction, getNewFolder } from '../../../common/Functions';
import styles from './styles/SectionState.Module.css';

function ItemOption(props) {
    const gameInfo = useContext(GameContext);

    if (props.item !== -1) {
        return(
            <option value={props.slot} key={props.slot}>{parseInt(props.slot) + 1}. {gameInfo.Items[props.item].name} {props.modifier}</option>
        );
    }

    return null;
}

function ItemDropdown(props) {
    const gameInfo = useContext(GameContext);

    // For Reg and Remove, return a list of items in the folder
    // For Add, return a list of all possible items
    // For Swap, return 2 lists of items in the folder
    // For Replace, return a list of items in the folder, and a list of all possible items.
    // For Sort, return a list of the sort types for the game, and a checkbox to reverse the sort.
    if ((props.action.action === "Reg" && props.id === 1) || (props.action.action === "Remove" && props.id === 1) || props.action.action === "Swap" || (props.action.action === "Replace" && props.id === 1)) {
        return (
            <select value={props.action["item" + props.id]} onChange={ (e) => { props.onUpdate(props.action.id, e.target.value) } }>
                <option value={-1}> </option>
                {props.folder.map((item) =>
                    <ItemOption key={item.slot} slot={item.slot} item={item.item} modifier={item.modifier} game={props.game} />
                )}
            </select>
        )
    } else if ((props.action.action === "Add" && props.id === 1) || (props.action.action === "Replace" && props.id === 2)) {
        // Generate a list of all items with modifiers
        const itemList = [];
        for (let item of gameInfo.Items) {
            for (let modifier of item.modifiers) {
                itemList.push({
                    id: item.id,
                    name: item.name,
                    modifier: modifier
                });
            }
        }
        return (
            <select value={props.action["item" + props.id] + "-" + props.action["modifier" + props.id]} onChange={ (e) => { props.onUpdate(props.action.id, e.target.value) } }>
                <option value={-1}> </option>
                {itemList.map((item) =>
                    <option value={item.id + "-" + item.modifier} key={item.id + item.modifier}>{item.name} {item.modifier}</option>
                )}
            </select>
        )
    } else if ((props.action.action === "Sort") && props.id === 1) {
        return(
            <select value={props.action.item1} onChange={ (e) => { props.onUpdate(props.action.id, e.target.value) } }>
                <option value={""}> </option>
                {gameInfo.sortTypes.map((sortType) =>
                    <option value={sortType}>{sortType}</option>
                )}
            </select>
        )
    } else if ((props.action.action === "Sort") && props.id === 2) {
        return (
            <span>
                <label>Reverse: </label>
                <input type="checkbox" checked={props.action.item2} onChange={ (e) => { props.onUpdate(props.action.id, e.target.checked) } } />
            </span>
        )
    }
    return null;
}

function Action(props) {
    const gameInfo = useContext(GameContext);

    return (
        <div className={styles.wrapper}>
            <select value={props.action.action} onChange={ (e) => { props.updateAction(props.action.id, e.target.value) } }>
                <option value=""> </option>
                {gameInfo.actionTypes.map((action) =>
                    <option key={action} value={action}>{action}</option>
                )}
            </select>
            <ItemDropdown action={props.action} id={1} folder={props.folder} onUpdate={props.updateItem1} />
            <ItemDropdown action={props.action} id={2} folder={props.folder} onUpdate={props.updateItem2} />
        </div>
    )
}

function ActionsList(props) {
    const gameInfo = useContext(GameContext);
    // JSON stringify, then JSON parse to make a deep copy.
    let tempFolder = JSON.parse(JSON.stringify(props.folder));
    const actionsList = [];

    for (const action of props.folderEdit.value) {
        actionsList.push(<Action key={action.id} action={action} folder={tempFolder} updateAction={props.updateAction} updateItem1={props.updateItem1} updateItem2={props.updateItem2} />)

        tempFolder = performFolderEditAction(tempFolder, action, gameInfo);
    }

    return (
        <div className={styles.wrapper}>
            {actionsList}
        </div>
    );
}

function SectionFolderEdit(props) {
    const gameInfo = useContext(GameContext);

    const addAction = () => {
        // JSON stringify, then JSON parse to make a deep copy.
        let newFolderEdit = JSON.parse(JSON.stringify(props.folderEdit));

        newFolderEdit.value.push({
            id: newFolderEdit.value.length,
            action: "",
            item1: -1,
            modifier1: "",
            item2: -1,
            modifier2: ""
        });
        newFolderEdit.shown = true;

        props.updateFolderEdit(newFolderEdit, props.folder);
    }

    const updateAction = (id, action) => {
        const newFolderEdit = JSON.parse(JSON.stringify(props.folderEdit));

        newFolderEdit.value[id].action = action;
        // Reset items when a new action is selected.
        newFolderEdit.value[id].item1 = -1;
        newFolderEdit.value[id].modifier1 = null;
        // For sorts, update item2 to be false to indicate it won't be a reverse sort
        if (action === "Sort") {
            newFolderEdit.value[id].item2 = false;
        } else {
            newFolderEdit.value[id].item2 = -1;
            newFolderEdit.value[id].modifier2 = null;
        }

        const newFolder = getNewFolder(newFolderEdit, props.folder, gameInfo);

        props.updateFolderEdit(newFolderEdit, newFolder);
    }

    const updateItem1 = (id, item) => {
        const newFolderEdit = JSON.parse(JSON.stringify(props.folderEdit));
        // For the Add action, the value will be a combination of the item's ID and modifier
        if (newFolderEdit.value[id].action === "Add") {
            const itemParts = item.split("-");
            newFolderEdit.value[id].item1 = itemParts[0];
            newFolderEdit.value[id].modifier1 = itemParts[1];
        } else {
            newFolderEdit.value[id].item1 = item;
        }

        const newFolder = getNewFolder(newFolderEdit, props.folder, gameInfo);

        props.updateFolderEdit(newFolderEdit, newFolder)
    }

    const updateItem2 = (id, item) => {
        const newFolderEdit = JSON.parse(JSON.stringify(props.folderEdit));
        // For the Replace action, the value will be a combination of the item's ID and modifier
        if (newFolderEdit.value[id].action === "Replace") {
            const itemParts = item.split("-");
            newFolderEdit.value[id].item2 = itemParts[0];
            newFolderEdit.value[id].modifier2 = itemParts[1];
        } else {
            newFolderEdit.value[id].item2 = item;
        }

        const newFolder = getNewFolder(newFolderEdit, props.folder, gameInfo);

        props.updateFolderEdit(newFolderEdit, newFolder)
    }

    if (props.folderEdit.shown) {
        return(
            <div className={styles.wrapper}>
                <ActionsList folderEdit={props.folderEdit} folder={props.folder} updateAction={updateAction} updateItem1={updateItem1} updateItem2={updateItem2} />
                <Button text="Add Action" size="medium" onClick={addAction} />
            </div>
        );
    }
    return (
        <Button text="Add Folder Edit" size="medium" onClick={addAction} />
    );
}

export default SectionFolderEdit;