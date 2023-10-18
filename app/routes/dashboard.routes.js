const express = require("express");
const app = express();

app.use("/access", require("./access.routes"));
app.use("/group", require("./group.routes"));
app.use("/group_access", require("./group_access.routes"));
app.use("/user", require("./user.routes"));
app.use("/twrr_coa", require("./twrr_coa.routes"));
app.use("/issuer", require("./issuer.routes"));
app.use("/rating", require("./rating.routes"));
app.use("/master", require("./master.routes"));
app.use("/twrr", require("./dashboard/twrr.routes"));
app.use("/ckpn", require("./dashboard/ckpn.routes"));
app.use("/porto", require("./dashboard/porto.routes"));
app.use("/custody", require("./custody.routes"));

module.exports = app;
