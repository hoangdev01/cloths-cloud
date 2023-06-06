const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const { Service, Rate, User, Category, Instance } = require("../model");
const Image = require("../model/Image");
const Tag = require("../model/Tag");
const TagServices = require("../model/TagServices");
const axios = require("axios");
const { FileStorage } = require("multer");
const fs = require("fs");
const { Op } = require("sequelize");

module.exports = {
  index: async (req, res) => {
    try {
      const listService = await Service.findAll();
      res.json({ success: true, listService });
    } catch (error) {
      res.json({ success: false, message: "Internal server error" });
    }
  },
  show: async (req, res) => {
    try {
      const service = await Service.findOne({
        include: [{ model: Image }, { model: Instance }],
        where: { slug: req.params.slug },
      });
      return res.json({ success: true, service });
    } catch (error) {
      console.log(error);
      return res.json({ success: false, message: "Internal server error" });
    }
  },
  showServiceList: async (req, res) => {
    try {
      service_code = req.params.service_code;
      const serviceList = await Service.findAll({
        where: { "$category.name$": service_code },
        order: [["createdAt", "DESC"]],
        include: [
          { model: Category, attributes: ["name"] },
          { model: Image },
          { model: Instance },
        ],
      });
      const category = await Category.findOne({
        where: { name: req.params.service_code },
      });
      if (!serviceList)
        return res.json({ success: false, message: "Tour not found" });
      return res.json({ success: true, serviceList, categoryId: category.id });
    } catch (error) {
      console.log(error);
      return res.json({ success: false, message: "Internal server error" });
    }
  },
  showHotelBookingList: async (req, res) => {
    try {
      const hotelBookingList = await Service.findAll({
        where: { "$category.name$": "hotel" },
        order: [["createdAt", "DESC"]],
        include: [{ model: Category, attributes: ["name"] }, { model: Image }],
      });
      const category = await Category.findOne({ where: { name: "hotel" } });
      if (!hotelBookingList)
        return res.json({ success: false, message: "Hotel not found" });
      return res.json({
        success: true,
        hotelBookingList,
        categoryId: category.id,
      });
    } catch (error) {
      console.log(error);
      return res.json({ success: false, message: "Internal server error" });
    }
  },
  showPlaneList: async (req, res) => {
    try {
      const planeList = await Service.findAll({
        where: { "$category.name$": "plane" },
        order: [["createdAt", "DESC"]],
        include: [{ model: Category, attributes: ["name"] }, { model: Image }],
      });
      if (!planeList)
        return res.json({ success: false, message: "Plane not found" });
      return res.json({ success: true, planeList });
    } catch (error) {
      console.log(error);
      return res.json({ success: false, message: "Internal server error" });
    }
  },
  showCarRentalList: async (req, res) => {
    try {
      const carRentalList = await Service.findAll({
        where: { "$category.name$": "car-rental" },
        order: [["createdAt", "DESC"]],
        include: [{ model: Category, attributes: ["name"] }, { model: Image }],
      });
      const category = await Category.findOne({
        where: { name: "car-rental" },
      });
      if (!carRentalList)
        return res.json({ success: false, message: "Car renter not found" });
      return res.json({
        success: true,
        carRentalList,
        categoryId: category.id,
      });
    } catch (error) {
      console.log(error);
      return res.json({ success: false, message: "Internal server error" });
    }
  },
  showServiceFromTag: async (req, res) => {
    try {
      const tag = await Tag.findOne({ where: { slug: req.params.slug } });
      if (!tag)
        return res.json({ success: false, message: "Tag does not exist" });
      const listService = await Service.findAll({
        include: {
          model: TagServices,
          attributes: [],
          include: {
            model: Tag,
            attributes: [],
          },
        },
        where: { "$tag_services.tag.name$": tag.name },
      });
      if (!listService)
        return res.json({
          success: false,
          message: "Tag does not have service",
        });
      return res.json({ success: true, listService });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
  showServiceFromSuggetedUpload: async (req, res) => {
    try {
      const { listRecommendImg, categoryId } = req.body;
      let serviceIds = [];
      if (listRecommendImg) {
        for (let recommendImg of listRecommendImg) {
          const image = await Image.findOne({ where: { name: recommendImg } });
          if (image) serviceIds.push(image.serviceId);
        }
      }
      const listService = await Service.findAll({
        where: {
          id: {
            [Op.in]: serviceIds,
          },
        },
        order: [["createdAt", "DESC"]],
        include: [
          { model: Category, attributes: ["name"] },
          { model: Image },
          { model: Instance },
        ],
      });
      if (listService.length == 0)
        return res.json({
          success: false,
          message: "Service not found",
        });
      return res.json({
        success: true,
        message: "Service search successfully",
        serviceList: listService,
        categoryId: categoryId,
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: "Internal server error",
      });
    }
  },
  create: async (req, res) => {
    const { name, title, description, price, is_active, categoryId } = req.body;

    try {
      if (!name)
        return res.json({ success: false, message: "Require service name" });
      if (!categoryId)
        return res.json({ success: false, message: "Require category" });
      const category = await Category.findOne({ where: { id: categoryId } });
      if (!category)
        return res
          .status(404)
          .json({ success: false, message: "Category does not exist" });

      const newService = new Service({
        name,
        title: title || "",
        description: description || "",
        price: price || 0,
        is_active: is_active || true,
        categoryId,
      });
      await newService.save();
      return res.json({
        success: true,
        message: "Service created successfully",
        newService,
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
    const { id, name, title, description, price, is_active, categoryId } =
      req.body;

    try {
      if (!id)
        return res.json({ success: false, message: "Service id not found" });
      let oldService = await Service.findOne({ where: { id } });
      if (!oldService)
        return res
          .status(404)
          .json({ success: false, message: "Service does not exist" });
      await Service.update(
        {
          name: name || oldService.name,
          title: title || oldService.title,
          description: description || oldService.description,
          price: price || oldService.price,
          is_active: is_active || oldService.is_active,
          categoryId: categoryId || oldService.categoryId,
        },
        { where: { id } }
      );
      return res.json({
        success: true,
        message: "Service updated successfully",
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
      const service = Service.findOne({ id: req.params.id });
      if (!service)
        return res.json({ success: false, message: "Service does not exist" });
      await Service.destroy({ where: { id: req.params.id } });
      return res.json({
        success: true,
        message: "Deleted service successful",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
  getRate: async (req, res) => {
    try {
      const listRate = await Rate.findAll(
        { include: [{ model: User }] },
        {
          where: { serviceId: req.params.id },
        }
      );
      res.json({ success: true, listRate });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  createRate: async (req, res) => {
    const { quality, userId, serviceId } = req.body;
    try {
      if (parseInt(quality) < 1 || parseInt(quality) > 5)
        return res.json({ success: false, message: "Invalid quality" });
      if (!userId || !serviceId)
        return res.json({
          success: false,
          message: "Require user and service",
        });
      const user = await User.findOne({ where: { id: userId } });
      const service = await Service.findOne({ where: { id: serviceId } });
      if (!user || !service)
        return res
          .status(404)
          .json({ success: false, message: "User or service does not exist" });
      const rate = await Rate.findOne({ where: { userId, serviceId } });
      if (!rate) {
        const newRate = new Rate({
          quality,
          userId,
          serviceId,
        });
        await newRate.save();
      } else {
        if (rate.quality == quality)
          await Rate.destroy({ where: { id: rate.id } });
        else
          await Rate.update(
            {
              quality,
            },
            { where: { id: rate.id } }
          );
      }
      res.json({ success: true, message: "Updated rate" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
};
