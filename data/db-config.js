const knex = require("knex");
const knexfile = require("../knexfile");
const db_env = process.env.DB_ENV || "development";

module.exports = knex(knexfile[db_env]);
