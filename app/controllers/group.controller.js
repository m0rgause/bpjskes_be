const db = require("../models");
const Group = db.group;
const { Op } = require("sequelize");

const getAll = async (req, res) => {
  try {
    const nama = req.query.nama === "" ? null : req.query.nama;
    const startRange = req.query.startRange ?? 0;
    const endRange = req.query.endRange ?? 9;

    let options = {
      attributes: ["id", "nama", "landing"],
      distinct: true, // To mimic "exact" count behavior
      where: {},
      offset: startRange,
      limit: endRange - startRange + 1,
      order: [["nama", "ASC"]],
    };

    if (nama) {
      options.where.nama = { [Op.iLike]: `%${nama}%` };
    }

    const group = await Group.findAndCountAll(options);

    res.status(200).json({
      code: 200,
      data: group,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      error: { message: error.message },
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
    let options = {
      attributes: ["id", "nama", "landing"],
    };
    const group = await Group.findOne({
      where: { id: id },
      ...options,
    });
    if (!group) {
      return res.status(404).json({
        code: 404,
        data: null,
        error: { message: "Not Found" },
      });
    }
    return res.status(200).json({
      code: 200,
      data: group,
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

const getSelect = async (req, res) => {
  try {
    const group = await Group.findAndCountAll({
      attributes: ["id", "nama"],
      order: [["nama", "ASC"]],
    });

    return res.status(200).json({
      code: 200,
      data: group,
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

const update = async (req, res) => {
  try {
    const id = req.params.id ?? null;
    const { nama, landing } = req.body;
    if (!id || !nama || !landing) {
      return res.status(400).json({
        code: 400,
        data: null,
        error: { message: "Bad Request" },
      });
    }
    await Group.update({ nama: nama, landing: landing }, { where: { id: id } })
      .then((num) => {
        if (num == 1) {
          res.status(200).json({
            code: 200,
            data: null,
            error: null,
          });
        }
      })
      .catch((err) => {
        if (err.name === "SequelizeUniqueConstraintError") {
          res.status(500).json({
            code: 500,
            error: { message: "Not Unique" },
            data: null,
          });
        } else {
          res.status(500).json({
            code: 500,
            error: { message: err.message },
            data: null,
          });
        }
      });
  } catch (error) {
    res.status(500).json({
      code: 500,
      error: { message: error.message },
      data: null,
    });
  }
};

const add = async (req, res) => {
  try {
    const { nama, landing } = req.body;
    if (!nama || !landing) {
      return res.status(400).json({
        code: 400,
        data: null,
        error: { message: "Bad Request" },
      });
    }
    const [group, created] = await Group.findOrCreate({
      where: { nama: nama },
      defaults: { nama: nama, landing: landing },
    });

    if (created) {
      return res.status(201).json({
        code: 201,
        data: group,
        error: null,
      });
    } else {
      return res.status(409).json({
        code: 409,
        data: null,
        error: { message: "Already Exists" },
      });
    }
  } catch (error) {
    res.status(500).json({
      code: 500,
      error: { message: error.message },
      data: null,
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
    await Group.destroy({ where: { id: id } })
      .then((num) => {
        if (num == 1) {
          res.status(200).json({
            code: 200,
            data: null,
            error: null,
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          code: 500,
          error: { message: err.message },
          data: null,
        });
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
  getAll,
  getSelect,
  getOne,
  update,
  add,
  remove,
};
