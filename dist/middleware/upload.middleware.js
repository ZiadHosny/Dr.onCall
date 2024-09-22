import multer from "multer";
const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        const imageExtension = file.mimetype.split("/")[1];
        const filename = `${file.originalname}-${Date.now()}.${imageExtension}`;
        const fileUrl = `${process.env.APP_URL}/uploads/${filename}`;
        req.body.fileUrl = fileUrl;
        req.body.file = filename;
        cb(null, filename);
    },
});
const uploadDisk = multer({
    storage: diskStorage,
    // limits: { fileSize: 1024 * 1024 * 5 },  // 5MB
});
export { uploadDisk };
