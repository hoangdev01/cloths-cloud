const { Service } = require("../model");
const Tag = require("../model/Tag");
const TagServices = require("../model/TagServices");

module.exports = {
  index: async (req, res) => {
    try {
      const listTag = await Tag.findAll();
      res.json({ success: true, listTag });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  show: async (req, res) => {
    try {
      const tag = await Tag.findOne({ where: { slug: req.params.slug } });
      if (!tag)
        return res.json({ success: false, message: "Tag does not exist" });
      return res.json({ success: true, tag });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  create: async (req, res) => {
    const { name, description } = req.body;
    try {
      if (!name || name == "") {
        return res
          .status(404)
          .json({ success: false, message: "Require tag name" });
      }
      const newTag = new Tag({
        name,
        description: description || "",
      });
      await newTag.save();
      res.json({ success: true, message: "Created tag successful" });
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
      if (!id) return res.json({ success: false, message: "Tag id not found" });
      const oldTag = await Tag.findOne({ where: { id } });
      if (!oldTag) {
        return res
          .status(404)
          .json({ success: false, message: "Tag is not exist" });
      }
      await Tag.update(
        {
          name: name || oldTag.name,
          description: description || oldTag.description,
        },
        { where: { id } }
      );
      return res.json({ success: true, message: "Updated tag successful" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  addServiceToTag: async (req, res) => {
    const { listServiceId, tagId } = req.body;
    try {
      if (!listServiceId)
        return res.json({ success: false, message: "Service id not found" });
      if (!tagId)
        return res.json({ success: false, message: "Tag id not found" });
      const tag = await Tag.findOne({ where: { id: tagId } });
      if (!tag)
        return res.json({ success: false, message: "Tag does not exist" });
      for (let i = 0; i < listServiceId.length; i++) {
        let checkService = await Service.findOne({
          where: { id: listServiceId[i] },
        });
        if (!checkService)
          return res.json({
            success: false,
            message: "Service does not exist",
          });
      }
      for (let i = 0; i < listServiceId.length; i++) {
        const checkTagServices = await TagServices.findOne({
          where: { serviceId: listServiceId[i], tagId },
        });
        if (checkTagServices) continue;
        const newTagServices = new TagServices({
          tagId,
          serviceId: listServiceId[i],
        });
        await newTagServices.save();
      }
      return res.json({
        success: true,
        message: "Add service to tag successful",
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  deleteServiceFromTag: async (req, res) => {
    const { serviceId, tagId } = req.body;
    try {
      if (!serviceId)
        return res.json({ success: false, message: "Service id not found" });
      let service = await Service.findOne({
        where: { id: serviceId },
      });
      if (!service)
        return res.json({
          success: false,
          message: "Service does not exist",
        });
      if (!tagId)
        return res.json({ success: false, message: "Tag id not found" });
      const tag = await Tag.findOne({ where: { id: tagId } });
      if (!tag)
        return res.json({ success: false, message: "Tag does not exist" });
      const tag_service = await TagServices.findOne({
        where: { serviceId, tagId },
      });
      if (!tag_service)
        return res.json({
          success: false,
          message: "This tag does not have this service",
        });
      await TagServices.destroy({ where: { id: tag_service.id } });
      return res.json({
        success: true,
        message: "Delete service from tag successful",
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  destroy: async (req, res) => {
    try {
      const oldTag = await Tag.findOne({ where: { id: req.params.id } });
      if (!oldTag) {
        return res
          .status(404)
          .json({ success: false, message: "Tag is not exist" });
      }
      await Tag.destroy({ where: { id: req.params.id } });
      res.json({ success: true, message: "Deleted tag successful" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
};
