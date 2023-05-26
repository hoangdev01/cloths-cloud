const { Permission } = require("../model");

module.exports = {
  index: async (req, res) => {
    try {
      const listPermission = await Permission.findAll();
      res.json({ success: true, listPermission });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  create: async (req, res) => {
    const { name, action, description } = req.body;
    try {
      if (!name)
        return res
          .status(404)
          .json({ success: false, message: "Require permission name" });
      const newPermission = new Permission({
        name,
        action: action || "",
        description: description || "",
      });
      newPermission.save();
      res.json({ success: true, message: "Created permission successful" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, mess });
    }
  },
  update: async (req, res) => {
    const { id, name, action, description } = req.body;
    try {
      if (!id)
        return res.json({ success: false, message: "Permission id not found" });
      const oldPermission = Permission.findOne({ where: { id } });
      if (!oldPermission)
        return res
          .status(500)
          .json({ success: false, message: "Permission is not exist" });
      await Permission.update(
        {
          name: name || oldPermission.name,
          description: description || oldPermission.description,
          action: action || oldPermission.action,
        },
        { where: { id: id } }
      );
      return res.json({
        success: true,
        message: "Updated permission successful",
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  destroy: async (req, res) => {
    try {
      const permission = await Permission.findOne({
        where: { id: req.params.id },
      });
      if (!permission)
        return res.json({
          success: false,
          message: "Permission does not exist",
        });
      await Permission.destroy({ where: { id: req.params.id } });
      res.json({ success: true, message: "Deleted permission successful" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
};
