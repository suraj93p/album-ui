import React, { useRef } from 'react'
import Modal from 'react-modal'
import { FileDrop } from 'react-file-drop'
import { areFileImages } from '../../utils'
import { albumTypes, modalStyle } from '../../config/constants'

import './style.css'

const UploadImageModal = (props) => {
  const inputRef = useRef();

  const onImageChangeHandler = (files) => {
    if (areFileImages(files)) {
      props.updateImageFilesToBeUploaded(files)
    } else {
      alert('Sorry, the file is invalid')
    }
  }

  const onAlbumChangeHandler = (event) => {
    props.updateAlbumTypeForUpload(event.target.value)
  }

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      style={modalStyle}
      ariaHideApp={false}
      contentLabel='Upload Photos'
    >
      <div className='modal-header'>
        <div className='title'>
          Upload photos
        </div>
        <button onClick={() => { props.updateImageFilesToBeUploaded([]); props.closeModal() }}>X</button>
      </div>
      <div className='modal-body'>
        <div className='drop-area' onClick={() => inputRef.current.click()}>
          <FileDrop
            onDrop={(files, event) => onImageChangeHandler(files, event)}
          >
            <input
              type="file"
              multiple
              ref={inputRef}
              onChange={(e) => onImageChangeHandler(e.target.files)}
              style={{ display: 'none' }}
            />
            Drag 'n' drop some files here, or click to select files
          </FileDrop>
        </div>
        <div className='selected-files'>
          {
            props.imageFilesToBeUploaded.length === 0 && <div className='no-file'>No files selected...</div>
          }
          {
            props.imageFilesToBeUploaded.length > 0 && <ul className='file-list'>
              {Array.from(props.imageFilesToBeUploaded).map(file => {
                return <li key={file.name}>{file.name}</li>
              })}
            </ul>
          }
        </div>
      </div>
      <div className='modal-footer'>
        <select value={props.albumTypeForUpload} onChange={onAlbumChangeHandler}>
          {albumTypes.map(type => {
            return <option key={type} value={type}>{type}</option>
          }
          )}
        </select>
        <div className='upload-action'>
          <button
            disabled={!(props.imageFilesToBeUploaded.length && props.albumTypeForUpload !== albumTypes[0])}
            onClick={() => props.uploadFile(props.albumTypeForUpload, props.imageFilesToBeUploaded)}
          >Upload
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default UploadImageModal
