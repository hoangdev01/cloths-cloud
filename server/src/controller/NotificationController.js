const { Notification, Service, Image } = require("../model");

module.exports = {
  index: async (req, res) => {
    try {
      const listNotification = await Notification.findAll({
        where: { accountId: req.userId },
        include: {
          model: Service,
          include: Image,
        },
      });
      const unRead = await Notification.count({
        where: { accountId: req.userId, status: false },
      });
      res.json({ success: true, listNotification, unRead });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  show: async (req, res) => {
    try {
      const notification = await Notification.findOne({
        include: {
          model: Service,
          include: Image,
        },
        where: { slug: req.params.id },
      });
      return res.json({ success: true, notification });
    } catch (error) {
      console.log(error);
      return res.json({ success: false, message: "Internal server error" });
    }
  },
  update: async (req, res) => {
    try {
      await Notification.update(
        {
          status: true,
        },
        { where: { id: req.params.id } }
      );
      res.json({ success: true, message: "Update notification successful" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, mess });
    }
  },
};
