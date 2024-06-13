import multer from "multer";

const userStorage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "server/fileData")
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + "-" + file.originalname)
    }
});

const fileSend = multer({
    storage: userStorage,
})

export {fileSend}