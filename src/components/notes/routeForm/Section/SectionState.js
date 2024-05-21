/** @format */

import { memo } from 'react';
import Button from '../../../common/Button';
import styles from './styles/SectionState.module.css';
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
    };

    const onStateShownChange = (key, value) => {
        // JSON stringify, then JSON parse to make a deep copy.
        let newState = JSON.parse(JSON.stringify(props.state));
        newState[key].shown = value;
        props.updateState(newState);
    };

    if (props.state != null) {
        return (
            <div>
                <div className={`${styles.wrapper}`}>
                    {props.state.keys.map((key) => (
                        <div className={`${styles.stateField}`} key={key}>
                            <label
                                className={`${styles.label}`}
                                htmlFor={
                                    'state-' + key + '-' + props.sectionId
                                }>
                                {key}
                            </label>
                            <div className={`${styles.inputs}`}>
                                <input
                                    type="text"
                                    className={styles.textInput}
                                    defaultValue={props.state[key].value}
                                    onChange={(e) => {
                                        onStateValueChange(key, e.target.value);
                                    }}
                                />
                                <input
                                    type="checkbox"
                                    className={styles.checkbox}
                                    checked={props.state[key].shown}
                                    onChange={(e) => {
                                        onStateShownChange(
                                            key,
                                            e.target.checked,
                                        );
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="col-2">
                    <Button
                        text="Delete State"
                        size="medium"
                        onClick={props.deleteState}
                    />
                </div>
            </div>
        );
    }
    return <Button text="Add State" size="medium" onClick={props.addState} />;
}, shouldUpdate);

export default SectionState;
