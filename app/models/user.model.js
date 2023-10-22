module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = require("sequelize");
  const User = sequelize.define(
    "aut_user",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      aut_group_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      nama: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      is_active: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      auth_uid: {
        type: DataTypes.UUID,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      reset_token: {
        type: DataTypes.TEXT,
      },
      mst_bank_custody_id: {
        type: DataTypes.UUID,
      },
    },
    {
      tableName: "aut_user",
      timestamps: false, // Jika Anda tidak memiliki kolom createdAt dan updatedAt
    }
  );
  const Group = require("./group.model")(sequelize, Sequelize);
  const BankCustody = require("./bank_custody.model")(sequelize, Sequelize);
  User.belongsTo(Group, { foreignKey: "aut_group_id" });
  User.belongsTo(BankCustody, { foreignKey: "mst_bank_custody_id" });
  return User;
};
