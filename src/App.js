import React, { Fragment, useEffect, useState } from 'react';
import Title from './ui-components/common/header';
import AlbumPanel from './ui-components/album-panel/component';
import UploadPanel from './ui-components/upload-panel/component';
import { URLs, pageSizes, albumTypes } from './config/constants';
import './App.css';

const App = () => {

  // For Album Panel
  const [images, setImages] = useState([]);
  const [count, setCount] = useState(10);

  // For Pagination
  const [paginationConfig, updatePaginationConfig] = useState({ pageNumber: 0, pageSize: pageSizes[0] });

  // For Deletion
  const [selectedImages, setSelectedImages] = useState([]);

  // For Uploading Images
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [imageFiles, updateImageFiles] = useState([]);
  const [albumType, updateAlbumType] = useState(albumTypes[1]);

  useEffect(() => {
    fetchAllPhotos();
  }, [paginationConfig.pageSize]);

  const fetchAllPhotos = () => {
    fetch(URLs.getPhotosList, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'skip': paginationConfig.pageNumber, 'limit': paginationConfig.pageSize })
    })
      .then(res => res.json())
      .then(response => {
        setImages(response.documents);
        setCount(response.count);
      });
  }

  const deleteSelectedImages = () => {
    const payload = selectedImages.reduce((initPayload, image) => {
      if (initPayload[image.album]) {
        initPayload[image.album].push([image.name]);
      } else {
        initPayload[image.album] = [image.name];
      }

      return initPayload;
    }, {});
    let transformedPayload = [];
    for (const [key, value] of Object.entries(payload)) {
      transformedPayload.push({ 'album': key, 'documents': value.join(",") });
    }
    fetch(URLs.deletePhotos, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transformedPayload)
    })
      .then(res => res.json())
      .then(response => {
        if (response.message === 'OK') {
          alert("Deletion succesful");
          fetchAllPhotos();
          setSelectedImages([]);
        } else {
          alert("Deletion failed. The error is:" + response.message);
        }
      })
  }

  const uploadFileHandler = (albumType, imageFiles) => {
    const formData = new FormData();
    formData.append('album', albumType);
    Array.from(imageFiles).forEach(file => {
      formData.append('documents', file)
    });
    fetch(URLs.putPhotos, {
      method: 'PUT',
      body: formData
    })
      .then(res => res.json())
      .then(response => {
        if (response.message === 'OK') {
          alert("File upload succesful");
          fetchAllPhotos();
          setIsUploadModalOpen(false);
        } else {
          alert("File upload failed. The error is:" + response.message);
        }
      })
  }

  const updatePaginationHandler = (pageSize) => {
    updatePaginationConfig({ pageNumber: paginationConfig.pageNumber, pageSize: pageSize });
  }

  const updateSelectedImagesHandler = (inputImage) => {
    const inputImageIndexInSelectedImages = selectedImages.map(image => image.id).indexOf(inputImage.id);
    if (inputImageIndexInSelectedImages > -1) {
      selectedImages.splice(inputImageIndexInSelectedImages, 1)
    } else {
      selectedImages.push(inputImage);
    }
    setSelectedImages([...selectedImages]);
  }

  return (
    <Fragment>
      <div className='header'>
        <Title title='Photos' />
        <UploadPanel
          // For Deletion
          selectedImagesCount={selectedImages.length}
          deleteSelectedImages={deleteSelectedImages}
          // For Pagination
          paginationConfig={paginationConfig}
          updatePagination={updatePaginationHandler}
          // For Upload
          isUploadModalOpen={isUploadModalOpen}
          setIsUploadModalOpen={setIsUploadModalOpen}
          imageFiles={imageFiles}
          updateImageFiles={updateImageFiles}
          albumType={albumType}
          updateAlbumType={updateAlbumType}
          uploadFileHandler={uploadFileHandler}
        />
      </div>
      <AlbumPanel
        images={images}
        count={count}
        // For Selecting Images to Delete
        updateSelectedImages={updateSelectedImagesHandler}
      />
    </Fragment>
  )
}

export default App;
