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
db.pengelolaan = require("./pengelolaan.model")(config, Sequelize);
db.kepemilikan = require("./kepemilikan.model")(config, Sequelize);
db.kbmi = require("./kbmi.model")(config, Sequelize);
db.trxTwrrFile = require("./trxTwrrFile.model")(config, Sequelize);
db.trxTwrr = require("./trxTwrr.model.js")(config, Sequelize);
db.trxPorto = require("./trxPorto.model.js")(config, Sequelize);
db.trxPortoFile = require("./trxPortoFile.model.js")(config, Sequelize);
db.trxRekap = require("./trxRekap.model.js")(config, Sequelize);
db.trxPortoFileData = require("./trxPortoFileData.model.js")(config, Sequelize);
db.trxTwrrFileData = require("./trxTwrrFileData.model.js")(config, Sequelize);

module.exports = db;
