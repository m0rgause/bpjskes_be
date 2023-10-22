const db = require("../models");
const User = db.user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const getAll = async (req, res) => {
  try {
    const startRange = req.query.startRange ?? 0;
    const endRange = req.query.endRange ?? 9;
    const email = req.query.email ?? "";

    const options = {
      attributes: ["id", "email", "nama", "is_active"],
      where: {},
      include: [
        {
          model: db.group,
          attributes: ["id", "nama"],
        },
        {
          model: db.bankCustody,
          attributes: ["id", "nama"],
        },
      ],
      order: [["nama", "ASC"]],
      offset: parseInt(startRange),
      limit: parseInt(endRange) - parseInt(startRange) + 1,
    };

    if (email) {
      options.where.email = { [db.Sequelize.Op.iLike]: `%${email}%` };
    }

    const users = await User.findAndCountAll(options);
    return res.status(200).json({
      code: 200,
      data: users,
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: error.message,
      data: null,
    });
  }
};

// Sign in user and return token
const signIn = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
      include: [
        {
          model: db.group,
          attributes: ["landing"],
        },
      ],
    });

    if (!user) {
      return res.status(404).json({
        code: 404,
        error: { message: "User not found" },
        data: null,
      });
    }

    // compare password
    const isMatch = bcrypt.compareSync(req.body.password, user.password);

    if (!isMatch) {
      return res.status(200).json({
        code: 401,
        data: null,
        error: { message: "Invalid password" },
      });
    }

    // check if user is active
    if (!user.is_active) {
      return res.status(200).json({
        code: 401,
        error: { message: "User is not active" },
        data: null,
      });
    }

    // check aut group access
    const groupAccess = await db.groupAccess.findOne({
      where: { aut_group_id: user.aut_group_id },
      include: [
        {
          model: db.access,
          where: { path: req.body.path },
          attributes: ["path"],
        },
      ],
    });

    // create token payload
    const tokenPayload = {
      id: user.id,
      email: user.email,
      nama: user.nama,
      aut_group_id: user.aut_group_id,
    };

    // create token
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      code: 200,
      data: {
        token: token,
        landing: !groupAccess ? user.aut_group.landing : null,
        actualLanding: user.aut_group.landing,
        user: tokenPayload,
      },
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      data: null,
      error: { message: error.message },
    });
  }
};

const signUp = async (req, res) => {
  try {
    const {
      email,
      password,
      aut_group_id,
      nama,
      is_active,
      mst_bank_custody_id,
    } = req.body;

    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        email,
        password: bcrypt.hashSync(password, 8),
        aut_group_id,
        nama,
        is_active,
        mst_bank_custody_id,
      },
    });

    if (!created) {
      return res.status(409).json({
        code: 409,
        data: null,
        error: { message: "User already exist" },
      });
    }

    return res.status(200).json({
      code: 200,
      data: user,
      error: null,
    });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        code: 400,
        data: null,
        error: { message: error.message },
      });
    } else if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        code: 409,
        data: null,
        error: { message: "User already exist" },
      });
    }

    return res.status(500).json({
      code: 500,
      data: null,
      error: { message: error.message },
    });
  }
};

const checkAuth = async (req, res) => {
  try {
    let token = req.body.token;

    // verify token
    let decoded = jwt.verify(token, process.env.JWT_SECRET);

    // get email
    let email = req.body.email;
    // get path
    let path = req.body.path;
    path = path.split("/");
    path = path[1] + "/" + path[2];

    const aut_user = await User.findOne({
      where: { email: email },
      include: [
        {
          model: db.group,
          attributes: ["landing"],
        },
      ],
    });

    const aut_group_access = await db.groupAccess.findOne({
      where: { aut_group_id: aut_user.aut_group_id },
      include: [
        {
          model: db.access,
          where: {
            path: {
              [db.Sequelize.Op.iLike]: `%${path}%`,
            },
          },
          attributes: ["path"],
        },
      ],
    });

    if (!aut_group_access) {
      res.status(200).json({
        code: 401,
        data: null,
        error: "Unauthorized",
        landing: aut_user.aut_group.landing,
      });
      return;
    }
    return res.status(200).json({
      code: 200,
      data: path,
      error: null,
      landing: aut_user.aut_group.landing,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      data: null,
      error: error.message,
    });
  }
};

const passReset = async (req, res) => {
  // find user and generate token
  try {
    const email = req.body.email;
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).json({
        code: 404,
        error: "User not found",
        data: null,
      });
    }

    // create token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // insert token to user
    await User.update(
      {
        reset_token: token,
      },
      {
        where: { id: user.id },
      }
    );

    // send email
    const nodemailer = require("nodemailer");
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Password",
      html: `<p>Click this link to reset your password</p><p><a href="${process.env.FE_URL}/auth/passreset?token=${token}">Reset Password</a></p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({
          code: 500,
          error: error.message,
          data: null,
        });
      }

      return res.status(200).json({
        code: 200,
        error: null,
        data: "Email sent",
      });
    });
  } catch (error) {}
};

const checkTokenReset = async (req, res) => {
  try {
    const token = req.body.token;
    // cek token
    let decoded = jwt.verify(token, process.env.JWT_SECRET);

    return res.status(200).json({
      code: 200,
      error: null,
      data: decoded,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      data: null,
      error: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const token = req.body.token;
    const newPassword = req.body.newPass;
    const confirmPassword = req.body.confirmNewPass;

    // check password
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        code: 400,
        error: "Password not match",
        data: null,
      });
    }

    let decoded = jwt.verify(token, process.env.JWT_SECRET);

    // check user by id and reset token
    await User.findOne({
      where: { id: decoded.id, reset_token: token },
    }).then((user) => {
      if (!user) {
        return res.status(404).json({
          code: 404,
          error: "User not found",
          data: null,
        });
      }
    });

    // update password
    await User.update(
      {
        password: bcrypt.hashSync(newPassword, 8),
        reset_token: "",
      },
      {
        where: { id: decoded.id },
      }
    );

    return res.status(200).json({
      code: 200,
      error: null,
      data: "Password updated",
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      data: null,
      error: error.message,
    });
  }
};

// get menu item
const getMenu = async (req, res) => {
  try {
    let email = req.body.email;
    const aut_user = await User.findOne({
      where: { email: email },
      attributes: ["nama"],
      include: [
        {
          model: db.group,
          attributes: ["access_list"],
        },
      ],
    });
    if (aut_user === null) {
      return res.status(200).json({
        code: 401,
        error: "Unauthorized",
        data: null,
      });
    }

    return res.status(200).json({
      code: 200,
      error: null,
      data: aut_user,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      error: error.message,
      data: null,
    });
  }
};

const getOne = async (req, res) => {
  try {
    const id = req.params.id ?? null;
    if (!id) {
      return res.status(400).json({
        code: 400,
        data: null,
        error: { message: "Bad Request" },
      });
    }
    const user = await User.findOne({
      where: { id: id },
      attributes: [
        "id",
        "email",
        "nama",
        "is_active",
        "aut_group_id",
        "mst_bank_custody_id",
      ],
    });
    if (!user) {
      return res.status(400).json({
        code: 400,
        data: null,
        error: { message: "Bad Request" },
      });
    }
    return res.status(200).json({
      code: 200,
      data: user,
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      error: { message: error.message },
      data: null,
    });
  }
};

const updateGroup = async (req, res) => {
  try {
    const id = req.params.id ?? null;
    const { aut_group_id, nama } = req.body;

    if (!id) {
      return res.status(400).json({
        code: 400,
        data: null,
        error: { message: "Bad Request" },
      });
    }
    const user = await User.update(
      {
        aut_group_id: aut_group_id,
        nama: nama,
      },
      {
        where: { id: id },
      }
    );

    return res.status(200).json({
      code: 200,
      data: user,
      error: null,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        code: 409,
        error: { message: "Not Unique" },
        data: null,
      });
    }
    return res.status(500).json({
      code: 500,
      error: { message: error.message },
    });
  }
};

const remove = async (req, res) => {
  try {
    const id = req.params.id ?? null;
    if (!id) {
      return res.status(400).json({
        code: 400,
        data: null,
        error: { message: "Bad Request" },
      });
    }
    await User.destroy({ where: { id: id } }).then((num) => {
      if (num == 1) {
        res.status(200).json({
          code: 200,
          data: null,
          error: null,
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      error: { message: error.message },
      data: null,
    });
  }
};

module.exports = {
  passReset,
  checkTokenReset,
  resetPassword,
  signIn,
  signUp,
  checkAuth,
  getMenu,
  getAll,
  getOne,
  updateGroup,
  remove,
};
