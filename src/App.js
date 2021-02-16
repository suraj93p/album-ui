import React, { useEffect, useState } from 'react'
import Title from './ui-components/common/header'
import AlbumPanel from './ui-components/album-panel/component'
import UploadPanel from './ui-components/upload-panel/component'
import { URLs, pageSizes, albumTypes } from './config/constants'
import { setCheckedFlag, objectToExtensibleArray } from './utils'
import './App.css'

const App = () => {
  // For Album Panel
  const [images, setImages] = useState([])

  // For Pagination
  const [paginationConfig, updatePaginationConfig] = useState({ pageNumber: 0, pageSize: pageSizes[0] })

  // For Deletion
  const [selectedImagesForDeletion, setSelectedImagesForDeletion] = useState([])

  // For Uploading Images
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [imageFilesToBeUploaded, updateImageFilesToBeUploaded] = useState([])
  const [albumTypeForUpload, updateAlbumTypeForUpload] = useState(albumTypes[0])

  useEffect(() => {
    fetchAllPhotos()
  }, [paginationConfig.pageSize])

  const fetchAllPhotos = () => {
    fetch(URLs.getPhotosList, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ skip: paginationConfig.pageNumber, limit: paginationConfig.pageSize })
    })
      .then(res => res.json())
      .then(response => {
        setImages(setCheckedFlag(response.documents, selectedImagesForDeletion))
      })
  }

  const deleteSelectedImages = () => {
    const imagesToDelete = images.filter(image => selectedImagesForDeletion.indexOf(image.id) > -1)
    const payload = imagesToDelete.reduce((initPayload, image) => {
      if (initPayload[image.album]) {
        initPayload[image.album].push([image.name])
      } else {
        initPayload[image.album] = [image.name]
      }

      return initPayload
    }, {})
    const transformedPayload = objectToExtensibleArray(payload, 'album', 'documents')
    fetch(URLs.deletePhotos, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transformedPayload)
    })
      .then(res => res.json())
      .then(response => {
        if (response.message === 'OK') {
          alert('Deletion succesful')
          fetchAllPhotos()
          setSelectedImagesForDeletion([])
        } else {
          alert('Deletion failed. The error is:' + response.message)
        }
      })
  }

  const uploadFileHandler = (albumTypeForUpload, imageFilesToBeUploaded) => {
    const formData = new FormData()
    formData.append('album', albumTypeForUpload)
    Array.from(imageFilesToBeUploaded).forEach(file => {
      formData.append('documents', file)
    })
    fetch(URLs.putPhotos, {
      method: 'PUT',
      body: formData
    })
      .then(res => res.json())
      .then(response => {
        if (response.message === 'OK') {
          alert('File upload succesful')
          fetchAllPhotos()
          setIsUploadModalOpen(false)
        } else {
          alert('File upload failed. The error is:' + response.message)
        }
      })
  }

  const updatePaginationHandler = (pageSize) => {
    updatePaginationConfig({ pageNumber: paginationConfig.pageNumber, pageSize: pageSize })
  }

  const updateSelectedImagesForDeletionHandler = (event, inputImageId) => {
    const selectedImage = images.find(image => image.id === inputImageId)
    if (event.target.checked) {
      selectedImagesForDeletion.push(inputImageId)
    } else {
      selectedImagesForDeletion.splice(selectedImagesForDeletion.indexOf(inputImageId), 1)
    }
    // Updating the array that stores images id of checked images
    setSelectedImagesForDeletion(selectedImagesForDeletion)
    // Updating the images checked status for album panel
    selectedImage.checked = event.target.checked
    setImages([...setCheckedFlag(images, selectedImagesForDeletion)])
  }

  const deleteImageHandler = (inputImage) => {
    fetch(`${URLs.deletePhotos}/${inputImage.album}/${inputImage.name}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(response => {
        if (response.message === 'OK') {
          alert('Deletion succesful')
          fetchAllPhotos()
        } else {
          alert('Deletion failed. The error is:' + response.message)
        }
      })
  }

  return (
    <>
      <div className='header'>
        <Title title='Photos' />
        <UploadPanel
          // For Deletion
          selectedImagesCount={selectedImagesForDeletion.length}
          deleteSelectedImages={deleteSelectedImages}
          // For Pagination
          paginationConfig={paginationConfig}
          updatePagination={updatePaginationHandler}
          // For Upload
          isUploadModalOpen={isUploadModalOpen}
          setIsUploadModalOpen={setIsUploadModalOpen}
          imageFilesToBeUploaded={imageFilesToBeUploaded}
          updateImageFilesToBeUploaded={updateImageFilesToBeUploaded}
          albumTypeForUpload={albumTypeForUpload}
          updateAlbumTypeForUpload={updateAlbumTypeForUpload}
          uploadFile={uploadFileHandler}
        />
      </div>
      <AlbumPanel
        images={images}
        areImagesSelected={selectedImagesForDeletion.length}
        // For Selecting Images to Delete
        updateSelectedImagesForDeletion={updateSelectedImagesForDeletionHandler}
        // For Deleting an Image
        deleteImage={deleteImageHandler}
      />
    </>
  )
}

export default App
