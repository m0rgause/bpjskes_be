// models/TrxPortoFileData.js
module.exports = (sequelize, Sequelize) => {
  const DataTypes = Sequelize.DataTypes;
  const TrxPortoFileData = sequelize.define(
    "trx_porto_filedata",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      trx_porto_file_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      trx_porto_id: {
        type: DataTypes.UUID,
      },
      mst_issuer_id: {
        type: DataTypes.UUID,
      },
      mst_kbmi_id: {
        type: DataTypes.UUID,
      },
      mst_kepemilikan_id: {
        type: DataTypes.UUID,
      },
      mst_pengelolaan_id: {
        type: DataTypes.UUID,
      },
      mst_tenor_id: {
        type: DataTypes.UUID,
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
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      lgd: {
        type: DataTypes.DOUBLE,
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
      status: {
        type: DataTypes.BOOLEAN,
      },
      note: {
        type: DataTypes.TEXT,
      },
    },
    {
      tableName: "trx_porto_filedata",
      timestamps: false,
    }
  );

  // Define foreign key relationships
  const MstTenor = require("./tenor.model")(sequelize, Sequelize);
  const TrxPorto = require("./trxPorto.model")(sequelize, Sequelize);
  const MstPengelolaan = require("./pengelolaan.model")(sequelize, Sequelize);
  const MstKbmi = require("./kbmi.model")(sequelize, Sequelize);
  const MstKepemilikan = require("./kepemilikan.model")(sequelize, Sequelize);
  const MstIssuer = require("./issuer.model")(sequelize, Sequelize);

  TrxPortoFileData.belongsTo(TrxPorto, { foreignKey: "trx_porto_id" });
  TrxPortoFileData.belongsTo(MstIssuer, { foreignKey: "mst_issuer_id" });
  TrxPortoFileData.belongsTo(MstKbmi, { foreignKey: "mst_kbmi_id" });
  TrxPortoFileData.belongsTo(MstKepemilikan, {
    foreignKey: "mst_kepemilikan_id",
  });
  TrxPortoFileData.belongsTo(MstPengelolaan, {
    foreignKey: "mst_pengelolaan_id",
  });
  TrxPortoFileData.belongsTo(MstTenor, { foreignKey: "mst_tenor_id" });

  return TrxPortoFileData;
};
