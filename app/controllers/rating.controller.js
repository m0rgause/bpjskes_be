const db = require("../models");
const Rating = db.rating;
const Op = db.Sequelize.Op;

// get all data
const findAll = (req, res) => {
  const { start, end, search } = req.query;
  const limit = end - start + 1;
  var condition = search ? { nama: { [Op.iLike]: `%${search}%` } } : null;

  Rating.findAndCountAll({
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

// get all data for select
const findAllForSelect = (req, res) => {
  Rating.findAll({
    attributes: ["id", "nama"],
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
  const id = req.params.id;

  Rating.findOne({ where: { id: id } })
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
  // create data
  const rating = {
    nama: req.body.nama,
    pd: req.body.pd,
    urutan: req.body.urutan,
  };

  // Save data in the database
  Rating.create(rating)
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
  const id = req.params.id;

  Rating.update(req.body, { where: { id: id } })
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
  const id = req.params.id;

  Rating.destroy({ where: { id: id } })
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
  findAllForSelect,
};
