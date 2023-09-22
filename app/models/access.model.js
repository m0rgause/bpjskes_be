module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = require("sequelize");
  const Access = sequelize.define(
    "aut_access",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      pid: {
        type: DataTypes.STRING(36),
      },
      nama: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      path: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      icon: {
        type: DataTypes.STRING(25),
      },
      urutan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      urutan_path: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
    },
    {
      tableName: "aut_access",
      timestamps: false, // Jika Anda tidak memiliki kolom createdAt dan updatedAt
    }
  );
  return Access;
};
