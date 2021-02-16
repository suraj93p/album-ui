import React from 'react'
import UploadImageModal from '../common/upload-image-modal'
import { pageSizes } from '../../config/constants'
import './style.css'

const UploadPanel = ({
  selectedImagesCount,
  deleteSelectedImages,
  paginationConfig,
  updatePagination,
  isUploadModalOpen,
  setIsUploadModalOpen,
  imageFilesToBeUploaded,
  updateImageFilesToBeUploaded,
  albumTypeForUpload,
  updateAlbumTypeForUpload,
  uploadFile
}) => {
  const openModal = () => {
    setIsUploadModalOpen(true)
  }

  const closeModal = () => {
    setIsUploadModalOpen(false)
  }

  const changePageSize = (event) => {
    updatePagination(event.target.value)
  }

  return (
    <div className='action-panel display-flex'>
      {selectedImagesCount > 0 &&
        <div className='delete-section display-flex margin-right-5'>
          <button className='display-flex margin-right-5' onClick={deleteSelectedImages}>
            <img src='https://upload.wikimedia.org/wikipedia/commons/3/37/Icon_delete_2019_2.svg' className='delete-icon margin-right-5' />
            {`Delete ${selectedImagesCount} photo${selectedImagesCount > 1 ? 's' : ''}`}
          </button>
          |
        </div>
      }
      <div className='upload-section display-flex margin-right-5' onClick={openModal}>
        <img src='https://upload.wikimedia.org/wikipedia/commons/7/7b/Wlm-icon-upload-black.svg' className='upload-icon margin-right-5' />
        Upload
      </div>
      |
      <div className='pagination-section margin-5'>
        <select value={paginationConfig.pageSize} onChange={changePageSize}>
          {pageSizes.map(type => {
            return <option key={type} value={type}>{type}</option>
          }
          )}
        </select>
      </div>

      <UploadImageModal
        isOpen={isUploadModalOpen}
        onRequestClose={closeModal}
        closeModal={closeModal}
        imageFilesToBeUploaded={imageFilesToBeUploaded}
        updateImageFilesToBeUploaded={updateImageFilesToBeUploaded}
        albumTypeForUpload={albumTypeForUpload}
        updateAlbumTypeForUpload={updateAlbumTypeForUpload}
        uploadFile={uploadFile}
      />
    </div>
  )
}

export default UploadPanel
