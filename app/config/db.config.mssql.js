const { Sequelize } = require("sequelize");

// Server=192.168.1.100\SQLEXPRESS,1433;Database=MyDatabase;User ID=MyUser;Password=MyPassword
const sequelize = new Sequelize({
  dialect: "mssql",
  host: "localhost",
  dialectOptions: {
    authentication: {
      type: "default",
      options: {
        userName: "sa",
        password: "93534055qwe",
      },
    },
    options: {
      instanceName: "SQLEXPRESS",
      trustedConnection: true,
      database: "BPJSKES",
    },
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000, // 30 seconds
    idle: 10000, // 10 seconds
  },
  logging: false,
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
