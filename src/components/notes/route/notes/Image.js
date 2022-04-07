import styles from './styles/Image.Module.css';

function Image(props) {
    if (props.image != null) {
        return (
            <img className={styles.image} src={props.image} alt="" />
        );
    }

    return null;
}

export default Image;