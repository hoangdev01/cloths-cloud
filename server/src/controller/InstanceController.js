const { Instance } = require("../model");

module.exports = {
  index: async (req, res) => {
    try {
      const listInstances = await Instance.findAll({
        where: { serviceId: req.params.id },
      });
      res.json({ success: true, listInstances });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  show: async (req, res) => {
    try {
      const instance = await Instance.findOne({ id: req.params.instanceId });
      res.json({ success: true, instance });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  create: async (req, res) => {
    const { color, amount, size } = req.body;
    try {
      const newInstance = new Instance({
        color: color || "",
        amount: amount || "",
        size: size || "",
        serviceId: req.params.id,
      });
      await newInstance.save();
      res.json({ success: true, message: "Created new service successful" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  createMultiple: async (req, res) => {
    const { listInstance } = req.body;
    try {
      list = [];
      for (item of listInstance) {
        if (item.color == "" && item.size == "")
          return res.json({
            success: false,
            message: "Feature should be full information",
          });
        const newInstance = new Instance({
          color: item.color || "",
          amount: item.amount || "",
          size: item.size || "",
          serviceId: req.params.id,
        });
        list.push(newInstance);
      }
      await Instance.destroy({ where: { serviceId: req.params.id } });
      for await (let item of list) {
        await item.save();
      }
      res.json({
        success: true,
        message: "Set service instance successful",
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  update: async (req, res) => {
    const { id, color, amount, size } = req.body;
    try {
      if (!id)
        return res.json({ success: false, message: "Service id not found" });
      const oldInstance = await Instance.findOne({ where: { id } });
      if (!oldInstance)
        return res
          .status(500)
          .json({ success: false, message: "Service is not exist" });
      await Instance.update(
        {
          color: color || oldInstance.color,
          amount: amount || oldInstance.amount,
          size: size || oldInstance.size,
        },
        { where: { id: id } }
      );
      return res.json({
        success: true,
        message: "Updated service instance successful",
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
      const instance = await Instance.findOne({
        where: { id: req.params.id },
      });
      if (!instance)
        return res.json({
          success: false,
          message: "Service does not exist",
        });
      await Instance.destroy({ where: { id: req.params.id } });
      res.json({
        success: true,
        message: "Deleted service instance successful",
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
};
