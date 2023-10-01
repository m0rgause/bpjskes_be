// models/TrxPorto.js
module.exports = (sequelize, Sequelize) => {
  const DataTypes = Sequelize.DataTypes;
  const TrxPorto = sequelize.define(
    "trx_porto",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      trx_porto_file_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      mst_issuer_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      mst_kbmi_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      mst_kepemilikan_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      mst_pengelolaan_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      mst_tenor_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      tipe: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
      unique_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      no_security: {
        type: DataTypes.STRING(255),
      },
      start_date: {
        type: DataTypes.DATEONLY,
      },
      end_date: {
        type: DataTypes.DATEONLY,
      },
      interest_date: {
        type: DataTypes.DATEONLY,
      },
      nominal: {
        type: DataTypes.NUMERIC,
        allowNull: false,
      },
      sisa_tenor: {
        type: DataTypes.NUMERIC,
        allowNull: false,
      },
      rate: {
        type: DataTypes.REAL,
        allowNull: false,
      },
      pd: {
        type: DataTypes.REAL,
        allowNull: false,
      },
      lgd: {
        type: DataTypes.REAL,
        allowNull: false,
      },
      ecl: {
        type: DataTypes.NUMERIC,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "trx_porto",
      timestamps: false, // If you don't have createdAt and updatedAt columns
    }
  );

  // Define foreign key relationships
  const MstTenor = require("./tenor.model")(sequelize, Sequelize); // Adjust this to the correct model and path
  const TrxPortoFile = require("./trxPortoFile.model")(sequelize, Sequelize); // Adjust this to the correct model and path
  const MstPengelolaan = require("./pengelolaan.model")(sequelize, Sequelize); // Adjust this to the correct model and path
  const MstKbmi = require("./kbmi.model")(sequelize, Sequelize); // Adjust this to the correct model and path
  const MstKepemilikan = require("./kepemilikan.model")(sequelize, Sequelize); // Adjust this to the correct model and path
  const MstIssuer = require("./issuer.model")(sequelize, Sequelize); // Adjust this to the correct model and path

  TrxPorto.belongsTo(MstTenor, { foreignKey: "mst_tenor_id" });
  TrxPorto.belongsTo(TrxPortoFile, { foreignKey: "trx_porto_file_id" });
  TrxPorto.belongsTo(MstPengelolaan, { foreignKey: "mst_pengelolaan_id" });
  TrxPorto.belongsTo(MstKbmi, { foreignKey: "mst_kbmi_id" });
  TrxPorto.belongsTo(MstKepemilikan, { foreignKey: "mst_kepemilikan_id" });
  TrxPorto.belongsTo(MstIssuer, { foreignKey: "mst_issuer_id" });

  return TrxPorto;
};
