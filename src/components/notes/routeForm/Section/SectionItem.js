import React from 'react';
import ItemDropdown from './ItemDropdown';
import ModifierDropdown from './ModifierDropdown';
import Icon from '../../../common/Icon';

class SectionItem extends React.PureComponent {
    render() {
        return(
            <div>
                <ItemDropdown type="section" sectionId={this.props.sectionId} itemId={this.props.item.id} value={this.props.item.value} game={this.props.game} updateText={this.props.updateText} updateItems={this.props.updateItems} />
                <ModifierDropdown type="section" sectionId={this.props.sectionId} itemId={this.props.item.id} itemValue={this.props.item.value} value={this.props.item.modifier} game={this.props.game} updateText={this.props.updateText} updateItems={this.props.updateItems} />
                <Icon src="/icons/up.png" id={"moveItemUp-" + this.props.item.id} size="small" hover={true} hidden={this.props.item.id === 0} altText="Up" onClick={this.props.moveItemUp} />
                <Icon src="/icons/down.png" id={"moveItemDown-" + this.props.item.id} size="small" hover={true} hidden={this.props.item.id === this.props.max} altText="Down" onClick={this.props.moveItemDown} />
                <Icon src="/icons/delete.png" id={"deleteItem-" + this.props.item.id} size="small" hover={true} hidden={false} altText="X" onClick={this.props.deleteItem} />
            </div>
        );
    }
}

export default SectionItem;