require("dotenv").config();
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3-v2");
const LIMIT_UNEXPECTED_FILE = 10;
const path = require("path");
const s3Config = new AWS.S3({
  accessKeyId: process.env.AWS_IAM_USER_KEY,
  secretAccessKey: process.env.AWS_IAM_USER_SECRET,
  Bucket: process.env.AWS_BUCKET_NAME,
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "src/public/upload");
  },
  filename: (req, file, cb) => {
    const match = ["image/png", "image/jpeg"];
    if (match.indexOf(file.mimetype) === -1) {
      var message = `${file.originalname} is invalid. Only accept png/jpeg.`;
      return callback(message, null);
    }
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const inputStorage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "src/public/input");
  },
  filename: (req, file, cb) => {
    const match = ["image/png", "image/jpeg"];
    if (match.indexOf(file.mimetype) === -1) {
      var message = `${file.originalname} is invalid. Only accept png/jpeg.`;
      return callback(message, null);
    }
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const multerS3Config = multerS3({
  s3: s3Config,
  bucket: process.env.AWS_BUCKET_NAME,
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const singleUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
});
const multipleUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
}).array("media", LIMIT_UNEXPECTED_FILE);
const simple = multer().single("file");

const singleInput = multer({
  storage: inputStorage,
  fileFilter: fileFilter,
});
const multipleInput = multer({
  storage: inputStorage,
  fileFilter: fileFilter,
}).array("media", LIMIT_UNEXPECTED_FILE);

module.exports = {
  singleUpload,
  multipleUpload,
  simple,
  multipleInput,
  singleInput,
};
