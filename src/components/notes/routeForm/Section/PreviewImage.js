/** @format */

import React from 'react';
import styles from './styles/PreviewImage.module.css';

class PreviewImage extends React.Component {
    render() {
        if (this.props.image == null || this.props.image === '') {
            return null;
        }

        return (
            <img className={`${styles.img}`} src={this.props.image} alt="" />
        );
    }
}

export default PreviewImage;
