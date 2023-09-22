const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const db = {};

db.Sequelize = Sequelize;
db.sequelize = config;

db.user = require("./user.model")(config, Sequelize);
db.group = require("./group.model")(config, Sequelize);
db.access = require("./access.model")(config, Sequelize);
db.groupAccess = require("./group_access.model")(config, Sequelize);

module.exports = db;
