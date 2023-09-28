const db = require("../models");
const Issuer = db.issuer;
const Op = db.Sequelize.Op;

// get all data
const findAll = (req, res) => {
  const { start, end, search } = req.query;
  const limit = end - start + 1;
  var condition = search ? { nama: { [Op.iLike]: `%${search}%` } } : null;

  Issuer.findAndCountAll({
    where: condition,
    limit,
    offset: start,
    include: {
      model: db.rating,
    },
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

  Issuer.findOne({
    where: { id: id },
    include: {
      model: db.rating,
    },
  })
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
  // Validate request
  if (!req.body.kode) {
    res.status(400).send({
      code: 400,
      data: null,
      error: "Content can not be empty!",
    });
    return;
  }

  // Create a data
  const data = {
    kode: req.body.kode,
    nama: req.body.nama,
    mst_rating_id: req.body.rating,
    urutan: req.body.urutan,
    lgd: req.body.lgd,
  };

  // Save data in the database
  Issuer.create(data)
    .then((result) => {
      res.send({ code: 200, data: result, error: null });
    })
    .catch((err) => {
      res.status(500).send({
        code: 500,
        data: null,
        error: err.message || "Some error occurred while creating the data.",
      });
    });
};

// update data
const update = (req, res) => {
  const id = req.params.id;

  Issuer.update(req.body, {
    where: { id: id },
  })
    .then((result) => {
      if (result == 1) {
        res.send({ code: 200, data: result, error: null });
      } else {
        res.send({
          code: 404,
          data: null,
          error: "Cannot update data with id=${id}. Maybe data was not found!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        code: 500,
        data: null,
        error: "Error updating data with id=" + id,
      });
    });
};

// delete data
const deleteOne = (req, res) => {
  const id = req.params.id;

  Issuer.destroy({
    where: { id: id },
  })
    .then((result) => {
      if (result == 1) {
        res.send({ code: 200, data: result, error: null });
      } else {
        res.send({
          code: 404,
          data: null,
          error: "Cannot delete data with id=${id}. Maybe data was not found!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        code: 500,
        data: null,
        error: "Could not delete data with id=" + id,
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
