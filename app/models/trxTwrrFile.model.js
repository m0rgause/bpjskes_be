// models/TrxTwrrFile.js
module.exports = (sequelize, DataTypes) => {
  const TrxTwrrFile = sequelize.define(
    "trx_twrr_file",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
      aut_user_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
    },
    {
      tableName: "trx_twrr_file",
      timestamps: false, // If you don't have createdAt and updatedAt columns
    }
  );

  TrxTwrrFile.associate = (models) => {
    TrxTwrrFile.belongsTo(models.aut_user, {
      foreignKey: "aut_user_id",
      as: "aut_user",
    });
  };

  return TrxTwrrFile;
};
