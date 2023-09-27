const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("postgres", "postgres", "Bismillah@17081945", {
  host: "db.cwuwaralndefszmwvgvx.supabase.co",
  dialect: "postgres",
  operatorsAliases: 0,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000, // 30 seconds
    idle: 10000, // 10 seconds
  },
  logging: false,
});

module.exports = sequelize;
