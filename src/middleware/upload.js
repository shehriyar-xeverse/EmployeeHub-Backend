import multer from "multer";

const storge = multer.memoryStorage();

const upload = multer({
    storge,
    limits : {
        fileSize : 2 * 1024 * 1024
    }
})


export {upload}