const db = require("../models");

const findAll = (req, res) => {
  try {
    db.bankCustody.findAll().then((data) => {
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

const findOne = (req, res) => {
  try {
    const id = req.params.id;
    db.bankCustody
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

const findSelect = (req, res) => {
  try {
    db.bankCustody
      .findAll({
        attributes: ["id", "nama"],
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

const create = (req, res) => {
  try {
    db.bankCustody.create(req.body).then((data) => {
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

const update = (req, res) => {
  try {
    const id = req.params.id;
    db.bankCustody
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

const remove = (req, res) => {
  try {
    const id = req.params.id;
    db.bankCustody
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
