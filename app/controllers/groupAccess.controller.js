const db = require("../models");
const groupAccess = db.groupAccess;
const Access = db.access;
const Group = db.group;

const getAll = async (req, res) => {
  try {
    const aut_group_id = req.query.group_id ?? null;

    const ga = await groupAccess.findAll({
      attributes: ["id", "aut_group_id", "aut_access_id"],
      where: { aut_group_id: aut_group_id },
      include: [
        {
          model: Access,
          attributes: ["id", "nama", "path", "icon", "urutan", "urutan_path"],
        },
      ],
    });

    res.status(200).json({
      code: 200,
      data: ga,
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      error: { message: error.message },
      data: null,
    });
  }
};

const add = async (req, res) => {
  try {
    const aut_group_id = req.body.group_id ?? null;
    const aut_access_id = req.body.access_id ?? null;

    const ga = await groupAccess.create({
      aut_group_id: aut_group_id,
      aut_access_id: aut_access_id,
    });

    res.status(200).json({
      code: 200,
      data: ga,
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      error: { message: error.message },
      data: null,
    });
  }
};

const onUpdate = async (req, res) => {
  try {
    const { groupId, treeSlc } = req.body;

    await groupAccess.destroy({
      where: {
        aut_group_id: groupId,
      },
    });

    const insertPromises = treeSlc.map(async (item) => {
      await groupAccess.create({
        aut_group_id: groupId,
        aut_access_id: item,
      });
    });
    await Promise.all(insertPromises);

    const menu = await Access.findAll({
      attributes: ["id", "nama", "path", "icon", "urutan", "urutan_path"],
      where: {
        pid: null,
        id: treeSlc,
      },
    });

    const accList = [];
    for (const row of menu) {
      const children = await Access.findAll({
        attributes: ["id", "nama", "path", "icon", "urutan", "urutan_path"],
        where: {
          pid: row.id,
          id: treeSlc,
        },
        order: ["urutan"],
      });

      const accItem = {
        key: row.path,
        label: row.nama,
        icon: row.icon,
      };

      if (children.length > 0) {
        accItem.children = children.map((child) => {
          return {
            key: child.path,
            label: child.nama,
            icon: child.icon,
          };
        });
      }
      accList.push(accItem);
    }

    await Group.update(
      {
        access_list: accList,
      },
      { where: { id: groupId } }
    );

    res.status(200).json({
      code: 200,
      data: null,
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      error: { message: error.message },
      data: null,
    });
  }
};

module.exports = {
  getAll,
  add,
  onUpdate,
};
