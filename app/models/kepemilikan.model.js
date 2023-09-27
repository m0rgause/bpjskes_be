// models/MstKepemilikan.js
module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = require("sequelize");
  const MstKepemilikan = sequelize.define(
    "mst_kepemilikan",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      kode: {
        type: DataTypes.STRING,
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
      tableName: "mst_kepemilikan",
      timestamps: false, // If you don't have createdAt and updatedAt columns
    }
  );

  return MstKepemilikan;
};
