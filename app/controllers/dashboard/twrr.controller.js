const db = require("../../models");
const Op = db.Sequelize.Op;
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const xlsx = require("xlsx");

const externalCash = async (req, res) => {
  try {
    let { type, listDate } = req.body;

    if (listDate === undefined || listDate.length === 0) {
      res.status(200).send({
        code: 200,
        data: null,
        error: "List date cannot be empty",
      });
      return;
    }
    let query = ``;
    if (type === "daily") {
      query = `SELECT tanggal, total_before_cash, total_after_cash, return_harian, return_akumulasi FROM trx_twrr WHERE tanggal IN (:listDate) ORDER BY tanggal ASC`;
    } else if (type === "monthly") {
      query = `SELECT * FROM trx_twrr JOIN trx_rekap ON trx_rekap.trx_twrr_id = trx_twrr.id WHERE trx_rekap.tipe = 'twrr' AND trx_rekap.period IN (:listDate) ORDER BY trx_twrr.tanggal ASC, trx_rekap.period ASC, trx_rekap.bulan ASC`;
    } else if (type === "yearly") {
      query = `SELECT * FROM trx_twrr JOIN trx_rekap ON trx_rekap.trx_twrr_id = trx_twrr.id WHERE trx_rekap.tipe = 'twrr' AND trx_rekap.tahun IN (:listDate)  ORDER BY trx_twrr.tanggal ASC, trx_rekap.tahun ASC, trx_rekap.bulan ASC`;
    }

    const options = {
      replacements: {
        listDate: listDate,
      },
      type: db.Sequelize.QueryTypes.SELECT,
    };

    data = await db.sequelize.query(query, options);

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
        listCOAKolomAssets.push(row.kolom_xls);
      }
      if (row.tipe === "liabilities") {
        listCOAKolomLiabilities.push(row.kolom_xls);
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
    dataXLS.forEach(async (row, index) => {
      let validationNote = ``;
      // validating date format
      if (!moment(row.Date, "DD/MM/YYYY", true).isValid()) {
        validationStatus = false;
        validationNote += `Invalid Issuer Code. `;
      }
      dataXLS[index]["note"] = validationNote;

      let trx_twrr_id = null;
      let totalAfterCash = 0,
        totalBeforeCash = 0,
        returnHarian = 0,
        returnAkumulasi = 0;
      const listForUpdate = {};

      let assetsTotal = 0;
      let liabilitiesTotal = 0;
      dataXLSHeaderList.forEach((col) => {
        let assetsColIdx = listCOAKolomAssets.indexOf(col);
        if (assetsColIdx !== -1) {
          assetsTotal += Number(row[col]);
        }
        let liabilitiesColIdx = listCOAKolomLiabilities.indexOf(col);
        if (liabilitiesColIdx !== -1) {
          liabilitiesTotal += Number(row[col]);
        }
        let CoaKolomXLSIdx = listCOAKolomXLS.indexOf(col);
        if (CoaKolomXLSIdx !== -1) {
          listCOAKolom.forEach((row2) => {
            if (row2 === listCOAKolom[CoaKolomXLSIdx]) {
              listForUpdate[row2] = Number(row[col]);
            }
          });
        }
      });

      if (validationNote === ``) {
        totalAfterCash = Number(assetsTotal) - Number(liabilitiesTotal);
        totalBeforeCash = totalAfterCash - Number(row.AdjusmentCF ?? 0);

        let TWRRDataLast = await db.trxTwrr.findOne({
          attributes: ["total_after_cash"],
          order: [["tanggal", "DESC"]],
        });
        let returnHarian =
          ((totalBeforeCash - TWRRDataLast.total_after_cash) /
            totalBeforeCash) *
          100;
        let tglMoment = moment(row.Date, "DD/MM/YYYY");
        let period = tglMoment.format("YYYY-MM");
        let tahun = tglMoment.format("YYYY");
        let bulan = tglMoment.format("MM");
        let TWRRDataSumLast = await db.sequelize.query(
          `SELECT SUM(return_harian) as return_harian FROM trx_twrr WHERE TO_CHAR(tanggal, 'YYYY-MM') = :period`,
          {
            replacements: {
              period: period,
            },
            type: db.Sequelize.QueryTypes.SELECT,
          }
        );
        let returnAkumulasi =
          (TWRRDataSumLast[0]?.return_harian ?? 0) + returnHarian;

        const checkTWRR = await db.trxTwrr.findOne({
          where: {
            tanggal: moment(row.Date, "DD/MM/YYYY").format("YYYY-MM-DD"),
          },
        });
        if (checkTWRR) {
          trx_twrr_id = checkTWRR.id;
          await db.trxTwrr.update(
            {
              ...listForUpdate,
              total_before_cash: totalBeforeCash,
              total_after_cash: totalAfterCash,
              return_harian: returnHarian,
              return_akumulasi: returnAkumulasi,
              updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
              adjustment_cf: row.AdjusmentCF ?? 0,
              tanggal: moment(row.Date, "DD/MM/YYYY").format("YYYY-MM-DD"),
              trx_twrr_file_id: trx_twrr_file_id,
            },
            {
              where: {
                id: checkTWRR.id,
              },
            }
          );
          await db.trxRekap.destroy({
            where: {
              tipe: "twrr",
              trx_twrr_id: trx_twrr_id,
            },
          });
        } else {
          trx_twrr_id = uuidv4();
          await db.trxTwrr.create({
            id: trx_twrr_id,
            ...listForUpdate,
            total_before_cash: totalBeforeCash,
            total_after_cash: totalAfterCash,
            return_harian: returnHarian,
            return_akumulasi: returnAkumulasi,
            created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
            adjustment_cf: row.AdjusmentCF ?? 0,
            tanggal: moment(row.Date, "DD/MM/YYYY").format("YYYY-MM-DD"),
            trx_twrr_file_id: trx_twrr_file_id,
          });
        }
        await db.trxRekap.destroy({
          where: {
            tipe: "twrr",
            trx_twrr_id: trx_twrr_id,
          },
        });
        await db.trxRekap.create({
          id: uuidv4(),
          tipe: "twrr",
          trx_twrr_id: trx_twrr_id,
          period: period,
          tahun: tahun,
          bulan: bulan,
          end_year: bulan === "12" ? 1 : 0,
        });
      }
      if (validationNote !== ``) {
        trx_twrr_id = null;
        validationStatus = false;
        totalAfterCash = 0;
        totalBeforeCash = 0;
        returnHarian = 0;
        returnAkumulasi = 0;
      }

      const trx_twrr_file_data_id = uuidv4();
      await db.trxTwrrFileData.create({
        ...listForUpdate,
        id: trx_twrr_file_data_id,
        trx_twrr_file_id: trx_twrr_file_id,
        trx_twrr_id: trx_twrr_id,
        tanggal: moment(row.Date, "DD/MM/YYYY").format("YYYY-MM-DD"),
        total_before_cash: totalBeforeCash,
        total_after_cash: totalAfterCash,
        return_harian: returnHarian,
        return_akumulasi: returnAkumulasi,
        adjustment_cf: row.AdjusmentCF ?? 0,
        note: validationNote,
        status: validationStatus,
        created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
      });
    });

    if (validationStatus) {
      await db.trxTwrrFile.update(
        {
          status: true,
        },
        {
          where: {
            id: trx_twrr_file_id,
          },
        }
      );
    }

    // await t.rollback();
    await t.commit();
    res.status(200).send({
      code: 200,
      data: {
        status: validationStatus,
        trx_twrr_file_id: trx_twrr_file_id,
      },
      error: null,
    });
  } catch (error) {
    await t.rollback();
    res.status(500).send({
      code: 500,
      data: null,
      error: error.message || "Some error occurred while retrieving data.",
    });
  }
};

const listKolom = async (req, res) => {
  try {
    const optionsCol = {
      where: {
        tampil: 1,
      },
      order: [
        ["tipe", "ASC"],
        ["urutan", "ASC"],
      ],
    };
    const dataCol = await db.twrrCoa.findAndCountAll(optionsCol);

    res.status(200).send({
      code: 200,
      data: dataCol,
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
  listTWRRFile,
  detailTWRRFile,
  uploadTWRRFile,
  listKolom,
};
