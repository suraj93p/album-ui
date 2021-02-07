import React from 'react';
import './style.css';

const ImageTile = ({ image, updateSelectedImages }) => (
    <div className='image-tile'>
        <input type="checkbox" className="checkbox" onChange={() => updateSelectedImages(image)} />
        <div className="image-box">
            <img className='image' src={image.raw} alt={image.name} />
        </div>
        <div className='image-title'>{image.name}</div>
        <div className='album-title'>{image.album}</div>
    </div>
)

export default ImageTile

