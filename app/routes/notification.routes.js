const db = require("../models");
const router = require("express").Router();
const moment = require("moment");

router.post("/", async (req, res) => {
  try {
    const { type, range, issuer, custody } = req.body;
    let end_date = moment().add(range, type);
    if (type === "days") {
      end_date = moment().add(range, type).endOf("day").format("YYYY-MM-DD");
    } else if (type === "months") {
      end_date = moment().add(range, type).endOf("month").format("YYYY-MM");
    } else if (type === "years") {
      end_date = moment().add(range, type).endOf("year").format("YYYY");
    }

    let query = `
        SELECT trx_porto.*, mst_issuer.nama AS issuer, mst_kbmi.nama AS kbmi, mst_tenor.nama AS tenor, mst_pengelolaan.nama AS pengelolaan, mst_kepemilikan.nama AS kepemilikan, mst_bank_custody.nama AS custody
        FROM trx_porto
        JOIN mst_issuer ON mst_issuer.id = trx_porto.mst_issuer_id
        LEFT JOIN mst_kbmi ON mst_kbmi.id = trx_porto.mst_kbmi_id
        JOIN mst_tenor ON mst_tenor.id = trx_porto.mst_tenor_id
        JOIN mst_pengelolaan ON mst_pengelolaan.id = trx_porto.mst_pengelolaan_id
        LEFT JOIN mst_kepemilikan ON mst_kepemilikan.id = trx_porto.mst_kepemilikan_id
        JOIN mst_bank_custody ON mst_bank_custody.id = trx_porto.mst_bank_custody_id
        WHERE trx_porto.end_date::text ILIKE '%${end_date}%'
    `;
    if (issuer !== "all") {
      query += ` AND mst_issuer.id = :issuer`;
    }
    if (custody !== "all") {
      query += ` AND mst_bank_custody.id = :custody`;
    }
    query += ` ORDER BY trx_porto.end_date ASC`;

    const porto = await db.sequelize.query(query, {
      replacements: { end_date, issuer, custody },
      type: db.sequelize.QueryTypes.SELECT,
    });

    res.status(200).json({
      code: 200,
      data: porto,
      error: null,
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      error: { message: err.message },
      data: null,
    });
  }
});

module.exports = router;
