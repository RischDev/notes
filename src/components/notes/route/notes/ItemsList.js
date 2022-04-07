import { useContext } from 'react';
import SmallItem from './SmallItem';
import NotesContext from '../../../common/NotesContext';
import styles from './styles/ItemsList.Module.css';

function ItemsList(props) {
    const {
        notes: {
            game
        },
        foundItems,
        foundModifiers
    } = useContext(NotesContext);

    let Items = require('../../../../resources/' + game + '/ItemNames.json');

    let itemsList;

    if (Items.modifiers) {
        let completedItems = [];

        for (let i = 0; i < props.items.length; i++) {
            let item = props.items[i];

            if (!completedItems.some(o => o.value === item.value)) {
                let modifiers = [];

                for (let j = 0; j < props.items.length; j++) {
                    let item2 = props.items[j];

                    if (item2.value === item.value && item2.modifier && item2.modifier !== "" && item2.modifier != null) {
                        modifiers.push(item2.modifier);
                    }
                }

                completedItems.push({
                    value: item.value,
                    modifiers: modifiers
                })
            }
        }

        itemsList = completedItems.map((item) =>
                        <SmallItem key={"small-item-" + item.value} id={item.value} updateTracker={props.updateTracker} modifiers={item.modifiers} found={foundItems.includes(item.value)} foundModifiers={foundModifiers} />
                    );
    } else {
        itemsList = props.items.map((item) =>
                        <SmallItem key={"small-item-" + item.value} id={item.value} updateTracker={props.updateTracker} found={foundItems.includes(item.value)} foundModifiers={foundModifiers} />
                    );
    }

    if (props.items.length > 0) {
        return (
            <div className="col-2 col-m-12">
                <div className={styles.header}>
                    Potential {Items.name + "s"}
                </div>
                <div className={styles.itemList}>
                    {itemsList}
                </div>
           </div>
        );
    }
    return (
        <div className="col-2 col-m-12"> </div>
    );
}

export default ItemsList;