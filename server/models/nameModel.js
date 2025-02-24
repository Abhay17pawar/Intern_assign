const { pool } = require('../config/db');  

const createUser = async (name, type) => {
  try {
    const result = await pool.query(
      "INSERT INTO public.user_profile (name, type) VALUES ($1, $2) RETURNING *",
      [name, type]
    );
    return result.rows[0];  
  } catch (error) {
    throw error;
  }
};

const getAllUsers = async () => {
  try {
    const result = await pool.query("SELECT * FROM public.user_profile");
    return result.rows;  
  } catch (error) {
    throw error;
  }
};

module.exports = { createUser, getAllUsers };
