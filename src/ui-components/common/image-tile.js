import React from 'react'
import './style.css'

const ImageTile = ({ image, areImagesSelected, updateSelectedImagesForDeletion, deleteImage }) => (
  <div
    className={`image-tile
         ${areImagesSelected
                ? image.checked
                    ? ''
                    : 'overlay'
                : ''}
            `}
  >
    <input
      type='checkbox'
      className='checkbox'
      checked={image.checked}
      onChange={(event) => updateSelectedImagesForDeletion(event, image.id)}
    />
    <div className='image-box'>
      <img className='image' src={image.raw} alt={image.name} />
    </div>
    <div className='image-title'>{image.name}</div>
    <div className='album-title'>{image.album}</div>
    <button className='delete-image-btn' onClick={() => deleteImage(image)}>Delete</button>
  </div>
)

export default ImageTile
