/** @format */

import styles from './styles/State.Module.css';

function State(props) {
    if (props.state != null) {
        return (
            <div className={`${styles.stateContainer}`}>
                <div className={`${styles.label}`}>State</div>
                <div className={styles.wrapper}>
                    {props.state.keys.map((key) => (
                        <div
                            className={`${styles.stateField} ${
                                !props.state[key].shown ? styles.hidden : ''
                            }`}
                            key={key}>
                            <div className={`${styles.keyLabel}`}>{key}</div>
                            <div className="col-2">
                                {props.state[key].value}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return null;
}

export default State;
