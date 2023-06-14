const {
  Service,
  BillDetail,
  Bill,
  User,
  Account,
  RoleAccounts,
  Role,
  Cart,
  Instance,
  Image,
} = require("../model");

module.exports = {
  index: async (req, res) => {
    try {
      const listBill = await Bill.findAll();
      res.json({
        success: true,
        listBill,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
  show: async (req, res) => {
    try {
      const userAccount = await Account.findOne({
        include: [
          { model: User },
          { model: RoleAccounts, include: { model: Role } },
        ],
        where: { id: req.userId },
      });
      var checkCondition = true;
      const bill = await Bill.findOne({
        where: { id: req.params.id },
        include: [
          {
            model: User,
            attributes: [],
          },
          {
            model: BillDetail,
            include: {
              model: Instance,
              include: {
                model: Service,
                include: Image,
              },
            },
          },
        ],
      });
      if (userAccount.user.id != bill.userId) {
        checkCondition = false;
        userAccount.RoleAccounts.forEach((item) => {
          if (item.role.name == "employee" || item.role.name == "admin") {
            checkCondition = true;
          }
        });
      }
      if (!checkCondition)
        return res.json({ success: false, message: "Bill not found" });
      return res.json({ success: true, bill });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  showUserBills: async (req, res) => {
    try {
      const listBill = await Bill.findAll({
        where: { "$user.accountId$": req.userId },
        include: {
          model: User,
          attributes: [],
        },
      });
      return res.json({ success: true, listBill });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  create: async (req, res) => {
    const { listCartId } = req.body;
    try {
      if (!listCartId)
        return res
          .status(404)
          .json({ success: false, message: "No service found" });
      const account = await Account.findOne({
        include: User,
        where: { id: req.userId },
      });
      if (!account)
        return res
          .status(404)
          .json({ success: false, message: "No user found" });
      let checkCart,
        checkService,
        newBillDetail,
        newBillDetailArray = [],
        newBill;
      var checkStatus = true;
      for (var i = 0; i < listCartId.length; i++) {
        checkCart = await Cart.findOne({
          where: { id: listCartId[i], userId: account.user.id },
        });
        if (!checkCart) {
          checkStatus = false;
          break;
        }
        checkService = await Instance.findOne({
          where: { id: checkCart.instanceId },
        });
        if (!checkService || checkService.amount < checkCart.amount) {
          checkStatus = false;
          break;
        }
      }
      if (!checkStatus)
        return res.json({
          success: false,
          message:
            "The product is not in sufficient quantity or does not exist",
        });
      const listCart = await Cart.findAll({ where: { id: listCartId } });
      var totalPrice = 0;
      newBill = new Bill({
        totalPrice: 0,
        status: "unpaid",
        managerId: "",
        userId: account.user.id,
      });
      var tempInstance = null;
      var tempService = null;
      for (var element = 0; element < listCart.length; element++) {
        tempInstance = await Instance.findOne({
          where: { id: listCart[element].instanceId },
        });
        tempService = await Service.findOne({
          where: { id: tempInstance.serviceId },
        });
        newBillDetail = new BillDetail({
          amount: listCart[element].amount,
          price: tempService.price * listCart[element].amount,
          billId: newBill.id,
          instanceId: listCart[element].instanceId,
        });
        totalPrice += listCart[element].amount * tempService.price;
        newBillDetailArray.push(newBillDetail);
      }
      newBill.totalPrice = totalPrice;
      await newBill.save();
      newBillDetailArray.forEach(async (element) => {
        await element.save();
      });
      await Cart.destroy({ where: { userId: account.user.id } });
      return res.json({ success: true, message: "Bill create successful" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  // role employee
  confirmBill: async (req, res) => {
    const { billId } = req.body;
    try {
      if (!billId)
        return res.json({ success: false, message: "Bill id not found" });
      const bill = await Bill.findOne({ where: { id: billId } });
      if (!bill) return res.json({ success: false, message: "Bill not found" });
      bill.status = "paid";
      bill.date = Date.now();
      bill.managerId = req.userId;
      bill.save();
      return res.json({ success: true, message: "Confirm bill success" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  // role basic user or employee
  cancelBill: async (req, res) => {
    const { billId } = req.body;
    try {
      if (!billId)
        return res.json({ success: false, message: "Bill id not found" });
      const bill = await Bill.findOne({ where: { id: billId } });
      if (!bill) return res.json({ success: false, message: "Bill not found" });
      const userAccount = await Account.findOne({
        include: [
          { model: User },
          { model: RoleAccounts, include: { model: Role } },
        ],
        where: { id: req.userId },
      });
      var checkCondition = true;
      if (userAccount.user.id != bill.userId) {
        checkCondition = false;
        userAccount.role_accounts.forEach((item) => {
          if (item.role.name == "employee" || item.role.name == "admin") {
            checkCondition = true;
          }
        });
      }
      if (!checkCondition)
        return res.json({ success: false, message: "Bill not found" });
      if (bill.status == "paid")
        return res.json({
          success: true,
          message: "Bill is paid can not cancel",
        });
      bill.managerId = req.userId;
      bill.status = "cancelled";
      bill.save();
      return res.json({ success: true, message: "Cancelled bill successful" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  //role basic user
  restoreBill: async (req, res) => {
    const { billId } = req.body;
    try {
      if (!billId)
        return res.json({ success: false, message: "Bill id not found" });
      const bill = await Bill.findOne({ where: { id: billId } });
      if (!bill) return res.json({ success: false, message: "Bill not found" });
      userAccount = await Account.findOne({
        include: [{ model: User }],
        where: { id: req.userId },
      });
      if (bill.userId != userAccount.user.id) {
        return res.json({ success: false, message: "Bill not found" });
      }
      if (bill.status == "unpaid" || bill.status == "paid")
        return res.json({
          success: false,
          message: "Can not restore this bill",
        });
      bill.status = "unpaid";
      bill.managerId = req.userId;
      bill.save();
      return res.json({ success: true, message: "Restore bill success" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  destroy: async (req, res) => {},
};
