const db = require("../models");
const TWRRCOA = db.twrrCoa;
const Op = db.Sequelize.Op;

// get all data
const findAll = (req, res) => {
  try {
    let { start, end, search } = req.query;
    start = parseInt(start) || 0;
    end = parseInt(end) || 9;
    search = search || "";

    TWRRCOA.findAndCountAll({
      where: {
        label: {
          [Op.iLike]: `%${search}%`,
        },
      },
      offset: start,
      limit: end - start + 1,
      order: [
        ["tipe", "ASC"],
        ["kolom", "ASC"],
      ],
    }).then((data) => {
      res.send({
        data: data,
        error: null,
      });
    });
  } catch (error) {
    res.status(500).send({
      data: null,
      error: error.message || "Some error occurred while retrieving data.",
    });
  }
};

// save data
const create = (req, res) => {
  try {
    // Create data
    const twrrCoa = {
      tipe: req.body.tipe,
      kolom: req.body.kolom,
      label: req.body.label,
      urutan: req.body.urutan,
    };

    // Save data in the database
    TWRRCOA.create(twrrCoa).then((data) => {
      res.send({
        code: 200,
        data: data,
        error: null,
      });
    });
  } catch (error) {
    res.status(500).send({
      code: 500,
      data: null,
      error: error.message || "Some error occurred while creating the data.",
    });
  }
};

// edit data
const update = (req, res) => {
  try {
    const id = req.params.id;

    TWRRCOA.update(req.body, {
      where: { id: id },
    }).then((num) => {
      if (num == 1) {
        res.send({
          code: 200,
          data: null,
          error: null,
        });
      } else {
        res.send({
          code: 404,
          data: null,
          error: `Cannot update data with id=${id}. Maybe data was not found or req.body is empty!`,
        });
      }
    });
  } catch (error) {
    res.status(500).send({
      code: 500,
      data: null,
      error: error.message || "Error updating data with id=" + id,
    });
  }
};

// get one data
const findOne = (req, res) => {
  try {
    const id = req.params.id;

    TWRRCOA.findOne({ where: { id: id } }).then((data) => {
      res.send({
        data: data,
        error: null,
      });
    });
  } catch (error) {
    res.status(500).send({
      data: null,
      error: "Error retrieving data with id=" + id,
    });
  }
};

// delete data
const deleteData = (req, res) => {
  try {
    const id = req.params.id;

    TWRRCOA.destroy({
      where: { id: id },
    }).then((num) => {
      if (num == 1) {
        res.send({
          code: 200,
          data: null,
          error: null,
        });
      } else {
        res.send({
          code: 404,
          data: null,
          error: `Cannot delete data with id=${id}. Maybe data was not found!`,
        });
      }
    });
  } catch (error) {
    res.status(500).send({
      code: 500,
      data: null,
      error: "Could not delete data with id=" + id,
    });
  }
};

module.exports = {
  findAll,
  create,
  update,
  findOne,
  deleteData,
};
