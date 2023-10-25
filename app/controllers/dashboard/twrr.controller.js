const db = require("../../models");
const Op = db.Sequelize.Op;
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const xlsx = require("xlsx");

const externalCash = async (req, res) => {
  try {
    let { type, startDate, rangeDate } = req.body;
    let period = [];
    for (let i = 0; i < rangeDate; i++) {
      if (type === "daily") {
        period.push(moment(startDate).add(i, "days").format("YYYY-MM-DD"));
      } else if (type === "monthly") {
        period.push(moment(startDate).add(i, "months").format("YYYY-MM"));
      } else if (type === "yearly") {
        period.push(moment(startDate).add(i, "years").format("YYYY"));
      }
    }
    let query = ``;
    if (type === "daily") {
      query = `SELECT tanggal as period, total_before_cash, total_after_cash, return_harian, return_akumulasi FROM trx_twrr WHERE tanggal IN (:listDate) ORDER BY tanggal ASC`;
    } else if (type === "monthly") {
      query = `SELECT 
      trx_rekap.period as period,
      sum(trx_twrr.total_before_cash) as total_before_cash,
      sum(trx_twrr.total_after_cash) as total_after_cash,
      sum(trx_twrr.return_harian) as return_harian,
      sum(trx_twrr.return_akumulasi) as return_akumulasi
       FROM trx_twrr JOIN trx_rekap ON trx_rekap.trx_twrr_id = trx_twrr.id WHERE trx_rekap.tipe = 'twrr' AND trx_rekap.period IN (:listDate) 
      GROUP BY trx_rekap.period
      ORDER BY trx_rekap.period ASC`;
    } else if (type === "yearly") {
      query = `SELECT 
      trx_rekap.tahun as period,
      sum(trx_twrr.total_before_cash) as total_before_cash,
      sum(trx_twrr.total_after_cash) as total_after_cash,
      sum(trx_twrr.return_harian) as return_harian,
      sum(trx_twrr.return_akumulasi) as return_akumulasi
       FROM trx_twrr JOIN trx_rekap ON trx_rekap.trx_twrr_id = trx_twrr.id WHERE trx_rekap.tipe = 'twrr' AND trx_rekap.tahun IN (:listDate) 
      GROUP BY trx_rekap.tahun
      ORDER BY trx_rekap.tahun ASC`;
    }

    const options = {
      replacements: {
        listDate: period,
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
    let { session } = req.body;
    const user_id = JSON.parse(session).user.id;

    let data = await db.trxTwrrFile.findAll({
      attributes: ["id", "file_name", "status", "created_at"],
      order: [["created_at", "DESC"]],
      where: {
        aut_user_id: user_id,
      },
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
  // const t = await db.sequelize.transaction();
  let trx_twrr_file_id = uuidv4();
  try {
    const result = await db.sequelize.transaction(async (t) => {
      const { fileName, data, session } = req.body;
      const user_id = JSON.parse(session).user.id;
      const bankCustody = await db.user.findOne({
        attributes: ["mst_bank_custody_id"],
        where: {
          id: user_id,
        },
      });

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

      const dataXLS = xlsx.utils.sheet_to_json(data);
      const dataXLSHeader = xlsx.utils.sheet_to_json(data, { header: 1 });
      const dataXLSHeaderList = dataXLSHeader[0];
      // validating header
      let validationHeader = true;
      listCOAKolomXLS.forEach((row) => {
        if (!dataXLSHeaderList.includes(row)) {
          validationHeader = false;
        }
      });
      if (!validationHeader) {
        throw new Error("Invalid Header");
      }

      // trx_twrr_file_id = uuidv4();
      await db.trxTwrrFile.create({
        id: trx_twrr_file_id,
        file_name: fileName,
        status: false,
        aut_user_id: user_id,
        created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
      });

      let validationStatus = true;
      let index = 0;
      for (const row of dataXLS) {
        let validationNote = ``;
        // validating date format
        if (!moment(row.Date, "DD/MM/YYYY", true).isValid()) {
          validationStatus = false;
          validationNote += `Invalid Date. `;
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
            assetsTotal += row[col] ? Number(row[col]) : 0;
          }
          let liabilitiesColIdx = listCOAKolomLiabilities.indexOf(col);
          if (liabilitiesColIdx !== -1) {
            liabilitiesTotal += row[col] ? Number(row[col]) : 0;
          }
          let CoaKolomXLSIdx = listCOAKolomXLS.indexOf(col);
          if (CoaKolomXLSIdx !== -1) {
            listCOAKolom.forEach((row2) => {
              if (row2 === listCOAKolom[CoaKolomXLSIdx]) {
                listForUpdate[row2] = row[col] ? Number(row[col]) : 0;
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
          returnHarian =
            ((totalBeforeCash - (TWRRDataLast?.total_after_cash ?? 0)) /
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
          returnAkumulasi =
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
                mst_bank_custody_id: bankCustody.mst_bank_custody_id,
              },
              {
                where: {
                  id: checkTWRR.id,
                },
                transaction: t,
              }
            );
          } else {
            trx_twrr_id = uuidv4();
            await db.trxTwrr.create(
              {
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
                mst_bank_custody_id: bankCustody.mst_bank_custody_id,
              },
              {
                transaction: t,
              }
            );
          }
          const checkRekap = await db.trxRekap.findOne({
            include: [
              {
                model: db.trxTwrr,
                attributes: ["tanggal"],
              },
            ],
            where: {
              tipe: "twrr",
              tahun: tahun,
              bulan: bulan,
            },
            transaction: t,
          });

          if (checkRekap) {
            // row.Date > checkRekap.trx_twrr.tanggal
            if (
              moment(row.Date, "DD/MM/YYYY").format("YYYY-MM-DD") >
              checkRekap.trx_twrr.tanggal
            ) {
              await db.trxRekap.update(
                {
                  trx_twrr_id: trx_twrr_id,
                  period: period,
                  tahun: tahun,
                  bulan: bulan,
                  end_year: bulan === "12" ? 1 : 0,
                },
                {
                  where: {
                    trx_twrr_id: checkRekap.trx_twrr_id,
                  },
                  transaction: t,
                }
              );
            }
          } else {
            await db.trxRekap.create(
              {
                id: uuidv4(),
                tipe: "twrr",
                trx_twrr_id: trx_twrr_id,
                period: period,
                tahun: tahun,
                bulan: bulan,
                end_year: bulan === "12" ? 1 : 0,
              },
              {
                transaction: t,
              }
            );
          }
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
          trx_twrr_id: null,
          tanggal:
            validationNote === ``
              ? moment(row.Date, "DD/MM/YYYY").format("YYYY-MM-DD")
              : null,
          total_before_cash: totalBeforeCash,
          total_after_cash: totalAfterCash,
          return_harian: returnHarian,
          return_akumulasi: returnAkumulasi,
          adjustment_cf: row.AdjusmentCF ?? 0,
          note: validationNote,
          status: validationStatus,
          created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
          mst_bank_custody_id: bankCustody.mst_bank_custody_id,
        });
        index++;
      }

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

      if (!validationStatus) {
        throw new Error("Invalid Data");
      }

      return {
        status: validationStatus,
        trx_twrr_file_id: trx_twrr_file_id,
      };
    });
    res.status(200).send({
      code: 200,
      data: result,
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
