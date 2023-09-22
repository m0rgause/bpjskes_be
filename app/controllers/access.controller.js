const db = require("../models");
const Access = db.access;
const { QueryTypes, Op } = require("sequelize");
const sequelize = db.sequelize;

const getAll = async (req, res) => {
  try {
    const title = req.query.title === "" ? null : req.query.title;
    const pid = req.query.pid ?? null;
    const id = req.params.id ?? [];
    console.log(id);
    // pid can be 1 or like this 1d3881de-29d1-4e97-a9fb-fd7aa058d974

    let query = ` select id, nama AS title, icon, path AS url, length(urutan_path)-2 AS pos, REPLACE(urutan_path, ',', '-') as urutan_path from aut_access `;

    if (title) {
      query += ` where nama ilike '%${title}%' `;
    }

    if (pid === 1 || pid === "1") {
      query += ` where pid is null`;
    } else if (pid !== null) {
      query += ` where pid = '${pid}' `;
    }

    query += ` order by urutan_path; `;

    const access = await db.sequelize.query(query, {
      type: QueryTypes.SELECT,
    });

    if (!access) {
      return res.status(404).json({
        code: 404,
        message: "Not Found",
      });
    }
    res.status(200).json({
      code: 200,
      message: "Success",
      result: access,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      error: { message: error.message },
    });
  }
};

const getOne = async (req, res) => {
  try {
    let id = req.params.id ?? null;
    if (!id) {
      return res.status(400).json({
        code: 400,
        message: "Bad Request",
      });
    }
    let options = {
      attributes: ["pid", "nama", "path", "icon", "urutan", "urutan_path"],
      where: { id: id },
    };
    const access = await Access.findOne(options);
    if (!access) {
      return res.status(404).json({
        code: 404,
        message: "Not Found",
      });
    }
    res.status(200).json({
      code: 200,
      message: "Success",
      result: access,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      error: { message: error.message },
    });
  }
};

const add = async (req, res) => {
  try {
    let { urutan, pid, nama, path, icon } = req.body;

    // Tentukan kondisi berdasarkan nilai pid
    const isPidNull = pid === "0" ? null : pid;

    // Hitung jumlah data dengan pid dan urutan yang sama
    const count = await Access.count({
      where: { pid: isPidNull, urutan },
    });

    if (count) {
      return res.status(400).json({
        code: 400,
        error: { message: "Bad Request" },
        data: null,
      });
    }

    // Temukan parent jika pid tidak null
    let urutan_path = urutan;
    if (isPidNull !== null) {
      const parent = await Access.findOne({ where: { id: isPidNull } });
      urutan_path = parent.urutan_path + "-" + urutan;
    }

    // Buat entitas Access
    const result = await Access.create({
      pid: isPidNull,
      nama,
      path,
      icon,
      urutan,
      urutan_path,
    });

    if (!result) {
      return res.status(400).json({
        code: 400,
        error: { message: "Bad Request" },
        data: null,
      });
    } else {
      return res.status(200).json({
        code: 200,
        error: null,
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      code: 500,
      error: { message: error.message },
    });
  }
};

const update = async (req, res) => {
  try {
    const { id, urutan, pid, nama, path, icon } = req.body;

    const dataOld = await Access.findOne({ where: { id } });

    // Cek jika perubahan memengaruhi urutan atau parent
    if (dataOld.pid !== pid || dataOld.urutan !== urutan) {
      const count = await Access.count({
        where: {
          pid: pid === 0 || pid === "0" ? null : pid,
          urutan,
        },
      });

      if (count > 0) {
        return res.status(400).json({
          code: 400,
          message: "Bad Request",
        });
      }
    }

    const transaction = await sequelize.transaction();

    try {
      // Update data utama
      await Access.update(
        {
          nama,
          path,
          icon,
        },
        { where: { id }, transaction }
      );

      // Update urutan dan urutan_path jika diperlukan
      if (dataOld.urutan !== urutan) {
        let urutan_path = urutan;
        if (pid !== 0 && pid !== "0") {
          const parent = await Access.findOne({ where: { id: pid } });
          urutan_path = parent.urutan_path + "-" + urutan;
        }

        await Access.update(
          {
            pid: pid || null,
            urutan,
            urutan_path,
          },
          { where: { id }, transaction }
        );

        // Update urutan_path untuk child nodes
        const child = await Access.findAll({ where: { pid: id }, transaction });
        if (child) {
          for (const item of child) {
            await Access.update(
              {
                urutan_path: urutan_path + "-" + item.urutan,
              },
              { where: { id: item.id }, transaction }
            );
          }
        }
      }

      await transaction.commit();

      return res.status(200).json({
        code: 200,
        message: "Success",
      });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    res.status(500).json({
      code: 500,
      error: { message: error.message },
    });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const dataOld = await Access.findOne({ where: { id } });
    const transaction = await sequelize.transaction();

    try {
      // Delete data utama
      await Access.destroy({ where: { id }, transaction });

      // Update urutan_path untuk child nodes
      const child = await Access.findAll({ where: { pid: id }, transaction });
      if (child) {
        for (const item of child) {
          await Access.update(
            {
              urutan_path: dataOld.urutan_path + "-" + item.urutan,
            },
            { where: { id: item.id }, transaction }
          );
        }
      }
      await transaction.commit();

      return res.status(200).json({
        code: 200,
        message: "Success",
      });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    res.status(500).json({
      code: 500,
      error: { message: error.message },
    });
  }
};

module.exports = {
  getAll,
  getOne,
  add,
  update,
  remove,
};
