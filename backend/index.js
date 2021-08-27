const port = 3000
const express = require("express");
const app = require("express")();
const consign = require("consign");
const { knex, knex2 } = require("./config/db");

app.db_my = knex;
app.db_pg = knex2

consign()
  .include("./config/passport.js")
  .then("./config/middlewares.js")
  .then("./api")
  .then("./config/routes.js")
  .into(app);

app.listen(port, () => {
  console.log(`Backend executando na porta ${port}...`);
});