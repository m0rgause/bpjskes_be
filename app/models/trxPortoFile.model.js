// models/TrxPortoFile.js
module.exports = (sequelize, Sequelize) => {
  const DataTypes = Sequelize.DataTypes;
  const TrxPortoFile = sequelize.define(
    "trx_porto_file",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      file_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "trx_porto_file",
      timestamps: false, // If you don't have createdAt and updatedAt columns
    }
  );

  return TrxPortoFile;
};
