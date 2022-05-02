/** @format */

import Icon from '../../../common/Icon';
import styles from './styles/SectionState.Module.css';

function SectionState(props) {
    const onChange = (e) => {
        const name = e.target.name.split('-');
        const key = name[1];
        const value =
            e.target.type === 'checkbox' ? e.target.checked : e.target.value;

        // JSON stringify, then JSON parse to make a deep copy.
        let newState = JSON.parse(JSON.stringify(props.state));
        if (name[0].includes('Shown')) {
            newState[key].shown = value;
        } else {
            newState[key].value = value;
        }

        props.updateState(props.sectionId, newState);
    };

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
                                <input
                                    type="text"
                                    name={
                                        'state-' + key + '-' + props.sectionId
                                    }
                                    className={styles.textInput}
                                    defaultValue={props.state[key].value}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="col-2">
                                <input
                                    type="checkbox"
                                    name={
                                        'stateShown-' +
                                        key +
                                        '-' +
                                        props.sectionId
                                    }
                                    className={styles.checkbox}
                                    checked={props.state[key].shown}
                                    onChange={onChange}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="col-2">
                    <Icon
                        src="/icons/delete.png"
                        id={'deleteState-' + props.sectionId}
                        size="small"
                        hover={true}
                        hidden={false}
                        altText="X"
                        onClick={props.deleteState}
                    />
                </div>
            </div>
        );
    }
    return null;
}

export default SectionState;
