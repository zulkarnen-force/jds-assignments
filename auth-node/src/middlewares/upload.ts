import multer from "multer";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img/avatar");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${Date.now()}-${Math.round(Math.random() * 1e9)}.${file.originalname
        .split(".")
        .pop()}`
    );
  },
});

const upload = multer({ storage: storage });
export default upload;
