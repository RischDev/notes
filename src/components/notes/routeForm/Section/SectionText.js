import React from 'react';
import styles from'./styles/SectionText.Module.css';
import ItemDropdown from './ItemDropdown';
import ModifierDropdown from './ModifierDropdown';
import Icon from '../../../common/Icon';

class SectionText extends React.Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        const name = e.target.name.split("-");
        const sectionId = parseInt(name[1]);
        const textId = parseInt(name[2]);

        this.props.updateText(sectionId, textId, value, null, null);
    }

    render() {
        return(
            <div>
                <textarea className={`${styles.textarea}`} name={"textValue-" + this.props.sectionId + "-" + this.props.text.id} value={this.props.text.text} placeholder="Text" onChange={this.onChange} />
                <ItemDropdown type="text" sectionId={this.props.sectionId} textId={this.props.text.id} value={this.props.text.item} game={this.props.game} updateText={this.props.updateText} updateItems={this.props.updateItems} />
                <ModifierDropdown type="text" sectionId={this.props.sectionId} textId={this.props.text.id} itemValue={this.props.text.item} value={this.props.text.modifier} game={this.props.game} updateText={this.props.updateText} updateItems={this.props.updateItems} />
                <Icon src="/icons/up.png" id={"moveTextUp-" + this.props.text.id} size="small" hover={true} hidden={this.props.text.id === 0} altText="Up" onClick={this.props.moveTextUp} />
                <Icon src="/icons/down.png" id={"moveTextDown-" + this.props.text.id} size="small" hover={true} hidden={this.props.text.id === this.props.max} altText="Down" onClick={this.props.moveTextDown} />
                <Icon src="/icons/delete.png" id={"deleteText-" + this.props.text.id} size="small" hover={true} hidden={false} altText="X" onClick={this.props.deleteText} />
            </div>
        );
    }
}

export default SectionText;