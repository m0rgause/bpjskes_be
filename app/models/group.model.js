module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = require("sequelize");
  const Group = sequelize.define(
    "aut_group",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      nama: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      landing: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      access_list: {
        type: DataTypes.JSON,
      },
    },
    {
      tableName: "aut_group",
      timestamps: false, // Jika Anda tidak memiliki kolom createdAt dan updatedAt
    }
  );
  return Group;
};
