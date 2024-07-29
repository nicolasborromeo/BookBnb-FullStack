import validator from "validator"

export const validateImages = (images) => {
    if(images['1'] && validator.isURL(images['1'])) return false
    return true
}
