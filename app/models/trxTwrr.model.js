// models/TrxTwrr.js
module.exports = (sequelize, Sequelize) => {
  const DataTypes = Sequelize.DataTypes;
  const TrxTwrr = sequelize.define(
    "trx_twrr",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      trx_twrr_file_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      tanggal: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      adjustment_cf: {
        type: DataTypes.NUMERIC,
        allowNull: false,
      },
      as1: {
        type: DataTypes.NUMERIC,
        allowNull: false,
      },
      as2: {
        type: DataTypes.NUMERIC,
        allowNull: false,
      },
      as3: {
        type: DataTypes.NUMERIC,
        allowNull: false,
      },
      as4: {
        type: DataTypes.NUMERIC,
        allowNull: false,
      },
      as5: {
        type: DataTypes.NUMERIC,
        allowNull: false,
      },
      as6: {
        type: DataTypes.NUMERIC,
      },
      as7: {
        type: DataTypes.NUMERIC,
      },
      as8: {
        type: DataTypes.NUMERIC,
      },
      as9: {
        type: DataTypes.NUMERIC,
      },
      as10: {
        type: DataTypes.NUMERIC,
      },
      li1: {
        type: DataTypes.NUMERIC,
        allowNull: false,
      },
      li2: {
        type: DataTypes.NUMERIC,
        allowNull: false,
      },
      li3: {
        type: DataTypes.NUMERIC,
        allowNull: false,
      },
      li4: {
        type: DataTypes.NUMERIC,
        allowNull: false,
      },
      li5: {
        type: DataTypes.NUMERIC,
        allowNull: false,
      },
      li6: {
        type: DataTypes.NUMERIC,
      },
      li7: {
        type: DataTypes.NUMERIC,
      },
      li8: {
        type: DataTypes.NUMERIC,
      },
      li9: {
        type: DataTypes.NUMERIC,
      },
      li10: {
        type: DataTypes.NUMERIC,
      },
      total_before_cash: {
        type: DataTypes.NUMERIC,
        allowNull: false,
      },
      total_after_cash: {
        type: DataTypes.NUMERIC,
        allowNull: false,
      },
      return_harian: {
        type: DataTypes.REAL,
        allowNull: false,
      },
      return_akumulasi: {
        type: DataTypes.REAL,
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
      tableName: "trx_twrr",
      timestamps: false, // If you don't have createdAt and updatedAt columns
    }
  );

  // Define foreign key relationship
  const TrxTwrrFile = require("./trxTwrrFile.model")(sequelize, Sequelize); // Adjust this to the correct model and path
  TrxTwrr.belongsTo(TrxTwrrFile, { foreignKey: "trx_twrr_file_id" });

  return TrxTwrr;
};
