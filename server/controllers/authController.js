const bcrypt = require('bcryptjs');
const { createUser, getUserByEmail } = require('../models/userModel');
const jwt = require("jsonwebtoken");

// User Registration Controller
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Basic Validation
  if (!username || !email || !password ) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user in the database
    const newUser = await createUser(username, email, hashedPassword);

    // Respond with the new user's details
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
  
    try {
      // Retrieve the user from the database by email
      const user = await getUserByEmail(email);
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      // Compare the entered password with the stored hashed password
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: 'Invalid password' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
  
      // Send the token in the response
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Error logging in' });
    }
  };

module.exports = { registerUser, loginUser };
