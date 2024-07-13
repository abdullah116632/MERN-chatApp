import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import multer from "multer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const userStorage = multer.diskStorage({
    destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "..", "fileData");
      console.log("Upload path:", uploadPath);

      fs.mkdirSync(uploadPath, { recursive: true });
  
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    }
  });

const fileSend = multer({
    storage: userStorage,
})

export {fileSend}