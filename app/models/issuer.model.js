// models/MstIssuer.js
module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = require("sequelize");
  const MstIssuer = sequelize.define(
    "mst_issuer",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      mst_rating_id: {
        type: DataTypes.UUID,
        allowNull: false,
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
      lgd: {
        type: DataTypes.REAL,
      },
      urutan: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      pd: {
        type: DataTypes.FLOAT,
      },
    },
    {
      tableName: "mst_issuer",
      timestamps: false, // If you don't have createdAt and updatedAt columns
    }
  );

  // Define foreign key relationship
  const MstRating = require("./rating.model.js")(sequelize, Sequelize);

  MstIssuer.belongsTo(MstRating, { foreignKey: "mst_rating_id" });

  return MstIssuer;
};
