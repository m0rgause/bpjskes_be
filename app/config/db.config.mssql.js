const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "mssql",
  host: "localhost",
  dialectOptions: {
    authentication: {
      type: "default",
      options: {
        userName: "sa",
        password: "934534055qwe",
      },
    },
    options: {
      instanceName: "SQLEXPRESS",
      database: "BPJSKES",
    },
  },
});

module.exports = sequelize;

// const { Sequelize } = require("sequelize");

// Server=localhost\SQLEXPRESS01;Database=master;Trusted_Connection=True;

// const sequelize = new Sequelize("BPJSKES", "sa", "934534055qwe", {
//   dialect: "mssql",
//   host: "localhost",
//   dialectOptions: {
//     options: {
//       instanceName: "SQLEXPRESS",
//       trustedConnection: true,
//     },
//   },
//   logging: false,
// });

// module.exports = sequelize;

// const sql = require("mssql/msnodesqlv8");

// const config = {
//   username: "sa",
//   password: "934534055qwe",
//   database: "BPJSKES",
//   server: "DESKTOP-6E06DJ3\\SQLEXPRESS",
//   driver: "msnodesqlv8",
//   options: {
//     trustedConnection: true,
//   },
// };

// sql
//   .connect(config)
//   .then(() => {
//     console.log("Connection successful");

//     const request = new sql.Request();
//     request.query("SELECT * FROM [BPJSKES].[dbo].[aut_user]", (err, result) => {
//       console.dir(result);
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });
