const db = require("../../models");
const Op = db.Sequelize.Op;

const externalCash = async (req, res) => {
  try {
    let { start, end } = req.body;
    const options = {
      where: {
        tanggal: {
          [Op.between]: [start, end],
        },
      },
      order: [["tanggal", "ASC"]],
    };

    const data = await db.trxTwrr.findAndCountAll(options);
    res.status(200).send({
      code: 200,
      data: data,
      error: null,
    });
  } catch (error) {
    res.status(500).send({
      code: 500,
      data: null,
      error: error.message || "Some error occurred while retrieving data.",
    });
  }
};

module.exports = {
  externalCash,
};
