const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Make sure the DATABASE_URL is correct in the .env file
});

module.exports = { pool }; // Ensure that you export `pool` correctly.
