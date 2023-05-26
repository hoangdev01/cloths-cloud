const jwt = require('jsonwebtoken');
const { Account, Role, RoleAccounts } = require('../model');

let role = {};

var admin = async (req, res, next) => {
  try {
    let isOk = false;
    if (req.userId) {
      const user = await Account.findOne({
        where: { id: req.userId },
        include: [{ model: RoleAccounts, include: [Role] }],
      });
      user['role_accounts'].forEach((element) => {
        if (element['role']['name'] == 'admin') {
          isOk = true;
          return false;
        }
      });
    }
    if (!isOk) throw 'Unauthorized';

    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Unauthorized',
    });
  }
};

var employee = async (req, res, next) => {
  try {
    let isOk = false;
    const user = await Account.findOne({
      where: { id: req.userId },
      include: [{ model: RoleAccounts, include: [Role] }],
    });
    user['role_accounts'].forEach((element) => {
      if (
        element['role']['name'] == 'employee' ||
        element['role']['name'] == 'admin'
      ) {
        isOk = true;
        return false;
      }
    });
    if (!isOk) throw 'Unauthorized';
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      success: false,
      message: 'Unauthorized',
    });
  }
};

var user = async (req, res, next) => {
  try {
    let isOk = false;
    const user = await Account.findOne({
      where: { id: req.userId },
      include: [{ model: RoleAccounts, include: [Role] }],
    });
    user['role_accounts'].forEach((element) => {
      if (element['role']['name'] == 'user') {
        isOk = true;
        return false;
      }
    });
    if (!isOk) throw 'Unauthorized';
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

role = {
  admin,
  employee,
  user,
};
module.exports = role;
