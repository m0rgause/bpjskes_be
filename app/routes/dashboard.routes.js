const express = require("express");
const app = express();
// routes
const accessRoutes = require("./access.routes");
const groupRoutes = require("./group.routes");
const groupAccessRoutes = require("./group_access.routes");
const userRoutes = require("./user.routes");
const twrrCoaRoutes = require("./twrr_coa.routes");

app.use("/access", accessRoutes);
app.use("/group", groupRoutes);
app.use("/group_access", groupAccessRoutes);
app.use("/user", userRoutes);
app.use("/twrr_coa", twrrCoaRoutes);

module.exports = app;
