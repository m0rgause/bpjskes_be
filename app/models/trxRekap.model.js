// models/TrxRekap.js
module.exports = (sequelize, Sequelize) => {
  const DataTypes = Sequelize.DataTypes;
  const TrxRekap = sequelize.define(
    "trx_rekap",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      trx_porto_id: {
        type: DataTypes.UUID,
      },
      trx_twrr_id: {
        type: DataTypes.UUID,
      },
      tipe: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
      tahun: {
        type: DataTypes.STRING(4),
        allowNull: false,
      },
      bulan: {
        type: DataTypes.STRING(2),
        allowNull: false,
      },
      end_year: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      subtipe: {
        type: DataTypes.STRING,
      },
      period: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "trx_rekap",
      timestamps: false, // If you don't have createdAt and updatedAt columns
    }
  );

  // Define foreign key relationships if needed
  const TrxPorto = require("./trxPorto.model")(sequelize, Sequelize); // Adjust this to the correct model and path
  const TrxTwrr = require("./trxTwrr.model")(sequelize, Sequelize);

  TrxRekap.belongsTo(TrxPorto, { foreignKey: "trx_porto_id" });
  TrxRekap.belongsTo(TrxTwrr, { foreignKey: "trx_twrr_id" });

  return TrxRekap;
};
