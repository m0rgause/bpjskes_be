const db = require("../../models");
const Op = db.Sequelize.Op;
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const xlsx = require("xlsx");

const externalCash = async (req, res) => {
  try {
    let { type, startDate, endDate, rangeDate } = req.body;
    // let period = [];
    // for (let i = 0; i < rangeDate; i++) {
    if (type === "daily") {
      // startDate = moment(startDate).subtract(1, "days").format("YYYY-MM-DD");
      //     period.push(moment(startDate).add(i, "days").format("YYYY-MM-DD"));
    } else if (type === "monthly") {
      startDate = moment(startDate).subtract(1, "months").format("YYYY-MM");
      //     period.push(moment(startDate).add(i, "months").format("YYYY-MM"));
    } else if (type === "yearly") {
      startDate = moment(startDate).subtract(1, "years").format("YYYY");
      //     period.push(moment(startDate).add(i, "years").format("YYYY"));
    }
    // }
    let query = ``;
    if (type === "daily") {
      query = `SELECT tanggal as period, total_before_cash, total_after_cash, return_harian, return_akumulasi FROM trx_twrr WHERE tanggal
      >= :startDate AND tanggal <= :endDate
       ORDER BY tanggal ASC`;
    } else if (type === "monthly") {
      query = `SELECT 
      trx_rekap.period as period,
      sum(trx_twrr.total_before_cash) as total_before_cash,
      sum(trx_twrr.total_after_cash) as total_after_cash,
      sum(trx_twrr.return_harian) as return_harian,
      sum(trx_twrr.return_akumulasi) as return_akumulasi
       FROM trx_twrr JOIN trx_rekap ON trx_rekap.trx_twrr_id = trx_twrr.id WHERE trx_rekap.tipe = 'twrr' 
      AND trx_rekap.period >= :startDate AND trx_rekap.period <= :endDate
      GROUP BY trx_rekap.period
      ORDER BY trx_rekap.period ASC`;
    } else if (type === "yearly") {
      query = `SELECT 
      trx_rekap.tahun as period,
      sum(trx_twrr.total_before_cash) as total_before_cash,
      sum(trx_twrr.total_after_cash) as total_after_cash,
      sum(trx_twrr.return_harian) as return_harian,
      sum(trx_twrr.return_akumulasi) as return_akumulasi
       FROM trx_twrr JOIN trx_rekap ON trx_rekap.trx_twrr_id = trx_twrr.id WHERE trx_rekap.tipe = 'twrr' 
      AND trx_rekap.tahun >= :startDate AND trx_rekap.tahun <= :endDate
      GROUP BY trx_rekap.tahun
      ORDER BY trx_rekap.tahun ASC`;
    }

    const options = {
      replacements: {
        // listDate: period,
        startDate: startDate,
        endDate: endDate,
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
      order: [["tanggal", "ASC"]],
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

const _excelSerialDateToJSDate = (serial) => {
  // formatDate can be DD/MM/YYYY or DD/MM/YY
  if (moment(serial, "DD/MM/YYYY", true).isValid()) {
    return moment(serial, "DD/MM/YYYY", true).format("DD/MM/YYYY");
  } else if (moment(serial, "DD/MM/YY", true).isValid()) {
    return moment(serial, "DD/MM/YY", true).format("DD/MM/YYYY");
  }

  // The Excel epoch starts on January 1, 1900
  const excelEpoch = new Date("1899-12-30T00:00:00Z");

  // Convert the Excel serial number to milliseconds
  const milliseconds = serial * 24 * 60 * 60 * 1000;

  const date = new Date(excelEpoch.getTime() + milliseconds);

  return date;
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
        row.Date = _excelSerialDateToJSDate(row.Date);
        // validating date format
        if (!moment(row.Date, "DD/MM/YYYY", true).isValid()) {
          validationStatus = false;
          validationNote += `Invalid Date. `;
        }
        dataXLS[index]["note"] = validationNote;

        let trx_twrr_id = null;
        let totalAfterCash = Number(row.TotalSesudahExternalCash ?? 0),
          totalBeforeCash = Number(row.TotalSebelumExternalCash ?? 0),
          returnHarian = row.ReturnHarian ?? 0,
          returnAkumulasi = row.ReturnAkumulasi ?? 0;

        // cek length return harian dan return akumulasi
        if (returnHarian.length > 10 || returnAkumulasi.length > 10) {
          // ubah returnHarian menjadi persen
          returnHarian = Number(returnHarian) * 100;
          returnAkumulasi = Number(returnAkumulasi) * 100;
        }

        const listForUpdate = {};

        dataXLSHeaderList.forEach((col) => {
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
              tahun: moment(row.Date, "DD/MM/YYYY").format("YYYY"),
              bulan: moment(row.Date, "DD/MM/YYYY").format("MM"),
            },
            transaction: t,
          });
          let endYear = 0;
          if (
            moment(row.Date, "DD/MM/YYYY").format("MM") === "12" &&
            moment(row.Date, "DD/MM/YYYY").format("DD") === "31"
          ) {
            endYear = 1;
          } else if (
            moment(row.Date, "DD/MM/YYYY").format("YYYY") ===
            moment().format("YYYY") &&
            moment(row.Date, "DD/MM/YYYY").format("MM") >= moment().format("MM")
          ) {
            endYear = 1;
          }

          if (checkRekap) {
            // row.Date > checkRekap.trx_twrr.tanggal
            if (
              moment(row.Date, "DD/MM/YYYY").format("YYYY-MM-DD") >
              checkRekap.trx_twrr.tanggal
            ) {
              // get id where tahun = tahun and bulan = bulan order by tanggal desc limit 1
              const getIdTwrr = await db.sequelize.query(
                `SELECT id FROM trx_twrr WHERE to_char(tanggal, 'YYYY-MM') = :period ORDER BY tanggal DESC LIMIT 1`,
                {
                  replacements: {
                    period: moment(row.Date, "DD/MM/YYYY").format("YYYY-MM"),
                  },
                  type: db.Sequelize.QueryTypes.SELECT,
                  transaction: t,
                }
              );
              await db.trxRekap.update(
                {
                  trx_twrr_id: getIdTwrr[0].id,
                  period: moment(row.Date, "DD/MM/YYYY").format("YYYY-MM"),
                  tahun: moment(row.Date, "DD/MM/YYYY").format("YYYY"),
                  bulan: moment(row.Date, "DD/MM/YYYY").format("MM"),
                  end_year: endYear,
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
                period: moment(row.Date, "DD/MM/YYYY").format("YYYY-MM"),
                tahun: moment(row.Date, "DD/MM/YYYY").format("YYYY"),
                bulan: moment(row.Date, "DD/MM/YYYY").format("MM"),
                end_year: endYear,
              },
              {
                transaction: t,
              }
            );
            // update rekap set end_year = 0 where tahun = tahun and bulan < bulan
            await db.sequelize.query(
              `UPDATE trx_rekap SET end_year = 0 WHERE tahun = :tahun AND bulan < :bulan`,
              {
                replacements: {
                  tahun: moment(row.Date, "DD/MM/YYYY").format("YYYY"),
                  bulan: moment(row.Date, "DD/MM/YYYY").format("MM"),
                },
                type: db.Sequelize.QueryTypes.UPDATE,
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

// const uploadTWRRFile = async (req, res) => {
//   // const t = await db.sequelize.transaction();
//   let trx_twrr_file_id = uuidv4();
//   try {
//     const result = await db.sequelize.transaction(async (t) => {
//       const { fileName, data, session } = req.body;
//       const user_id = JSON.parse(session).user.id;
//       const bankCustody = await db.user.findOne({
//         attributes: ["mst_bank_custody_id"],
//         where: {
//           id: user_id,
//         },
//       });

//       const listCOAKolom = [];
//       const listCOAKolomXLS = [];
//       const listCOAKolomAssets = [];
//       const listCOAKolomLiabilities = [];

//       // get list COA
//       const listCOA = await db.twrrCoa.findAll({
//         attributes: ["kolom", "kolom_xls", "tipe"],
//         order: [
//           ["tipe", "ASC"],
//           ["urutan", "ASC"],
//         ],
//       });

//       listCOA.forEach((row) => {
//         listCOAKolom.push(row.kolom);
//         listCOAKolomXLS.push(row.kolom_xls);

//         if (row.tipe === "assets") {
//           listCOAKolomAssets.push(row.kolom_xls);
//         }
//         if (row.tipe === "liabilities") {
//           listCOAKolomLiabilities.push(row.kolom_xls);
//         }
//       });

//       const dataXLS = xlsx.utils.sheet_to_json(data);
//       const dataXLSHeader = xlsx.utils.sheet_to_json(data, { header: 1 });
//       const dataXLSHeaderList = dataXLSHeader[0];
//       // validating header
//       let validationHeader = true;
//       listCOAKolomXLS.forEach((row) => {
//         if (!dataXLSHeaderList.includes(row)) {
//           validationHeader = false;
//         }
//       });
//       if (!validationHeader) {
//         throw new Error("Invalid Header");
//       }

//       // trx_twrr_file_id = uuidv4();
//       await db.trxTwrrFile.create({
//         id: trx_twrr_file_id,
//         file_name: fileName,
//         status: false,
//         aut_user_id: user_id,
//         created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
//       });

//       let validationStatus = true;
//       let index = 0;
//       for (const row of dataXLS) {
//         let validationNote = ``;
//         // validating date format
//         if (!moment(row.Date, "DD/MM/YYYY", true).isValid()) {
//           validationStatus = false;
//           validationNote += `Invalid Date. `;
//         }
//         dataXLS[index]["note"] = validationNote;

//         let trx_twrr_id = null;
//         let totalAfterCash = 0,
//           totalBeforeCash = 0,
//           returnHarian = 0,
//           returnAkumulasi = 0;
//         const listForUpdate = {};

//         let assetsTotal = 0;
//         let liabilitiesTotal = 0;
//         dataXLSHeaderList.forEach((col) => {
//           let assetsColIdx = listCOAKolomAssets.indexOf(col);
//           if (assetsColIdx !== -1) {
//             assetsTotal += row[col] ? Number(row[col]) : 0;
//           }
//           let liabilitiesColIdx = listCOAKolomLiabilities.indexOf(col);
//           if (liabilitiesColIdx !== -1) {
//             liabilitiesTotal += row[col] ? Number(row[col]) : 0;
//           }
//           let CoaKolomXLSIdx = listCOAKolomXLS.indexOf(col);
//           if (CoaKolomXLSIdx !== -1) {
//             listCOAKolom.forEach((row2) => {
//               if (row2 === listCOAKolom[CoaKolomXLSIdx]) {
//                 listForUpdate[row2] = row[col] ? Number(row[col]) : 0;
//               }
//             });
//           }
//         });

//         if (validationNote === ``) {
//           totalAfterCash = Number(assetsTotal) - Number(liabilitiesTotal);
//           totalBeforeCash = totalAfterCash - Number(row.AdjusmentCF ?? 0);
//           let totalAfterCashYtd = await db.trxTwrr.findOne({
//             attributes: ["total_after_cash"],
//             where: {
//               tanggal: {
//                 [Op.lte]: moment(row.Date, "DD/MM/YYYY")
//                   .subtract(1, "days")
//                   .format("YYYY-MM-DD"),
//               },
//             },
//             transaction: t,
//           });
//           if (totalAfterCashYtd) {
//             returnHarian =
//               (totalBeforeCash /
//                 Number(totalAfterCashYtd?.total_after_cash ?? 0) -
//                 1) *
//               100;
//           } else {
//             returnHarian = 0;
//           }

//           if (moment(row.Date, "DD/MM/YYYY").format("DD") === "01") {
//             returnAkumulasi = returnHarian;
//           } else {
//             //  sum return_harian from 1st day of the month
//             const returnAkumulasiYtd = await db.sequelize.query(
//               `SELECT sum(return_harian) as return_akumulasi FROM trx_twrr
//               WHERE
//               tanggal <= :yesterday
//               AND to_char(tanggal, 'YYYY-MM') = :period
//               `,
//               {
//                 replacements: {
//                   period: moment(row.Date, "DD/MM/YYYY").format("YYYY-MM"),
//                   yesterday: moment(row.Date, "DD/MM/YYYY")
//                     .subtract(1, "days")
//                     .format("YYYY-MM-DD"),
//                 },
//                 type: db.Sequelize.QueryTypes.SELECT,
//                 transaction: t,
//               }
//             );
//             returnAkumulasi =
//               returnAkumulasiYtd[0]["return_akumulasi"] + returnHarian;
//           }

//           const checkTWRR = await db.trxTwrr.findOne({
//             where: {
//               tanggal: moment(row.Date, "DD/MM/YYYY").format("YYYY-MM-DD"),
//             },
//           });

//           if (checkTWRR) {
//             trx_twrr_id = checkTWRR.id;
//             await db.trxTwrr.update(
//               {
//                 ...listForUpdate,
//                 total_before_cash: totalBeforeCash,
//                 total_after_cash: totalAfterCash,
//                 return_harian: returnHarian,
//                 return_akumulasi: returnAkumulasi,
//                 updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
//                 adjustment_cf: row.AdjusmentCF ?? 0,
//                 tanggal: moment(row.Date, "DD/MM/YYYY").format("YYYY-MM-DD"),
//                 trx_twrr_file_id: trx_twrr_file_id,
//                 mst_bank_custody_id: bankCustody.mst_bank_custody_id,
//               },
//               {
//                 where: {
//                   id: checkTWRR.id,
//                 },
//                 transaction: t,
//               }
//             );
//           } else {
//             trx_twrr_id = uuidv4();
//             await db.trxTwrr.create(
//               {
//                 id: trx_twrr_id,
//                 ...listForUpdate,
//                 total_before_cash: totalBeforeCash,
//                 total_after_cash: totalAfterCash,
//                 return_harian: returnHarian,
//                 return_akumulasi: returnAkumulasi,
//                 created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
//                 adjustment_cf: row.AdjusmentCF ?? 0,
//                 tanggal: moment(row.Date, "DD/MM/YYYY").format("YYYY-MM-DD"),
//                 trx_twrr_file_id: trx_twrr_file_id,
//                 mst_bank_custody_id: bankCustody.mst_bank_custody_id,
//               },
//               {
//                 transaction: t,
//               }
//             );
//           }
//           const checkRekap = await db.trxRekap.findOne({
//             include: [
//               {
//                 model: db.trxTwrr,
//                 attributes: ["tanggal"],
//               },
//             ],
//             where: {
//               tipe: "twrr",
//               tahun: moment(row.Date, "DD/MM/YYYY").format("YYYY"),
//               bulan: moment(row.Date, "DD/MM/YYYY").format("MM"),
//             },
//             transaction: t,
//           });
//           let endYear = 0;
//           if (
//             moment(row.Date, "DD/MM/YYYY").format("MM") === "12" &&
//             moment(row.Date, "DD/MM/YYYY").format("DD") === "31"
//           ) {
//             endYear = 1;
//           } else if (
//             moment(row.Date, "DD/MM/YYYY").format("YYYY") ===
//               moment().format("YYYY") &&
//             moment(row.Date, "DD/MM/YYYY").format("MM") >= moment().format("MM")
//           ) {
//             endYear = 1;
//           }

//           if (checkRekap) {
//             // row.Date > checkRekap.trx_twrr.tanggal
//             if (
//               moment(row.Date, "DD/MM/YYYY").format("YYYY-MM-DD") >
//               checkRekap.trx_twrr.tanggal
//             ) {
//               // get id where tahun = tahun and bulan = bulan order by tanggal desc limit 1
//               const getIdTwrr = await db.sequelize.query(
//                 `SELECT id FROM trx_twrr WHERE to_char(tanggal, 'YYYY-MM') = :period ORDER BY tanggal DESC LIMIT 1`,
//                 {
//                   replacements: {
//                     period: moment(row.Date, "DD/MM/YYYY").format("YYYY-MM"),
//                   },
//                   type: db.Sequelize.QueryTypes.SELECT,
//                   transaction: t,
//                 }
//               );
//               await db.trxRekap.update(
//                 {
//                   trx_twrr_id: getIdTwrr[0].id,
//                   period: moment(row.Date, "DD/MM/YYYY").format("YYYY-MM"),
//                   tahun: moment(row.Date, "DD/MM/YYYY").format("YYYY"),
//                   bulan: moment(row.Date, "DD/MM/YYYY").format("MM"),
//                   end_year: endYear,
//                 },
//                 {
//                   where: {
//                     trx_twrr_id: checkRekap.trx_twrr_id,
//                   },
//                   transaction: t,
//                 }
//               );
//             }
//           } else {
//             await db.trxRekap.create(
//               {
//                 id: uuidv4(),
//                 tipe: "twrr",
//                 trx_twrr_id: trx_twrr_id,
//                 period: moment(row.Date, "DD/MM/YYYY").format("YYYY-MM"),
//                 tahun: moment(row.Date, "DD/MM/YYYY").format("YYYY"),
//                 bulan: moment(row.Date, "DD/MM/YYYY").format("MM"),
//                 end_year: endYear,
//               },
//               {
//                 transaction: t,
//               }
//             );
//             // update rekap set end_year = 0 where tahun = tahun and bulan < bulan
//             await db.sequelize.query(
//               `UPDATE trx_rekap SET end_year = 0 WHERE tahun = :tahun AND bulan < :bulan`,
//               {
//                 replacements: {
//                   tahun: moment(row.Date, "DD/MM/YYYY").format("YYYY"),
//                   bulan: moment(row.Date, "DD/MM/YYYY").format("MM"),
//                 },
//                 type: db.Sequelize.QueryTypes.UPDATE,
//                 transaction: t,
//               }
//             );
//           }
//         }
//         if (validationNote !== ``) {
//           trx_twrr_id = null;
//           validationStatus = false;
//           totalAfterCash = 0;
//           totalBeforeCash = 0;
//           returnHarian = 0;
//           returnAkumulasi = 0;
//         }

//         const trx_twrr_file_data_id = uuidv4();
//         await db.trxTwrrFileData.create({
//           ...listForUpdate,
//           id: trx_twrr_file_data_id,
//           trx_twrr_file_id: trx_twrr_file_id,
//           trx_twrr_id: null,
//           tanggal:
//             validationNote === ``
//               ? moment(row.Date, "DD/MM/YYYY").format("YYYY-MM-DD")
//               : null,
//           total_before_cash: totalBeforeCash,
//           total_after_cash: totalAfterCash,
//           return_harian: returnHarian,
//           return_akumulasi: returnAkumulasi,
//           adjustment_cf: row.AdjusmentCF ?? 0,
//           note: validationNote,
//           status: validationStatus,
//           created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
//           mst_bank_custody_id: bankCustody.mst_bank_custody_id,
//         });
//         index++;
//       }

//       if (validationStatus) {
//         await db.trxTwrrFile.update(
//           {
//             status: true,
//           },
//           {
//             where: {
//               id: trx_twrr_file_id,
//             },
//           }
//         );
//       }

//       if (!validationStatus) {
//         throw new Error("Invalid Data");
//       }

//       return {
//         status: validationStatus,
//         trx_twrr_file_id: trx_twrr_file_id,
//       };
//     });
//     res.status(200).send({
//       code: 200,
//       data: result,
//       error: null,
//     });
//   } catch (error) {
//     res.status(500).send({
//       code: 500,
//       data: null,
//       error: error.message || "Some error occurred while retrieving data.",
//     });
//   }
// };

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
