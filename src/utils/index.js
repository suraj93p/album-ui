import { validFileTypes } from "../config/constants";

export const areFileImages = (files) => {
    return Array.from(files).every(file => {
        return validFileTypes.indexOf(file.type) > -1;
    });
}