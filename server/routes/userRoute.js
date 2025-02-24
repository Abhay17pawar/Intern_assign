const express = require('express');
const { addUser, getUsers } = require('../controllers/userController'); 

const router = express.Router();

router.post('/add', addUser);
router.get('/all', getUsers);

module.exports = router;
