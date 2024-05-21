/** @format */

import React from 'react';
import styles from './styles/Button.module.css';

class Button extends React.Component {
    render() {
        return (
            <button
                id={this.props.id}
                data-id={
                    process.env.NODE_ENV === 'development'
                        ? this.props.testId
                        : null
                }
                className={`${styles.btn} ${styles[this.props.size]} ${
                    this.props.className
                }`}
                type="button"
                onClick={this.props.onClick}>
                {this.props.text}
            </button>
        );
    }
}

export default Button;
