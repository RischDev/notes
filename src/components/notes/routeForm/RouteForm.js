import React, { Suspense} from 'react';
import styles from './styles/RouteForm.Module.css';
import Route from '../route/Route';
import SectionList from './SectionList';
import RouteInfo from './RouteInfo';
import useSuspenseResource from '../../common/useSuspense';

const equal = require("deep-equal");
const routes = require("../../../notes/routes.json");

function RouteForm(props) {
    const path = props.match.params.path;

    const notesResource = useSuspenseResource(async () => {
        const response = await fetch(
            `${process.env.PUBLIC_URL}/notes/${path}.json`,
        );

        return await response.json();
    }, [path]);

    return (
        <Suspense fallback="Loading...">
            <RouteFormImpl {...props} notesResource={notesResource} />
        </Suspense>
    );
}

class RouteFormImpl extends React.Component {
    constructor(props) {
        super(props);

        let gameId = props.match.params.gameId;
        let path = props.match.params.path;

        let initialState = {};
        if (gameId != null) {
            initialState = routes[gameId].initialState;
        }

        let route = {
            title: "",
            path: "",
            game: gameId,
            version: "1.0",
            initialState: initialState,
            sections: [{
                id: 0,
                text: [],
                items: []
            }],
            preview: false,
            numSections: 1
        }

        if (path != null) {
            route = props.notesResource.read();
            route.preview = false;
            route.numSections = Math.min(10, route.sections.length);

            initialState = routes[route.game].initialState;

            // If initial state is different, the state variables need to be updated
            if (!equal(initialState, route.initialState)) {
                route.initialState = initialState;

                // TODO: Update state variables in each section to add new keys.
            }
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
        this.updateNumSections = this.updateNumSections.bind(this);
        this.updateRoute = this.updateRoute.bind(this);
        this.swapPreview = this.swapPreview.bind(this);
    }

    addSection(e) {
        e.preventDefault();

        const nameParts = e.target.id.split("-");
        const sectionId = parseInt(nameParts[1]);

        let newSections = this.state.sections;
        let newSection = {
            id: sectionId,
            text: [],
            items: [],
        };

        newSections.splice(sectionId, 0, newSection);

        for (let i = sectionId + 1; i < newSections.length; i++) {
            newSections[i].id++;
        }

        this.setState({
            sections: newSections,
            numSections: this.state.numSections + 1
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
        } else if (name.includes("game")) {
            newRoute[name] = value;

            // Reset state for each section, update initial state
            if (value !== "") {
                newRoute.initialState = routes[value].initialState;
            } else {
                newRoute.initialState = null;
            }
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
            sections: newSections,
            numSections: this.state.numSections - 1
        });
    }

    updateNumSections() {

        this.setState({
            numSections: Math.min(this.state.numSections + 10, this.state.sections.length)
        })
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

        const route = {
            title: this.state.title,
            path: this.state.path,
            game: this.state.game,
            version: this.state.version,
            initialState: this.state.initialState,
            sections: this.state.sections
        }

        let a = document.createElement('a');
        a.href = "data:text/json;charset=utf-8," + JSON.stringify(route);
        a.download = route.path + ".json";
        a.click();
    }

    updateRoute(sectionId, section) {
        // JSON stringify, then JSON parse to make a deep copy.
        let newRoute = JSON.parse(JSON.stringify(this.state));
        newRoute.sections[sectionId] = section;
        this.setState(newRoute);

        try {
            localStorage.setItem("lastRouteEdit", JSON.stringify(newRoute));
        } catch(e) {
            console.log("Unable to save route to local storage. Route is likely too large.")
            console.log(e);
            localStorage.setItem("lastRouteEdit", null);
        }
    }

    swapPreview() {
        this.setState({
            preview: !this.state.preview,
            numSections: 10
        });
    }

    render() {
        if (this.state.preview) {
            return(
                <div>
                    <Route notes={this.state} preview={true} swapPreview={this.swapPreview}  />
                </div>
            );
        } else {
            return(
                <form className={`${styles.wrapper} ${styles.form}`}>
                    <RouteInfo
                        title={this.state.title}
                        path={this.state.path}
                        game={this.state.game}
                        handleInputChange={this.handleInputChange}
                        loadLastRouteEdit={this.loadLastRouteEdit}
                        generateDownload={this.generateDownload}
                        swapPreview={this.swapPreview}
                    />

                    <SectionList
                        sections={this.state.sections}
                        initialState={this.state.initialState}
                        numSections={this.state.numSections}
                        game={this.state.game}
                        updateRoute={this.updateRoute}
                        moveSectionUp={this.moveSectionUp}
                        moveSectionDown={this.moveSectionDown}
                        addSection={this.addSection}
                        deleteSection={this.deleteSection}
                        updateNumSections={this.updateNumSections}
                    />
                </form>
            );
        }
    }
}

export default RouteForm;