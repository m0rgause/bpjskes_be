// models/TrxTwrrFileData.js
module.exports = (sequelize, Sequelize) => {
  const DataTypes = Sequelize.DataTypes;
  const TrxTwrrFileData = sequelize.define(
    "trx_twrr_filedata",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      trx_twrr_file_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      trx_twrr_id: {
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
    },
    {
      tableName: "trx_twrr_filedata",
      timestamps: false,
    }
  );

  // Define foreign key relationships
  const TrxTwrrFile = require("./trxTwrrFile.model")(sequelize, Sequelize);
  const TrxTwrr = require("./trxTwrr.model")(sequelize, Sequelize);

  TrxTwrrFileData.belongsTo(TrxTwrrFile, { foreignKey: "trx_twrr_file_id" });
  TrxTwrrFileData.belongsTo(TrxTwrr, { foreignKey: "trx_twrr_id" });

  return TrxTwrrFileData;
};
