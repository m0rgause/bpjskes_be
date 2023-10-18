// models/MstBankCustody.js
module.exports = (sequelize, Sequelize) => {
  const DataTypes = Sequelize.DataTypes;
  const MstBankCustody = sequelize.define(
    "mst_bank_custody",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      nama: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      urutan: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
    },
    {
      tableName: "mst_bank_custody",
      timestamps: false,
    }
  );

  return MstBankCustody;
};
