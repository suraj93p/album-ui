export const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

export const validFileTypes = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/svg+xml',
  'image/tiff',
  'image/webp',
  'image/vnd.microsoft.icon'
]

export const albumTypes = ['Select album', 'Travel', 'Personal', 'Food', 'Nature', 'Other']

export const pageSizes = [5, 10, 25, 50, 100, 250, 500]

export const baseURL = 'http://localhost:8888/photos'

export const URLs = {
  getPhotosList: `${baseURL}/list`,
  putPhotos: `${baseURL}`,
  deletePhotos: `${baseURL}`
}
