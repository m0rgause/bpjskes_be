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

const comparison = async (req, res) => {
  try {
    let { type, list_date } = req.body;

    let options = {};
    let data;
    if (list_date === undefined || list_date.length === 0) {
      res.status(200).send({
        code: 200,
        data: null,
        error: "List date cannot be empty",
      });
      return;
    }
    if (type === "daily") {
      const query = `SELECT tanggal, total_before_cash, total_after_cash, return_harian
FROM trx_twrr
WHERE tanggal IN (:list_date)
ORDER BY tanggal ASC
`;
      options = {
        replacements: {
          list_date: list_date,
        },
        type: db.Sequelize.QueryTypes.SELECT,
      };
      data = await db.sequelize.query(query, options);
    } else if (type === "monthly") {
      const query = `SELECT
  trx_twrr.tanggal,
  trx_twrr.total_before_cash,
  trx_twrr.total_after_cash,
  trx_twrr.return_harian
FROM
  trx_twrr
JOIN
  trx_rekap
ON
  trx_rekap.trx_twrr_id = trx_twrr.id
WHERE
  trx_rekap.tipe = 'twrr'
  AND trx_rekap.period IN (:list_date)
ORDER BY
  trx_rekap.period ASC;
`;
      options = {
        replacements: {
          list_date: list_date,
        },
        type: db.Sequelize.QueryTypes.SELECT,
      };
      data = await db.sequelize.query(query, options);
    } else if (type === "yearly") {
      const query = `SELECT
  trx_twrr.tanggal,
  trx_twrr.total_before_cash,
  trx_twrr.total_after_cash,
  trx_twrr.return_harian
FROM
  trx_twrr
JOIN
  trx_rekap
ON
  trx_rekap.trx_twrr_id = trx_twrr.id
WHERE
  trx_rekap.tipe = 'twrr'
  AND trx_rekap.tahun IN (:list_date) 
  AND end_year = 1
ORDER BY
  trx_rekap.tahun ASC;
`;
      options = {
        replacements: {
          list_date: list_date,
        },
        type: db.Sequelize.QueryTypes.SELECT,
      };
      data = await db.sequelize.query(query, options);
    }
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

const detail = async (req, res) => {
  try {
    let { start, end } = req.body;

    const optionsCol = {
      where: {
        tampil: 1,
      },
      order: [
        ["tipe", "ASC"],
        ["urutan", "ASC"],
      ],
    };
    const options = {
      where: {
        tanggal: {
          [Op.between]: [start, end],
        },
      },
      order: [["tanggal", "ASC"]],
    };
    const dataCol = await db.twrrCoa.findAndCountAll(optionsCol);
    const data = await db.trxTwrr.findAndCountAll(options);

    res.status(200).send({
      code: 200,
      data: {
        data: data,
        dataCol: dataCol,
      },
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
  comparison,
  detail,
};
