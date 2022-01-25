/** @format */

import { memo } from 'react';
import Icon from '../../../common/Icon';
import styles from './styles/SectionState.Module.css';

function shouldUpdate(oldProps, newProps) {
    if (oldProps.state != null && newProps.state != null) {
        for (const key in newProps.state.keys) {
            if (oldProps.state[key] !== newProps.state[key]) {
                return false;
            }
        }
    }

    return true;
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
            </div>
        );
    }
    return null;
}, shouldUpdate);

export default SectionState;
