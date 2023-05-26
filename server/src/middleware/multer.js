const multer = require("multer");
const path = require("path");
// const { LIMIT_UNEXPECTED_FILE } = require(`${__basedir}/const/value.js`);
const LIMIT_UNEXPECTED_FILE = 10;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // const { destination } = req.body;
    // if (!destination) throw error("body empty");

    // if (destination) cb(null, `${__basedir}/public/upload/${destination}`);
    cb(null, `${__basedir}/public/upload`);
  },
  filename: function (req, file, cb) {
    const match = ["image/png", "image/jpeg"];
    if (match.indexOf(file.mimetype) === -1) {
      var message = `${file.originalname} is invalid. Only accept png/jpeg.`;
      return callback(message, null);
    }
    cb(
      null,
      file.fieldname + "-" + Date.now() + "-" + path.extname(file.originalname)
    );
  },
});

var singleUpload = multer({ storage: storage });
var multipleUpload = multer({ storage: storage }).array(
  "media",
  LIMIT_UNEXPECTED_FILE
);

module.exports = {
  singleUpload,
  multipleUpload,
};
