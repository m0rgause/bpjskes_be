const express = require("express");
const cors = require("cors");
const app = express();
const port = 3030;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ extended: true, limit: "50mb", parameterLimit: 50000 })
);

// avoid brute force
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // minutes
	limit: 10, // Limit requests per `window`
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
})
app.use("/dash/user/signin", limiter)
app.use("/dash/user/resetpassword", limiter)
app.use("/dash/user/changepassword", limiter)
app.use("/dash/user/changepassword2", limiter)
// end avoid brute force

require("dotenv").config();
const auth_user = process.env.AUTH_USER;
const auth_pass = process.env.AUTH_PASS;

// const basicAuth = require("express-basic-auth");
// const getUnauthorizedResponse = (req) => {
//   return req.auth
//     ? "Credentials " + req.auth.user + ":" + req.auth.password + " rejected"
//     : "No credentials provided";
// };

// init
const db = require("./app/models");
const dashboardRoutes = require("./app/routes/dashboard.routes");

app.use(
  "/dash",
  dashboardRoutes
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening on PORT: ${port}`);
});
