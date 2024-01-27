const express = require("express");
const { isAdmin, isAuthenticated } = require("../middleware/auth");
const { createMenu, deleteMenu, updateMenu }=require('../controllers/menuController')
const router = express.Router();

router.post('/menu/:hostelId',isAdmin,isAuthenticated,createMenu);
router.delete('/menu/:hostelId/:day',isAdmin,isAuthenticated,deleteMenu);
router.put('/menu/:hostelId',isAdmin,isAuthenticated,updateMenu);

module.exports = router;