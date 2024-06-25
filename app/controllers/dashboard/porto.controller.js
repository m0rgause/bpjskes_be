const db = require("../../models");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
const qs = require("qs");
const XLSX = require("xlsx");

const summary = async (req, res) => {
  try {
    let { type, start, end, range, issuer } = req.body;
    // let list_period = [];
    // for (let i = 0; i < range; i++) {
    //   if (type === "monthly") {
    //     list_period.push(moment(start).add(i, "months").format("YYYY-MM"));
    //   } else if (type === "yearly") {
    //     list_period.push(moment(start).add(i, "years").format("YYYY"));
    //   }
    // }

    if (type === "monthly") {
      start = moment(start).format("YYYY-MM");
      end = moment(end).format("YYYY-MM");
    } else if (type === "yearly") {
      start = moment(start).format("YYYY");
      end = moment(end).format("YYYY");
    }

    let query = ``;
    if (type === "monthly") {
      query = `SELECT trx_porto.tipe, SUM(nominal)
    FROM trx_porto
    WHERE TO_CHAR(trx_porto.tanggal, 'YYYY-MM') >= :start
    AND TO_CHAR(trx_porto.tanggal, 'YYYY-MM') <= :end
    `;
    } else if (type === "yearly") {
      query = `SELECT trx_porto.tipe, SUM(nominal)
      FROM trx_porto
      WHERE TO_CHAR(trx_porto.tanggal, 'YYYY') >= :start
      AND TO_CHAR(trx_porto.tanggal, 'YYYY') <= :end
    `;
    }

    if (issuer !== "all") {
      query += ` AND trx_porto.mst_issuer_id = :issuer`;
    }
    query += ` GROUP BY trx_porto.tipe
    ORDER BY trx_porto.tipe ASC`;
    
    const options = {
      replacements: {
        // list_month: list_period,
        start: start,
        end: end,
        issuer: issuer,
      },
      type: db.Sequelize.QueryTypes.SELECT,
    };

    let data = await db.sequelize.query(query, options);

    let totalNominal = 0;
    data.forEach((element) => {
      totalNominal += Number(element.sum);
    });

    res.status(200).send({
      code: 200,
      data: {
        totalNominal: totalNominal,
        data: data,
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

const detailSummary = async (req, res) => {
  try {
    let { type, start, range, custody, issuer, tableName, joinTable, subtipe } =
      req.body;

    let list_period = [];
    for (let i = 0; i < range; i++) {
      if (type === "monthly") {
        list_period.push(moment(start).add(i, "months").format("YYYY-MM"));
      } else if (type === "yearly") {
        list_period.push(moment(start).add(i, "years").format("YYYY"));
      }
    }

    let query = ``;
    if (type === "monthly") {
      query = `
      SELECT ${joinTable}.nama, SUM(nominal) as nominal
      FROM ${tableName}
      
      LEFT JOIN ${joinTable} ON ${tableName}.${joinTable}_id = ${joinTable}.id
      JOIN mst_bank_custody ON ${tableName}.mst_bank_custody_id = mst_bank_custody.id
     WHERE TO_CHAR(trx_porto.tanggal, 'YYYY-MM') IN (:list_month)
     AND trx_porto.tipe = '${subtipe}'
    `;
    } else if (type === "yearly") {
      query = `
      SELECT ${joinTable}.nama, SUM(nominal) as nominal
      FROM ${tableName}
      LEFT JOIN ${joinTable} ON ${tableName}.${joinTable}_id = ${joinTable}.id
      JOIN mst_bank_custody ON ${tableName}.mst_bank_custody_id = mst_bank_custody.id
      WHERE trx_porto.tipe = '${subtipe}'
      AND TO_CHAR(trx_porto.tanggal, 'YYYY') IN (:list_month)
    `;
    }

    if (issuer !== "all") {
      query += ` AND ${tableName}.mst_issuer_id = :issuer`;
    }
    if (custody !== "all") {
      query += ` AND ${tableName}.mst_bank_custody_id = :custody`;
    }
    query += ` GROUP BY ${joinTable}.nama
    ORDER BY ${joinTable}.nama ASC;`;

    const options = {
      replacements: {
        list_month: list_period,
        custody: custody,
        issuer: issuer,
      },
      type: db.Sequelize.QueryTypes.SELECT,
    };

    let data = await db.sequelize.query(query, options);

    let totalNominal = 0;
    data.forEach((element) => {
      totalNominal += Number(element.nominal);
    });

    res.status(200).send({
      code: 200,
      data: {
        totalNominal: totalNominal,
        data: data,
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

const multiPorto = async (req, res) => {
  try {
    let {
      type,
      // list_date,
      start_date,
      end_date,
      range,
      custody,
      issuer,
      kbmi,
      tenor,
      kepemilikan,
      pengelolaan,
      subtipe,
    } = req.body;
    if (type === "monthly") {
      start_date = moment(start_date).format("YYYY-MM");
      end_date = moment(end_date).format("YYYY-MM");
    } else if (type === "yearly") {
      start_date = moment(start_date).format("YYYY");
      end_date = moment(end_date).format("YYYY");
    }
    // let list_period = [];
    // for (let i = 0; i < range; i++) {
    //   if (type === "monthly") {
    //     list_period.push(moment(start_date).add(i, "months").format("YYYY-MM"));
    //   } else if (type === "yearly") {
    //     list_period.push(moment(start_date).add(i, "years").format("YYYY"));
    //   }
    // }
    let sb = ``;
    let sbSelect = ``;
    if (subtipe === "deposito" || subtipe === "obligasi") {
      sbSelect = `, mst_kbmi.nama as "kbmi", mst_kepemilikan.nama as "kepemilikan"`;
      sb = `LEFT JOIN mst_kbmi ON trx_porto.mst_kbmi_id = mst_kbmi.id
      LEFT JOIN mst_kepemilikan ON trx_porto.mst_kepemilikan_id = mst_kepemilikan.id
      `;
    }
    let query = ``;
    let queryTable = ``;
    if (type === "monthly") {
      query += `
      SELECT trx_porto.tanggal as period, SUM(nominal) as nominal, mst_bank_custody.nama as "custody"
      FROM trx_porto
      JOIN mst_issuer ON trx_porto.mst_issuer_id = mst_issuer.id
      JOIN mst_tenor ON trx_porto.mst_tenor_id = mst_tenor.id
      ${sb}
      LEFT JOIN mst_pengelolaan ON trx_porto.mst_pengelolaan_id = mst_pengelolaan.id
      JOIN mst_bank_custody ON trx_porto.mst_bank_custody_id = mst_bank_custody.id
      WHERE trx_porto.tipe = :subtipe
      AND TO_CHAR(trx_porto.tanggal, 'YYYY-MM') >= :start
      AND TO_CHAR(trx_porto.tanggal, 'YYYY-MM') <= :end
      AND mst_tenor.tipe ILIKE '%${subtipe}%'
    `;
      queryTable += `
      SELECT mst_issuer.nama as "issuer", mst_pengelolaan.nama as "pengelolaan", mst_tenor.nama as "tenor", trx_porto.*, mst_bank_custody.nama as "custody" ${sbSelect}
      FROM trx_porto
      JOIN mst_issuer ON trx_porto.mst_issuer_id = mst_issuer.id
      JOIN mst_tenor ON trx_porto.mst_tenor_id = mst_tenor.id
      ${sb}
      LEFT JOIN mst_pengelolaan ON trx_porto.mst_pengelolaan_id = mst_pengelolaan.id
      JOIN mst_bank_custody ON trx_porto.mst_bank_custody_id = mst_bank_custody.id
      WHERE trx_porto.tipe = :subtipe
      AND TO_CHAR(trx_porto.tanggal, 'YYYY-MM') >= :start
      AND TO_CHAR(trx_porto.tanggal, 'YYYY-MM') <= :end
      AND mst_tenor.tipe ILIKE '%${subtipe}%'
    `;
    } else if (type === "yearly") {
      query += `
      SELECT TO_CHAR(trx_porto.tanggal, 'YYYY') as "period", SUM(nominal) as nominal, mst_bank_custody.nama as "custody"
      FROM trx_porto
      JOIN mst_issuer ON trx_porto.mst_issuer_id = mst_issuer.id
      JOIN mst_tenor ON trx_porto.mst_tenor_id = mst_tenor.id
      ${sb}
      LEFT JOIN mst_pengelolaan ON trx_porto.mst_pengelolaan_id = mst_pengelolaan.id
      JOIN mst_bank_custody ON trx_porto.mst_bank_custody_id = mst_bank_custody.id
      WHERE trx_porto.tipe = :subtipe
      AND TO_CHAR(trx_porto.tanggal, 'YYYY') >= :start
      AND TO_CHAR(trx_porto.tanggal, 'YYYY') <= :end
      AND mst_tenor.tipe ILIKE '%${subtipe}%'
    `;
      queryTable += `
      SELECT mst_issuer.nama as "issuer", mst_pengelolaan.nama as "pengelolaan", mst_tenor.nama as "tenor", trx_porto.*, mst_bank_custody.nama as "custody" ${sbSelect}
      FROM trx_porto
      JOIN mst_issuer ON trx_porto.mst_issuer_id = mst_issuer.id
      JOIN mst_tenor ON trx_porto.mst_tenor_id = mst_tenor.id
      ${sb}
      LEFT JOIN mst_pengelolaan ON trx_porto.mst_pengelolaan_id = mst_pengelolaan.id
      JOIN mst_bank_custody ON trx_porto.mst_bank_custody_id = mst_bank_custody.id
      WHERE trx_porto.tipe = :subtipe
      AND TO_CHAR(trx_porto.tanggal, 'YYYY') >= :start
      AND TO_CHAR(trx_porto.tanggal, 'YYYY') <= :end
      AND mst_tenor.tipe ILIKE '%${subtipe}%'
    `;
    }

    if (issuer !== "all") {
      query += ` AND trx_porto.mst_issuer_id = :issuer`;
      queryTable += ` AND trx_porto.mst_issuer_id = :issuer`;
    }
    if (kbmi !== "all") {
      query += ` AND trx_porto.mst_kbmi_id = :kbmi`;
      queryTable += ` AND trx_porto.mst_kbmi_id = :kbmi`;
    }
    if (tenor !== "all") {
      query += ` AND trx_porto.mst_tenor_id = :tenor`;
      queryTable += ` AND trx_porto.mst_tenor_id = :tenor`;
    }
    if (kepemilikan !== "all") {
      query += ` AND trx_porto.mst_kepemilikan_id = :kepemilikan`;
      queryTable += ` AND trx_porto.mst_kepemilikan_id = :kepemilikan`;
    }
    if (pengelolaan !== "all") {
      query += ` AND trx_porto.mst_pengelolaan_id = :pengelolaan`;
      queryTable += ` AND trx_porto.mst_pengelolaan_id = :pengelolaan`;
    }
    if (custody !== "all") {
      query += ` AND trx_porto.mst_bank_custody_id = :custody`;
      queryTable += ` AND trx_porto.mst_bank_custody_id = :custody`;
    }
    if (type === "monthly") {
      query += ` GROUP BY trx_porto.tanggal, mst_bank_custody.nama
    ORDER BY trx_porto.tanggal ASC;`;
      queryTable += ` ORDER BY trx_porto.tanggal ASC;`;
    } else if (type === "yearly") {
      query += ` GROUP BY trx_porto.tanggal, mst_bank_custody.nama
    ORDER BY trx_porto.tanggal ASC;`;
      queryTable += ` ORDER BY trx_porto.tanggal ASC;`;
    }
    const options = {
      replacements: {
        start: start_date,
        end: end_date,
        // list_month: list_period,
        type: type,
        custody: custody,
        issuer: issuer,
        kbmi: kbmi,
        tenor: tenor,
        kepemilikan: kepemilikan,
        pengelolaan: pengelolaan,
        subtipe: subtipe,
      },
      type: db.Sequelize.QueryTypes.SELECT,
    };

    let data = await db.sequelize.query(query, options);
    let dataTable = await db.sequelize.query(queryTable, options);
    res.status(200).send({
      code: 200,
      data: {
        data: data,
        dataTable: dataTable,
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

const comparison = async (req, res) => {
  try {
    let { type, list_date, issuer, custody } = req.body;

    if (list_date === undefined || list_date.length === 0) {
      return res.status(200).json({
        code: 400,
        data: null,
        error: "List date cannot be empty",
      });
    }

    let query = ``;
    if (type === "monthly") {
      query = `SELECT trx_porto.tanggal as period, trx_porto.tipe, SUM(nominal), mst_bank_custody.nama as "custody"
      FROM trx_porto
      JOIN mst_issuer ON trx_porto.mst_issuer_id = mst_issuer.id
      JOIN mst_bank_custody ON trx_porto.mst_bank_custody_id = mst_bank_custody.id
      WHERE TO_CHAR(trx_porto.tanggal, 'YYYY-MM') IN (:list_date)
      `;
    } else if (type === "yearly") {
      query = `SELECT trx_porto.tanggal as period, trx_porto.tipe, SUM(nominal), mst_bank_custody.nama as "custody"
      FROM trx_porto
      JOIN mst_issuer ON trx_porto.mst_issuer_id = mst_issuer.id
      JOIN mst_bank_custody ON trx_porto.mst_bank_custody_id = mst_bank_custody.id
      WHERE TO_CHAR(trx_porto.tanggal, 'YYYY') IN (:list_date)
      `;
    }
    if (issuer !== "all") {
      query += ` AND trx_porto.mst_issuer_id = :issuer`;
    }
    if (custody !== "all") {
      query += ` AND trx_porto.mst_bank_custody_id = :custody`;
    }
    if (type === "monthly") {
      query += ` GROUP BY trx_porto.tipe,trx_porto.tanggal, mst_bank_custody.nama
      ORDER BY trx_porto.tipe ASC;`;
    } else if (type === "yearly") {
      query += ` GROUP BY trx_porto.tipe,trx_porto.tanggal, mst_bank_custody.nama
      ORDER BY trx_porto.tipe ASC;`;
    }

    const options = {
      replacements: {
        list_date: list_date,
        issuer: issuer,
        custody: custody,
      },
      type: db.Sequelize.QueryTypes.SELECT,
    };

    let data = await db.sequelize.query(query, options);
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

const uploadExcel = async (req, res) => {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      let { data: dataXLS, fileName, session, date } = req.body;
      const user_id = JSON.parse(session).user.id;
      const bankCustody = await db.user.findOne({
        where: {
          id: user_id,
        },
        attributes: ["mst_bank_custody_id"],
      });

      const models = ["issuer", "tenor", "pengelolaan", "kbmi", "kepemilikan"];
      const data = {};

      for (const model of models) {
        // only issuer model has lgd and pd
        const attributes =
          model === "issuer"
            ? ["id", "nama", "kode", "lgd", "pd"]
            : ["id", "nama", "kode"];
        const modelData = await db[model].findAll({
          attributes: attributes,
        });

        const listID = modelData.map((row) => row.id);
        const listKode = modelData.map((row) => row.kode);
        const listNama = modelData.map((row) => row.nama);
        const listLGD =
          model === "issuer" ? modelData.map((row) => row.lgd) : null;
        const listPD =
          model === "issuer" ? modelData.map((row) => row.pd) : null;

        data[model] = {
          id: listID,
          nama: listNama,
          kode: listKode,
          lgd: listLGD,
          pd: listPD,
        };
      }

      const rating = await db.rating.findAll({
        attributes: ["id"],
        order: [["urutan", "ASC"]],
        limit: 1,
      });

      let trx_porto_file_id = uuidv4();
      await db.trxPortoFile.create({
        id: trx_porto_file_id,
        file_name: fileName,
        status: false,
        aut_user_id: user_id,
        created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        tanggal: moment(date).format("YYYY-MM-DD"),
      });


      let validationStatus = true;
      let index = 0;
      for (const row of dataXLS) {
        row.IssuedDate = row.IssuedDate?.replace(/\s/g, "") || undefined;
        row.MaturityDate = row.MaturityDate?.replace(/\s/g, "") || undefined;
        row.InterestDate = row.InterestDate?.replace(/\s/g, "") || undefined;

        let validationNote = ``;
        // validating data
        let mst_issuer_id = null,
          mst_tenor_id = null,
          mst_pengelolaan_id = null,
          mst_kbmi_id = null,
          mst_kepemilikan_id = null;

        // check if kode issuer exists
        if (
          row.Issuer !== null &&
          row.Issuer !== undefined &&
          row.Issuer !== "-"
        ) {
          let indexIssuer = data.issuer.kode.indexOf(row.Issuer.toUpperCase());
          if (indexIssuer === -1) {
            const lastIssuer = await db.issuer.findOne({
              attributes: ["urutan"],
              order: [["urutan", "DESC"]],
              limit: 1,
            });
            let urutanIssuer = Number(lastIssuer?.urutan ?? 0) + 1;

            // create new issuer
            mst_issuer_id = uuidv4();
            await db.issuer.create({
              id: mst_issuer_id,
              kode: row.Issuer.toUpperCase(),
              nama: row.Issuer.toUpperCase(),
              mst_rating_id: rating[0].id,
              urutan: urutanIssuer,
              pd: row.PD,
              lgd: row.LGD,
            });
            data.issuer.id.push(mst_issuer_id);
            data.issuer.kode.push(row.Issuer);
            data.issuer.nama.push(row.Issuer);
            data.issuer.lgd.push(row.LGD);
            data.issuer.pd.push(row.PD);
          } else {
            mst_issuer_id = data.issuer.id[indexIssuer];
          }
        }

        // check if kode tenor exists
        // make data tenor case insensitive
        if (
          row.Tenor !== null &&
          row.Tenor !== undefined &&
          row.Tenor !== "-"
        ) {
          let indexTenor = data.tenor.nama.findIndex(
            (element) => element.toLowerCase() === row.Tenor.toLowerCase()
          );
          if (indexTenor === -1) {
            // create new tenor
            const lastTenor = await db.tenor.findOne({
              attributes: ["urutan"],
              order: [["urutan", "DESC"]],
              limit: 1,
            });
            let urutanTenor = Number(lastTenor?.urutan ?? 0) + 1;

            mst_tenor_id = uuidv4();
            await db.tenor.create({
              kode: row.Tenor,
              nama: row.Tenor,
              // tipe: row.Tipe,
              tipe: 'deposito,obligasi,sbn,sbi',
              urutan: urutanTenor,
            });
            data.tenor.id.push(mst_tenor_id);
            data.tenor.nama.push(row.Tenor);
            data.tenor.kode.push(row.Tenor);

            // validationStatus = false;
            // validationNote += `Kode Tenor ${
            //   row.Tenor !== null ? row.Tenor : ""
            // } tidak ditemukan. `;
          } else {
            mst_tenor_id = data.tenor.id[indexTenor];
          }
        }

        // check if kode pengelolaan exists
        if (
          row.Pengelolaan !== null &&
          row.Pengelolaan !== undefined &&
          row.Pengelolaan !== "-"
        ) {
          let indexPengelolaan = data.pengelolaan.kode.indexOf(row.Pengelolaan);
          if (indexPengelolaan === -1) {
            // create new pengelolaan
            const lastPengelolaan = await db.pengelolaan.findOne({
              attributes: ["urutan"],
              order: [["urutan", "DESC"]],
              limit: 1,
            });
            let urutanPengelolaan = Number(lastPengelolaan?.urutan ?? 0) + 1;

            mst_pengelolaan_id = uuidv4();
            await db.pengelolaan.create({
              id: mst_pengelolaan_id,
              kode: row.Pengelolaan,
              nama: row.Pengelolaan,
              urutan: urutanPengelolaan,
            });
            data.pengelolaan.id.push(mst_pengelolaan_id);
            data.pengelolaan.kode.push(row.Pengelolaan);
            data.pengelolaan.nama.push(row.Pengelolaan);

            // validationStatus = false;
            // validationNote += `Kode Pengelolaan ${
            //   row.Pengelolaan !== null ? row.Pengelolaan : ""
            // } tidak ditemukan. `;
          } else {
            mst_pengelolaan_id = data.pengelolaan.id[indexPengelolaan];
          }
        }

        // check if kode kbmi exists
        // check if row.kbmi is not null or undefined first, if it is then pass
        if (row.KBMI !== null && row.KBMI !== undefined && row.KBMI !== "-") {
          let indexKbmi = data.kbmi.kode.indexOf(row.KBMI);
          if (indexKbmi === -1) {
            // create new kbmi
            const lastKbmi = await db.kbmi.findOne({
              attributes: ["urutan"],
              order: [["urutan", "DESC"]],
              limit: 1,
            });
            let urutanKbmi = Number(lastKbmi?.urutan ?? 0) + 1;

            mst_kbmi_id = uuidv4();
            await db.kbmi.create({
              id: mst_kbmi_id,
              kode: row.KBMI,
              nama: "KBMI " + row.KBMI,
              urutan: urutanKbmi,
            });
            data.kbmi.id.push(mst_kbmi_id);
            data.kbmi.kode.push(row.KBMI);
            data.kbmi.nama.push("KBMI " + row.KBMI);

            // validationStatus = false;
            // validationNote += `Kode KBMI ${
            //   row.KBMI !== null ? row.KBMI : ""
            // } tidak ditemukan. `;
          } else {
            mst_kbmi_id = data.kbmi.id[indexKbmi];
          }
        }

        // check if kode kepemilikan exists
        // check if row.kepemilikan is not null or undefined first, if it is then pass
        if (
          row.Kepemilikan !== null &&
          row.Kepemilikan !== undefined &&
          row.Kepemilikan !== "-"
        ) {
          let indexKepemilikan = data.kepemilikan.kode.indexOf(row.Kepemilikan);
          if (indexKepemilikan === -1) {
            // create new kepemilikan
            const lastKepemilikan = await db.kepemilikan.findOne({
              attributes: ["urutan"],
              order: [["urutan", "DESC"]],
              limit: 1,
            });
            let urutanKepemilikan = Number(lastKepemilikan?.urutan ?? 0) + 1;

            mst_kepemilikan_id = uuidv4();
            await db.kepemilikan.create({
              id: mst_kepemilikan_id,
              kode: row.Kepemilikan,
              nama: row.Kepemilikan,
              urutan: urutanKepemilikan,
            });
            data.kepemilikan.id.push(mst_kepemilikan_id);
            data.kepemilikan.kode.push(row.Kepemilikan);
            data.kepemilikan.nama.push(row.Kepemilikan);

            // validationStatus = false;
            // validationNote += `Kode Kepemilikan ${
            //   row.Kepemilikan !== null ? row.Kepemilikan : ""
            // } tidak ditemukan. `;
          } else {
            mst_kepemilikan_id = data.kepemilikan.id[indexKepemilikan];
          }
        }

        row["IssuedDate"] =
          row.IssuedDate !== undefined
            ? _excelSerialDateToJSDate(row["IssuedDate"])
            : undefined;
        row["MaturityDate"] =
          row.MaturityDate !== undefined
            ? _excelSerialDateToJSDate(row["MaturityDate"])
            : undefined;
        row["InterestDate"] =
          row.InterestDate !== undefined
            ? _excelSerialDateToJSDate(row["InterestDate"])
            : undefined;

        if (row.IssuedDate !== undefined) {
          if (!moment(row.IssuedDate, "DD/MM/YYYY", true).isValid()) {
            // validationStatus = false;
            validationNote += `Issued Date tidak valid. `;
          }
          row.IssuedDate = moment(row.IssuedDate, "DD/MM/YYYY", true).format(
            "YYYY-MM-DD"
          );
        } else {
          row.IssuedDate = null;
          // validationStatus = false;
          // validationNote += `Issued Date tidak boleh kosong. `;
        }

        if (
          row.MaturityDate !== undefined &&
          row.MaturityDate !== null &&
          row.MaturityDate !== "-"
        ) {
          if (!moment(row.MaturityDate, "DD/MM/YYYY", true).isValid()) {
            // validationStatus = false;
            validationNote += `Maturity Date tidak valid. `;
          }
          row.MaturityDate = moment(
            row.MaturityDate,
            "DD/MM/YYYY",
            true
          ).format("YYYY-MM-DD");
        } else {
          row.MaturityDate = null;
          // validationStatus = false;
          // validationNote += `Maturity Date tidak boleh kosong. `;
        }

        if (
          row.InterestDate !== undefined &&
          row.InterestDate !== null &&
          row.InterestDate !== "-"
        ) {
          if (!moment(row.InterestDate, "DD/MM/YYYY", true).isValid()) {
            // validationStatus = false;
            validationNote += `Interest Date tidak valid. `;
          }
          row.InterestDate = moment(
            row.InterestDate,
            "DD/MM/YYYY",
            true
          ).format("YYYY-MM-DD");
        } else {
          row.InterestDate = null;
        }

        if (
          row.SisaTenor !== null &&
          row.SisaTenor !== undefined &&
          row.SisaTenor !== "-" &&
          row.SisaTenor !== "" &&
          row.SisaTenor
        ) {
          if (isNaN(row.SisaTenor)) {
            // validationStatus = false;
            row.SisaTenor = row.SisaTenor.replace(/,/g, ".");
            validationNote += `Sisa Tenor tidak valid. `;
          }
        }

        if (row.Rate !== null && row.Rate !== undefined && row.Rate !== "-") {
          if (isNaN(row.Rate)) {
            // convert rate to number
            row.Rate = row.Rate.replace(/,/g, ".");
            // validationStatus = false;
            validationNote += `Rate tidak valid. `;
          }
        }

        if (row.PD !== null && row.PD !== undefined && row.PD !== "-") {
          if (isNaN(row.PD)) {
            // convert rate to number
            row.PD = row.PD.replace(/,/g, ".");
            // validationStatus = false;
            validationNote += `PD tidak valid. `;
          }
        }

        // dataXLS[index]["note"] = validationNote;
        let trx_porto_id = null;
        if (validationNote === ``) {
          // remove spaces from ECL
          row.ECL = row.ECL?.replace(/\s/g, "") || undefined;
          // remove - from ECL
          row.ECL = row.ECL?.replace(/-/g, "") || undefined;
          if (!row.ECL) {
            row.ECL = 0;
          }
          row.LGD = row.LGD || 0;
          row.PD = row.PD || 0;

          let checkPorto = await db.trxPorto.findOne({
            where: {
              tipe: row.Tipe?.toLowerCase() || null,
              mst_issuer_id: mst_issuer_id,
              tanggal: date,
              nominal: row.Nominal,
            },
          });
          if (checkPorto) {
            trx_porto_id = checkPorto.id;
            await db.trxPorto.update(
              {
                unique_id: row.UniqueID,
                no_security: row.NoSecurity,
                start_date: row.IssuedDate,
                end_date: row.MaturityDate,
                interest_date: row.InterestDate,
                sisa_tenor: row.SisaTenor,
                rate: row.Rate,
                pd: row.PD,
                lgd: row.LGD,
                ecl: row.ECL,
                mst_tenor_id: mst_tenor_id,
                mst_pengelolaan_id: mst_pengelolaan_id,
                mst_kbmi_id: mst_kbmi_id,
                mst_kepemilikan_id: mst_kepemilikan_id,
                mst_bank_custody_id: bankCustody.mst_bank_custody_id,
                updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
                trx_porto_file_id: trx_porto_file_id,
              },
              {
                where: {
                  id: trx_porto_id,
                },
                transaction: t,
              }
            );
          } else {
            trx_porto_id = uuidv4();
            await db.trxPorto.create(
              {
                id: trx_porto_id,
                tipe: row.Tipe?.toLowerCase() || null,
                unique_id: row.UniqueID,
                no_security: row.NoSecurity,
                start_date: row.IssuedDate,
                end_date: row.MaturityDate,
                interest_date: row.InterestDate,
                nominal: row.Nominal,
                sisa_tenor: row.SisaTenor,
                rate: row.Rate,
                pd: row.PD,
                lgd: row.LGD,
                ecl: row.ECL,
                mst_issuer_id: mst_issuer_id,
                mst_tenor_id: mst_tenor_id,
                mst_pengelolaan_id: mst_pengelolaan_id,
                mst_kbmi_id: mst_kbmi_id,
                mst_kepemilikan_id: mst_kepemilikan_id,
                mst_bank_custody_id: bankCustody.mst_bank_custody_id,
                created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
                trx_porto_file_id: trx_porto_file_id,
                tanggal: date,
              },
              { transaction: t }
            );
          }
        }
        await db.trxPortoFileData.create({
          id: uuidv4(),
          trx_porto_file_id: trx_porto_file_id,
          trx_porto_id: trx_porto_id,
          mst_issuer_id: mst_issuer_id,
          mst_kbmi_id: mst_kbmi_id,
          mst_kepemilikan_id: mst_kepemilikan_id,
          mst_pengelolaan_id: mst_pengelolaan_id,
          mst_tenor_id: mst_tenor_id,
          tipe: row.Tipe?.toLowerCase() || null,
          unique_id: row.UniqueID,
          no_security: row.NoSecurity,
          start_date: row.IssuedDate,
          end_date: row.MaturityDate,
          interest_date: row.InterestDate,
          nominal: row.Nominal,
          sisa_tenor: row.SisaTenor,
          rate: row.Rate,
          pd: row.PD,
          lgd: row.LGD,
          ecl: row.ECL,
          created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
          status: validationNote === `` ? true : false,
          note: validationNote,
        });
        index++;
      }

      if (validationStatus) {
        await db.trxPortoFile.update(
          {
            status: true,
            tanggal: moment(date).format("YYYY-MM-DD"),
          },
          {
            where: {
              id: trx_porto_file_id,
            },
          }
        );
      } else {
        throw new Error("Validation error");
      }

      return {
        trx_porto_file_id: trx_porto_file_id,
        validationStatus: validationStatus,
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

// const uploadExcel = async (req, res) => {
//   try {
//     let { data: dataXLS, fileName, session, date } = req.body;
//     const user_id = JSON.parse(session).user.id;
//     const bankCustody = await db.user.findOne({
//       where: {
//         id: user_id,
//       },
//       attributes: ["mst_bank_custody_id"],
//     });

//     const models = ["issuer", "tenor", "pengelolaan", "kbmi", "kepemilikan"];
//     const data = {};

//     for (const model of models) {
//       // only issuer model has lgd and pd
//       const attributes =
//         model === "issuer"
//           ? ["id", "nama", "kode", "lgd", "pd"]
//           : ["id", "nama", "kode"];
//       const modelData = await db[model].findAll({
//         attributes: attributes,
//       });

//       const listID = modelData.map((row) => row.id);
//       const listKode = modelData.map((row) => row.kode);
//       const listNama = modelData.map((row) => row.nama);
//       const listLGD =
//         model === "issuer" ? modelData.map((row) => row.lgd) : null;
//       const listPD = model === "issuer" ? modelData.map((row) => row.pd) : null;

//       data[model] = {
//         id: listID,
//         nama: listNama,
//         kode: listKode,
//         lgd: listLGD,
//         pd: listPD,
//       };
//     }
//     const rating = await db.rating.findAll({
//       attributes: ["id"],
//       order: [["urutan", "ASC"]],
//       limit: 1,
//     });

//     let trx_porto_file_id = uuidv4();
//     await db.trxPortoFile.create({
//       id: trx_porto_file_id,
//       file_name: fileName,
//       status: false,
//       aut_user_id: user_id,
//       created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
//     });

//     let workbook = XLSX.read(dataXLS, { type: "binary" });
//     let worksheet = workbook.SheetNames;
//     let validationStatus = true;
//     let index = 0;
//     for (const sheet of worksheet) {
//       if (!moment(sheet, "DD_MMM YY").isValid()) {
//         continue;
//       }
//       let sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[worksheet[14]], {
//         header: 1,
//       });
//       let ii = 0;
//       let date;
//       for (row of sheetData) {
//         if (row[0] === "As Of Date") {
//           date = moment(_excelSerialDateToJSDate(row[2])).format("YYYY-MM-DD");
//         }
//         // skip to row 3
//         if (ii < 3 || row.length === 0) {
//           ii++;
//           continue;
//         }

//         let validationNote = ``;
//         // validating data
//         let mst_issuer_id = null,
//           mst_tenor_id = null,
//           mst_pengelolaan_id = null,
//           mst_kbmi_id = null,
//           mst_kepemilikan_id = null;

//         // check if kode issuer exists

//         let indexIssuer = data.issuer.kode.indexOf(row[2]);
//         if (indexIssuer === -1) {

//           const lastIssuer = await db.issuer.findOne({
//             attributes: ["urutan"],
//             order: [["urutan", "DESC"]],
//             limit: 1,
//           });
//           // create new issuer
//           mst_issuer_id = uuidv4();
//           await db.issuer
//             .create({
//               id: mst_issuer_id,
//               kode: row[2],
//               nama: row[2],
//               mst_rating_id: rating[0].id,
//               urutan: Number(lastIssuer.urutan) + 1,
//               pd: row[15],
//               lgd: row[16],
//             })
//             .then((data) => {})
//             .catch((err) => {

//             });
//           data.issuer.id.push(mst_issuer_id);
//           data.issuer.kode.push(row[2]);
//           data.issuer.nama.push(row[2]);
//           data.issuer.lgd.push(row[16]);
//           data.issuer.pd.push(row[15]);

//           // validationStatus = false;
//           validationNote += `Kode Issuer ${
//             row[2] !== null ? row[2] : ""
//           } tidak ditemukan. `;
//         } else {
//           mst_issuer_id = data.issuer.id[indexIssuer];
//         }

//         // check if kode tenor exists
//         // make data tenor case insensitive
//         if (row[5] !== null || row[5] !== undefined || row[5] !== "-") {
//         let indexTenor = data.tenor.nama.findIndex(
//           (element) => element.toLowerCase() === row[5].toLowerCase()
//         );
//         if (indexTenor === -1) {
//           // create new tenor
//           const lastTenor = await db.tenor.findOne({
//             attributes: ["urutan"],
//             order: [["urutan", "DESC"]],
//             limit: 1,
//           });
//           mst_tenor_id = uuidv4();
//           await db.tenor
//             .create({
//               id: mst_tenor_id,
//               kode: row[5],
//               nama: row[5],
//               tipe: row[8],
//               urutan: Number(lastTenor.urutan) + 1,
//             })
//             .then((data) => {})
//             .catch((err) => {

//             });
//           data.tenor.id.push(mst_tenor_id);
//           data.tenor.nama.push(row[5]);
//           data.tenor.kode.push(row[5]);
//           data.tenor.tipe.push(row[8]);

//           // validationStatus = false;
//           validationNote += `Kode Tenor ${
//             row[5] !== null ? row[5] : ""
//           } tidak ditemukan. `;
//         } else {
//           mst_tenor_id = data.tenor.id[indexTenor];
//         }

//         // check if kode pengelolaan exists
//         if (row[4] !== null || row[4] !== undefined || row[4] !== "-") {
//           let indexPengelolaan = data.pengelolaan.kode.indexOf(row[4]);
//           if (indexPengelolaan === -1) {
//             // create new pengelolaan
//             const lastPengelolaan = await db.pengelolaan.findOne({
//               attributes: ["urutan"],
//               order: [["urutan", "DESC"]],
//               limit: 1,
//             });
//             mst_pengelolaan_id = uuidv4();
//             await db.pengelolaan
//               .create({
//                 id: mst_pengelolaan_id,
//                 kode: row[4],
//                 nama: row[4],
//                 urutan: Number(lastPengelolaan.urutan) + 1,
//               })
//               .then((data) => {})
//               .catch((err) => {

//               });
//             data.pengelolaan.id.push(mst_pengelolaan_id);
//             data.pengelolaan.kode.push(row[4]);
//             data.pengelolaan.nama.push(row[4]);

//             // validationStatus = false;
//             validationNote += `Kode Pengelolaan ${
//               row[4] !== null ? row[4] : ""
//             } tidak ditemukan. `;
//           } else {
//             mst_pengelolaan_id = data.pengelolaan.id[indexPengelolaan];
//           }
//         }
//         // check if kode kbmi exists
//         // check if row.kbmi is not null or undefined first, if it is then pass
//         if (row[3] !== null || row[3] !== undefined || row[3] !== "-") {
//           let indexKbmi = data.kbmi.kode.indexOf(`${row[3]}`);
//           if (indexKbmi === -1) {
//             // create new kbmi
//             const lastKbmi = await db.kbmi.findOne({
//               attributes: ["urutan"],
//               order: [["urutan", "DESC"]],
//               limit: 1,
//             });
//             mst_kbmi_id = uuidv4();
//             await db.kbmi
//               .create({
//                 id: mst_kbmi_id,
//                 kode: row[3],
//                 nama: "KBMI " + row[3],
//                 urutan: Number(lastKbmi.urutan) + 1,
//               })
//               .then((data) => {})
//               .catch((err) => {

//               });
//             data.kbmi.id.push(mst_kbmi_id);
//             data.kbmi.kode.push(`${row[3]}`);
//             data.kbmi.nama.push("KBMI " + row[3]);

//             // validationStatus = false;
//             validationNote += `Kode KBMI ${
//               row[3] !== null ? row[3] : ""
//             } tidak ditemukan. `;
//           } else {
//             mst_kbmi_id = data.kbmi.id[indexKbmi];
//           }
//         }

//         // check if kode kepemilikan exists
//         // check if row.kepemilikan is not null or undefined first, if it is then pass
//         if (row[6] !== null || row[6] !== undefined || row[6] !== "-") {
//           let indexKepemilikan = data.kepemilikan.kode.indexOf(row[6]);

//           if (indexKepemilikan === -1) {
//             // create new kepemilikan
//             const lastKepemilikan = await db.kepemilikan.findOne({
//               attributes: ["urutan"],
//               order: [["urutan", "DESC"]],
//               limit: 1,
//             });
//             mst_kepemilikan_id = uuidv4();
//             await db.kepemilikan
//               .create({
//                 id: mst_kepemilikan_id,
//                 kode: row[6],
//                 nama: row[6],
//                 urutan: Number(lastKepemilikan.urutan) + 1,
//               })
//               .then((data) => {})
//               .catch((err) => {

//               });
//             data.kepemilikan.id.push(mst_kepemilikan_id);
//             data.kepemilikan.kode.push(row[6]);
//             data.kepemilikan.nama.push(row[6]);

//             // validationStatus = false;
//             validationNote += `Kode Kepemilikan ${
//               row[6] !== null ? row[6] : ""
//             } tidak ditemukan. `;
//           } else {
//             mst_kepemilikan_id = data.kepemilikan.id[indexKepemilikan];
//           }
//         }

//         row[9] =
//           row[9] !== undefined ? _excelSerialDateToJSDate(row[9]) : undefined;
//         row[10] =
//           row[10] !== undefined ? _excelSerialDateToJSDate(row[10]) : undefined;
//         row[12] =
//           row[12] !== undefined ? _excelSerialDateToJSDate(row[12]) : undefined;

//         if (row[9] !== undefined) {
//           if (!moment(row[9], "DD/MM/YYYY", true).isValid()) {
//             // validationStatus = false;
//             validationNote += `Issued Date tidak valid. `;
//           }
//         } else {
//           row[9] = null;
//           // validationStatus = false;
//           // validationNote += `Issued Date tidak boleh kosong. `;
//         }

//         if (row[10] !== undefined && row[10] !== null && row[10] !== "-") {
//           if (!moment(row[10], "DD/MM/YYYY", true).isValid()) {
//             // validationStatus = false;
//             validationNote += `Maturity Date tidak valid. `;
//           }
//         } else {
//           row[10] = null;
//           // validationStatus = false;
//           // validationNote += `Maturity Date tidak boleh kosong. `;
//         }

//         if (row[12] !== undefined && row[12] !== null && row[12] !== "-") {
//           if (!moment(row[12], "DD/MM/YYYY", true).isValid()) {
//             // validationStatus = false;
//             validationNote += `Interest Date tidak valid. `;
//           }
//         } else {
//           row[12] = null;
//         }

//         if (row[13] !== null && row[13] !== undefined && row[13] !== "-") {
//           if (isNaN(row[13])) {
//             // validationStatus = false;
//             row[13] = row[13].replace(/,/g, ".");
//             validationNote += `Sisa Tenor tidak valid. `;
//           }
//         }

//         if (row[14] !== null && row[14] !== undefined && row[14] !== "-") {
//           if (isNaN(row[14])) {
//             // convert rate to number
//             row[14] = row[14].replace(/,/g, ".");
//             // validationStatus = false;
//             validationNote += `Rate tidak valid. `;
//           }
//         }

//         let trx_porto_id = null;
//         if (validationNote === ``) {
//           let checkPorto = await db.trxPorto.findOne({
//             where: {
//               tipe: row[8],
//               mst_issuer_id: mst_issuer_id,
//               tanggal: date,
//               nominal: row[11],
//             },
//           });
//           if (checkPorto) {
//             trx_porto_id = checkPorto.id;
//             await db.trxPorto
//               .update(
//                 {
//                   unique_id: row[1],
//                   no_security: row[7],
//                   start_date: row[9],
//                   end_date: row[10],
//                   interest_date: row[12],
//                   sisa_tenor: row[13],
//                   rate: row[14],
//                   pd: row[15],
//                   lgd: row[16],
//                   ecl: row[17],
//                   mst_tenor_id: mst_tenor_id,
//                   mst_pengelolaan_id: mst_pengelolaan_id,
//                   mst_kbmi_id: mst_kbmi_id,
//                   mst_kepemilikan_id: mst_kepemilikan_id,
//                   mst_bank_custody_id: bankCustody.mst_bank_custody_id,
//                   updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
//                   trx_porto_file_id: trx_porto_file_id,
//                 },
//                 {
//                   where: {
//                     id: trx_porto_id,
//                   },
//                 }
//               )
//               .then((result) => {})
//               .catch((err) => {

//               });
//           } else {
//             trx_porto_id = uuidv4();
//             await db.trxPorto
//               .create({
//                 id: trx_porto_id,
//                 tipe: row[8],
//                 unique_id: row[1],
//                 no_security: row[7],
//                 start_date: row[9],
//                 end_date: row[10],
//                 interest_date: row[12],
//                 nominal: row[11],
//                 sisa_tenor: row[13],
//                 rate: row[14],
//                 pd: row[15],
//                 lgd: row[16],
//                 ecl: row[17],
//                 mst_issuer_id: mst_issuer_id,
//                 mst_tenor_id: mst_tenor_id,
//                 mst_pengelolaan_id: mst_pengelolaan_id,
//                 mst_kbmi_id: mst_kbmi_id,
//                 mst_kepemilikan_id: mst_kepemilikan_id,
//                 mst_bank_custody_id: bankCustody.mst_bank_custody_id,
//                 created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
//                 trx_porto_file_id: trx_porto_file_id,
//                 tanggal: date,
//               })
//               .then((result) => {})
//               .catch((err) => {

//               });
//           }
//         }

//         ii++;
//       }

//       index++;
//     }
//     if (validationStatus) {
//       await db.trxPortoFile.update(
//         {
//           status: true,
//         },
//         {
//           where: {
//             id: trx_porto_file_id,
//           },
//         }
//       );
//     }

//     res.status(200).send({
//       code: 200,
//       data: {
//         trx_porto_file_id: trx_porto_file_id,
//         validationStatus: validationStatus,
//       },
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

// const uploadExcel = async (req, res) => {
//   try {
//     const result = await db.sequelize.transaction(async (t) => {
//       let { data: dataXLS, fileName, session } = req.body;
//       const user_id = JSON.parse(session).user.id;
//       const bankCustody = await db.user.findOne({
//         where: {
//           id: user_id,
//         },
//         attributes: ["mst_bank_custody_id"],
//       });

//       const models = ["issuer", "tenor", "pengelolaan", "kbmi", "kepemilikan"];
//       const data = {};

//       for (const model of models) {
//         // only issuer model has lgd and pd
//         const attributes =
//           model === "issuer"
//             ? ["id", "nama", "kode", "lgd", "pd"]
//             : ["id", "nama", "kode"];
//         const modelData = await db[model].findAll({
//           attributes: attributes,
//         });

//         const listID = modelData.map((row) => row.id);
//         const listKode = modelData.map((row) => row.kode);
//         const listNama = modelData.map((row) => row.nama);
//         const listLGD =
//           model === "issuer" ? modelData.map((row) => row.lgd) : null;
//         const listPD =
//           model === "issuer" ? modelData.map((row) => row.pd) : null;

//         data[model] = {
//           id: listID,
//           nama: listNama,
//           kode: listKode,
//           lgd: listLGD,
//           pd: listPD,
//         };
//       }

//       let trx_porto_file_id = uuidv4();
//       await db.trxPortoFile.create({
//         id: trx_porto_file_id,
//         file_name: fileName,
//         status: false,
//         aut_user_id: user_id,
//         created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
//       });

//       let validationStatus = true;
//       let index = 0;

//       for (const row of dataXLS) {
//         row.IssuedDate = row.IssuedDate?.replace(/\s/g, "") || undefined;
//         row.MaturityDate = row.MaturityDate?.replace(/\s/g, "") || undefined;
//         row.InterestDate = row.InterestDate?.replace(/\s/g, "") || undefined;

//         let validationNote = ``;
//         // validating data
//         let mst_issuer_id,
//           mst_tenor_id,
//           mst_pengelolaan_id,
//           mst_kbmi_id,
//           mst_kepemilikan_id;
//         // check if kode issuer exists
//         let indexIssuer = data.issuer.kode.indexOf(row.Issuer);
//         if (indexIssuer === -1) {
//           validationStatus = false;
//           validationNote += `Kode Issuer ${
//             row.Issuer !== null ? row.Issuer : ""
//           } tidak ditemukan. `;
//         } else {
//           mst_issuer_id = data.issuer.id[indexIssuer];
//         }

//         // check if kode tenor exists
//         // let indexTenor = data.tenor.kode.indexOf(row.Tenor);
//         // make data tenor case insensitive
//         let indexTenor = data.tenor.nama.findIndex(
//           (element) => element.toLowerCase() === row.Tenor.toLowerCase()
//         );
//         // let indexTenor = data.tenor.nama.indexOf(row.Tenor);
//         if (indexTenor === -1) {
//           validationStatus = false;
//           validationNote += `Kode Tenor
//           ${row.Tenor !== null ? row.Tenor : ""}
//            tidak ditemukan. `;
//         } else {
//           mst_tenor_id = data.tenor.id[indexTenor];
//         }
//         // check if kode pengelolaan exists
//         let indexPengelolaan = data.pengelolaan.kode.indexOf(row.Pengelolaan);
//         if (indexPengelolaan === -1) {
//           validationStatus = false;
//           validationNote += `Kode Pengelolaan ${
//             row.Pengelolaan !== null ? row.Pengelolaan : ""
//           } tidak ditemukan. `;
//         } else {
//           mst_pengelolaan_id = data.pengelolaan.id[indexPengelolaan];
//         }

//         // check if kode kbmi exists
//         // check if row.kbmi is not null or undefined first, if it is then pass
//         if (row.KBMI !== null && row.KBMI !== undefined) {
//           let indexKbmi = data.kbmi.kode.indexOf(row.KBMI);
//           if (indexKbmi === -1) {
//             validationStatus = false;
//             validationNote += `Kode KBMI ${
//               row.KBMI !== null ? row.KBMI : ""
//             } tidak ditemukan. `;
//           } else {
//             mst_kbmi_id = data.kbmi.id[indexKbmi];
//           }
//         }

//
//         row["IssuedDate"] =
//           row.IssuedDate !== undefined
//             ? _excelSerialDateToJSDate(row["IssuedDate"])
//             : undefined;
//         row["MaturityDate"] =
//           row.MaturityDate !== undefined
//             ? _excelSerialDateToJSDate(row["MaturityDate"])
//             : undefined;
//         row["InterestDate"] =
//           row.InterestDate !== undefined
//             ? _excelSerialDateToJSDate(row["InterestDate"])
//             : undefined;
//
//
//

//         if (row.IssuedDate !== undefined) {
//           if (!moment(row.IssuedDate, "DD/MM/YYYY", true).isValid()) {
//             // validationStatus = false;
//             validationNote += `Issued Date tidak valid. `;
//           }
//         } else {
//           row.IssuedDate = null;
//           // validationStatus = false;
//           validationNote += `Issued Date tidak boleh kosong. `;
//         }

//         if (row.MaturityDate !== undefined) {
//           if (!moment(row.MaturityDate, "DD/MM/YYYY", true).isValid()) {
//             // validationStatus = false;
//             validationNote += `Maturity Date tidak valid. `;
//           }
//         } else {
//           row.MaturityDate = null;
//           // validationStatus = false;
//           validationNote += `Maturity Date tidak boleh kosong. `;
//         }

//         if (row.InterestDate !== undefined) {
//           if (!moment(row.InterestDate, "DD/MM/YYYY", true).isValid()) {
//             // validationStatus = false;
//             validationNote += `Interest Date tidak valid. `;
//           }
//         } else {
//           row.InterestDate = null;
//         }

//         if (row.SisaTenor !== null && row.SisaTenor !== undefined) {
//           if (isNaN(row.SisaTenor)) {
//             validationStatus = false;
//             validationNote += `Sisa Tenor tidak valid. `;
//           }
//         }

//         if (row.Rate !== null && row.Rate !== undefined) {
//           if (isNaN(row.Rate)) {
//             validationStatus = false;
//             validationNote += `Rate tidak valid. `;
//           }
//         }

//         // check if kode kepemilikan exists
//         if (row.Kepemilikan !== null && row.Kepemilikan !== undefined) {
//           let indexKepemilikan = data.kepemilikan.kode.indexOf(row.Kepemilikan);
//           if (indexKepemilikan === -1) {
//             validationStatus = false;
//             validationNote += `Kode Kepemilikan tidak ditemukan. `;
//           } else {
//             mst_kepemilikan_id = data.kepemilikan.id[indexKepemilikan];
//           }
//         }

//         let pd = Number(row.PD ?? 0);
//         let lgd = Number(row.LGD ?? 0);
//         let ecl = Number(row.ECL ?? 0);
//         // if sisaTenor and rate is not null or undefined
//         //

//         // put validation note into index array
//         dataXLS[index]["note"] = validationNote;
//         const dateFormat = "DD/MM/YYYY";
//         let trx_porto_id = null;
//         row.Tipe = row.Tipe.toLowerCase();
//         if (validationNote === ``) {
//           let check_trx_porto = await db.trxPorto.findOne({
//             where: {
//               tipe: row.Tipe,
//               mst_issuer_id: mst_issuer_id,
//               start_date:
//                 row.IssuedDate !== null
//                   ? moment(row.IssuedDate, dateFormat).format("YYYY-MM-DD")
//                   : null,
//               nominal: row.Nominal,
//             },
//             transaction: t,
//           });
//           if (check_trx_porto) {
//             trx_porto_id = check_trx_porto.id;
//             await db.trxPorto.update(
//               {
//                 unique_id: row.UniqueID,
//                 no_security: row.NoSecurity,
//                 tipe: row.Tipe,
//                 start_date:
//                   row.IssuedDate !== null
//                     ? moment(row.IssuedDate, dateFormat).format("YYYY-MM-DD")
//                     : null,
//                 end_date:
//                   row.MaturityDate !== null
//                     ? moment(row.MaturityDate, dateFormat).format("YYYY-MM-DD")
//                     : null,
//                 interest_date:
//                   row.InterestDate !== null
//                     ? moment(row.InterestDate, dateFormat).format("YYYY-MM-DD")
//                     : null,
//                 sisa_tenor: row.SisaTenor,
//                 rate: row.Rate,
//                 nominal: row.Nominal,
//                 pd: pd,
//                 ecl: ecl,
//                 lgd: lgd,
//                 mst_issuer_id: mst_issuer_id,
//                 mst_tenor_id: mst_tenor_id,
//                 mst_pengelolaan_id: mst_pengelolaan_id,
//                 mst_kbmi_id: mst_kbmi_id,
//                 mst_kepemilikan_id: mst_kepemilikan_id,
//                 updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
//                 trx_porto_file_id: trx_porto_file_id,
//                 mst_bank_custody_id: bankCustody.mst_bank_custody_id,
//               },
//               {
//                 where: {
//                   id: trx_porto_id,
//                 },
//                 transaction: t,
//               }
//             );

//             await db.trxRekap.destroy({
//               where: {
//                 tipe: "porto",
//                 subtipe: row.Tipe,
//                 trx_porto_id: trx_porto_id,
//               },
//               transaction: t,
//             });
//           } else {
//             trx_porto_id = uuidv4();
//             await db.trxPorto.create(
//               {
//                 id: trx_porto_id,
//                 unique_id: row.UniqueID,
//                 no_security: row.NoSecurity,
//                 tipe: row.Tipe,
//                 start_date:
//                   row.IssuedDate !== null
//                     ? moment(row.IssuedDate, dateFormat).format("YYYY-MM-DD")
//                     : null,
//                 end_date:
//                   row.MaturityDate !== null
//                     ? moment(row.MaturityDate, dateFormat).format("YYYY-MM-DD")
//                     : null,
//                 interest_date:
//                   row.InterestDate !== null
//                     ? moment(row.InterestDate, dateFormat).format("YYYY-MM-DD")
//                     : null,
//                 sisa_tenor: row.SisaTenor,
//                 rate: row.Rate,
//                 nominal: row.Nominal,
//                 ecl: ecl,
//                 pd: pd,
//                 lgd: lgd,
//                 mst_issuer_id: mst_issuer_id,
//                 mst_tenor_id: mst_tenor_id,
//                 mst_pengelolaan_id: mst_pengelolaan_id,
//                 mst_kbmi_id: mst_kbmi_id,
//                 mst_kepemilikan_id: mst_kepemilikan_id,
//                 trx_porto_file_id: trx_porto_file_id,
//                 created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
//                 mst_bank_custody_id: bankCustody.mst_bank_custody_id,
//               },
//               {
//                 transaction: t,
//               }
//             );
//           }

//           // porto rekap
//           if (row.IssuedDate !== null && row.MaturityDate !== null) {
//             let start_date = moment(row.IssuedDate, dateFormat);
//             let end_date = moment(row.MaturityDate, dateFormat);
//             let range_month = end_date.diff(start_date, "months") + 1;
//             let period = [];
//             for (let i = 0; i < range_month; i++) {
//               let new_month = moment(start_date).add(i, "months");
//               let endYear = 0;

//               if (new_month.format("MM") === "12") {
//                 endYear = 1;
//               } else if (
//                 new_month.format("YYYY") === moment().format("YYYY") &&
//                 new_month.format("MM") === moment().format("MM")
//               ) {
//                 endYear = 1;
//               }
//               period.push({
//                 period: new_month.format("YYYY-MM"),
//                 tahun: new_month.format("YYYY"),
//                 bulan: new_month.format("MM"),
//                 end_year: endYear,
//               });
//             }
//             await db.trxRekap.destroy({
//               where: {
//                 tipe: "porto",
//                 subtipe: row.Tipe,
//                 trx_porto_id: trx_porto_id,
//               },
//               transaction: t,
//             });

//             await db.trxRekap.bulkCreate(
//               period.map((col) => {
//                 return {
//                   tipe: "porto",
//                   subtipe: row.Tipe,
//                   trx_porto_id: trx_porto_id,
//                   period: col.period,
//                   tahun: col.tahun,
//                   bulan: col.bulan,
//                   end_year: col.end_year,
//                 };
//               }),
//               { transaction: t }
//             );
//           }
//         }
//         if (validationNote !== ``) {
//           validationStatus = false;
//           trx_porto_id = null;
//           pd = 0;
//           lgd = 0;
//           ecl = 0;
//         }
//         if (mst_issuer_id === undefined) {
//           mst_issuer_id = null;
//         }
//         if (mst_tenor_id === undefined) {
//           mst_tenor_id = null;
//         }
//         if (mst_pengelolaan_id === undefined) {
//           mst_pengelolaan_id = null;
//         }
//         if (mst_kbmi_id === undefined) {
//           mst_kbmi_id = null;
//         }
//         if (mst_kepemilikan_id === undefined) {
//           mst_kepemilikan_id = null;
//         }

//         // insert trx_porto_filedata
//         await db.trxPortoFileData.create({
//           trx_porto_file_id: trx_porto_file_id,
//           unique_id: row.UniqueID,
//           no_security: row.NoSecurity,
//           tipe: row.Tipe,
//           start_date:
//             row.IssuedDate !== null
//               ? moment(row.IssuedDate, dateFormat).format("YYYY-MM-DD")
//               : null,
//           end_date:
//             row.MaturityDate !== null
//               ? moment(row.MaturityDate, dateFormat).format("YYYY-MM-DD")
//               : null,
//           interest_date:
//             row.InterestDate !== null
//               ? moment(row.InterestDate, dateFormat).format("YYYY-MM-DD")
//               : null,
//           sisa_tenor: row.SisaTenor,
//           rate: row.Rate,
//           nominal: row.Nominal,
//           pd: pd,
//           lgd: lgd,
//           ecl: ecl,
//           mst_issuer_id: mst_issuer_id,
//           mst_tenor_id: mst_tenor_id,
//           mst_pengelolaan_id: mst_pengelolaan_id,
//           mst_kbmi_id: mst_kbmi_id,
//           mst_kepemilikan_id: mst_kepemilikan_id,
//           status: validationStatus,
//           note: validationNote,
//           created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
//           mst_bank_custody_id: bankCustody.mst_bank_custody_id,
//         });
//         index++;
//       }

//       if (validationStatus) {
//         await db.trxPortoFile.update(
//           {
//             status: true,
//           },
//           {
//             where: {
//               id: trx_porto_file_id,
//             },
//           }
//         );
//       }
//       if (!validationStatus) {
//         throw new Error("Validation failed");
//       }

//       return {
//         trx_porto_file_id: trx_porto_file_id,
//         validationStatus: validationStatus,
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
// const uploadExcel = async (req, res) => {
//   try {
//     const result = await db.sequelize.transaction(async (t) => {
//       let { data: dataXLS, fileName, session } = req.body;
//       const user_id = JSON.parse(session).user.id;
//       const bankCustody = await db.user.findOne({
//         where: {
//           id: user_id,
//         },
//         attributes: ["mst_bank_custody_id"],
//       });

//       const models = ["issuer", "tenor", "pengelolaan", "kbmi", "kepemilikan"];
//       const data = {};

//       for (const model of models) {
//         // only issuer model has lgd and pd
//         const attributes =
//           model === "issuer" ? ["id", "kode", "lgd", "pd"] : ["id", "kode"];
//         const modelData = await db[model].findAll({
//           attributes: attributes,
//         });

//         const listID = modelData.map((row) => row.id);
//         const listKode = modelData.map((row) => row.kode);
//         const listLGD =
//           model === "issuer" ? modelData.map((row) => row.lgd) : null;
//         const listPD =
//           model === "issuer" ? modelData.map((row) => row.pd) : null;

//         data[model] = {
//           id: listID,
//           kode: listKode,
//           lgd: listLGD,
//           pd: listPD,
//         };
//       }

//       let trx_porto_file_id = uuidv4();
//       await db.trxPortoFile.create({
//         id: trx_porto_file_id,
//         file_name: fileName,
//         status: false,
//         aut_user_id: user_id,
//         created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
//       });

//       let validationStatus = true;
//       let index = 0;

//       for (const row of dataXLS) {
//         row.IssuedDate = row.IssuedDate?.replace(/\s/g, "") || undefined;
//         row.MaturityDate = row.MaturityDate?.replace(/\s/g, "") || undefined;
//         row.InterestDate = row.InterestDate?.replace(/\s/g, "") || undefined;

//         let validationNote = ``;
//         // validating data
//         let mst_issuer_id,
//           mst_tenor_id,
//           mst_pengelolaan_id,
//           mst_kbmi_id,
//           mst_kepemilikan_id;
//         // check if kode issuer exists
//         let indexIssuer = data.issuer.kode.indexOf(row.Issuer);
//         if (indexIssuer === -1) {
//           validationStatus = false;
//           validationNote += `Kode Issuer tidak ditemukan. `;
//         } else {
//           mst_issuer_id = data.issuer.id[indexIssuer];
//         }

//         // check if kode tenor exists
//         let indexTenor = data.tenor.kode.indexOf(row.Tenor);
//         if (indexTenor === -1) {
//           validationStatus = false;
//           validationNote += `Kode Tenor tidak ditemukan. `;
//         } else {
//           mst_tenor_id = data.tenor.id[indexTenor];
//         }
//         // check if kode pengelolaan exists
//         let indexPengelolaan = data.pengelolaan.kode.indexOf(row.Pengelolaan);
//         if (indexPengelolaan === -1) {
//           validationStatus = false;
//           validationNote += `Kode Pengelolaan tidak ditemukan. `;
//         } else {
//           mst_pengelolaan_id = data.pengelolaan.id[indexPengelolaan];
//         }

//         // check if kode kbmi exists
//         // check if row.kbmi is not null or undefined first, if it is then pass
//         if (row.KBMI !== null && row.KBMI !== undefined) {
//           let indexKbmi = data.kbmi.kode.indexOf(row.KBMI);
//           if (indexKbmi === -1) {
//             validationStatus = false;
//             validationNote += `Kode KBMI tidak ditemukan. `;
//           } else {
//             mst_kbmi_id = data.kbmi.id[indexKbmi];
//           }
//         }

//         if (row.IssuedDate !== undefined) {
//           if (!moment(row.IssuedDate, "DD/MM/YYYY", true).isValid()) {
//             validationStatus = false;
//             validationNote += `Issued Date tidak valid. `;
//           }
//         } else {
//           row.IssuedDate = null;
//           validationStatus = false;
//           validationNote += `Issued Date tidak boleh kosong. `;
//         }

//         if (row.MaturityDate !== undefined) {
//           if (!moment(row.MaturityDate, "DD/MM/YYYY", true).isValid()) {
//             validationStatus = false;
//             validationNote += `Maturity Date tidak valid. `;
//           }
//         } else {
//           row.MaturityDate = null;
//           validationStatus = false;
//           validationNote += `Maturity Date tidak boleh kosong. `;
//         }

//         if (row.InterestDate !== undefined) {
//           if (!moment(row.InterestDate, "DD/MM/YYYY", true).isValid()) {
//             validationStatus = false;
//             validationNote += `Interest Date tidak valid. `;
//           }
//         } else {
//           row.InterestDate = null;
//         }

//         if (row.SisaTenor !== null && row.SisaTenor !== undefined) {
//           if (isNaN(row.SisaTenor)) {
//             validationStatus = false;
//             validationNote += `Sisa Tenor tidak valid. `;
//           }
//         }

//         if (row.Rate !== null && row.Rate !== undefined) {
//           if (isNaN(row.Rate)) {
//             validationStatus = false;
//             validationNote += `Rate tidak valid. `;
//           }
//         }

//         // check if kode kepemilikan exists
//         if (row.Kepemilikan !== null && row.Kepemilikan !== undefined) {
//           let indexKepemilikan = data.kepemilikan.kode.indexOf(row.Kepemilikan);
//           if (indexKepemilikan === -1) {
//             validationStatus = false;
//             validationNote += `Kode Kepemilikan tidak ditemukan. `;
//           } else {
//             mst_kepemilikan_id = data.kepemilikan.id[indexKepemilikan];
//           }
//         }

//         let pd = Number(data.issuer.pd[indexIssuer]);
//         let lgd = Number(data.issuer.lgd[indexIssuer]);
//         let ecl = 0;
//         // if sisaTenor and rate is not null or undefined
//         if (
//           row.SisaTenor !== null &&
//           row.SisaTenor !== undefined &&
//           row.Rate !== null &&
//           row.Rate !== undefined
//         ) {
//           if (Number(row.SisaTenor) < 360) {
//             ecl =
//               (1 - Math.pow(1 - pd / 100, Number(row.SisaTenor) / 360)) *
//               (lgd / 100) *
//               Number(row.Nominal);
//           } else {
//             ecl =
//               ((1 - Math.pow(1 - pd / 100, Number(row.SisaTenor) / 360)) *
//                 (lgd / 100) *
//                 Number(row.Nominal)) /
//               Math.pow((1 + 4.87 / 100) ^ (Number(row.SisaTenor) / 360));
//           }
//         }

//         // put validation note into index array
//         dataXLS[index]["note"] = validationNote;
//         const dateFormat = "DD/MM/YYYY";
//         let trx_porto_id = null;
//         row.Tipe = row.Tipe.toLowerCase();
//         if (validationNote === ``) {
//           let check_trx_porto = await db.trxPorto.findOne({
//             where: {
//               tipe: row.Tipe,
//               mst_issuer_id: mst_issuer_id,
//               start_date:
//                 row.IssuedDate !== null
//                   ? moment(row.IssuedDate, dateFormat).format("YYYY-MM-DD")
//                   : null,
//               nominal: row.Nominal,
//             },
//             transaction: t,
//           });
//           if (check_trx_porto) {
//             trx_porto_id = check_trx_porto.id;
//             await db.trxPorto.update(
//               {
//                 unique_id: row.UniqueID,
//                 no_security: row.NoSecurity,
//                 tipe: row.Tipe,
//                 start_date:
//                   row.IssuedDate !== null
//                     ? moment(row.IssuedDate, dateFormat).format("YYYY-MM-DD")
//                     : null,
//                 end_date:
//                   row.MaturityDate !== null
//                     ? moment(row.MaturityDate, dateFormat).format("YYYY-MM-DD")
//                     : null,
//                 interest_date:
//                   row.InterestDate !== null
//                     ? moment(row.InterestDate, dateFormat).format("YYYY-MM-DD")
//                     : null,
//                 sisa_tenor: row.SisaTenor,
//                 rate: row.Rate,
//                 nominal: row.Nominal,
//                 pd: pd,
//                 ecl: ecl,
//                 lgd: lgd,
//                 mst_issuer_id: mst_issuer_id,
//                 mst_tenor_id: mst_tenor_id,
//                 mst_pengelolaan_id: mst_pengelolaan_id,
//                 mst_kbmi_id: mst_kbmi_id,
//                 mst_kepemilikan_id: mst_kepemilikan_id,
//                 updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
//                 trx_porto_file_id: trx_porto_file_id,
//                 mst_bank_custody_id: bankCustody.mst_bank_custody_id,
//               },
//               {
//                 where: {
//                   id: trx_porto_id,
//                 },
//                 transaction: t,
//               }
//             );

//             await db.trxRekap.destroy({
//               where: {
//                 tipe: "porto",
//                 subtipe: row.Tipe,
//                 trx_porto_id: trx_porto_id,
//               },
//               transaction: t,
//             });
//           } else {
//             trx_porto_id = uuidv4();
//             await db.trxPorto.create(
//               {
//                 id: trx_porto_id,
//                 unique_id: row.UniqueID,
//                 no_security: row.NoSecurity,
//                 tipe: row.Tipe,
//                 start_date:
//                   row.IssuedDate !== null
//                     ? moment(row.IssuedDate, dateFormat).format("YYYY-MM-DD")
//                     : null,
//                 end_date:
//                   row.MaturityDate !== null
//                     ? moment(row.MaturityDate, dateFormat).format("YYYY-MM-DD")
//                     : null,
//                 interest_date:
//                   row.InterestDate !== null
//                     ? moment(row.InterestDate, dateFormat).format("YYYY-MM-DD")
//                     : null,
//                 sisa_tenor: row.SisaTenor,
//                 rate: row.Rate,
//                 nominal: row.Nominal,
//                 ecl: ecl,
//                 pd: pd,
//                 lgd: lgd,
//                 mst_issuer_id: mst_issuer_id,
//                 mst_tenor_id: mst_tenor_id,
//                 mst_pengelolaan_id: mst_pengelolaan_id,
//                 mst_kbmi_id: mst_kbmi_id,
//                 mst_kepemilikan_id: mst_kepemilikan_id,
//                 trx_porto_file_id: trx_porto_file_id,
//                 created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
//                 mst_bank_custody_id: bankCustody.mst_bank_custody_id,
//               },
//               {
//                 transaction: t,
//               }
//             );
//           }

//           // porto rekap
//           if (row.IssuedDate !== null && row.MaturityDate !== null) {
//             let start_date = moment(row.IssuedDate, dateFormat);
//             let end_date = moment(row.MaturityDate, dateFormat);
//             let range_month = end_date.diff(start_date, "months") + 1;
//             let period = [];
//             for (let i = 0; i < range_month; i++) {
//               let new_month = moment(start_date).add(i, "months");
//               let endYear = 0;

//               if (new_month.format("MM") === "12") {
//                 endYear = 1;
//               } else if (
//                 new_month.format("YYYY") === moment().format("YYYY") &&
//                 new_month.format("MM") === moment().format("MM")
//               ) {
//                 endYear = 1;
//               }
//               period.push({
//                 period: new_month.format("YYYY-MM"),
//                 tahun: new_month.format("YYYY"),
//                 bulan: new_month.format("MM"),
//                 end_year: endYear,
//               });
//             }
//             await db.trxRekap.destroy({
//               where: {
//                 tipe: "porto",
//                 subtipe: row.Tipe,
//                 trx_porto_id: trx_porto_id,
//               },
//               transaction: t,
//             });

//             await db.trxRekap.bulkCreate(
//               period.map((col) => {
//                 return {
//                   tipe: "porto",
//                   subtipe: row.Tipe,
//                   trx_porto_id: trx_porto_id,
//                   period: col.period,
//                   tahun: col.tahun,
//                   bulan: col.bulan,
//                   end_year: col.end_year,
//                 };
//               }),
//               { transaction: t }
//             );
//           }
//         }
//         if (validationNote !== ``) {
//           validationStatus = false;
//           trx_porto_id = null;
//           pd = 0;
//           lgd = 0;
//           ecl = 0;
//         }
//         if (mst_issuer_id === undefined) {
//           mst_issuer_id = null;
//         }
//         if (mst_tenor_id === undefined) {
//           mst_tenor_id = null;
//         }
//         if (mst_pengelolaan_id === undefined) {
//           mst_pengelolaan_id = null;
//         }
//         if (mst_kbmi_id === undefined) {
//           mst_kbmi_id = null;
//         }
//         if (mst_kepemilikan_id === undefined) {
//           mst_kepemilikan_id = null;
//         }

//         // insert trx_porto_filedata
//         await db.trxPortoFileData.create({
//           trx_porto_file_id: trx_porto_file_id,
//           unique_id: row.UniqueID,
//           no_security: row.NoSecurity,
//           tipe: row.Tipe,
//           start_date:
//             row.IssuedDate !== null
//               ? moment(row.IssuedDate, dateFormat).format("YYYY-MM-DD")
//               : null,
//           end_date:
//             row.MaturityDate !== null
//               ? moment(row.MaturityDate, dateFormat).format("YYYY-MM-DD")
//               : null,
//           interest_date:
//             row.InterestDate !== null
//               ? moment(row.InterestDate, dateFormat).format("YYYY-MM-DD")
//               : null,
//           sisa_tenor: row.SisaTenor,
//           rate: row.Rate,
//           nominal: row.Nominal,
//           pd: pd,
//           lgd: lgd,
//           ecl: ecl,
//           mst_issuer_id: mst_issuer_id,
//           mst_tenor_id: mst_tenor_id,
//           mst_pengelolaan_id: mst_pengelolaan_id,
//           mst_kbmi_id: mst_kbmi_id,
//           mst_kepemilikan_id: mst_kepemilikan_id,
//           status: validationStatus,
//           note: validationNote,
//           created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
//           mst_bank_custody_id: bankCustody.mst_bank_custody_id,
//         });
//         index++;
//       }

//       if (validationStatus) {
//         await db.trxPortoFile.update(
//           {
//             status: true,
//           },
//           {
//             where: {
//               id: trx_porto_file_id,
//             },
//           }
//         );
//       }
//       if (!validationStatus) {
//         throw new Error("Validation failed");
//       }

//       return {
//         trx_porto_file_id: trx_porto_file_id,
//         validationStatus: validationStatus,
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

const listPortoFile = async (req, res) => {
  try {
    let { session } = req.body;
    const user_id = JSON.parse(session).user.id;

    let data = await db.trxPortoFile.findAll({
      attributes: ["id", "file_name", "status", "created_at", "tanggal"],
      where: {
        aut_user_id: user_id,
      },
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

const detailPortoFile = async (req, res) => {
  try {
    let { id } = req.body;
    let data = await db.trxPortoFileData.findAll({
      where: {
        trx_porto_file_id: id,
      },
      include: [
        {
          model: db.issuer,
        },
        {
          model: db.tenor,
        },
        {
          model: db.pengelolaan,
        },
        {
          model: db.kbmi,
        },
        {
          model: db.kepemilikan,
        },
      ],
      order: [["created_at", "ASC"]],
    });

    let dataPortoFile = await db.trxPortoFile.findOne({
      where: {
        id: id,
      },
    });

    res.status(200).send({
      code: 200,
      data: {
        data: data,
        file: dataPortoFile,
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
  summary,
  uploadExcel,
  detailSummary,
  multiPorto,
  comparison,
  listPortoFile,
  detailPortoFile,
};