import React from 'react';
import Item from './Item';

class Tracker extends React.Component {
    render() {
        const fullSizeClass = this.props.fullSize ? " fullSize" : "";

        let Items = require('../resources/' + this.props.game + '/ItemNames.json');

        let header;
        if (this.props.fullSize) {
            header = <img className="expand" src="/notes/icons/collapse-right.png" alt="Show Notes" onClick={this.props.updateNotesDisplay} />;
        } else {
            header = <img className="collapse right" src="/notes/icons/collapse-right.png" alt="Hide Tracker" onClick={this.props.updateTrackerDisplay} />;
        }

        if (this.props.display) {
            return(
                <div className={"tracker" + fullSizeClass}>
                    <div className="header">
                        {header}
                        <button className="reset" onClick={this.props.resetTracker}>Reset</button>
                    </div>

                    {Items.types.map((type) =>
                        <div key={"type-" + type.name}>
                            <div className="item-header">
                                <h2>{type.name}</h2>
                            </div>
                            <div id="Items" className="item-list">
                                {Items.Items.map((item) =>
                                    <Item key={"item-" + item.id} id={item.id} name={item.name} type={type} low={type.low} modifiers={item.modifiers} updateTracker={this.props.updateTracker} game={this.props.game} found={this.props.foundItems.includes(item.id)} foundModifiers={this.props.foundModifiers} />
                                )}
                            </div>
                        </div>
                    )}
                </div>
            );
        }

        return null;
    }
}

export default Tracker;