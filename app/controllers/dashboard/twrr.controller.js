const db = require("../../models");
const Op = db.Sequelize.Op;
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const xlsx = require("xlsx");

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

const listTWRRFile = async (req, res) => {
  try {
    let data = await db.trxTwrrFile.findAll({
      attributes: ["id", "file_name", "status", "created_at"],
      order: [["created_at", "DESC"]],
    });

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

const detailTWRRFile = async (req, res) => {
  try {
    let { id } = req.body;
    let data = await db.trxTwrrFileData.findAll({
      where: {
        trx_twrr_file_id: id,
      },
      include: [
        {
          model: db.trxTwrrFile,
        },
        {
          model: db.trxTwrr,
        },
      ],
    });

    let dataFile = await db.trxTwrrFile.findOne({
      where: {
        id: id,
      },
    });

    res.status(200).send({
      code: 200,
      data: {
        data: data,
        file: dataFile,
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

const uploadTWRRFile = async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    const { fileName, data } = req.body;
    const listCOAKolom = [];
    const listCOAKolomXLS = [];
    const listCOAKolomAssets = [];
    const listCOAKolomLiabilities = [];

    // get list COA
    const listCOA = await db.twrrCoa.findAll({
      attributes: ["kolom", "kolom_xls", "tipe"],
      order: [
        ["tipe", "ASC"],
        ["urutan", "ASC"],
      ],
    });

    listCOA.forEach((row) => {
      listCOAKolom.push(row.kolom);
      listCOAKolomXLS.push(row.kolom_xls);

      if (row.tipe === "assets") {
        listCOAKolomAssets.push(row.kolom);
      } else if (row.tipe === "liabilities") {
        listCOAKolomLiabilities.push(row.kolom);
      }
    });

    let trx_twrr_file_id = uuidv4();
    await db.trxTwrrFile.create({
      id: trx_twrr_file_id,
      file_name: fileName,
      status: false,
      created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    });

    const dataXLS = xlsx.utils.sheet_to_json(data);
    const dataXLSHeader = xlsx.utils.sheet_to_json(data, { header: 1 });
    const dataXLSHeaderList = dataXLSHeader[0];

    let validationStatus = true;
    dataXLS.forEach((row, index) => {
      let validationNote = ``;

      // validating date format
      if (!moment(row.Date, "DD/MM/YYYY", true).isValid()) {
        validationStatus = false;
        validationNote += `Invalid Issuer Code. `;
      }
    });

    dataXLS[index]["note"] = validationNote;

    let trx_twrr_id = null;
    if (validationNote === ``) {
      let assetsTotal = 0;
      let liabilitiesTotal = 0;
      dataXLSHeaderList.forEach((row, index) => {
        let assetsColIdx = listCOAKolomAssets.indexOf(row);
        let liabilitiesColIdx = listCOAKolomLiabilities.indexOf(row);

        if (assetsColIdx !== -1) {
          assetsTotal += dataXLS[index][row];
        }

        if (liabilitiesColIdx !== -1) {
          liabilitiesTotal += dataXLS[index][row];
        }
      });
      let totalAfterCash = assetsTotal - liabilitiesTotal;
      let totalBeforeCash = totalAfterCash - row.AdjustmentCF;

      let TWRRDataLast = await db.trxTwrr.findOne({
        attributes: ["total_after_cash"],
        order: [["tanggal", "DESC"]],
      });
      let returnHarian =
        ((totalAfterCash - TWRRDataLast.total_after_cash) / totalBeforeCash) *
        100;
    }
  } catch (error) {
    await t.rollback();
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
  listTWRRFile,
  detailTWRRFile,
  uploadTWRRFile,
};
