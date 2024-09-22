import fs from 'fs';
import path from 'path';
// import { Product } from "../models/product.model";
// import { Section } from "../models/section.model";
import { catchAsyncError } from '../utils/catchAsyncError.js';
export const deleteImage = catchAsyncError(async (req, res) => {
    let { image } = req.body;
    let photoPath = path.join(__dirname, '..', '..', 'uploads', image);
    const exist = fs.existsSync(photoPath);
    if (exist) {
        fs.unlink(photoPath, (err) => {
            if (err) {
                return res.status(400).send({ error_en: err.message });
            }
            else {
                return res
                    .status(200)
                    .send({ success_en: 'Image deleted Successfully', image });
            }
        });
    }
});
// ALL I NEED TO DO IS TO CHECK WITHER THE IMAGES IN THE UPLOADS FILE IS USED IN THE PRODUCT OR NOT
// IF IT IS NOT DELETE IT OTHERWISE DO NOTHING
export const autoDeleteImages = catchAsyncError(async (req, res) => {
    // first gets array of all the images
    // let products = (await Product.find({})).map(product => product.images)
    // let sections = (await Section.find({})).map(section => {
    //     if (section.image)
    //         return section.image
    // })
});
export const deletingImages = (req, res) => {
    const { images } = req.body;
    const basePath = path.join(__dirname, '..', '..', 'uploads');
    images.forEach((imgPath) => {
        let photoPath = basePath + imgPath;
        if (fs.existsSync(photoPath)) {
            // delete the image if exist
            fs.unlink(photoPath, (err) => {
                if (err) {
                    return res.status(400).send({ error_en: err.message });
                }
                else {
                    return res
                        .status(200)
                        .send({ success_en: 'Image deleted Successfully' });
                }
            });
        }
    });
};
