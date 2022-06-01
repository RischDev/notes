import styles from './styles/Image.Module.css';

function Image(props) {
    if (props.image != null) {
        return (
            <div className={`${styles.imageContainer}`}>
                <img className={styles.image} src={props.image} alt="" onClick={ () => props.onClick(props.image) } />
            </div>
        );
    }

    return null;
}

export default Image;