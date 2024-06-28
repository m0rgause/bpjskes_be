const db = require("../../models");
const moment = require("moment");

const summary = async (req, res) => {
  try {
    let { type, startDate, endDate, rangeDate, issuer, custody } = req.body;

    // let period = [];
    // for (let mth = 0; mth < rangeDate; mth++) {
    //   if (type === "monthly") {
    //     period.push(moment(startDate).add(mth, "month").format("YYYY-MM"));
    //   } else if (type === "yearly") {
    //     period.push(moment(startDate).add(mth, "year").format("YYYY"));
    //   }
    // }

    let query = ``;
    let list_select = "";
    let list_group = "";

    if (type === "monthly") {
      startDate = moment(startDate).startOf("month").format("YYYY-MM");
      endDate = moment(endDate).endOf("month").format("YYYY-MM");
      list_select = `, trx_porto.tanggal`;
      list_group = `, trx_porto.tanggal`;
    } else if (type === "yearly") {
      startDate = moment(startDate).startOf("month").format("YYYY");
      endDate = moment(endDate).endOf("month").format("YYYY");
      list_select = `, trx_porto.tanggal`;
      list_group = `, trx_porto.tanggal`;
    }

    query = `SELECT 
    mst_issuer.nama, SUM(ecl), mst_issuer.warna, mst_bank_custody.nama as custody ${list_select}
    FROM trx_porto
    JOIN mst_issuer ON trx_porto.mst_issuer_id = mst_issuer.id
    JOIN mst_bank_custody ON trx_porto.mst_bank_custody_id = mst_bank_custody.id`;

    // if (type === "monthly") {
    //   query += `WHERE TO_CHAR(trx_porto.tanggal, 'YYYY-MM') IN (:list_month) `;
    // } else if (type === "yearly") {
    //   query += `WHERE TO_CHAR(trx_porto.tanggal, 'YYYY') IN (:list_month) `;
    // }

    if (type === "monthly") {
       query += ` WHERE TO_CHAR(trx_porto.tanggal, 'YYYY-MM') >= :startDate AND TO_CHAR(trx_porto.tanggal, 'YYYY-MM') <= :endDate `;
      // queryTable += `AND TO_CHAR(trx_porto.tanggal, 'YYYY-MM') >= :startDate AND TO_CHAR(trx_porto.tanggal, 'YYYY-MM') <= :endDate `;
    } else if (type === "yearly") {
      query += ` WHERE TO_CHAR(trx_porto.tanggal, 'YYYY') >= :startDate AND TO_CHAR(trx_porto.tanggal, 'YYYY') <= :endDate `;
      // queryTable += `AND TO_CHAR(trx_porto.tanggal, 'YYYY') >= :startDate AND TO_CHAR(trx_porto.tanggal, 'YYYY') <= :endDate`;
    }

    if (issuer !== "all") {
      query += ` AND mst_issuer.id = :issuer `;
    }
    if (custody !== "all") {
      query += ` AND mst_bank_custody.id = :custody `;
    }
    query += ` GROUP BY mst_issuer.nama, mst_issuer.warna, mst_bank_custody.nama ${list_group}
    ORDER BY mst_issuer.nama ASC;`;

    const data = await db.sequelize.query(query, {
      replacements: {
        // list_month: period,
        startDate: startDate,
        endDate: endDate,
        issuer: issuer,
        custody: custody,
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
    let {
      type,
      startDate,
      endDate,
      rangeDate,
      custody,
      issuer,
      kbmi,
      tenor,
      kepemilikan,
      pengelolaan,
    } = req.body;

    // let period = [];
    // for (let mth = 0; mth < rangeDate; mth++) {
    //   if (type === "monthly") {
    //     period.push(moment(startDate).add(mth, "month").format("YYYY-MM"));
    //   } else if (type === "yearly") {
    //     period.push(moment(startDate).add(mth, "year").format("YYYY"));
    //   }
    // }

    let query = ``;
    let queryTable = ``;
    let list_select = "";
    let list_group = "";

    if (type === "monthly") {
      startDate = moment(startDate).startOf("month").format("YYYY-MM");
      endDate = moment(endDate).endOf("month").format("YYYY-MM");
      list_select = `, trx_porto.tanggal as "period"`;
      list_group = ` trx_porto.tanggal`;
    } else if (type === "yearly") {
      startDate = moment(startDate).startOf("year").format("YYYY");
      endDate = moment(endDate).endOf("year").format("YYYY");
      list_select = `, TO_CHAR(trx_porto.tanggal, 'YYYY') as "period"`;
      list_group = ` TO_CHAR(trx_porto.tanggal, 'YYYY')`;
    }

    query = `SELECT 
    SUM(ecl), mst_bank_custody.nama as "nama_custody" ${list_select}
    FROM trx_porto
    JOIN mst_issuer ON trx_porto.mst_issuer_id = mst_issuer.id
    LEFT JOIN mst_kbmi ON trx_porto.mst_kbmi_id = mst_kbmi.id
    LEFT JOIN mst_kepemilikan ON trx_porto.mst_kepemilikan_id = mst_kepemilikan.id
    LEFT JOIN mst_pengelolaan ON trx_porto.mst_pengelolaan_id = mst_pengelolaan.id
    JOIN mst_tenor ON trx_porto.mst_tenor_id = mst_tenor.id
    JOIN mst_bank_custody ON trx_porto.mst_bank_custody_id = mst_bank_custody.id
    WHERE trx_porto.tipe = 'deposito'
    AND mst_tenor.tipe ILIKE '%deposito%'
`;
    queryTable = `
    SELECT mst_issuer.nama as "nama_issuer", mst_kbmi.nama as "nama_kbmi", mst_kepemilikan.nama as "nama_kepemilikan", mst_pengelolaan.nama as "nama_pengelolaan", mst_tenor.nama as "nama_tenor", trx_porto.*, mst_bank_custody.nama as "nama_custody" ${list_select}
    FROM trx_porto
    JOIN mst_issuer ON trx_porto.mst_issuer_id = mst_issuer.id
    LEFT JOIN mst_kbmi ON trx_porto.mst_kbmi_id = mst_kbmi.id
    LEFT JOIN mst_kepemilikan ON trx_porto.mst_kepemilikan_id = mst_kepemilikan.id
    LEFT JOIN mst_pengelolaan ON trx_porto.mst_pengelolaan_id = mst_pengelolaan.id
    JOIN mst_tenor ON trx_porto.mst_tenor_id = mst_tenor.id
    JOIN mst_bank_custody ON trx_porto.mst_bank_custody_id = mst_bank_custody.id
    WHERE trx_porto.tipe = 'deposito'
    AND mst_tenor.tipe ILIKE '%deposito%'
    `;

    if (type === "monthly") {
      query += `AND TO_CHAR(trx_porto.tanggal, 'YYYY-MM') >= :startDate AND TO_CHAR(trx_porto.tanggal, 'YYYY-MM') <= :endDate `;
      queryTable += `AND TO_CHAR(trx_porto.tanggal, 'YYYY-MM') >= :startDate AND TO_CHAR(trx_porto.tanggal, 'YYYY-MM') <= :endDate `;
    } else if (type === "yearly") {
      query += `AND TO_CHAR(trx_porto.tanggal, 'YYYY') >= :startDate AND TO_CHAR(trx_porto.tanggal, 'YYYY') <= :endDate `;
      queryTable += `AND TO_CHAR(trx_porto.tanggal, 'YYYY') >= :startDate AND TO_CHAR(trx_porto.tanggal, 'YYYY') <= :endDate`;
    }

    if (custody !== "all") {
      query += `AND mst_bank_custody.id = :custody `;
      queryTable += `AND mst_bank_custody.id = :custody `;
    }
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
    if (kepemilikan !== "all") {
      query += `AND mst_kepemilikan.id = :kepemilikan `;
      queryTable += `AND mst_kepemilikan.id = :kepemilikan `;
    }
    if (pengelolaan !== "all") {
      query += `AND mst_pengelolaan.id = :pengelolaan `;
      queryTable += `AND mst_pengelolaan.id = :pengelolaan `;
    }
    if (kbmi !== "all") {
      query += `AND mst_kbmi.id = :kbmi `;
      queryTable += `AND mst_kbmi.id = :kbmi `;
    }

    query += ` GROUP BY mst_bank_custody.nama, ${list_group}
    ORDER BY ${list_group} ASC;`;
    queryTable += ` ORDER BY ${list_group};`;

    const replacements = {
      // list_month: period,
      startDate: startDate,
      endDate: endDate,
      issuer: issuer,
      kbmi: kbmi,
      tenor: tenor,
      custody: custody,
      kepemilikan: kepemilikan,
      pengelolaan: pengelolaan,
    };

    const data = await db.sequelize.query(query, {
      replacements: replacements,
      type: db.sequelize.QueryTypes.SELECT,
    });

    const dataTable = await db.sequelize.query(queryTable, {
      replacements: replacements,
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
    let {
      type,
      rangeDate,
      startDate,
      endDate,
      custody,
      issuer,
      tenor,
      kepemilikan,
      pengelolaan,
      kbmi,
    } = req.body;

    // let period = [];
    // for (let mth = 0; mth < rangeDate; mth++) {
    //   if (type === "monthly") {
    //     period.push(moment(startDate).add(mth, "month").format("YYYY-MM"));
    //   } else if (type === "yearly") {
    //     period.push(moment(startDate).add(mth, "year").format("YYYY"));
    //   }
    // }

    let query = ``;
    let queryTable = ``;
    let list_select = "";
    let list_group = "";

    if (type === "monthly") {
      startDate = moment(startDate).startOf("month").format("YYYY-MM");
      endDate = moment(endDate).endOf("month").format("YYYY-MM");
      list_select = `, trx_porto.tanggal as "period"`;
      list_group = ` trx_porto.tanggal`;
    } else if (type === "yearly") {
      startDate = moment(startDate).startOf("year").format("YYYY");
      endDate = moment(endDate).endOf("year").format("YYYY");
      list_select = `, TO_CHAR(trx_porto.tanggal, 'YYYY') as "period"`;
      list_group = ` TO_CHAR(trx_porto.tanggal, 'YYYY')`;
    }

    query = `SELECT 
    SUM(ecl), mst_bank_custody.nama as "nama_custody" ${list_select}
    FROM trx_porto
    JOIN mst_issuer ON trx_porto.mst_issuer_id = mst_issuer.id
    LEFT JOIN mst_kbmi ON trx_porto.mst_kbmi_id = mst_kbmi.id
    LEFT JOIN mst_kepemilikan ON trx_porto.mst_kepemilikan_id = mst_kepemilikan.id
    LEFT JOIN mst_pengelolaan ON trx_porto.mst_pengelolaan_id = mst_pengelolaan.id
    JOIN mst_tenor ON trx_porto.mst_tenor_id = mst_tenor.id
    JOIN mst_bank_custody ON trx_porto.mst_bank_custody_id = mst_bank_custody.id
    WHERE trx_porto.tipe = 'obligasi'
    AND mst_tenor.tipe ILIKE '%obligasi%'
`;
    queryTable = `
    SELECT mst_issuer.nama as "nama_issuer", mst_kbmi.nama as "nama_kbmi", mst_kepemilikan.nama as "nama_kepemilikan", mst_pengelolaan.nama as "nama_pengelolaan", mst_tenor.nama as "nama_tenor", trx_porto.*, mst_bank_custody.nama as "nama_custody" ${list_select}
    FROM trx_porto
    JOIN mst_issuer ON trx_porto.mst_issuer_id = mst_issuer.id
    LEFT JOIN mst_kbmi ON trx_porto.mst_kbmi_id = mst_kbmi.id
    LEFT JOIN mst_kepemilikan ON trx_porto.mst_kepemilikan_id = mst_kepemilikan.id
    LEFT JOIN mst_pengelolaan ON trx_porto.mst_pengelolaan_id = mst_pengelolaan.id
    JOIN mst_tenor ON trx_porto.mst_tenor_id = mst_tenor.id
    JOIN mst_bank_custody ON trx_porto.mst_bank_custody_id = mst_bank_custody.id
    WHERE trx_porto.tipe = 'obligasi'
    AND mst_tenor.tipe ILIKE '%obligasi%'
    `;

    if (type === "monthly") {
      query += `AND TO_CHAR(trx_porto.tanggal, 'YYYY-MM') >= :startDate AND TO_CHAR(trx_porto.tanggal, 'YYYY-MM') <= :endDate `;
      queryTable += `AND TO_CHAR(trx_porto.tanggal, 'YYYY-MM') >= :startDate AND TO_CHAR(trx_porto.tanggal, 'YYYY-MM') <= :endDate `;
    } else if (type === "yearly") {
      query += `AND TO_CHAR(trx_porto.tanggal, 'YYYY') >= :startDate AND TO_CHAR(trx_porto.tanggal, 'YYYY') <= :endDate `;
      queryTable += `AND TO_CHAR(trx_porto.tanggal, 'YYYY') >= :startDate AND TO_CHAR(trx_porto.tanggal, 'YYYY') <= :endDate `;
    }

    if (custody !== "all") {
      query += `AND mst_bank_custody.id = :custody `;
      queryTable += `AND mst_bank_custody.id = :custody `;
    }
    if (issuer !== "all") {
      query += `AND mst_issuer.id = :issuer `;
      queryTable += `AND mst_issuer.id = :issuer `;
    }
    if (tenor !== "all") {
      query += `AND mst_tenor.id = :tenor `;
      queryTable += `AND mst_tenor.id = :tenor `;
    }
    if (kepemilikan !== "all") {
      query += `AND mst_kepemilikan.id = :kepemilikan `;
      queryTable += `AND mst_kepemilikan.id = :kepemilikan `;
    }
    if (pengelolaan !== "all") {
      query += `AND mst_pengelolaan.id = :pengelolaan `;
      queryTable += `AND mst_pengelolaan.id = :pengelolaan `;
    }
    if (kbmi !== "all") {
      query += `AND mst_kbmi.id = :kbmi `;
      queryTable += `AND mst_kbmi.id = :kbmi `;
    }

    query += `GROUP BY mst_bank_custody.nama, ${list_group}
    ORDER BY ${list_group} ASC;`;
    queryTable += `ORDER BY ${list_group};`;

    const replacements = {
      // list_month: period,
      startDate: startDate,
      endDate: endDate,
      issuer: issuer,
      tenor: tenor,
      custody: custody,
      kepemilikan: kepemilikan,
      pengelolaan: pengelolaan,
    };

    const data = await db.sequelize.query(query, {
      replacements: replacements,
      type: db.sequelize.QueryTypes.SELECT,
    });

    const dataTable = await db.sequelize.query(queryTable, {
      replacements: replacements,
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

const comparison = async (req, res) => {
  try {
    let { type, list_date, issuer, custody } = req.body;

    // Validate inputs
    if (list_date === undefined || list_date.length === 0) {
      return res.status(200).json({
        code: 400,
        data: null,
        error: "List date cannot be empty",
      });
    }
    let query = ``;
    let list_select = "";
    let list_group = "";

    if (type === "monthly") {
      list_select = `, trx_porto.tanggal as "period"`;
      list_group = `, trx_porto.tanggal`;
    } else if (type === "yearly") {
      list_select = `, trx_porto.tanggal as "tahun"`;
      list_group = `, trx_porto.tanggal`;
    }

    query = `
      SELECT mst_issuer.nama, SUM(ecl), mst_bank_custody.nama as custody ${list_select}
      FROM trx_porto
      JOIN mst_issuer ON trx_porto.mst_issuer_id = mst_issuer.id
      JOIN mst_bank_custody ON trx_porto.mst_bank_custody_id = mst_bank_custody.id
    `;

    if (type === "monthly") {
      query += ` AND TO_CHAR(trx_porto.tanggal, 'YYYY-MM') IN (:list_date)`;
    } else if (type === "yearly") {
      query += ` AND TO_CHAR(trx_porto.tanggal, 'YYYY') IN (:list_date)`;
    }

    if (issuer !== "all") {
      query += ` AND trx_porto.mst_issuer_id = :issuer`;
    }

    if (custody !== "all") {
      query += ` AND trx_porto.mst_bank_custody_id = :custody`;
    }

    query += `
      GROUP BY mst_issuer.nama, mst_issuer.urutan, mst_bank_custody.nama ${list_group}
      ORDER BY mst_issuer.urutan ASC;
    `;

    const options = {
      replacements: {
        list_date: list_date,
        issuer: issuer,
        custody: custody,
      },
      type: db.Sequelize.QueryTypes.SELECT,
    };

    const data = await db.sequelize.query(query, options);

    return res.status(200).json({
      code: 200,
      data: data,
      error: null,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      code: 500,
      data: null,
      error: error.message || "Some error occurred while retrieving data.",
    });
  }
};

const detail = async (req, res) => {
  try {
    let { start, range, issuer, custody } = req.body;
    // change range to positive
    range = Math.abs(Number(range));

    let list_period = [];
    for (let mth = 0; mth <= range; mth++) {
      // format YYYY-MM
      list_period.push(moment(start).add(mth, "month").format("YYYY-MM"));
    }

    let query = ``;
    query += `
    SELECT trx_porto.*,
    mst_issuer.nama AS issuer_name,
    mst_kepemilikan.nama AS kepemilikan_name,
    mst_pengelolaan.nama AS pengelolaan_name,
    mst_tenor.nama AS tenor_name,
    mst_kbmi.nama AS kbmi_name,
    mst_bank_custody.nama AS custody_name
    FROM trx_porto
    JOIN mst_issuer ON trx_porto.mst_issuer_id = mst_issuer.id
    JOIN mst_kbmi ON trx_porto.mst_kbmi_id = mst_kbmi.id
    JOIN mst_kepemilikan ON trx_porto.mst_kepemilikan_id = mst_kepemilikan.id
    JOIN mst_pengelolaan ON trx_porto.mst_pengelolaan_id = mst_pengelolaan.id
    JOIN mst_tenor ON trx_porto.mst_tenor_id = mst_tenor.id
    JOIN mst_bank_custody ON trx_porto.mst_bank_custody_id = mst_bank_custody.id
    WHERE TO_CHAR(trx_porto.tanggal, 'YYYY-MM') IN (:list_month)
    `;
    if (custody !== "all") {
      query += `AND trx_porto.mst_bank_custody_id = :custody `;
    }

    if (issuer !== "all") {
      query += `AND trx_porto.mst_issuer_id = :issuer `;
    }
    query += `ORDER BY trx_porto.tanggal ASC;`;

    const options = {
      replacements: {
        list_month: list_period,
        issuer: issuer,
        custody: custody,
      },
      type: db.Sequelize.QueryTypes.SELECT,
    };

    const data = await db.sequelize.query(query, options);
    return res.status(200).json({
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
  deposito,
  obligasi,
  comparison,
  detail,
};
