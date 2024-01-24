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
      tanggal: {
        type: DataTypes.DATEONLY,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      aut_user_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
    },
    {
      tableName: "trx_porto_file",
      timestamps: false, // If you don't have createdAt and updatedAt columns
    }
  );

  TrxPortoFile.associate = (models) => {
    TrxPortoFile.belongsTo(models.aut_user, {
      foreignKey: "aut_user_id",
      as: "aut_user",
    });
  };

  return TrxPortoFile;
};
