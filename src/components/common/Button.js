/** @format */

import React from 'react';
import styles from './styles/Button.Module.css';

class Button extends React.Component {
    render() {
        return (
            <button id={this.props.id} className={`${styles.btn} ${styles[this.props.size]} ${this.props.className}`} type="button" onClick={this.props.onClick}>{this.props.text}</button>
        )
    }
}

export default Button;
