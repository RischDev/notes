/** @format */

import { useContext } from 'react';
import Icon from '../../../common/Icon';
import Button from '../../../common/Button';
import GameContext from '../../../common/GameContext';
import performFolderEditAction from '../../../common/functions/performFolderEditAction';
import getNewFolder from '../../../common/functions/getNewFolder';
import styles from './styles/SectionFolderEdit.Module.css';

function ItemOption(props) {
    const gameInfo = useContext(GameContext);

    if (props.item !== -1) {
        return (
            <option value={props.slot} key={props.slot}>
                {parseInt(props.slot) + 1}. {gameInfo.Items[props.item].name}{' '}
                {props.modifier}
            </option>
        );
    }

    return null;
}

function ItemDropdown(props) {
    const gameInfo = useContext(GameContext);

    // For Reg/Default and Remove, return a list of items in the folder
    // For Add, return a list of all possible items
    // For Swap and Tag, return 2 lists of items in the folder
    // For Replace, return a list of items in the folder, and a list of all possible items.
    // For Sort, return a list of the sort types for the game, and a checkbox to reverse the sort.
    if (
        (props.action.action === 'Reg' && props.id === 1) ||
        (props.action.action === 'Default' && props.id === 1) ||
        (props.action.action === 'Remove' && props.id === 1) ||
        props.action.action === 'Swap' ||
        (props.action.action === 'Replace' && props.id === 1) ||
        props.action.action === 'Tag'
    ) {
        return (
            <select
                value={props.action['item' + props.id]}
                className={`${styles.select} ${styles.itemDropdown}`}
                onChange={(e) => {
                    props.onUpdate(props.action.id, e.target.value);
                }}>
                <option value={-1}> </option>
                {props.folder.map((item) => (
                    <ItemOption
                        key={item.slot}
                        slot={item.slot}
                        item={item.item}
                        modifier={item.modifier}
                        game={props.game}
                    />
                ))}
            </select>
        );
    } else if (
        (props.action.action === 'Add' && props.id === 1) ||
        (props.action.action === 'Replace' && props.id === 2)
    ) {
        // Generate a list of all items with modifiers
        const itemList = [];
        for (let item of gameInfo.Items) {
            if (gameInfo.modifiers) {
                for (let modifier of item.modifiers) {
                    itemList.push({
                        id: item.id,
                        name: item.name,
                        modifier: modifier,
                    });
                }
            } else {
                itemList.push({
                    id: item.id,
                    name: item.name,
                });
            }
        }
        return (
            <select
                value={
                    props.action['item' + props.id] +
                    (gameInfo.modifiers
                        ? '-' + props.action['modifier' + props.id]
                        : '')
                }
                className={`${styles.select} ${styles.itemDropdown}`}
                onChange={(e) => {
                    props.onUpdate(props.action.id, e.target.value);
                }}>
                <option value={-1}> </option>
                {itemList.map((item) => (
                    <option
                        value={
                            item.id +
                            (gameInfo.modifiers ? '-' + item.modifier : '')
                        }
                        key={
                            item.id + (gameInfo.modifiers ? item.modifier : '')
                        }>
                        {item.name} {item.modifier}
                    </option>
                ))}
            </select>
        );
    } else if (props.action.action === 'Sort' && props.id === 1) {
        return (
            <select
                value={props.action.item1 + (props.action.item2 ? '-r' : '')}
                className={`${styles.select} ${styles.itemDropdown}`}
                onChange={(e) => {
                    props.onUpdate(props.action.id, e.target.value);
                }}>
                <option value={''}> </option>
                {gameInfo.sortTypes.map((sortType) => (
                    <option value={sortType}>{sortType}</option>
                ))}
                {gameInfo.sortTypes.map((sortType) => (
                    <option value={sortType + '-r'}>R. {sortType}</option>
                ))}
            </select>
        );
    }
    return null;
}

function Action(props) {
    const gameInfo = useContext(GameContext);

    // For formatting purposes, add an extra spacer div between the 2 dropdowns for actions that require both.
    let spacer;
    if (
        props.action.action === 'Replace' ||
        props.action.action === 'Swap' ||
        props.action.action === 'Tag'
    ) {
        spacer = <div className={`${styles.spacer}`} />;
    }

    return (
        <div className={`${styles.wrapper}`}>
            <select
                value={props.action.action}
                className={`${styles.select}`}
                onChange={(e) => {
                    props.updateAction(props.action.id, e.target.value);
                }}>
                <option value=""> </option>
                {gameInfo.actionTypes.map((action) => (
                    <option key={action} value={action}>
                        {action}
                    </option>
                ))}
            </select>
            <ItemDropdown
                action={props.action}
                id={1}
                folder={props.folder}
                onUpdate={props.updateItem1}
            />
            <Icon
                src="/icons/delete.png"
                id={'deleteAction-' + props.action.id}
                size="small"
                altText="X"
                hover={true}
                grayscale={true}
                onClick={() => {
                    props.deleteAction(props.action.id);
                }}
            />
            {spacer}
            <ItemDropdown
                action={props.action}
                id={2}
                folder={props.folder}
                onUpdate={props.updateItem2}
            />
        </div>
    );
}

function ActionsList(props) {
    const gameInfo = useContext(GameContext);
    // JSON stringify, then JSON parse to make a deep copy.
    let tempFolder = JSON.parse(JSON.stringify(props.folderEdit.prevFolder));
    const actionsList = [];

    for (const action of props.folderEdit.value) {
        actionsList.push(
            <Action
                key={action.id}
                action={action}
                folder={tempFolder}
                updateAction={props.updateAction}
                updateItem1={props.updateItem1}
                updateItem2={props.updateItem2}
                deleteAction={props.deleteAction}
            />,
        );

        tempFolder = performFolderEditAction(tempFolder, action, gameInfo);
    }

    return <div className={styles.wrapper}>{actionsList}</div>;
}

function SectionFolderEdit(props) {
    const gameInfo = useContext(GameContext);

    const addAction = () => {
        // JSON stringify, then JSON parse to make a deep copy.
        let newFolderEdit = JSON.parse(JSON.stringify(props.folderEdit));

        newFolderEdit.value.push({
            id: newFolderEdit.value.length,
            action: '',
            item1: -1,
            modifier1: '',
            item2: -1,
            modifier2: '',
        });
        newFolderEdit.shown = true;

        props.updateFolderEdit(newFolderEdit);
    };

    const updateAction = (id, action) => {
        const newFolderEdit = JSON.parse(JSON.stringify(props.folderEdit));

        newFolderEdit.value[id].action = action;
        // Reset items when a new action is selected.
        newFolderEdit.value[id].item1 = -1;
        newFolderEdit.value[id].modifier1 = null;
        // For sorts, update item2 to be false to indicate it won't be a reverse sort
        if (action === 'Sort') {
            newFolderEdit.value[id].item2 = false;
        } else {
            newFolderEdit.value[id].item2 = -1;
            newFolderEdit.value[id].modifier2 = null;
        }

        newFolderEdit.folder = getNewFolder(
            newFolderEdit,
            props.folderEdit.prevFolder,
            gameInfo,
        );

        props.updateFolderEdit(newFolderEdit);
    };

    const updateItem1 = (id, item) => {
        const newFolderEdit = JSON.parse(JSON.stringify(props.folderEdit));
        // For the Add action, the value will be a combination of the item's ID and modifier
        if (newFolderEdit.value[id].action === 'Add') {
            if (gameInfo.modifiers) {
                const itemParts = item.split('-');
                newFolderEdit.value[id].item1 = itemParts[0];
                newFolderEdit.value[id].modifier1 = itemParts[1];
            } else {
                newFolderEdit.value[id].item1 = item;
            }
        } else if (newFolderEdit.value[id].action === 'Sort') {
            if (item.includes('-')) {
                const itemParts = item.split('-');
                newFolderEdit.value[id].item1 = itemParts[0];
                newFolderEdit.value[id].item2 = true;
            } else {
                newFolderEdit.value[id].item1 = item;
                newFolderEdit.value[id].item2 = false;
            }
        } else {
            newFolderEdit.value[id].item1 = item;
        }

        newFolderEdit.folder = getNewFolder(
            newFolderEdit,
            props.folderEdit.prevFolder,
            gameInfo,
        );

        props.updateFolderEdit(newFolderEdit);
    };

    const updateItem2 = (id, item) => {
        const newFolderEdit = JSON.parse(JSON.stringify(props.folderEdit));
        // For the Replace action, the value will be a combination of the item's ID and modifier
        if (newFolderEdit.value[id].action === 'Replace') {
            if (gameInfo.modifiers) {
                const itemParts = item.split('-');
                newFolderEdit.value[id].item2 = itemParts[0];
                newFolderEdit.value[id].modifier2 = itemParts[1];
            } else {
                newFolderEdit.value[id].item2 = item;
            }
        } else {
            newFolderEdit.value[id].item2 = item;
        }

        newFolderEdit.folder = getNewFolder(
            newFolderEdit,
            props.folderEdit.prevFolder,
            gameInfo,
        );

        props.updateFolderEdit(newFolderEdit);
    };

    const deleteAction = (id) => {
        const newFolderEdit = JSON.parse(JSON.stringify(props.folderEdit));
        newFolderEdit.value.splice(id, 1);

        newFolderEdit.folder = getNewFolder(
            newFolderEdit,
            props.folderEdit.prevFolder,
            gameInfo,
        );

        props.updateFolderEdit(newFolderEdit);
    };

    if (props.folderEdit != null) {
        return (
            <div className={styles.wrapper}>
                <ActionsList
                    folderEdit={props.folderEdit}
                    updateAction={updateAction}
                    updateItem1={updateItem1}
                    updateItem2={updateItem2}
                    deleteAction={deleteAction}
                />
                <Button text="Add Action" size="medium" onClick={addAction} />
                <Button
                    text="Delete Folder Edit"
                    size="medium"
                    onClick={props.deleteFolderEdit}
                />
            </div>
        );
    }
    return (
        <Button
            text="Add Folder Edit"
            size="medium"
            onClick={props.addFolderEdit}
        />
    );
}

export default SectionFolderEdit;
