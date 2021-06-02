import React from 'react';

class PreviewImage extends React.Component {
    render() {
        if (this.props.image == null || this.props.image === "") {
            return null;
        }

        return (
            <div>
                <img className="preview" src={this.props.image} alt="" />
            </div>
        );
    }
}

export default PreviewImage;