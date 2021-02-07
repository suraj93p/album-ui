import React from 'react';
import Modal from 'react-modal';
import { FileDrop } from 'react-file-drop';
import { areFileImages } from "../../utils";
import { albumTypes } from "../../config/constants";
import { modalStyle } from "../../config/constants";
import './style.css';

const UploadImageModal = (props) => {
    const onImageChangeHandler = (files) => {
        if (areFileImages(files)) {
            props.updateImageFiles(files);
        } else {
            alert("Sorry, the file is invalid");
        }
    };

    const onAlbumChangeHandler = (event) => {
        props.updateAlbumType(event.target.value);
    }

    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={props.onRequestClose}
            style={modalStyle}
            ariaHideApp={false}
            contentLabel="Upload Photos"
        >
            <div className="modal-header">
                <div className="title">
                    Upload photos
                </div>
                <button onClick={() => { props.updateImageFiles([]); props.closeModal() }}>X</button>
            </div>
            <div className="modal-body">
                <div className="drop-area">
                    <FileDrop
                        onDrop={(files, event) => onImageChangeHandler(files, event)}
                    >
                        Drop some files here!
        </FileDrop>
                </div>
                <div className="selected-files">
                    {
                        props.imageFiles.length === 0 && <div className="no-file">No files selected...</div>
                    }
                    {
                        props.imageFiles.length > 0 && <ul className="file-list">
                            {Array.from(props.imageFiles).map(file => {
                                return <li key={file.name}>{file.name}</li>
                            })}
                        </ul>
                    }
                </div>
            </div>
            <div className="modal-footer">
                <select value={props.albumType} onChange={onAlbumChangeHandler}>
                    {albumTypes.map(type => {
                        return <option key={type} value={type}>{type}</option>
                    }
                    )}
                </select>
                <div className="upload-action">
                    <button
                        disabled={!props.imageFiles.length}
                        onClick={() => props.uploadFileHandler(props.albumType, props.imageFiles)}
                    >Upload</button>
                </div>
            </div>
        </Modal>
    )
}

export default UploadImageModal;