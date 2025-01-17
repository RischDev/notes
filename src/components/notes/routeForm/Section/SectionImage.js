/** @format */

import React from 'react';
import PreviewImage from './PreviewImage';
import Icon from '../../../common/Icon';
import styles from './styles/SectionImage.module.css';

function shouldUpdate(oldProps, newProps) {
    if (oldProps.image !== newProps.image) {
        return false;
    } else if (oldProps.updateImage !== newProps.updateImage) {
        return false;
    }

    return true;
}

const SectionImage = React.memo((props) => {
    const getBase64 = (file, callback) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            callback(reader.result);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    };

    let deleteIcon;
    if (props.image != null) {
        deleteIcon = (
            <Icon
                src="/icons/delete.png"
                size="small"
                hover={true}
                grayscale={true}
                altText="X"
                onClick={props.deleteImage}
            />
        );
    }

    return (
        <div className={`${styles.wrapper}`}>
            <div className={`${styles.input}`}>
                <input
                    type="file"
                    onChange={(e) => {
                        getBase64(e.target.files[0], props.updateImage);
                    }}
                />
                {deleteIcon}
            </div>
            <PreviewImage image={props.image} />
        </div>
    );
}, shouldUpdate);

export default SectionImage;
