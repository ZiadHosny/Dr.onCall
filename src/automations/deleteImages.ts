import path from 'path'
import fs from 'fs'

const convertArrayToObject = (images: string[]) => {

    let imagesObj: any = {}
    images.forEach(image => {
        if (!imagesObj[image]) {
            imagesObj[image] = true
        }
    })
    return imagesObj;
}

const deleteImageFromUpload = (imagePath: string) => {
    const exist = fs.existsSync(imagePath)
    if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath)
    }
}

const deleteUnUsedImages = (images: string[]) => {
    const uploadsPath = path.join(__dirname, '..', '..', 'uploads')
    const assets = fs.readdirSync(uploadsPath)
    let imagesObject = convertArrayToObject(images)
    // convert the usedImages to object
    assets.forEach((asset: string) => {
        let assetPath = `${uploadsPath}/${asset}`;
        if (!imagesObject[asset]) {
            // its time for image to get Delted
            deleteImageFromUpload(assetPath)
        }
    })
}
