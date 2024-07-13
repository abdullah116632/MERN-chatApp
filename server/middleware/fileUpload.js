import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const userStorage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, path.resolve(__dirname, "..", "fileData"))
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + "-" + file.originalname)
    }
});

const fileSend = multer({
    storage: userStorage,
})

export {fileSend}