const express = require('express');
const router = express.Router();
const { createHostel, updateHostel, showHostels } = require ('../controllers/hostelController')
const { isAuthenticated,isAdmin } = require('../middleware/auth')

router.post('/hostel/create',isAuthenticated,isAdmin,createHostel);
router.put('/hostel/update/:hostel_id',isAuthenticated,isAdmin,updateHostel);
router.get('/hostels/show',showHostels);


module.exports = router;
