const { Image, User } = require("../model");
const AWS = require("aws-sdk");
const s3Config = new AWS.S3({
  accessKeyId: process.env.AWS_IAM_USER_KEY,
  secretAccessKey: process.env.AWS_IAM_USER_SECRET,
  Bucket: process.env.AWS_BUCKET_NAME,
});
module.exports = {
  //Index
  avatarIndex: (req, res) => {
    return res.sendFile(`${__basedir}/view/upload.html`);
  },
  //Create avatar
  createAvatarUser: async (req, res) => {
    try {
      if (!req.file || req.file.length <= 0) {
        return res.status(400).json({
          message: "You must select 1 file.",
        });
      }
      await User.update(
        { avatar_path: req.file.location },
        { where: { accountId: req.userId } }
      );
      return res.json({
        success: true,
        message: "upload user avatar successfull",
      });
    } catch (error) {
      return res.json({
        success: false,
        message: "Server internal error",
      });
    }
  },
  createAvatarEvent: async (req, res) => {
    const { eventId } = req.body;
    try {
      if (!eventId)
        return res.json({ success: false, message: "Event id not found" });
      if (!req.file || req.file.length <= 0) {
        return res.status(400).json({
          message: "You must select 1 file.",
        });
      }
      await Event.update(
        { avatarPath: req.file.location },
        { where: { id: eventId } }
      );
      return res.json({
        success: true,
        message: "upload event image successfull",
      });
    } catch (error) {
      return res.json({
        success: false,
        message: "Server internal error",
      });
    }
  },

  createMedia: async (req, res) => {
    const filename = req.files;
    const { serviceId } = req.body;

    if (!serviceId || serviceId.length < 10) {
      return res.status(400).json({
        message: "bad request",
      });
    }

    if (!filename || req.files.length <= 0) {
      return res.status(400).json({
        message: "You must select at least 1 file.",
      });
    }

    await Promise.all(
      filename.map(async (file) => {
        try {
          const newImage = new Image({
            is_avatar: false,
            name: file.key,
            serviceId: serviceId,
            path: `${file.location}`,
          });
          await newImage.save();
        } catch (error) {
          console.log(error);
        }
      })
    );

    return res.json({
      success: true,
      message: "upload resource successful",
    });
  },

  destroy: async (req, res) => {
    try {
      const image = await Image.findOne({ where: { id: req.params.id } });
      if (!image) {
        return res.json({ success: false, message: "Image not found" });
      }
      s3Config.deleteObject(
        { Bucket: process.env.AWS_BUCKET_NAME, Key: image.name },
        (err, data) => {
          if (err) console.error(err);
        }
      );
      await Image.destroy({ where: { id: req.params.id } });
      return res.json({ success: true, message: "Image delete success" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
};
