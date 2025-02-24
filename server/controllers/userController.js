const { createUser, getAllUsers } = require('../models/nameModel');

const addUser = async (req, res) => {
  const { name, type } = req.body;  

  if (!name || !type) {
    return res.status(400).json({ message: 'Name and type are required' });
  }

  const validTypes = ['father', 'mother', 'child', 'teacher'];
  if (!validTypes.includes(type)) {
    return res.status(400).json({ message: 'Invalid type. Must be one of: father, mother, child, teacher' });
  }

  try {
    const newUser = await createUser(name, type);

    res.status(201).json({ message: 'User added successfully', user: newUser });
  } catch (error) {
    console.error('Error adding user:', error.message || error);

    res.status(500).json({ message: 'Error adding user' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();  
    res.status(200).json({ users });
  } catch (error) {
    console.error('Error fetching users:', error.message || error);

    res.status(500).json({ message: 'Error fetching users' });
  }
};

module.exports = { addUser, getUsers };
