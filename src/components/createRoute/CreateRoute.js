import React from 'react';
import TextButton from './TextButton';
import ItemButton from './ItemButton';
import ItemDropdown from './ItemDropdown';
import ModifierDropdown from './ModifierDropdown';

function DeleteText(props) {
    if (props.textId === 0) {
        return (
            <span className="delete"> </span>
        );
    }

    return (
        <img id={"deleteText-" + props.sectionId + "-" + props.textId} className="delete" onClick={props.onClick} src="/notes/icons/delete.png" alt="X" />
    )
}

function DeleteSection(props) {
    if (props.sectionId === 0) {
        return null;
    }

    return (
        <img id={"deleteSection-" + props.sectionId + "-"} className="deleteSection" onClick={props.onClick} src="/notes/icons/delete.png" alt="X" />
    )
}

function DeleteItem(props) {
    return (
        <img id={"deleteItem-" + props.sectionId + "-" + props.itemId} className="delete" onClick={props.onClick} src="/notes/icons/delete.png" alt="X"/>
    )
}

function PreviewImage(props) {
    if (props.image == null || props.image === "") {
        return null;
    }

    return (
        <div>
            <img className="preview" src={props.image} alt="" />
        </div>
    );
}

class CreateRoute extends React.Component {
    constructor(props) {
        super(props);

        let route = {
            title: "",
            path: "",
            game: "",
            version: "1.0",
            sections: [
                {
                    id: 0,
                    text: [
                        {
                            id: 0,
                            text: "",
                            item: -1
                        }
                    ],
                    items: []
                }
            ]
        }

        if (this.props.path != null) {
            route = require('../../notes/' + props.path + '.json');
        }

        this.state = {
            route: route
        }

        this.addSection = this.addSection.bind(this);
        this.addText = this.addText.bind(this);
        this.addItem = this.addItem.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getBase64 = this.getBase64.bind(this);
        this.updateImage = this.updateImage.bind(this);
        this.generateDownload = this.generateDownload.bind(this);
        this.deleteText = this.deleteText.bind(this);
        this.deleteSection = this.deleteSection.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.fileInput = React.createRef();
    }

    addSection(e) {
        e.preventDefault();

        let newRoute = this.state.route;
        newRoute.sections.push({
            id: newRoute.sections.length,
            text: [
                {
                    id: 0,
                    text: "",
                    item: -1
                }
            ],
            items: []
        });

        this.setState({
            route: newRoute
        });
    }

    addText(id) {
        let newRoute = this.state.route;
        newRoute.sections[id].text.push({
            id: newRoute.sections[id].text.length,
            text: "",
            card: -1
        });

        this.setState({
            route: newRoute
        });
    }

    addItem(id) {
        let newRoute = this.state.route;
        newRoute.sections[id].items.push({
            id: newRoute.sections[id].items.length,
            value: 0
        });

        this.setState({
            route: newRoute
        });
    }

    getBase64(file, id, callback) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            callback(reader.result, id)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    updateImage(data, id) {
        let newRoute = this.state.route;

        newRoute.sections[id].image = data;

        this.setState({
            route: newRoute
        });
    }

    handleInputChange(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let newRoute = this.state.route;

        // If the input that was changed was text or map, need to update only the appropriate section info.
        if (name.includes("textValue")) {
            let nameParts = name.split("-");
            let sectionId = parseInt(nameParts[1]);
            let textId = parseInt(nameParts[2]);

            newRoute.sections[sectionId].text[textId].text = value;
        } else if (name.includes("image")) {
            let nameParts = name.split("-");
            let sectionId = parseInt(nameParts[1]);

            this.getBase64(e.target.files[0], sectionId, this.updateImage);
        } else if (name.includes("textItem")) {
            let nameParts = name.split("-");
            let sectionId = parseInt(nameParts[1]);
            let textId = parseInt(nameParts[2]);

            newRoute.sections[sectionId].text[textId].item = parseInt(value);
        } else if (name.includes("sectionItem")) {
            let nameParts = name.split("-");
            let sectionId = parseInt(nameParts[1]);
            let itemId = parseInt(nameParts[2]);

            newRoute.sections[sectionId].items[itemId].value = parseInt(value);
        } else if (name.includes("textModifier")) {
            let nameParts = name.split("-");
            let sectionId = parseInt(nameParts[1]);
            let textId = parseInt(nameParts[2]);

            newRoute.sections[sectionId].text[textId].modifier = value;
        } else if (name.includes("sectionModifier")) {
            let nameParts = name.split("-");
            let sectionId = parseInt(nameParts[1]);
            let itemId = parseInt(nameParts[2]);

            newRoute.sections[sectionId].items[itemId].modifier = value;
        } else {
            newRoute[name] = value;
        }

        this.setState({
            route: newRoute
        });

        console.log(newRoute);
    }

    deleteText(e) {
        const nameParts = e.target.id.split("-");
        const sectionId = parseInt(nameParts[1]);
        const textId = parseInt(nameParts[2]);

        let newRoute = this.state.route;

        for (let i = textId + 1; i < newRoute.sections[sectionId].text.length; i++) {
            newRoute.sections[sectionId].text[i].id--;
        }

        newRoute.sections[sectionId].text.splice(textId, 1);

        this.setState({
            route: newRoute
        });
    }

    deleteSection(e) {
        e.preventDefault();
        const nameParts = e.target.id.split("-");
        const sectionId = parseInt(nameParts[1]);

        let newRoute = this.state.route;

        for (let i = sectionId + 1; i < newRoute.sections.length; i++) {
            newRoute.sections[i].id--;
        }

        newRoute.sections.splice(sectionId, 1);

        this.setState({
            route: newRoute
        });
    }

    deleteItem(e) {
        const nameParts = e.target.id.split("-");
        const sectionId = parseInt(nameParts[1]);
        const itemId = parseInt(nameParts[2]);

        let newRoute = this.state.route;

        for (let i = itemId + 1; i < newRoute.sections[sectionId].items.length; i++) {
            newRoute.sections[sectionId].items[i].id--;
        }

        newRoute.sections[sectionId].items.splice(itemId, 1);

        this.setState({
            route: newRoute
        });
    }

    generateDownload(e) {
        e.preventDefault();

        let jsonString = JSON.stringify(this.state.route);

        this.setState({
            string: jsonString
        });
    }

    render() {
        let downloadUrl = this.state.string == null ? "" : <a className="jsonLink" href={`data:text/json;charset=utf-8,${this.state.string}`} download={this.state.route.path + ".json"}> Create JSON </a>;
        let Items = require('../../resources/ItemNames.json');
        if (this.state.route.game !== "" && this.state.route.game != null) {
            Items = require('../../resources/' + this.state.route.game + '/ItemNames.json');
        }

        return(
            <div className="wrapper">
                <form className="routeForm wrapper">
                    <div className="routeInfo">
                        <h2>Update your Route</h2>
                        <input type="text" name="title" placeholder="Title" defaultValue={this.state.route.title} onBlur={this.handleInputChange} />
                        <input type="text" name="path" placeholder="Path" defaultValue={this.state.route.path} onBlur={this.handleInputChange} />
                        <select name="game" className="game-select" value={this.state.route.game} onChange={this.handleInputChange}>
                            <option value="">Select a game</option>
                            <option value="MMBN1">Mega Man Battle Network</option>
                            <option value="MMBN2">Mega Man Battle Network 2</option>
                            <option value="MMBN3">Mega Man Battle Network 3</option>
                            <option value="MMBN4">Mega Man Battle Network 4</option>
                            <option value="MMBN5">Mega Man Battle Network 5</option>
                            <option value="MMBN6">Mega Man Battle Network 6</option>
                            <option value="MMSF1">Mega Man Star Force 1</option>
                            <option value="MMSF2">Mega Man Star Force 2</option>
                            <option value="MMSF3">Mega Man Star Force 3</option>
                        </select>
                        <div className="row">
                            <button className="btn" onClick={this.addSection}> Add Section </button>
                            <button className="btn" onClick={this.generateDownload}>Generate JSON file</button>
                        </div>
                        {downloadUrl}
                    </div>

                    <div className="sectionInfo">
                        {this.state.route.sections.map((section) =>
                            <div id={"section-" + section.id} className="formSection border-bottom">
                                <h3 className="sectionHeader">Section {section.id + 1}</h3>
                                <DeleteSection sectionId={section.id} onClick={this.deleteSection} />
                                <div className="wrapper">
                                    <div className="col-6">
                                        {section.text.map((text) =>
                                            <div>
                                                <textarea name={"textValue-" + section.id + "-" + text.id} defaultValue={text.text} placeholder="Text" onBlur={this.handleInputChange} />
                                                <ItemDropdown type="text" sectionId={section.id} textId={text.id} value={text.item} game={this.state.route.game} onChange={this.handleInputChange} />
                                                <ModifierDropdown type="text" sectionId={section.id} textId={text.id} itemValue={text.item} value={text.modifier} game={this.state.route.game} onChange={this.handleInputChange} />
                                                <DeleteText sectionId={section.id} textId={text.id} onClick={this.deleteText} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-3">
                                        {section.items.map((item) =>
                                            <div>
                                                <ItemDropdown type="section" sectionId={section.id} itemId={item.id} value={item.value} game={this.state.route.game} onChange={this.handleInputChange} />
                                                <ModifierDropdown type="section" sectionId={section.id} itemId={item.id} itemValue={item.value} value={item.modifier} game={this.state.route.game} onChange={this.handleInputChange} />
                                                <DeleteItem sectionId={section.id} itemId={item.id} onClick={this.deleteItem} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-3">
                                        <label htmlFor={"image-" + section.id}>Image: </label>
                                        <input type="file" name={"image-" + section.id} ref={this.fileInput} onChange={this.handleInputChange} />
                                        <PreviewImage image={section.image} />
                                    </div>
                                </div>
                                <div className="wrapper">
                                    <div className="col-6">
                                        <TextButton addText={this.addText} id={section.id} />
                                    </div>
                                    <div className="col-3">
                                         <ItemButton addItem={this.addItem} id={section.id} itemName={Items.name} />
                                    </div>
                                    <div className="col-3">

                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="bottom-buffer"> </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default CreateRoute;