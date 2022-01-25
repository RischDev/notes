import { useContext } from 'react';
import RouteContext from '../../../common/RouteContext';
import styles from './styles/ItemDropdown.Module.css';
import Icon from '../../../common/Icon';

function ItemDropdown(props) {
    const {
        route: {
            game
        }
    } = useContext(RouteContext);

    const onUpdateItem = (e) => {
        let value = e.target.value;

        if (value !== "") {
            value = parseInt(value);
        }

        props.updateItem(value);
    }

    const addDropdown = (e) => {
        e.preventDefault();

        props.updateItem(0);
    }

    let Items = require('../../../../resources/ItemNames.json');
    if (game !== "" && game != null) {
        Items = require('../../../../resources/' + game + '/ItemNames.json');
    }

    if (props.item != null) {
        if (props.type === "text") {
            return(
                <select className={`${styles.select}`} value={props.item} onChange={onUpdateItem}>
                    <option value="">Remove {Items.name}</option>
                    {Items.Items.map((item) =>
                        <option value={item.id} key={"text-item-" + item.id}>{item.name}</option>
                    )}
                </select>
            );
        } else if (props.type === "section") {
            return(
                <select className={`${styles.select}`} value={props.item} onChange={onUpdateItem}>
                    <option value="">Select {Items.name}</option>
                    {Items.Items.map((item) =>
                        <option value={item.id} key={"section-item-" + item.id}>{item.name}</option>
                    )}
                </select>
            );
        }
    } else {
        if (props.type === "text") {
            return(
                <span className={`${styles.buffer}`}>
                    <Icon src="/icons/add.png" size="small" hover={true} hidden={false} altText="+" onClick={addDropdown} />
                </span>
            );
        }
    }

    return null;
}

export default ItemDropdown;