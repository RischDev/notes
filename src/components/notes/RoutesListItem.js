import React, { Suspense } from 'react';
import { Link } from "react-router-dom";
import styles from './styles/RoutesListItem.Module.css';
import Icon from '../common/Icon';
import useSuspenseResource from '../common/useSuspense';

function RoutesListItem(props) {
    const path = props.path;
    const notesResource = useSuspenseResource(async () => {
        const response = await fetch(
            `${process.env.PUBLIC_URL}/notes/${path}.json`,
        );

        return await response.json();
    }, [path]);

    return (
        <Suspense fallback="Loading...">
            <RoutesListItemImpl {...props} notesResource={notesResource} gameId={props.gameId} path={props.path} />
        </Suspense>
    );
}

function RoutesListItemImpl(props) {
    const notes = props.notesResource.read();

    return(
        <div className={styles.wrapper}>
            <Link to={"/notes/game/" + props.gameId + "/route/" + props.path} className={`${styles.link} col-5 col-m-6`}>
                <div>
                    {notes.title}
                </div>
            </Link>
            <Link to={"/notes/game/" + props.gameId + "/route/" + props.path} className={`${styles.link} col-2 hidden-mobile`}>
                <div>
                    {notes.category}
                </div>
            </Link>
            <Link to={"/notes/game/" + props.gameId + "/route/" + props.path} className={`${styles.link} col-2 col-m-4`}>
                <div>
                    {notes.author}
                </div>
            </Link>
            <Link to={"/notes/game/" + props.gameId + "/route/" + props.path} className={`${styles.link} col-2 hidden-mobile`}>
                <div>
                    {notes.version}
                </div>
            </Link>
            <Link to={"/notes/editRoute/" + props.path} className={`${styles.link} col-1 col-m-2`}>
                <Icon src="/icons/edit.png" size="small" altText="Edit" hover={true} hidden={false} />
            </Link>
        </div>
    );
}

export default RoutesListItem;