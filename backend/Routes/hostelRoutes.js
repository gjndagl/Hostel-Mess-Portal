const express = require('express');
const router = express.Router();
const { createHostel, updateHostel, showHostels, allChats, insertChat } = require ('../controllers/hostelController')
const { isAuthenticated,isAdmin } = require('../middleware/auth')

router.post('/hostel/create',isAuthenticated,isAdmin,createHostel);
router.put('/hostel/update/:hostel_id',isAuthenticated,isAdmin,updateHostel);
router.get('/hostels/show',showHostels);
router.post('/hostels/chats/insertChat',isAuthenticated,insertChat);
router.get('/hostels/chats/allChats',isAuthenticated,allChats);


module.exports = router;
