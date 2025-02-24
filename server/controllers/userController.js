const { createUser, getAllUsers } = require('../models/nameModel');

// Controller to add a user
const addUser = async (req, res) => {
  const { name, type } = req.body;  // Get name and type from request body

  // Basic validation
  if (!name || !type) {
    return res.status(400).json({ message: 'Name and type are required' });
  }

  // Check if the type is valid
  const validTypes = ['father', 'mother', 'child', 'teacher'];
  if (!validTypes.includes(type)) {
    return res.status(400).json({ message: 'Invalid type. Must be one of: father, mother, child, teacher' });
  }

  try {
    // Create the user in the database
    const newUser = await createUser(name, type);

    res.status(201).json({ message: 'User added successfully', user: newUser });
  } catch (error) {
    // Log the error message (avoid logging the entire error object)
    console.error('Error adding user:', error.message || error);

    res.status(500).json({ message: 'Error adding user' });
  }
};

// Controller to get all users
const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();  // Corrected function name
    res.status(200).json({ users });
  } catch (error) {
    // Log the error message (avoid logging the entire error object)
    console.error('Error fetching users:', error.message || error);

    res.status(500).json({ message: 'Error fetching users' });
  }
};

module.exports = { addUser, getUsers };
