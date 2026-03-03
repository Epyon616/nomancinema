const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.POSTGRES_HOST || "db", // docker service name
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.POSTGRES_PORT || 5432),
});

module.exports = pool;