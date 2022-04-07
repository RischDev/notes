import FolderEdit from './FolderEdit';
import styles from './styles/State.Module.css';

function State(props) {
    if (props.state != null) {
        return (
            <div className={styles.wrapper}>
                {props.state.keys.map((key) =>
                    <div className={`${styles.wrapper} ${!props.state[key].shown ? styles.hidden : ''}`} key={key}>
                        <div className="col-3">
                            {key}
                        </div>
                        <div className="col-2">
                            {props.state[key].value}
                        </div>
                    </div>
                )}
                <FolderEdit folderEdit={props.state.folderEdit} prevFolder={props.state.prevFolder} folder={props.state.folder} />
            </div>
        );
    }

    return null;
}

export default State;