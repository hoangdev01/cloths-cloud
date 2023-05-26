const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { Account, User, Role, RoleAccounts } = require("../model");
const nodemailer = require("nodemailer");
const emailCheck = require("email-check");

const generateToken = (payload) => {
  const { id, username } = payload;

  const accessToken = jwt.sign(
    { id, username },
    process.env.DB_ACCESS_TOKEN_SECRET,
    {
      expiresIn: "24h",
    }
  );

  const refreshToken = jwt.sign(
    { id, username },
    process.env.DB_ACCESS_TOKEN_SECRET,
    {
      expiresIn: "10s",
    }
  );

  return { accessToken, refreshToken };
};
module.exports = {
  index: async (req, res) => {
    try {
      const listUser = await User.findAll({
        attributes: {
          exclude: [],
        },
        // raw: true,
        include: [
          {
            model: Account,
            attributes: {
              exclude: ["password"],
            },
            include: [{ model: RoleAccounts, include: Role }],
          },
        ],
      });
      res.json({ success: true, listUser });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  create: async (req, res) => {
    const error = validationResult(req);
    const { name, username, email, password } = req.body;

    if (!error.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: error.array(),
      });
    }
    if (!name)
      return res.status(400).json({
        success: false,
        message: "Require name",
      });

    try {
      await emailCheck(email);
    } catch (error) {
      return res.json({ success: false, message: "Email does not exist" });
    }

    try {
      const existingUsername = await Account.findOne({ where: { username } });
      const existingEmail = await Account.findOne({ where: { email } });
      if (existingUsername || existingEmail) {
        return res.status(400).json({
          success: false,
          message: "username and/or email already taken",
        });
      }
      const token = jwt.sign(
        { name, username, email, password },
        process.env.DB_ACTIVE_TOKEN_SECRET,
        { expiresIn: "20m" }
      );

      var transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        auth: {
          user: process.env.ADMIN_EMAIL_NAME,
          pass: process.env.ADMIN_APP_EMAIL_PASSWORD,
        },
      });

      var mailOptions = {
        from: `${process.env.ADMIN_EMAIL_NAME}`,
        to: email,
        subject: "Account activation Link",
        html: `
        <h2>Please click on given link to active your account</h2>
        <p>${process.env.CLIENT_URL}/verify-token/${token}</p>
      `,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          // console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      return res.json({ success: true, message: "Email verify was sent" });
      // if (!listRole.includes("admin"))
      // if (!name)
      // return res.status(400).json({
      //   success: false,
      //   message: "Require name",
      // });
      // const roleAlready = await Role.findAll();
      // if (roleAlready) {
      //   let roleTemp;
      //   for (i = 0; i < listRole.length; i++) {
      //     roleTemp = await Role.findOne({ where: { name: listRole[i] } });
      //     await RoleAccounts.create({
      //       roleId: roleTemp.id,
      //       accountId: newAccount.getDataValue("id"),
      //     });
      //   }
      // }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
  verifyAccount: async (req, res) => {
    const { verifyToken } = req.body;
    try {
      if (!verifyToken)
        return res.json({ success: false, message: "Token not found" });
      const decodedToken = jwt.verify(
        verifyToken,
        process.env.DB_ACTIVE_TOKEN_SECRET
      );
      const { name, username, email, password } = decodedToken;
      const existingUsername = await Account.findOne({ where: { username } });
      const existingEmail = await Account.findOne({ where: { email } });
      if (existingUsername || existingEmail) {
        return res.status(400).json({
          success: false,
          message: "username and/or email already taken",
        });
      }
      const hashPassword = await argon2.hash(password);

      const newAccount = new Account({
        username,
        email,
        password: hashPassword,
      });
      await newAccount.save();

      var token = generateToken({
        id: newAccount.getDataValue("id"),
        username: username,
      });
      roleTemp = await Role.findOne({ where: { name: "user" } });
      await RoleAccounts.create({
        roleId: roleTemp.id,
        accountId: newAccount.getDataValue("id"),
      });
      try {
        let userId = newAccount.getDataValue("id");
        await User.create({
          name: name,
          accountId: userId,
          active: true,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Create user fail",
        });
      }
      return res.json({
        success: true,
        message: "User created successfully",
        token,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ success: false, message: "Incorrect or Expired link" });
    }
  },

  //
  //@Login
  login: async (req, res) => {
    const error = validationResult(req);
    const { username, password } = req.body;

    if (!error.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: error.array(),
      });
    }

    try {
      const user = await Account.findOne({ where: { username } });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Incorrect username and/or password",
        });
      }

      const passwordValid = await argon2.verify(user.password, password);
      if (!passwordValid) {
        return res.status(400).json({
          success: false,
          message: "Incorrect username and/or password",
        });
      }

      const userId = user.getDataValue("id");
      const token = generateToken({ id: userId, username: username });
      return res.json({
        success: true,
        message: "Login successful",
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Interval server error",
      });
    }
  },

  // reset password
  resetPassword: async (req, res) => {
    const error = validationResult(req);
    const { password, token } = req.body;

    if (!error.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: error.array(),
      });
    }

    if (!token) return res.json({ success: false, message: "Token not found" });
    const decodedToken = jwt.verify(
      token,
      process.env.DB_RESET_PASSWORD_TOKEN_SECRET
    );
    const { username, email } = decodedToken;
    try {
      const account = await Account.findOne({ where: { username } });
      if (!account)
        return res.json({ success: false, message: "Account does not exist" });
      if (!password)
        return res.json({ success: false, message: "Invalid password" });

      const hashPassword = await argon2.hash(password);
      await Account.update(
        {
          password: hashPassword,
        },
        { where: { username } }
      );
      return res.json({
        success: true,
        message: "Reset password successful",
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  // forget password
  forgetPassword: async (req, res) => {
    const error = validationResult(req);
    const { email } = req.body;

    if (!error.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: error.array(),
      });
    }
    try {
      await emailCheck(email);
    } catch (error) {
      return res.json({ success: false, message: "Email does not exist" });
    }

    try {
      const existingEmailAccount = await Account.findOne({ where: { email } });
      if (!existingEmailAccount) {
        return res.status(400).json({
          success: false,
          message: "Email does not exist",
        });
      }

      const username = existingEmailAccount.username;
      const token = jwt.sign(
        { username, email },
        process.env.DB_RESET_PASSWORD_TOKEN_SECRET,
        { expiresIn: "20m" }
      );

      var transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        auth: {
          user: process.env.ADMIN_EMAIL_NAME,
          pass: process.env.ADMIN_APP_EMAIL_PASSWORD,
        },
      });

      var mailOptions = {
        from: `${process.env.ADMIN_EMAIL_NAME}`,
        to: email,
        subject: "Account activation Link",
        html: `
        <h2>Please click on given link to reset password</h2>
        <p>${process.env.CLIENT_URL}/reset-password/${token}</p>
      `,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          // console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      return res.json({
        success: true,
        message: "Email reset password was sent",
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  // check role
  checkRole: async (req, res) => {
    try {
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

      return res.json({ success: true, role });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
};
