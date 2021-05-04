import React from 'react';
import ItemDropdown from './ItemDropdown';
import ModifierDropdown from './ModifierDropdown';
import DeleteItem from './DeleteItem';

class SectionItem extends React.PureComponent {
    render() {
        return(
            <div>
                <ItemDropdown type="section" sectionId={this.props.sectionId} itemId={this.props.item.id} value={this.props.item.value} game={this.props.game} updateText={this.props.updateText} updateItems={this.props.updateItems} />
                <ModifierDropdown type="section" sectionId={this.props.sectionId} itemId={this.props.item.id} itemValue={this.props.item.value} value={this.props.item.modifier} game={this.props.game} updateText={this.props.updateText} updateItems={this.props.updateItems} />
                <DeleteItem sectionId={this.props.sectionId} itemId={this.props.item.id} deleteItem={this.props.deleteItem} />
            </div>
        );
    }
}

export default SectionItem;