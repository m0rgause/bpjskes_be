module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = require("sequelize");

  const Tenor = sequelize.define(
    "mst_tenor",
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
      tipe: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
    },
    {
      tableName: "mst_tenor",
      timestamps: false, // If you don't have createdAt and updatedAt columns
    }
  );

  return Tenor;
};
