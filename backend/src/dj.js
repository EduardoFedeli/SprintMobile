const oracledb = require("oracledb");
require("dotenv").config();

async function initDB() {
  try {
    return await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      connectionString: process.env.DB_STRING, // Ex: "localhost/XEPDB1"
    });
  } catch (err) {
    console.error("Erro de conexão Oracle:", err);
    throw err;
  }
}

module.exports = { initDB };
