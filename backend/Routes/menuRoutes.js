const express = require("express");
const { isAdmin, isAuthenticated } = require("../middleware/auth");
const { deleteMenu, createAndUpdateMenu }=require('../controllers/menuController')
const router = express.Router();

router.post('/menu/:hostelId',isAuthenticated,isAdmin,createAndUpdateMenu);
router.delete('/menu/delete/:hostelId/:dayId',isAuthenticated,isAdmin,deleteMenu);

module.exports = router;