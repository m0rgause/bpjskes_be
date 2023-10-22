const db = require("../models");

const findAll = async (req, res) => {
  try {
    await db.bankCustody.findAll().then((data) => {
      res.send({
        code: 200,
        error: null,
        data: data,
      });
    });
  } catch (error) {
    res.status(500).send({
      code: 500,
      error: error.message || "Some error occurred while retrieving data.",
      data: null,
    });
  }
};

const findOne = async (req, res) => {
  try {
    const id = req.params.id;
    await db.bankCustody
      .findOne({
        where: { id: id },
      })
      .then((data) => {
        res.send({
          code: 200,
          error: null,
          data: data,
        });
      });
  } catch (error) {
    res.status(500).send({
      code: 500,
      error: error.message || "Some error occurred while retrieving data.",
      data: null,
    });
  }
};

const findSelect = async (req, res) => {
  try {
    const result = await db.bankCustody.findAndCountAll({
      attributes: ["id", "nama"],
      order: [["nama", "ASC"]],
    });
    res.send({
      code: 200,
      error: null,
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      code: 500,
      error: error.message || "Some error occurred while retrieving data.",
      data: null,
    });
  }
};

const create = async (req, res) => {
  try {
    await db.bankCustody.create(req.body).then((data) => {
      res.send({
        code: 200,
        error: null,
        data: data,
      });
    });
  } catch (error) {
    res.status(500).send({
      code: 500,
      error: error.message || "Some error occurred while creating data.",
      data: null,
    });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    await db.bankCustody
      .update(req.body, {
        where: { id: id },
      })
      .then((data) => {
        res.send({
          code: 200,
          error: null,
          data: data,
        });
      });
  } catch (error) {
    res.status(500).send({
      code: 500,
      error: error.message || "Some error occurred while updating data.",
      data: null,
    });
  }
};

const remove = async (req, res) => {
  try {
    const id = req.params.id;
    await db.bankCustody
      .destroy({
        where: { id: id },
      })
      .then((data) => {
        res.send({
          code: 200,
          error: null,
          data: data,
        });
      });
  } catch (error) {
    res.status(500).send({
      code: 500,
      error: error.message || "Some error occurred while deleting data.",
      data: null,
    });
  }
};

module.exports = {
  findAll,
  findOne,
  findSelect,
  create,
  update,
  remove,
};
