import React from 'react';
import ItemDropdown from './ItemDropdown';
import ModifierDropdown from './ModifierDropdown';
import MoveUp from './MoveUp';
import MoveDown from './MoveDown';
import DeleteItem from './DeleteItem';

class SectionItem extends React.PureComponent {
    render() {
        return(
            <div>
                <ItemDropdown type="section" sectionId={this.props.sectionId} itemId={this.props.item.id} value={this.props.item.value} game={this.props.game} updateText={this.props.updateText} updateItems={this.props.updateItems} />
                <ModifierDropdown type="section" sectionId={this.props.sectionId} itemId={this.props.item.id} itemValue={this.props.item.value} value={this.props.item.modifier} game={this.props.game} updateText={this.props.updateText} updateItems={this.props.updateItems} />
                <MoveUp sectionId={this.props.sectionId} type="item" itemId={this.props.item.id} moveItemUp={this.props.moveItemUp} />
                <MoveDown sectionId={this.props.sectionId} type="item" itemId={this.props.item.id} max={this.props.max} moveItemDown={this.props.moveItemDown} />
                <DeleteItem sectionId={this.props.sectionId} itemId={this.props.item.id} deleteItem={this.props.deleteItem} />
            </div>
        );
    }
}

export default SectionItem;