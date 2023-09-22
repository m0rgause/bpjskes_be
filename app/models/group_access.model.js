module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = require("sequelize");
  const GroupAccess = sequelize.define(
    "aut_group_access",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      aut_group_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      aut_access_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      tableName: "aut_group_access",
      timestamps: false, // Jika Anda tidak memiliki kolom createdAt dan updatedAt
    }
  );
  const Group = require("./group.model")(sequelize, Sequelize);
  const Access = require("./access.model")(sequelize, Sequelize);
  GroupAccess.belongsTo(Group, { foreignKey: "aut_group_id" });
  GroupAccess.belongsTo(Access, { foreignKey: "aut_access_id" });
  return GroupAccess;
};
