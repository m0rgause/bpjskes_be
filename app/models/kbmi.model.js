// models/MstKbmi.js
module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = require("sequelize");
  const MstKbmi = sequelize.define(
    "mst_kbmi",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      kode: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      nama: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      urutan: {
        type: DataTypes.SMALLINT,
      },
    },
    {
      tableName: "mst_kbmi",
      timestamps: false, // If you don't have createdAt and updatedAt columns
    }
  );

  return MstKbmi;
};
