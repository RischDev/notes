import React from 'react';
import styles from './styles/Button.Module.css';

class Button extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = props.onClick.bind(this);
    }

    render() {
        return (
            <button id={this.props.id} className={`${styles.btn} ${styles[this.props.size]}`} onClick={this.onClick}>{this.props.text}</button>
        )
    }
}

export default Button;