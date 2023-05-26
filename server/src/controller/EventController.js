const Event = require("../model/Event");

module.exports = {
  index: async (req, res) => {
    try {
      const listEvent = await Event.findAll();
      return res.json({ success: true, listEvent });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  create: async (req, res) => {
    const { name, description, discount, startAt, endAt, isActive } = req.body;
    try {
      if (!name || !discount || !startAt || !endAt)
        return res.json({
          success: false,
          message: "Insufficient information",
        });
      const newEvent = new Event({
        name,
        description: description || "",
        discount,
        startAt,
        endAt,
        isActive: isActive || true,
      });
      await newEvent.save();
      return res.json({
        success: true,
        message: "Created event successful",
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
    const { id, name, description, discount, startAt, endAt, isActive } =
      req.body;
    try {
      if (!id)
        return res.json({ success: false, message: "Event id not found" });
      let oldEvent = await Event.findOne({ where: { id } });
      if (!oldEvent)
        return res.json({ success: false, message: "Event does not exist" });
      await Event.update(
        {
          name: name || oldEvent.name,
          description: description || oldEvent.description,
          discount: discount || oldEvent.discount,
          startAt: startAt || oldEvent.startAt,
          endAt: endAt || oldEvent.endAt,
          isActive: isActive || oldEvent.isActive,
        },
        { where: { id } }
      );
      return res.json({
        success: true,
        message: "Event update successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
  destroy: async (req, res) => {
    try {
      const event = await Event.findOne({ where: { id: req.params.id } });
      if (!event)
        return res.json({ success: false, message: "Event does not exist" });

      await Event.destroy({ where: { id: req.params.id } });
      return res.json({
        success: true,
        message: "Delete event successful",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: true, message: "Internal server error" });
    }
  },
};
