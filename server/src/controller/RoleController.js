const { Role, RolePermissions, RoleAccounts } = require("../model");

module.exports = {
  index: async (req, res) => {
    try {
      const listRole = await Role.findAll();
      res.json({
        success: true,
        listRole,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json("Internal server error");
    }
  },
  create: async (req, res) => {
    const { name, description } = req.body;
    try {
      if (name == "")
        return res.json({ success: false, message: "Role require name" });
      await Role.create({
        name,
        description: description || "",
      });
      res.json({
        success: true,
        message: "created role successful",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
  update: async (req, res) => {
    const { id, name, description } = req.body;
    try {
      if (!id)
        return res
          .status(404)
          .json({ success: false, message: "Role id not found" });
      let oldRole = await Role.findOne({ where: { id } });
      if (!oldRole)
        return res.json({ success: false, message: "Role is not exist" });
      await Role.update(
        {
          role: name || oldRole.name,
          description: description || oldRole.description,
        },
        { where: { id } }
      );
      res.json({ success: true, message: "Updated role successful" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  destroy: async (req, res) => {
    try {
      const deleteRole = await Role.findOne({ where: { id: req.params.id } });
      if (!deleteRole)
        return res
          .status(404)
          .json({ success: false, message: "Role not found" });
      await RolePermissions.destroy({ where: { roleId: req.params.id } });
      await RoleAccounts.destroy({ where: { roleId: req.params.id } });
      await Role.destroy({ where: { id: req.params.id } });
      res.json({ success: true, message: "Deleted role successful" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
};
