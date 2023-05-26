const {
  User,
  Cart,
  Service,
  Role,
  Account,
  RoleAccounts,
  Category,
  Image,
} = require("../model");

module.exports = {
  index: async (req, res) => {
    try {
      const listUser = await User.findAll({
        attributes: { exclude: ["accountId"] },
        include: {
          model: Account,
          attributes: ["id"],
          include: {
            model: RoleAccounts,
            attributes: ["id"],
            include: {
              model: Role,
              attributes: ["name"],
            },
          },
        },
      });
      res.json({ success: true, listUser });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  show: async (req, res) => {
    try {
      const user = await User.findOne({
        where: { slug: req.params.slug },
        attributes: { exclude: ["id", "accountId"] },
      });
      res.json({ success: true, user });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  showMyUser: async (req, res) => {
    try {
      const user = await User.findOne({
        where: { accountId: req.userId },
        attributes: { exclude: ["id", "accountId"] },
      });
      const account = await Account.findOne({
        include: {
          model: RoleAccounts,
          include: {
            model: Role,
          },
        },
        where: { id: req.userId },
      });
      let role = "user";
      for (let i = 0; i < account.role_accounts.length; i++) {
        if (account.role_accounts[i].role.name == "admin") {
          role = "admin";
          break;
        } else if (account.role_accounts[i].role.name == "employee")
          role = "employee";
      }
      if (!user)
        res.status(404).json({ success: false, message: "User not found" });
      res.json({ success: true, user, role });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  showStaffUser: async (req, res) => {
    try {
      const listUser = await User.findAll({
        attributes: {
          exclude: ["accountId"],
        },
        include: {
          model: Account,
          attributes: [],
          include: {
            model: RoleAccounts,
            attributes: [],
            include: {
              model: Role,
              attributes: [],
            },
          },
        },
        where: { "$account.role_accounts.role.name$": "employee" },
      });
      if (!listUser)
        res.status(404).json({ success: false, message: "User not found" });
      const role = await Role.findOne({ where: { name: "employee" } });
      res.json({ success: true, listUser, role });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  showBasicUser: async (req, res) => {
    try {
      const listUser = await User.findAll({
        attributes: {
          exclude: ["accountId"],
        },
        include: {
          model: Account,
          attributes: [],
          include: {
            model: RoleAccounts,
            attributes: [],
            include: {
              model: Role,
              attributes: [],
            },
          },
        },
        where: { "$account.role_accounts.role.name$": "user" },
      });
      if (!listUser)
        res.status(404).json({ success: false, message: "User not found" });
      const role = await Role.findOne({ where: { name: "user" } });
      res.json({ success: true, listUser, role });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  update: async (req, res) => {
    const { name, phone_number, gender, date_of_birth, active, avatar_path } =
      req.body;
    try {
      if (!req.userId)
        return res.json({ success: false, message: "User id not found" });
      const oldUser = await User.findOne({ where: { accountId: req.userId } });
      if (!oldUser)
        return res.json({ success: false, message: "User is not exist" });
      await User.update(
        {
          name: name || oldUser.name,
          phone_number: phone_number || oldUser.phone_number,
          gender: gender || oldUser.gender,
          date_of_birth: date_of_birth || oldUser.date_of_birth,
          active: active || oldUser.active,
          avatar_path: avatar_path || oldUser.avatar_path,
        },
        { where: { accountId: req.userId } }
      );
      res.json({ success: true, message: "Updated user successful" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  updateRoleToEmployee: async (req, res) => {
    const { userId } = req.body;
    try {
      if (!userId)
        return res.json({ success: false, message: "User id not found" });
      const role = await Role.findOne({ where: { name: "employee" } });
      const user = await User.findOne({
        include: {
          model: Account,
          attributes: ["id"],
          include: {
            model: RoleAccounts,
            attributes: ["id"],
            include: {
              model: Role,
              attributes: [],
            },
          },
        },
        where: { id: userId, "$account.role_accounts.role.name$": "user" },
      });
      if (!user)
        return res.json({
          success: false,
          message: "User does not exist or invalid",
        });
      await RoleAccounts.destroy({
        where: { id: user.account.role_accounts[0].id },
      });
      const newRoleAccount = new RoleAccounts({
        accountId: user.accountId,
        roleId: role.id,
      });
      newRoleAccount.save();
      return res.json({
        success: true,
        message: "Update role to employee successful",
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  updateRoleToUser: async (req, res) => {
    const { userId } = req.body;
    try {
      if (!userId)
        return res.json({ success: false, message: "User id not found" });
      const role = await Role.findOne({ where: { name: "user" } });
      const user = await User.findOne({
        include: {
          model: Account,
          attributes: ["id"],
          include: {
            model: RoleAccounts,
            attributes: ["id"],
            include: {
              model: Role,
              attributes: [],
            },
          },
        },
        where: { id: userId, "$account.role_accounts.role.name$": "employee" },
      });
      if (!user)
        return res.json({
          success: false,
          message: "User does not exist or invalid",
        });
      await RoleAccounts.destroy({
        where: { id: user.account.role_accounts[0].id },
      });
      const newRoleAccount = new RoleAccounts({
        accountId: user.accountId,
        roleId: role.id,
      });
      newRoleAccount.save();
      return res.json({
        success: true,
        message: "Update role to user successful",
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  updateActiveUser: async (req, res) => {
    const { userId } = req.body;
    try {
      if (!userId)
        return res.json({ success: false, message: "User id not found" });
      var user = await User.findOne({ where: { id: userId } });
      if (!user)
        return res.json({ success: false, message: "User doest not exist" });
      await User.update({ active: !user.active }, { where: { id: user.id } });
      return res.json({
        success: true,
        message: user.active
          ? "Unactive user successful"
          : "Active user successful",
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  getCart: async (req, res) => {
    try {
      const user = await User.findOne({ where: { accountId: req.userId } });
      const listCart = await Cart.findAll({
        include: Service,
        where: { userId: user.id },
      });
      res.json({ success: true, listCart });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  showCart: async (req, res) => {
    try {
      const cart = await Cart.findOne({
        include: {
          model: Service,
          include: [
            {
              model: Category,
              attributes: ["name", "description"],
            },
            { model: Image, attributes: ["path"] },
          ],
        },
        where: { slug: req.params.slug },
      });
      return res.json({ success: true, cart });
    } catch (error) {
      console.log(error);
      return res.json({ success: false, message: "Internal server error" });
    }
  },
  createCart: async (req, res) => {
    const { amount, serviceId, numberOfPeople, numberOfChild } = req.body;
    try {
      if (
        !numberOfChild ||
        !numberOfPeople ||
        numberOfChild < 0 ||
        numberOfPeople <= 0 ||
        numberOfPeople < numberOfChild
      )
        return res.json({
          success: false,
          message: "Incorrect number of people",
        });
      const user = await User.findOne({ where: { accountId: req.userId } });
      if (!user)
        return res
          .status(404)
          .json({ message: false, message: "User does not exist" });
      if (amount < 1)
        return res.json({ success: false, message: "Invalid amount" });
      const service = await Service.findOne({ where: { id: serviceId } });
      if (!service)
        return res
          .status(404)
          .json({ success: false, message: "Service does not exist" });
      const cart = await Cart.findOne({
        where: { userId: user.id, serviceId },
      });
      if (!cart) {
        const newCart = new Cart({
          amount,
          serviceId,
          userId: user.id,
          numberOfChild: numberOfChild || 0,
          numberOfPeople: numberOfPeople || 0,
        });
        await newCart.save();
      } else {
        await Cart.update(
          {
            amount: cart.amount + amount || cart.amount,
            serviceId: serviceId || cart.serviceId,
          },
          { where: { id: cart.id } }
        );
      }
      res.json({ success: true, message: "Update cart successful" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
};
