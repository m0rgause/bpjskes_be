const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const db = {};

db.Sequelize = Sequelize;
db.sequelize = config;

db.user = require("./user.model")(config, Sequelize);
db.group = require("./group.model")(config, Sequelize);
db.access = require("./access.model")(config, Sequelize);
db.groupAccess = require("./group_access.model")(config, Sequelize);
db.twrrCoa = require("./twrr_coa.model")(config, Sequelize);
db.tenor = require("./tenor.model")(config, Sequelize);
db.rating = require("./rating.model")(config, Sequelize);
db.issuer = require("./issuer.model")(config, Sequelize);
db.pengeloalaan = require("./pengelolaan.model")(config, Sequelize);
db.kepemilikan = require("./kepemilikan.model")(config, Sequelize);
db.kbmi = require("./kbmi.model")(config, Sequelize);

module.exports = db;
