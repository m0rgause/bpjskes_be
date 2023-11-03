const db = require("../../models");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
const qs = require("qs");

const summary = async (req, res) => {
  try {
    let { type, start, range, issuer } = req.body;

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
      query = `SELECT trx_porto.tipe, SUM(nominal) as sum
    FROM trx_porto
    JOIN trx_rekap ON trx_rekap.trx_porto_id = trx_porto.id
    WHERE trx_rekap.tipe = 'porto'
    AND trx_rekap.period IN (:list_month)
    `;
    } else if (type === "yearly") {
      query = `SELECT trx_porto.tipe, SUM(nominal) as sum
    FROM trx_porto
    JOIN trx_rekap ON trx_rekap.trx_porto_id = trx_porto.id
    WHERE trx_rekap.tipe = 'porto'
    AND trx_rekap.tahun IN (:list_month)
    AND trx_rekap.end_year = 1
    `;
    }

    if (issuer !== "all") {
      query += ` AND trx_porto.mst_issuer_id = :issuer`;
    }
    query += ` GROUP BY trx_porto.tipe
    ORDER BY trx_porto.tipe ASC;`;

    const options = {
      replacements: {
        list_month: list_period,
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
      JOIN trx_rekap ON trx_rekap.${tableName}_id = ${tableName}.id
      LEFT JOIN ${joinTable} ON ${tableName}.${joinTable}_id = ${joinTable}.id
      JOIN mst_bank_custody ON ${tableName}.mst_bank_custody_id = mst_bank_custody.id
      WHERE trx_rekap.tipe = 'porto'
      AND trx_rekap.subtipe = '${subtipe}'
      AND trx_rekap.period IN (:list_month)
    `;
    } else if (type === "yearly") {
      query = `
      SELECT ${joinTable}.nama, SUM(nominal) as nominal
      FROM ${tableName}
      JOIN trx_rekap ON trx_rekap.${tableName}_id = ${tableName}.id
      LEFT JOIN ${joinTable} ON ${tableName}.${joinTable}_id = ${joinTable}.id
      JOIN mst_bank_custody ON ${tableName}.mst_bank_custody_id = mst_bank_custody.id
      WHERE trx_rekap.tipe = 'porto'
      AND trx_rekap.subtipe = '${subtipe}'
      AND trx_rekap.tahun IN (:list_month)
      AND trx_rekap.end_year = 1
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
      range,
      custody,
      issuer,
      kbmi,
      tenor,
      kepemilikan,
      pengelolaan,
      subtipe,
    } = req.body;

    let list_period = [];
    for (let i = 0; i < range; i++) {
      if (type === "monthly") {
        list_period.push(moment(start_date).add(i, "months").format("YYYY-MM"));
      } else if (type === "yearly") {
        list_period.push(moment(start_date).add(i, "years").format("YYYY"));
      }
    }

    let sb = ``;
    let sbSelect = ``;
    if (subtipe === "deposito" || subtipe === "obligasi") {
      sbSelect = `, mst_kbmi.nama as "kbmi", mst_kepemilikan.nama as "kepemilikan"`;
      sb = `LEFT JOIN mst_kbmi ON trx_porto.mst_kbmi_id = mst_kbmi.id
      LEFT JOIN mst_kepemilikan ON trx_porto.mst_kepemilikan_id = mst_kepemilikan.id`;
    }
    let query = ``;
    let queryTable = ``;
    if (type === "monthly") {
      query += `
      SELECT trx_rekap.period, SUM(nominal) as nominal, mst_bank_custody.nama as "custody"
      FROM trx_porto
      JOIN trx_rekap ON trx_rekap.trx_porto_id = trx_porto.id
      JOIN mst_issuer ON trx_porto.mst_issuer_id = mst_issuer.id
      JOIN mst_tenor ON trx_porto.mst_tenor_id = mst_tenor.id
      ${sb}
      JOIN mst_pengelolaan ON trx_porto.mst_pengelolaan_id = mst_pengelolaan.id
      JOIN mst_bank_custody ON trx_porto.mst_bank_custody_id = mst_bank_custody.id
      WHERE trx_rekap.tipe = 'porto'
      AND trx_rekap.subtipe = :subtipe
      AND trx_rekap.period IN (:list_month)
      AND mst_tenor.tipe LIKE '%${subtipe}%'
    `;

      queryTable += `
     SELECT mst_issuer.nama as "issuer", mst_pengelolaan.nama as "pengelolaan", mst_tenor.nama as "tenor", trx_porto.*, mst_bank_custody.nama as "custody" ${sbSelect}
      FROM trx_porto
      JOIN trx_rekap ON trx_rekap.trx_porto_id = trx_porto.id
      JOIN mst_issuer ON trx_porto.mst_issuer_id = mst_issuer.id
      JOIN mst_tenor ON trx_porto.mst_tenor_id = mst_tenor.id
      ${sb}
      JOIN mst_pengelolaan ON trx_porto.mst_pengelolaan_id = mst_pengelolaan.id
      JOIN mst_bank_custody ON trx_porto.mst_bank_custody_id = mst_bank_custody.id
      WHERE trx_rekap.tipe = 'porto'
      AND trx_rekap.subtipe = :subtipe
      AND trx_rekap.period IN (:list_month)
      AND mst_tenor.tipe LIKE '%${subtipe}%'
    `;
    } else if (type === "yearly") {
      query += `
      SELECT trx_rekap.tahun as "period", SUM(nominal) as nominal, mst_bank_custody.nama as "custody"
      FROM trx_porto
      JOIN trx_rekap ON trx_rekap.trx_porto_id = trx_porto.id
      JOIN mst_issuer ON trx_porto.mst_issuer_id = mst_issuer.id
      JOIN mst_tenor ON trx_porto.mst_tenor_id = mst_tenor.id
      ${sb}
      JOIN mst_pengelolaan ON trx_porto.mst_pengelolaan_id = mst_pengelolaan.id
      JOIN mst_bank_custody ON trx_porto.mst_bank_custody_id = mst_bank_custody.id
      WHERE trx_rekap.tipe = 'porto'
      AND trx_rekap.subtipe = :subtipe
      AND trx_rekap.tahun IN (:list_month)
      AND trx_rekap.end_year = 1
      AND mst_tenor.tipe LIKE '%${subtipe}%'
    `;
      queryTable += `
      SELECT mst_issuer.nama as "issuer", mst_pengelolaan.nama as "pengelolaan", mst_tenor.nama as "tenor", trx_porto.*, mst_bank_custody.nama as "custody" ${sbSelect}
      FROM trx_porto
      JOIN trx_rekap ON trx_rekap.trx_porto_id = trx_porto.id
      JOIN mst_issuer ON trx_porto.mst_issuer_id = mst_issuer.id
      JOIN mst_tenor ON trx_porto.mst_tenor_id = mst_tenor.id
      ${sb}
      JOIN mst_pengelolaan ON trx_porto.mst_pengelolaan_id = mst_pengelolaan.id
      JOIN mst_bank_custody ON trx_porto.mst_bank_custody_id = mst_bank_custody.id
      WHERE trx_rekap.tipe = 'porto'
      AND trx_rekap.subtipe = :subtipe
      AND trx_rekap.tahun IN (:list_month)
      AND trx_rekap.end_year = 1
      AND mst_tenor.tipe LIKE '%${subtipe}%'
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
      query += ` GROUP BY trx_rekap.period, mst_bank_custody.nama
    ORDER BY trx_rekap.period ASC;`;
      queryTable += ` ORDER BY trx_rekap.period ASC;`;
    } else if (type === "yearly") {
      query += ` GROUP BY trx_rekap.tahun, mst_bank_custody.nama
    ORDER BY trx_rekap.tahun ASC;`;
      queryTable += ` ORDER BY trx_rekap.tahun ASC;`;
    }
    const options = {
      replacements: {
        list_month: list_period,
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
      query = `SELECT trx_rekap.period, trx_porto.tipe, SUM(nominal) sum, mst_bank_custody.nama as "custody"
      FROM trx_porto
      JOIN trx_rekap ON trx_rekap.trx_porto_id = trx_porto.id
      JOIN mst_issuer ON trx_porto.mst_issuer_id = mst_issuer.id
      JOIN mst_bank_custody ON trx_porto.mst_bank_custody_id = mst_bank_custody.id
      WHERE trx_rekap.tipe = 'porto'
      AND trx_rekap.period IN (:list_date)
      `;
    } else if (type === "yearly") {
      query = `SELECT trx_rekap.tahun as period, trx_porto.tipe, SUM(nominal) sum, mst_bank_custody.nama as "custody"
      FROM trx_porto
      JOIN trx_rekap ON trx_rekap.trx_porto_id = trx_porto.id
      JOIN mst_issuer ON trx_porto.mst_issuer_id = mst_issuer.id
      JOIN mst_bank_custody ON trx_porto.mst_bank_custody_id = mst_bank_custody.id
      WHERE trx_rekap.tipe = 'porto'
      AND trx_rekap.tahun IN (:list_date)
      AND trx_rekap.end_year = 1
      `;
    }
    if (issuer !== "all") {
      query += ` AND trx_porto.mst_issuer_id = :issuer`;
    }
    if (custody !== "all") {
      query += ` AND trx_porto.mst_bank_custody_id = :custody`;
    }
    if (type === "monthly") {
      query += ` GROUP BY trx_porto.tipe,trx_rekap.period, mst_bank_custody.nama
      ORDER BY trx_porto.tipe ASC;`;
    } else if (type === "yearly") {
      query += ` GROUP BY trx_porto.tipe,trx_rekap.tahun, mst_bank_custody.nama
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

const uploadExcel = async (req, res) => {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      let { data: dataXLS, fileName, session } = req.body;
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
          model === "issuer" ? ["id", "kode", "lgd", "pd"] : ["id", "kode"];
        const modelData = await db[model].findAll({
          attributes: attributes,
        });

        const listID = modelData.map((row) => row.id);
        const listKode = modelData.map((row) => row.kode);
        const listLGD =
          model === "issuer" ? modelData.map((row) => row.lgd) : null;
        const listPD =
          model === "issuer" ? modelData.map((row) => row.pd) : null;

        data[model] = {
          id: listID,
          kode: listKode,
          lgd: listLGD,
          pd: listPD,
        };
      }

      let trx_porto_file_id = uuidv4();
      await db.trxPortoFile.create({
        id: trx_porto_file_id,
        file_name: fileName,
        status: false,
        aut_user_id: user_id,
        created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
      });

      let validationStatus = true;
      let index = 0;

      for (const row of dataXLS) {
        row.IssuedDate = row.IssuedDate?.replace(/\s/g, "") || undefined;
        row.MaturityDate = row.MaturityDate?.replace(/\s/g, "") || undefined;
        row.InterestDate = row.InterestDate?.replace(/\s/g, "") || undefined;

        let validationNote = ``;
        // validating data
        let mst_issuer_id,
          mst_tenor_id,
          mst_pengelolaan_id,
          mst_kbmi_id,
          mst_kepemilikan_id;
        // check if kode issuer exists
        let indexIssuer = data.issuer.kode.indexOf(row.Issuer);
        if (indexIssuer === -1) {
          validationStatus = false;
          validationNote += `Kode Issuer tidak ditemukan. `;
        } else {
          mst_issuer_id = data.issuer.id[indexIssuer];
        }

        // check if kode tenor exists
        let indexTenor = data.tenor.kode.indexOf(row.Tenor);
        if (indexTenor === -1) {
          validationStatus = false;
          validationNote += `Kode Tenor tidak ditemukan. `;
        } else {
          mst_tenor_id = data.tenor.id[indexTenor];
        }
        // check if kode pengelolaan exists
        let indexPengelolaan = data.pengelolaan.kode.indexOf(row.Pengelolaan);
        if (indexPengelolaan === -1) {
          validationStatus = false;
          validationNote += `Kode Pengelolaan tidak ditemukan. `;
        } else {
          mst_pengelolaan_id = data.pengelolaan.id[indexPengelolaan];
        }

        // check if kode kbmi exists
        // check if row.kbmi is not null or undefined first, if it is then pass
        if (row.KBMI !== null && row.KBMI !== undefined) {
          let indexKbmi = data.kbmi.kode.indexOf(row.KBMI);
          if (indexKbmi === -1) {
            validationStatus = false;
            validationNote += `Kode KBMI tidak ditemukan. `;
          } else {
            mst_kbmi_id = data.kbmi.id[indexKbmi];
          }
        }

        if (row.IssuedDate !== undefined) {
          if (!moment(row.IssuedDate, "DD/MM/YYYY", true).isValid()) {
            validationStatus = false;
            validationNote += `Issued Date tidak valid. `;
          }
        } else {
          row.IssuedDate = null;
          validationStatus = false;
          validationNote += `Issued Date tidak boleh kosong. `;
        }

        if (row.MaturityDate !== undefined) {
          if (!moment(row.MaturityDate, "DD/MM/YYYY", true).isValid()) {
            validationStatus = false;
            validationNote += `Maturity Date tidak valid. `;
          }
        } else {
          row.MaturityDate = null;
          validationStatus = false;
          validationNote += `Maturity Date tidak boleh kosong. `;
        }

        if (row.InterestDate !== undefined) {
          if (!moment(row.InterestDate, "DD/MM/YYYY", true).isValid()) {
            validationStatus = false;
            validationNote += `Interest Date tidak valid. `;
          }
        } else {
          row.InterestDate = null;
        }

        if (row.SisaTenor !== null && row.SisaTenor !== undefined) {
          if (isNaN(row.SisaTenor)) {
            validationStatus = false;
            validationNote += `Sisa Tenor tidak valid. `;
          }
        }

        if (row.Rate !== null && row.Rate !== undefined) {
          if (isNaN(row.Rate)) {
            validationStatus = false;
            validationNote += `Rate tidak valid. `;
          }
        }

        // check if kode kepemilikan exists
        if (row.Kepemilikan !== null && row.Kepemilikan !== undefined) {
          let indexKepemilikan = data.kepemilikan.kode.indexOf(row.Kepemilikan);
          if (indexKepemilikan === -1) {
            validationStatus = false;
            validationNote += `Kode Kepemilikan tidak ditemukan. `;
          } else {
            mst_kepemilikan_id = data.kepemilikan.id[indexKepemilikan];
          }
        }

        let pd = Number(data.issuer.pd[indexIssuer]);
        let lgd = Number(data.issuer.lgd[indexIssuer]);
        let ecl = 0;
        // if sisaTenor and rate is not null or undefined
        if (
          row.SisaTenor !== null &&
          row.SisaTenor !== undefined &&
          row.Rate !== null &&
          row.Rate !== undefined
        ) {
          if (Number(row.SisaTenor) < 360) {
            ecl =
              (1 - Math.pow(1 - pd / 100, Number(row.SisaTenor) / 360)) *
              (lgd / 100) *
              Number(row.Nominal);
          } else {
            ecl =
              ((1 - Math.pow(1 - pd / 100, Number(row.SisaTenor) / 360)) *
                (lgd / 100) *
                Number(row.Nominal)) /
              Math.pow((1 + 4.87 / 100) ^ (Number(row.SisaTenor) / 360));
          }
        }

        // put validation note into index array
        dataXLS[index]["note"] = validationNote;
        const dateFormat = "DD/MM/YYYY";
        let trx_porto_id = null;
        row.Tipe = row.Tipe.toLowerCase();
        if (validationNote === ``) {
          let check_trx_porto = await db.trxPorto.findOne({
            where: {
              tipe: row.Tipe,
              mst_issuer_id: mst_issuer_id,
              start_date:
                row.IssuedDate !== null
                  ? moment(row.IssuedDate, dateFormat).format("YYYY-MM-DD")
                  : null,
              nominal: row.Nominal,
            },
            transaction: t,
          });
          if (check_trx_porto) {
            trx_porto_id = check_trx_porto.id;
            await db.trxPorto.update(
              {
                unique_id: row.UniqueID,
                no_security: row.NoSecurity,
                tipe: row.Tipe,
                start_date:
                  row.IssuedDate !== null
                    ? moment(row.IssuedDate, dateFormat).format("YYYY-MM-DD")
                    : null,
                end_date:
                  row.MaturityDate !== null
                    ? moment(row.MaturityDate, dateFormat).format("YYYY-MM-DD")
                    : null,
                interest_date:
                  row.InterestDate !== null
                    ? moment(row.InterestDate, dateFormat).format("YYYY-MM-DD")
                    : null,
                sisa_tenor: row.SisaTenor,
                rate: row.Rate,
                nominal: row.Nominal,
                pd: pd,
                ecl: ecl,
                lgd: lgd,
                mst_issuer_id: mst_issuer_id,
                mst_tenor_id: mst_tenor_id,
                mst_pengelolaan_id: mst_pengelolaan_id,
                mst_kbmi_id: mst_kbmi_id,
                mst_kepemilikan_id: mst_kepemilikan_id,
                updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
                trx_porto_file_id: trx_porto_file_id,
                mst_bank_custody_id: bankCustody.mst_bank_custody_id,
              },
              {
                where: {
                  id: trx_porto_id,
                },
                transaction: t,
              }
            );

            await db.trxRekap.destroy({
              where: {
                tipe: "porto",
                subtipe: row.Tipe,
                trx_porto_id: trx_porto_id,
              },
              transaction: t,
            });
          } else {
            trx_porto_id = uuidv4();
            await db.trxPorto.create(
              {
                id: trx_porto_id,
                unique_id: row.UniqueID,
                no_security: row.NoSecurity,
                tipe: row.Tipe,
                start_date:
                  row.IssuedDate !== null
                    ? moment(row.IssuedDate, dateFormat).format("YYYY-MM-DD")
                    : null,
                end_date:
                  row.MaturityDate !== null
                    ? moment(row.MaturityDate, dateFormat).format("YYYY-MM-DD")
                    : null,
                interest_date:
                  row.InterestDate !== null
                    ? moment(row.InterestDate, dateFormat).format("YYYY-MM-DD")
                    : null,
                sisa_tenor: row.SisaTenor,
                rate: row.Rate,
                nominal: row.Nominal,
                ecl: ecl,
                pd: pd,
                lgd: lgd,
                mst_issuer_id: mst_issuer_id,
                mst_tenor_id: mst_tenor_id,
                mst_pengelolaan_id: mst_pengelolaan_id,
                mst_kbmi_id: mst_kbmi_id,
                mst_kepemilikan_id: mst_kepemilikan_id,
                trx_porto_file_id: trx_porto_file_id,
                created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
                mst_bank_custody_id: bankCustody.mst_bank_custody_id,
              },
              {
                transaction: t,
              }
            );
          }

          // porto rekap
          if (row.IssuedDate !== null && row.MaturityDate !== null) {
            let start_date = moment(row.IssuedDate, dateFormat);
            let end_date = moment(row.MaturityDate, dateFormat);
            let range_month = end_date.diff(start_date, "months") + 1;
            let period = [];
            for (let i = 0; i < range_month; i++) {
              let new_month = moment(start_date).add(i, "months");
              let endYear = 0;

              if (new_month.format("MM") === "12") {
                endYear = 1;
              } else if (
                new_month.format("YYYY") === moment().format("YYYY") &&
                new_month.format("MM") === moment().format("MM")
              ) {
                endYear = 1;
              }
              period.push({
                period: new_month.format("YYYY-MM"),
                tahun: new_month.format("YYYY"),
                bulan: new_month.format("MM"),
                end_year: endYear,
              });
            }
            await db.trxRekap.destroy({
              where: {
                tipe: "porto",
                subtipe: row.Tipe,
                trx_porto_id: trx_porto_id,
              },
              transaction: t,
            });

            await db.trxRekap.bulkCreate(
              period.map((col) => {
                return {
                  tipe: "porto",
                  subtipe: row.Tipe,
                  trx_porto_id: trx_porto_id,
                  period: col.period,
                  tahun: col.tahun,
                  bulan: col.bulan,
                  end_year: col.end_year,
                };
              }),
              { transaction: t }
            );
          }
        }
        if (validationNote !== ``) {
          validationStatus = false;
          trx_porto_id = null;
          pd = 0;
          lgd = 0;
          ecl = 0;
        }
        if (mst_issuer_id === undefined) {
          mst_issuer_id = null;
        }
        if (mst_tenor_id === undefined) {
          mst_tenor_id = null;
        }
        if (mst_pengelolaan_id === undefined) {
          mst_pengelolaan_id = null;
        }
        if (mst_kbmi_id === undefined) {
          mst_kbmi_id = null;
        }
        if (mst_kepemilikan_id === undefined) {
          mst_kepemilikan_id = null;
        }

        // insert trx_porto_filedata
        await db.trxPortoFileData.create({
          trx_porto_file_id: trx_porto_file_id,
          unique_id: row.UniqueID,
          no_security: row.NoSecurity,
          tipe: row.Tipe,
          start_date:
            row.IssuedDate !== null
              ? moment(row.IssuedDate, dateFormat).format("YYYY-MM-DD")
              : null,
          end_date:
            row.MaturityDate !== null
              ? moment(row.MaturityDate, dateFormat).format("YYYY-MM-DD")
              : null,
          interest_date:
            row.InterestDate !== null
              ? moment(row.InterestDate, dateFormat).format("YYYY-MM-DD")
              : null,
          sisa_tenor: row.SisaTenor,
          rate: row.Rate,
          nominal: row.Nominal,
          pd: pd,
          lgd: lgd,
          ecl: ecl,
          mst_issuer_id: mst_issuer_id,
          mst_tenor_id: mst_tenor_id,
          mst_pengelolaan_id: mst_pengelolaan_id,
          mst_kbmi_id: mst_kbmi_id,
          mst_kepemilikan_id: mst_kepemilikan_id,
          status: validationStatus,
          note: validationNote,
          created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
          mst_bank_custody_id: bankCustody.mst_bank_custody_id,
        });
        index++;
      }

      if (validationStatus) {
        await db.trxPortoFile.update(
          {
            status: true,
          },
          {
            where: {
              id: trx_porto_file_id,
            },
          }
        );
      }
      if (!validationStatus) {
        throw new Error("Validation failed");
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

const listPortoFile = async (req, res) => {
  try {
    let { session } = req.body;
    const user_id = JSON.parse(session).user.id;

    let data = await db.trxPortoFile.findAll({
      attributes: ["id", "file_name", "status", "created_at"],
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
