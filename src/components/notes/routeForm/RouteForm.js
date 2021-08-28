import React from 'react';
import styles from './styles/RouteForm.Module.css';
import Section from './Section/Section';
import Button from '../../common/Button';

class CreateRoute extends React.Component {
    constructor(props) {
        super(props);

        let gameId = props.match.params.gameId;
        let path = props.match.params.path;

        let route = {
            title: "",
            path: "",
            game: gameId,
            version: "1.0",
            sections: [{
                id: 0,
                text: [],
                items: []
            }]
        }

        if (path != null) {
            route = require('../../../notes/' + path + '.json');
        }

        this.state = route;

        this.addSection = this.addSection.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.importText = this.importText.bind(this);
        this.importJSON = this.importJSON.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.getBase64 = this.getBase64.bind(this);
        this.updateImage = this.updateImage.bind(this);
        this.generateDownload = this.generateDownload.bind(this);
        this.moveSectionUp = this.moveSectionUp.bind(this);
        this.moveSectionDown = this.moveSectionDown.bind(this);
        this.loadLastRouteEdit = this.loadLastRouteEdit.bind(this);
        this.deleteSection = this.deleteSection.bind(this);
        this.updateRoute = this.updateRoute.bind(this);
    }

    addSection(e) {
        e.preventDefault();

        const nameParts = e.target.id.split("-");
        const sectionId = parseInt(nameParts[1]);

        let newSections = this.state.sections;
        let newSection = {
            id: sectionId,
            text: [],
            items: []
        };

        newSections.splice(sectionId, 0, newSection);

        for (let i = sectionId + 1; i < newSections.length; i++) {
            newSections[i].id++;
        }

        this.setState({
            sections: newSections
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

    importText(text) {
        text = text.replace(/(\r\n|\n|\r)/gm, "\n");
        const lines = text.split("\n");
        let newSections = [];

        let sectionId = 0;

        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            const section = {
                id: sectionId,
                text: [],
                items: []
            }

            let textId = 0;
            while (line !== "") {
                const text = {
                    id: textId,
                    text: line
                }

                section.text.push(text);
                i++;
                textId++;

                if (i < lines.length) {
                    line = lines[i];
                } else {
                    line = "";
                }
            }

            newSections.push(section);
            sectionId++;
        }

        const newRoute = this.state;
        newRoute.sections = newSections;

        this.setState(newRoute);
    }

    importJSON(file) {
        const newRoute = JSON.parse(file);

        this.setState(newRoute);
    }

    handleUpload(file, callback) {
        let reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function () {
            callback(reader.result);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    handleInputChange(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let newRoute = this.state;

        if (name.includes("textImport")) {
            this.handleUpload(e.target.files[0], this.importText);
        } else if (name.includes("jsonImport")) {
            this.handleUpload(e.target.files[0], this.importJSON);
        } else {
            newRoute[name] = value;
        }

        this.setState(newRoute);

        try {
            localStorage.setItem("lastRouteEdit", JSON.stringify(newRoute));
        } catch(e) {
            console.log("Unable to save route to local storage. Route is likely too large.")
            console.log(e);
            localStorage.setItem("lastRouteEdit", null);
        }
    }

    moveSectionUp(e) {
        e.preventDefault();

        const nameParts = e.target.id.split("-");
        const sectionId = parseInt(nameParts[1]);

        // Stringify then parse JSON to create deep copy.
        let newSections = JSON.parse(JSON.stringify(this.state.sections));

        let chosenSection = newSections[sectionId];
        chosenSection.id = sectionId - 1;
        let aboveSection = newSections[sectionId - 1];
        aboveSection.id = sectionId;

        newSections[sectionId] = aboveSection;
        newSections[sectionId - 1] = chosenSection;

        this.setState({
            sections: newSections
        })
    }

    moveSectionDown(e) {
        e.preventDefault();

        const nameParts = e.target.id.split("-");
        const sectionId = parseInt(nameParts[1]);

        // Stringify then parse JSON to create deep copy.
        let newSections = JSON.parse(JSON.stringify(this.state.sections));

        let chosenSection = newSections[sectionId];
        chosenSection.id = sectionId + 1;
        let belowSection = newSections[sectionId + 1];
        belowSection.id = sectionId;

        newSections[sectionId] = belowSection;
        newSections[sectionId + 1] = chosenSection;

        this.setState({
            sections: newSections
        })
    }

    deleteSection(e) {
        e.preventDefault();

        const nameParts = e.target.id.split("-");
        const sectionId = parseInt(nameParts[1]);

        // JSON stringify, then JSON parse to make a deep copy.
        let newSections = JSON.parse(JSON.stringify(this.state.sections));

        for (let i = sectionId + 1; i < newSections.length; i++) {
            newSections[i].id--;
        }

        newSections.splice(sectionId, 1);

        this.setState({
            sections: newSections
        });
    }

    loadLastRouteEdit(e) {
        e.preventDefault();

        let newRoute = JSON.parse(localStorage.getItem("lastRouteEdit"));

        if (newRoute != null) {
            this.setState(newRoute);
        } else {
            alert("Error: No route found in local storage. Either there is nothing to load, or your route may have been too large. When your route gets large, try downloading the JSON file periodically to save your progress.");
        }
    }

    generateDownload(e) {
        e.preventDefault();

        let a = document.createElement('a');
        a.href = "data:text/json;charset=utf-8," + JSON.stringify(this.state);
        a.download = this.state.path + ".json";
        a.click();
    }

    updateRoute(sectionId, section) {
        // JSON stringify, then JSON parse to make a deep copy.
        let newRoute = JSON.parse(JSON.stringify(this.state));
        newRoute.sections[sectionId] = section;
        this.setState(newRoute)

        try {
            localStorage.setItem("lastRouteEdit", JSON.stringify(newRoute));
        } catch(e) {
            console.log("Unable to save route to local storage. Route is likely too large.")
            console.log(e);
            localStorage.setItem("lastRouteEdit", null);
        }
    }

    render() {
        let games = require("../../../resources/gamesList.json");
        let routes = require("../../../notes/routes.json");

        return(
            <div className={`${styles.wrapper}`}>
                <form className={`${styles.wrapper} ${styles.form}`}>
                    <div className={`${styles.routeInfo}`}>
                        <h2>Update your Route</h2>
                        <input type="text" name="title" className={`${styles.textInput}`} placeholder="Title" defaultValue={this.state.title} onBlur={this.handleInputChange} />
                        <input type="text" name="path" className={`${styles.textInput}`} placeholder="Path" defaultValue={this.state.path} onBlur={this.handleInputChange} />
                        <select name="game" className={`${styles.select}`} value={this.state.game} onChange={this.handleInputChange}>
                            <option value="">Select a game</option>
                            {games.map((game) =>
                                <option key={game} value={game}>{routes[game].name}</option>
                            )}
                        </select>
                        <div className="row">
                            <div>Import Text: <input type="file" name={"textImport"} onChange={this.handleInputChange} /></div>
                            <div>Import JSON: <input type="file" name={"jsonImport"} onChange={this.handleInputChange} /></div>
                            <Button text="Load Last Edit" size="medium" onClick={this.loadLastRouteEdit} />
                            <Button text="Generate JSON File" size="medium" onClick={this.generateDownload} />
                        </div>

                        <div className={`${styles.instructions}`}>
                            <h3>How to Use</h3>
                            <ul>
                                <li>Fill out information about your route above.</li>
                                <li>If you have a text file, separate each "Section" by new lines. Upload it via the import option above.</li>
                                <li>If you have an existing JSON file generated by the tool, upload it via the import option above.</li>
                                <li>When you are done (or need to save your progress), click the Generate JSON file button, then click Create JSON link to save your file.</li>
                                <li>When your route is ready, create a new branch of the <a href="https://github.com/RischDev/notes" target="_blank" rel="noreferrer">notes repository</a>. Follow the instructions in the README.</li>
                            </ul>
                        </div>
                    </div>

                    <div className={`${styles.sectionInfo}`}>
                        {this.state.sections.map((section) =>
                            <Section
                                key={"section-" + section.id}
                                section={section}
                                max={this.state.sections.length - 1}
                                game={this.state.game}
                                updateRoute={this.updateRoute}
                                moveSectionUp={this.moveSectionUp}
                                moveSectionDown={this.moveSectionDown}
                                addSection={this.addSection}
                                deleteSection={this.deleteSection}
                            />
                        )}
                        <div className="bottom-buffer"> </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default CreateRoute;