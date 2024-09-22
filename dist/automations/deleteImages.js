import path from 'path';
import fs from 'fs';
const convertArrayToObject = (images) => {
    let imagesObj = {};
    images.forEach(image => {
        if (!imagesObj[image]) {
            imagesObj[image] = true;
        }
    });
    return imagesObj;
};
const deleteImageFromUpload = (imagePath) => {
    const exist = fs.existsSync(imagePath);
    if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
    }
};
const deleteUnUsedImages = (images) => {
    const uploadsPath = path.join(__dirname, '..', '..', 'uploads');
    const assets = fs.readdirSync(uploadsPath);
    let imagesObject = convertArrayToObject(images);
    // convert the usedImages to object
    assets.forEach((asset) => {
        let assetPath = `${uploadsPath}/${asset}`;
        if (!imagesObject[asset]) {
            // its time for image to get Delted
            deleteImageFromUpload(assetPath);
        }
    });
};
