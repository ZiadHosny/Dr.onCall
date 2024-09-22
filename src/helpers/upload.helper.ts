import multer from 'multer'

const memoryStorage = multer.memoryStorage();

export const uploadMemory = multer({
    storage: memoryStorage,
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const date = Date.now()
        const type = file.originalname.slice(file.originalname.indexOf('.'))

        cb(null, file.fieldname + date + '-' + type)
    }
})

export const upload = multer({ storage })
