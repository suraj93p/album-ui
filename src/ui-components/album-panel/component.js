import React from 'react'
import ImageTile from '../common/image-tile'
import './style.css'

const AlbumPanel = ({ images, areImagesSelected, updateSelectedImagesForDeletion, deleteImage }) => {
  return (
    <>
      <div className='album-images'>
        <div className='image-row'>
          {images.map(item => (
            <ImageTile
              key={item.id}
              image={item}
              areImagesSelected={areImagesSelected}
              updateSelectedImagesForDeletion={updateSelectedImagesForDeletion}
              deleteImage={deleteImage}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default AlbumPanel
