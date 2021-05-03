import React from 'react';
import ItemDropdown from './ItemDropdown';
import ModifierDropdown from './ModifierDropdown';
import DeleteText from './DeleteText';

class SectionText extends React.Component {
    constructor(props) {
        super(props);

        this.onChange = this.props.onChange.bind(this);
    }

    render() {
        return(
            <div>
                <textarea name={"textValue-" + this.props.sectionId + "-" + this.props.text.id} value={this.props.text.text} placeholder="Text" onChange={this.onChange} />
                <ItemDropdown type="text" sectionId={this.props.sectionId} textId={this.props.text.id} value={this.props.text.item} game={this.props.game} onChange={this.onChange} />
                <ModifierDropdown type="text" sectionId={this.props.sectionId} textId={this.props.text.id} itemValue={this.props.text.item} value={this.props.text.modifier} game={this.props.game} onChange={this.onChange} />
                <DeleteText sectionId={this.props.sectionId} textId={this.props.text.id} deleteText={this.props.deleteText} />
            </div>
        );
    }
}

export default SectionText;