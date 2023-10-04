const db = require("../../models");
const { Op } = require("sequelize");
const moment = require("moment");

const summary = async (req, res) => {
  try {
    let { start, end, range, issuer } = req.body;
    // change range to positive
    range = Math.abs(Number(range));
    const limit = end - start + 1;

    let list_period = [];
    for (let mth = 0; mth <= range; mth++) {
      // format YYYY-MM
      list_period.push(moment(start).add(mth, "month").format("YYYY-MM"));
    }
    let query = `SELECT 
    mst_issuer.nama, SUM(ecl)
    FROM trx_porto
    JOIN trx_rekap ON trx_rekap.trx_porto_id = trx_porto.id
    JOIN mst_issuer ON trx_porto.mst_issuer_id = mst_issuer.id
    WHERE trx_rekap.tipe = 'porto'
    AND trx_rekap.period IN (:list_month)
`;
    if (issuer !== "all") {
      query += `AND mst_issuer.id = :issuer `;
    }
    query += `GROUP BY mst_issuer.nama
    ORDER BY mst_issuer.nama ASC;`;

    const data = await db.sequelize.query(query, {
      replacements: {
        list_month: list_period,
        issuer: issuer,
      },
      type: db.sequelize.QueryTypes.SELECT,
    });

    res.send({
      code: 200,
      data: data,
      error: null,
    });
  } catch (err) {
    res.status(500).send({
      code: 500,
      data: null,
      error: err.message || "Some error occurred while retrieving data.",
    });
  }
};

const deposito = async (req, res) => {
  try {
    let { start, end, range, issuer, kbmi, tenor } = req.body;
    // change range to positive
    range = Math.abs(Number(range));
    const limit = end - start + 1;

    let list_period = [];
    for (let mth = 0; mth <= range; mth++) {
      // format YYYY-MM
      list_period.push(moment(start).add(mth, "month").format("YYYY-MM"));
    }
    let query = `SELECT 
    trx_rekap.period, SUM(ecl)
    FROM trx_porto
    JOIN trx_rekap ON trx_rekap.trx_porto_id = trx_porto.id
    JOIN mst_issuer ON trx_porto.mst_issuer_id = mst_issuer.id
    JOIN mst_kbmi ON trx_porto.mst_kbmi_id = mst_kbmi.id
    JOIN mst_kepemilikan ON trx_porto.mst_kepemilikan_id = mst_kepemilikan.id
    JOIN mst_pengelolaan ON trx_porto.mst_pengelolaan_id = mst_pengelolaan.id
    JOIN mst_tenor ON trx_porto.mst_tenor_id = mst_tenor.id
    WHERE trx_rekap.tipe = 'porto'
    AND trx_rekap.subtipe = 'deposito'
    AND trx_rekap.period IN (:list_month)
`;
    let queryTable = `
    SELECT mst_issuer.nama as "nama_issuer", mst_kbmi.nama as "nama_kbmi", mst_kepemilikan.nama as "nama_kepemilikan", mst_pengelolaan.nama as "nama_pengelolaan", mst_tenor.nama as "nama_tenor", trx_porto.*
    FROM trx_porto
    JOIN trx_rekap ON trx_rekap.trx_porto_id = trx_porto.id
    JOIN mst_issuer ON trx_porto.mst_issuer_id = mst_issuer.id
    JOIN mst_kbmi ON trx_porto.mst_kbmi_id = mst_kbmi.id
    JOIN mst_kepemilikan ON trx_porto.mst_kepemilikan_id = mst_kepemilikan.id
    JOIN mst_pengelolaan ON trx_porto.mst_pengelolaan_id = mst_pengelolaan.id
    JOIN mst_tenor ON trx_porto.mst_tenor_id = mst_tenor.id
    WHERE trx_rekap.tipe = 'porto'
    AND trx_rekap.subtipe = 'deposito'
    AND trx_rekap.period IN (:list_month)
    `;
    if (issuer !== "all") {
      query += `AND mst_issuer.id = :issuer `;
      queryTable += `AND mst_issuer.id = :issuer `;
    }
    if (kbmi !== "all") {
      query += `AND mst_kbmi.id = :kbmi `;
      queryTable += `AND mst_kbmi.id = :kbmi `;
    }
    if (tenor !== "all") {
      query += `AND mst_tenor.id = :tenor `;
      queryTable += `AND mst_tenor.id = :tenor `;
    }
    query += `GROUP BY trx_rekap.period
    ORDER BY trx_rekap.period ASC;`;
    queryTable += `ORDER BY trx_rekap.period ASC;`;

    const data = await db.sequelize.query(query, {
      replacements: {
        list_month: list_period,
        issuer: issuer,
        kbmi: kbmi,
        tenor: tenor,
      },
      type: db.sequelize.QueryTypes.SELECT,
    });

    const dataTable = await db.sequelize.query(queryTable, {
      replacements: {
        list_month: list_period,
        issuer: issuer,
        kbmi: kbmi,
        tenor: tenor,
      },
      type: db.sequelize.QueryTypes.SELECT,
    });

    res.send({
      code: 200,
      data: {
        data: data,
        table: dataTable,
      },
      error: null,
    });
  } catch (err) {
    res.status(500).send({
      code: 500,
      data: null,
      error: err.message || "Some error occurred while retrieving data.",
    });
  }
};

const obligasi = async (req, res) => {
  try {
    let { start, end, range, issuer, tenor } = req.body;
    // change range to positive
    range = Math.abs(Number(range));
    const limit = end - start + 1;

    let list_period = [];
    for (let mth = 0; mth <= range; mth++) {
      // format YYYY-MM
      list_period.push(moment(start).add(mth, "month").format("YYYY-MM"));
    }
    let query = `SELECT 
    trx_rekap.period, SUM(ecl)
    FROM trx_porto
    JOIN trx_rekap ON trx_rekap.trx_porto_id = trx_porto.id
    JOIN mst_issuer ON trx_porto.mst_issuer_id = mst_issuer.id
    JOIN mst_kbmi ON trx_porto.mst_kbmi_id = mst_kbmi.id
    JOIN mst_kepemilikan ON trx_porto.mst_kepemilikan_id = mst_kepemilikan.id
    JOIN mst_pengelolaan ON trx_porto.mst_pengelolaan_id = mst_pengelolaan.id
    JOIN mst_tenor ON trx_porto.mst_tenor_id = mst_tenor.id
    WHERE trx_rekap.tipe = 'porto'
    AND trx_rekap.subtipe = 'obligasi'
    AND trx_rekap.period IN (:list_month)
`;
    let queryTable = `
    SELECT mst_issuer.nama as "nama_issuer", mst_kbmi.nama as "nama_kbmi", mst_kepemilikan.nama as "nama_kepemilikan", mst_pengelolaan.nama as "nama_pengelolaan", mst_tenor.nama as "nama_tenor", trx_porto.*
    FROM trx_porto
    JOIN trx_rekap ON trx_rekap.trx_porto_id = trx_porto.id
    JOIN mst_issuer ON trx_porto.mst_issuer_id = mst_issuer.id
    JOIN mst_kbmi ON trx_porto.mst_kbmi_id = mst_kbmi.id
    JOIN mst_kepemilikan ON trx_porto.mst_kepemilikan_id = mst_kepemilikan.id
    JOIN mst_pengelolaan ON trx_porto.mst_pengelolaan_id = mst_pengelolaan.id
    JOIN mst_tenor ON trx_porto.mst_tenor_id = mst_tenor.id
    WHERE trx_rekap.tipe = 'porto'
    AND trx_rekap.subtipe = 'obligasi'
    AND trx_rekap.period IN (:list_month)
    `;
    if (issuer !== "all") {
      query += `AND mst_issuer.id = :issuer `;
      queryTable += `AND mst_issuer.id = :issuer `;
    }
    if (tenor !== "all") {
      query += `AND mst_tenor.id = :tenor `;
      queryTable += `AND mst_tenor.id = :tenor `;
    }
    query += `GROUP BY trx_rekap.period
    ORDER BY trx_rekap.period ASC;`;
    queryTable += `ORDER BY trx_rekap.period ASC;`;

    const data = await db.sequelize.query(query, {
      replacements: {
        list_month: list_period,
        issuer: issuer,
      },
      type: db.sequelize.QueryTypes.SELECT,
    });

    const dataTable = await db.sequelize.query(queryTable, {
      replacements: {
        list_month: list_period,
        issuer: issuer,
      },
      type: db.sequelize.QueryTypes.SELECT,
    });

    res.send({
      code: 200,
      data: {
        data: data,
        table: dataTable,
      },
      error: null,
    });
  } catch (err) {
    res.status(500).send({
      code: 500,
      data: null,
      error: err.message || "Some error occurred while retrieving data.",
    });
  }
};

module.exports = {
  summary,
  deposito,
  obligasi,
};
