const { pool } = require('../config/db');

const createUser = async (username, email, password) => {
  const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
  const result = await pool.query(query, [username, email, password]);
  return result.rows[0];  
};

const getUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = $1';
  const result = await pool.query(query, [email]);
  return result.rows[0];  
};

module.exports = { createUser, getUserByEmail };
