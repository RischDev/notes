/** @format */

import React from 'react';
import styles from './styles/Icon.Module.css';

class Icon extends React.Component {

    render() {
        let hoverClass = this.props.hover ? styles.hover : '';
        let hiddenClass = this.props.hidden ? styles.hidden : '';
        let floatClass = this.props.float === "right" ? styles.right : '';
        let grayscaleClass = this.props.grayscale ? styles.grayscale : '';

        return (
            <img src={this.props.src} id={this.props.id} className={`${styles.icon} ${styles[this.props.size]} ${hoverClass} ${hiddenClass} ${floatClass} ${grayscaleClass}`} onClick={this.props.onClick} alt={this.props.altText} />
        )
    }
}

export default Icon;
