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
      list_period.push(moment(start).add(mth, "month").format("YYYY-MM-DD"));
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

    res.send({ code: 200, data: data, error: null });
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
};
