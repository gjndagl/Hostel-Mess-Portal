const express = require("express");
const { isAdmin, isAuthenticated } = require("../middleware/auth");
const { createMenu, deleteMenu, updateMenu }=require('../controllers/menuController')
const router = express.Router();

router.post('/menu/:hostelId',isAuthenticated,isAdmin,createMenu);
router.delete('/menu/:hostelId/:day',isAuthenticated,isAdmin,deleteMenu);
router.put('/menu/:hostelId',isAuthenticated,isAdmin,updateMenu);

module.exports = router;