const express = require("express");
const cors = require("cors");
const app = express();
const port = 3030;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("dotenv").config();
const auth_user = process.env.AUTH_USER;
const auth_pass = process.env.AUTH_PASS;

const basicAuth = require("express-basic-auth");
const getUnauthorizedResponse = (req) => {
  return req.auth
    ? "Credentials " + req.auth.user + ":" + req.auth.password + " rejected"
    : "No credentials provided";
};

// init
const db = require("./app/models");
const dashboardRoutes = require("./app/routes/dashboard.routes");

app.use(
  "/dash",
  basicAuth({
    users: { [auth_user]: auth_pass },
    unauthorizedResponse: getUnauthorizedResponse,
  }),
  dashboardRoutes
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening on PORT: ${port}`);
});
