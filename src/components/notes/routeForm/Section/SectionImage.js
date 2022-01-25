import React from 'react';
import PreviewImage from './PreviewImage';
import Icon from '../../../common/Icon';

function SectionImage(props) {
    const getBase64 = (file, callback) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            callback(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    return(
        <div>
            <label>Image: </label>
            <input type="file" onChange={ (e) => { getBase64(e.target.files[0], props.updateImage) } } />
            <Icon src="/icons/delete.png" size="small" hover={true} hidden={props.image == null} altText="X" onClick={props.deleteImage} />
            <PreviewImage image={props.image} />
        </div>
    );
}

export default SectionImage;