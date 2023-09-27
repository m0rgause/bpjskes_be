// models/MstRating.js
module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = require("sequelize");
  const MstRating = sequelize.define(
    "mst_rating",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      nama: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      pd: {
        type: DataTypes.REAL,
        allowNull: false,
      },
      urutan: {
        type: DataTypes.SMALLINT,
      },
    },
    {
      tableName: "mst_rating",
      timestamps: false, // If you don't have createdAt and updatedAt columns
    }
  );

  return MstRating;
};
