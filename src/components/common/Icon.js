import React from 'react';
import styles from './styles/Icon.Module.css';

class Icon extends React.Component {
    constructor(props) {
        super(props);

        if (props.onClick != null) {
            this.onClick = props.onClick.bind(this);
        }
    }

    render() {
        let hoverClass = this.props.hover ? styles.hover : '';
        let hiddenClass = this.props.hidden ? styles.hidden : '';
        let floatClass = this.props.float === "right" ? styles.right : '';

        return (
            <img src={this.props.src} id={this.props.id} className={`${styles.icon} ${styles[this.props.size]} ${hoverClass} ${hiddenClass} ${floatClass}`} onClick={this.onClick} alt={this.props.altText} />
        )
    }
}

export default Icon;