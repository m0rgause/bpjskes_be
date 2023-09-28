const db = require("../models");
const Op = db.Sequelize.Op;

// get all data
const findAll = (req, res) => {
  const { start, end, search, table } = req.query;

  const limit = end - start + 1;
  var condition = search ? { nama: { [Op.iLike]: `%${search}%` } } : null;
  db[table]
    .findAndCountAll({
      where: condition,
      limit,
      offset: start,
      order: [["urutan", "ASC"]],
    })
    .then((data) => {
      res.send({ code: 200, data: data, error: null });
    })
    .catch((err) => {
      res.status(500).send({
        code: 500,
        data: null,
        error: err.message || "Some error occurred while retrieving data.",
      });
    });
};

// get data by id
const findOne = (req, res) => {
  const { id, table } = req.params;

  db[table]
    .findOne({ where: { id: id } })
    .then((data) => {
      res.send({ code: 200, data: data, error: null });
    })
    .catch((err) => {
      res.status(500).send({
        code: 500,
        data: null,
        error: "Error retrieving data with id=" + id,
      });
    });
};

// create data
const create = (req, res) => {
  const { table } = req.params;
  const { kode } = req.body;

  // Validate request
  if (!kode) {
    res.status(400).send({
      code: 400,
      data: null,
      error: "Content can not be empty!",
    });
    return;
  }

  // Create data
  db[table]
    .create(req.body)
    .then((data) => {
      res.send({ code: 200, data: data, error: null });
    })
    .catch((err) => {
      res.status(500).send({
        code: 500,
        data: null,
        error: err.message || "Some error occurred while creating the data.",
      });
    });
};

// update data by id
const update = (req, res) => {
  const { id, table } = req.params;

  db[table]
    .update(req.body, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ code: 200, data: num, error: null });
      } else {
        res.send({
          code: 404,
          data: null,
          error: `Cannot update data with id=${id}. Maybe data was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        code: 500,
        data: null,
        error: `Error updating data with id=${id}`,
      });
    });
};

// delete data by id
const deleteOne = (req, res) => {
  const { id, table } = req.params;

  db[table]
    .destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ code: 200, data: num, error: null });
      } else {
        res.send({
          code: 404,
          data: null,
          error: `Cannot delete data with id=${id}. Maybe data was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        code: 500,
        data: null,
        error: `Could not delete data with id=${id}`,
      });
    });
};

module.exports = {
  findAll,
  findOne,
  create,
  update,
  deleteOne,
};
