import React from 'react';
import PreviewImage from './PreviewImage';
import Icon from '../../../common/Icon';

class SectionImage extends React.PureComponent {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        const image = e.target.files[0];
        const name = e.target.name.split("-");
        const sectionId = parseInt(name[1]);

        this.getBase64(image, sectionId, this.props.updateImage);
    }

    getBase64(file, sectionId, callback) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            callback(sectionId, reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    render() {
        return(
            <div className="col-3">
                <label htmlFor={"image-" + this.props.sectionId}>Image: </label>
                <input type="file" name={"image-" + this.props.sectionId} onChange={this.onChange} />
                <Icon src="/icons/delete.png" id={"deleteImage-" + this.props.sectionId} hover={true} hidden={this.props.image == null} altText="X" onClick={this.props.deleteImage} />
                <PreviewImage image={this.props.image} />
            </div>
        );
    }
}

export default SectionImage;