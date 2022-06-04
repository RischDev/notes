/** @format */

import { useCallback, useContext } from 'react';
import { Buffer } from 'buffer';
import styles from './styles/RouteInfo.Module.css';
import RouteContext from '../../common/RouteContext';
import Button from '../../common/Button';

function RouteInfo(props) {
    const { route, preview, setContext } = useContext(RouteContext);

    const games = require('../../../resources/gamesList.json');
    const routes = require('../../../notes/routes.json');

    const generateDownload = useCallback(
        (e) => {
            e.preventDefault();

            console.log(route);

            let a = document.createElement('a');
            a.href =
                'data:text/json;base64;charset=utf-8,' +
                Buffer.from(JSON.stringify(route)).toString('base64');
            a.download = route.path + '.json';
            a.click();
        },
        [route],
    );

    const importText = (text) => {
        text = text.replace(/(\r\n|\n|\r)/gm, '\n');
        const lines = text.split('\n');
        let newSections = [];

        let sectionId = 0;

        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            const section = {
                id: sectionId,
                text: [],
                items: [],
            };

            let textId = 0;
            while (line !== '') {
                const text = {
                    id: textId,
                    text: line,
                };

                section.text.push(text);
                i++;
                textId++;

                if (i < lines.length) {
                    line = lines[i];
                } else {
                    line = '';
                }
            }

            newSections.push(section);
            sectionId++;
        }

        setContext({
            route: { ...route, sections: newSections },
            numSections: Math.min(10, newSections.length),
        });
    };

    const importJSON = (file) => {
        const route = JSON.parse(file);
        const gameInfo = require('../../../resources/' +
            route.game +
            '/ItemNames.json');
        setContext({
            route: route,
            numSections: Math.min(10, route.sections.length),
            gameInfo: gameInfo,
        });
    };

    const handleUpload = (file, callback) => {
        let reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = function () {
            callback(reader.result);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    };

    const updateGame = useCallback(
        (newGame) => {
            let gameInfo = require('../../../resources/ItemNames.json');
            if (newGame !== '' && newGame != null) {
                gameInfo = require('../../../resources/' +
                    newGame +
                    '/ItemNames.json');
            }

            setContext({
                route: {
                    ...route,
                    game: newGame,
                    initialState: gameInfo.initialState,
                    initialFolderEdit: gameInfo.initialFolderEdit,
                },
                gameInfo: gameInfo,
            });
        },
        [route, setContext],
    );

    return (
        <div className={`${styles.routeInfo}`}>
            <h2 className={`${styles.header}`}>Update your Route</h2>

            <label htmlFor="title" className={`${styles.label}`}>
                Route Name
            </label>
            <input
                type="text"
                name="title"
                className={`${styles.textInput}`}
                defaultValue={route.title}
                onBlur={(e) =>
                    setContext({ route: { ...route, title: e.target.value } })
                }
            />

            <label htmlFor="path" className={`${styles.label}`}>
                Path
            </label>
            <input
                type="text"
                name="path"
                className={`${styles.textInput}`}
                defaultValue={route.path}
                onBlur={(e) =>
                    setContext({ route: { ...route, path: e.target.value } })
                }
            />

            <label htmlFor="game" className={`${styles.label}`}>
                Game
            </label>
            <select
                name="game"
                className={`${styles.select}`}
                value={route.game}
                onChange={(e) => updateGame(e.target.value)}>
                <option value=""> </option>
                {games.map((game) => (
                    <option key={game} value={game}>
                        {routes[game].name}
                    </option>
                ))}
            </select>

            <label htmlFor="textImport" className={`${styles.label}`}>
                Import Text
            </label>
            <input
                type="file"
                name={'textImport'}
                className={`${styles.fileInput}`}
                onChange={(e) => handleUpload(e.target.files[0], importText)}
            />
            <label htmlFor="jsonImport" className={`${styles.label}`}>
                Import JSON
            </label>
            <input
                type="file"
                name={'jsonImport'}
                className={`${styles.fileInput}`}
                onChange={(e) => handleUpload(e.target.files[0], importJSON)}
            />

            <div className={`${styles.wrapper}`}>
                <Button
                    text="Load Last Edit"
                    size="medium"
                    className={`${styles.btn}`}
                    onClick={props.loadLastRouteEdit}
                />
                <Button
                    text="Save JSON File"
                    size="medium"
                    className={`${styles.btn}`}
                    onClick={generateDownload}
                />
                <Button
                    text="Preview"
                    size="medium"
                    className={`${styles.btn}`}
                    onClick={() => setContext({ preview: !preview })}
                />
            </div>
        </div>
    );
}

export default RouteInfo;
