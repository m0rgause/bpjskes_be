const express = require("express");
const app = express();

const verifyToken = require("../middleware/verifyToken");

app.use("/access", verifyToken, require("./access.routes"));
app.use("/group", verifyToken,require("./group.routes"));
app.use("/group_access", verifyToken,require("./group_access.routes"));
app.use("/user",require("./user.routes"));
app.use("/twrr_coa", verifyToken,require("./twrr_coa.routes"));
app.use("/issuer", verifyToken,require("./issuer.routes"));
app.use("/rating", verifyToken,require("./rating.routes"));
app.use("/master", verifyToken,require("./master.routes"));
app.use("/twrr", verifyToken,require("./dashboard/twrr.routes"));
app.use("/ckpn", verifyToken,require("./dashboard/ckpn.routes"));
app.use("/porto", verifyToken,require("./dashboard/porto.routes"));
app.use("/custody", verifyToken,require("./custody.routes"));
app.use("/notification",verifyToken, require("./notification.routes"));

module.exports = app;
