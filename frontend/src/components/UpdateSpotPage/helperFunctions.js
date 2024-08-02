export const formatImages = (imgArr) => {
    console.log(imgArr)
    const previewImageObj = imgArr.filter(img => img.preview)
    const previewImgUrl = previewImageObj[0].url
    const otherImagesArray = imgArr.filter(img => !img.preview)
    let images = {}
    otherImagesArray.forEach((img, i)=>{
        images[i + 2] = img.url
    })
    const formattedImages = {1: previewImgUrl, ...images}
    return formattedImages

}
