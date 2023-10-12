// models/MstTwrrCoa.js
module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = require("sequelize");
  const TwrrCoa = sequelize.define(
    "mst_twrr_coa",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      tipe: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kolom: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
      label: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      urutan: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      tampil: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      kolom_xls: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "mst_twrr_coa",
      timestamps: false, // If you don't have createdAt and updatedAt columns
    }
  );

  return TwrrCoa;
};
