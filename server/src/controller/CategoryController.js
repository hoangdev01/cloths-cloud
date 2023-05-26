const Category = require("../model/Category");

module.exports = {
  index: async (req, res) => {
    try {
      const listCategory = await Category.findAll();
      res.json({ success: true, listCategory });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  create: async (req, res) => {
    const { name, description } = req.body;
    try {
      if (!name || name == "") {
        return res.json({ success: false, message: "Require category name" });
      }
      const newCategory = new Category({
        name,
        description: description || "",
      });
      await newCategory.save();
      res.json({ success: true, message: "Created category successful" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  update: async (req, res) => {
    const { id, name, description } = req.body;
    try {
      if (!id)
        return res
          .status(404)
          .json({ success: false, message: "Category id not found" });
      const oldCategory = await Category.findOne({ where: { id } });
      if (!oldCategory) {
        return res
          .status(404)
          .json({ success: false, message: "Category does not exist" });
      }
      await Category.update(
        {
          name: name || oldCategory.name,
          description: description || oldCategory.description,
        },
        { where: { id: oldCategory.id } }
      );
      return res.json({
        success: true,
        message: "Updated category successful",
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
      const oldCategory = await Category.findOne({
        where: { id: req.params.id },
      });
      if (!oldCategory) {
        return res
          .status(404)
          .json({ success: false, message: "Category does not exist" });
      }
      await Category.destroy({ where: { id: req.params.id } });
      res.json({ success: true, message: "Deleted category successful" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
};
