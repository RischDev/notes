/** @format */

import React from 'react';
import styles from './styles/PreviewImage.Module.css';

class PreviewImage extends React.Component {
    render() {
        if (this.props.image == null || this.props.image === '') {
            return null;
        }

        return (
            <div>
                <img
                    className={`${styles.img}`}
                    src={this.props.image}
                    alt=""
                />
            </div>
        );
    }
}

export default PreviewImage;
