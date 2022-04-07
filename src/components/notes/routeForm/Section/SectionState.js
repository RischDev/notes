/** @format */

import { memo } from 'react';
import SectionFolderEdit from './SectionFolderEdit';
import Icon from '../../../common/Icon';
import styles from './styles/SectionState.Module.css';
import areShallowEqual from 'are-shallow-equal';

function shouldUpdate(oldProps, newProps) {
    if (areShallowEqual(oldProps, newProps)) {
        return true;
    }

    return false;
}

const SectionState = memo((props) => {
    const onStateValueChange = (key, value) => {
        // JSON stringify, then JSON parse to make a deep copy.
        let newState = JSON.parse(JSON.stringify(props.state));
        newState[key].value = value;
        props.updateState(newState);
    }

    const onStateShownChange = (key, value) => {
        // JSON stringify, then JSON parse to make a deep copy.
        let newState = JSON.parse(JSON.stringify(props.state));
        newState[key].shown = value;
        props.updateState(newState);
    }

    const updateFolderEdit = (folderEdit, folder) => {
        // JSON stringify, then JSON parse to make a deep copy.
        let newState = JSON.parse(JSON.stringify(props.state));
        newState.folderEdit = folderEdit;
        newState.folder = folder;
        props.updateState(newState);
    }

    if (props.state != null) {
        return (
            <div className={styles.wrapper}>
                <div className="col-10">
                    {props.state.keys.map((key) => (
                        <div className={styles.wrapper} key={key}>
                            <div className="col-5">
                                <label
                                    htmlFor={
                                        'state-' + key + '-' + props.sectionId
                                    }>
                                    {key}
                                </label>
                            </div>
                            <div className="col-5">
                                <input type="text" className={styles.textInput} defaultValue={props.state[key].value} onChange={ (e) => { onStateValueChange(key, e.target.value) } } />
                            </div>
                            <div className="col-2">
                                <input type="checkbox" className={styles.checkbox} checked={props.state[key].shown} onChange={ (e) => { onStateShownChange(key, e.target.checked) } } />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="col-2">
                    <Icon src="/icons/delete.png" size="small" hover={true} hidden={false} altText="X" onClick={props.deleteState} />
                </div>
                <SectionFolderEdit folderEdit={props.state.folderEdit} folder={props.state.prevFolder} updateFolderEdit={updateFolderEdit} />
            </div>
        );
    }
    return null;
}, shouldUpdate);

export default SectionState;
