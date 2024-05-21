/** @format */

import styles from './styles/LargeImage.module.css';

function LargeImage(props) {
    const onClick = (e) => {
        if (e.target.tagName !== 'IMG') {
            props.fullscreenImage(null);
        }
    };

    if (props.image != null) {
        return (
            <div className={styles.fullscreenPreview} onClick={onClick}>
                <img className={styles.image} src={props.image} alt="" />
            </div>
        );
    }

    return null;
}

export default LargeImage;
