import React from 'react';
import ItemDropdown from '../ItemDropdown';
import ModifierDropdown from '../ModifierDropdown';
import MoveUp from '../MoveUp';
import MoveDown from '../MoveDown';
import DeleteText from './DeleteText';

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
                <textarea name={"textValue-" + this.props.sectionId + "-" + this.props.text.id} value={this.props.text.text} placeholder="Text" onChange={this.onChange} />
                <ItemDropdown type="text" sectionId={this.props.sectionId} textId={this.props.text.id} value={this.props.text.item} game={this.props.game} updateText={this.props.updateText} updateItems={this.props.updateItems} />
                <ModifierDropdown type="text" sectionId={this.props.sectionId} textId={this.props.text.id} itemValue={this.props.text.item} value={this.props.text.modifier} game={this.props.game} updateText={this.props.updateText} updateItems={this.props.updateItems} />
                <MoveUp sectionId={this.props.sectionId} type="text" textId={this.props.text.id} moveTextUp={this.props.moveTextUp} />
                <MoveDown sectionId={this.props.sectionId} type="text" textId={this.props.text.id} max={this.props.max} moveTextDown={this.props.moveTextDown} />
                <DeleteText sectionId={this.props.sectionId} textId={this.props.text.id} deleteText={this.props.deleteText} />
            </div>
        );
    }
}

export default SectionText;