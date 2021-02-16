import { validFileTypes } from '../config/constants'

export const areFileImages = (files) => {
  return Array.from(files).every(file => {
    return validFileTypes.indexOf(file.type) > -1
  })
}

export const setCheckedFlag = (images, selectionArray) => {
  images.forEach(image => {
    if (selectionArray.indexOf(image.id) > -1) {
      image.checked = true
    } else {
      image.checked = false
    }
  })

  return images
}

export const objectToExtensibleArray = (objInput, key1, key2) => {
  const transformedPayload = []
  for (const [key, value] of Object.entries(objInput)) {
    transformedPayload.push({ [key1]: key, [key2]: value.join(',') })
  }

  return transformedPayload
}