import React, { Fragment } from 'react';
import ImageTile from '../common/image-tile';
import './style.css';

const AlbumPanel = ({ images, count, updateSelectedImages }) => {
    return (
        <Fragment>
            <div className='album-images'>
                {count > 0 &&
                    <div className='image-row'>
                        {images.slice(0, count).map(item => (
                            <ImageTile
                                key={item.id}
                                image={item}
                                updateSelectedImages={updateSelectedImages}
                            />
                        ))}
                    </div>
                }
            </div>
        </Fragment>
    )
}

export default AlbumPanel