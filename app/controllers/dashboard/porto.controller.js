const db = require("../../models");
const moment = require("moment");
const Op = db.Sequelize.Op;

const summary = async (req, res) => {
  try {
    let { start, end, range, issuer } = req.body;

    let list_period = [];
    for (let i = 0; i < range; i++) {
      let period = moment(start).add(i, "months").format("YYYY-MM");
      list_period.push(period);
    }

    let query = ``;
    query = `SELECT trx_porto.tipe, SUM(nominal)
    FROM trx_porto
    JOIN trx_rekap ON trx_rekap.trx_porto_id = trx_porto.id
    WHERE trx_rekap.tipe = 'porto'
    AND trx_rekap.period IN (:list_month)
    `;

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
    let { start, end, range, issuer, tableName, joinTable, subtipe } = req.body;

    let list_period = [];
    for (let i = 0; i < range; i++) {
      let period = moment(start).add(i, "months").format("YYYY-MM");
      list_period.push(period);
    }

    let query = `
      SELECT ${joinTable}.nama, SUM(nominal) as nominal
      FROM ${tableName}
      JOIN trx_rekap ON trx_rekap.${tableName}_id = ${tableName}.id
      LEFT JOIN ${joinTable} ON ${tableName}.${joinTable}_id = ${joinTable}.id
      WHERE trx_rekap.tipe = 'porto'
      AND trx_rekap.subtipe = '${subtipe}'
      AND trx_rekap.period IN (:list_month)
    `;

    if (issuer !== "all") {
      query += ` AND ${tableName}.mst_issuer_id = :issuer`;
    }
    query += ` GROUP BY ${joinTable}.nama
    ORDER BY ${joinTable}.nama ASC;`;

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
      start,
      end,
      range,
      issuer,
      kbmi,
      tenor,
      kepemilikan,
      pengelolaan,
      subtipe,
    } = req.body;

    let list_period = [];
    for (let i = 0; i < range; i++) {
      let period = moment(start).add(i, "months").format("YYYY-MM");
      list_period.push(period);
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
    query += `
      SELECT trx_rekap.period, SUM(nominal) as nominal
      FROM trx_porto
      JOIN trx_rekap ON trx_rekap.trx_porto_id = trx_porto.id
      JOIN mst_issuer ON trx_porto.mst_issuer_id = mst_issuer.id
      JOIN mst_tenor ON trx_porto.mst_tenor_id = mst_tenor.id
      ${sb}
      JOIN mst_pengelolaan ON trx_porto.mst_pengelolaan_id = mst_pengelolaan.id
      WHERE trx_rekap.tipe = 'porto'
      AND trx_rekap.subtipe = :subtipe
      AND trx_rekap.period IN (:list_month)
    `;

    queryTable += `
     SELECT mst_issuer.nama as "issuer", mst_pengelolaan.nama as "pengelolaan", mst_tenor.nama as "tenor", trx_porto.* ${sbSelect}
      FROM trx_porto
      JOIN trx_rekap ON trx_rekap.trx_porto_id = trx_porto.id
      JOIN mst_issuer ON trx_porto.mst_issuer_id = mst_issuer.id
      JOIN mst_tenor ON trx_porto.mst_tenor_id = mst_tenor.id
      ${sb}
      JOIN mst_pengelolaan ON trx_porto.mst_pengelolaan_id = mst_pengelolaan.id
      WHERE trx_rekap.tipe = 'porto'
      AND trx_rekap.subtipe = :subtipe
      AND trx_rekap.period IN (:list_month)
    `;

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

    query += ` GROUP BY trx_rekap.period
    ORDER BY trx_rekap.period ASC;`;
    queryTable += ` ORDER BY trx_rekap.period ASC;`;

    const options = {
      replacements: {
        list_month: list_period,
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
    let { type, list_date, issuer } = req.body;

    if (list_date === undefined || list_date.length === 0) {
      return res.status(200).json({
        code: 400,
        data: null,
        error: "List date cannot be empty",
      });
    }

    let query = ``;
    if (type === "monthly") {
      query = `SELECT trx_porto.tipe, SUM(nominal)
      FROM trx_porto
      JOIN trx_rekap ON trx_rekap.trx_porto_id = trx_porto.id
      WHERE trx_rekap.tipe = 'porto'
      AND trx_rekap.period IN (:list_date)
      `;
    } else if (type === "yearly") {
      query = `SELECT trx_porto.tipe, SUM(nominal)
      FROM trx_porto
      JOIN trx_rekap ON trx_rekap.trx_porto_id = trx_porto.id
      JOIN mst_issuer ON trx_porto.mst_issuer_id = mst_issuer.id
      WHERE trx_rekap.tipe = 'porto'
      AND trx_rekap.tahun IN (:list_date)
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
        list_date: list_date,
        issuer: issuer,
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

module.exports = {
  summary,
  detailSummary,
  multiPorto,
  comparison,
};
