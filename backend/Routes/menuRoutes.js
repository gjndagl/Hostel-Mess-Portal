const express = require("express");
const { isAdmin, isAuthenticated } = require("../middleware/auth");
const router = express.Router();

router.post('/menu/:hostelId',isAdmin,isAuthenticated,createMenu);
router.delete('/menu/:id',isAdmin,isAuthenticated,deleteMenu);
router.put('/menu/:id',isAdmin,isAuthenticated,updateMenu);
router.get('/menu/hostel/:hostelId',isAdmin,isAuthenticated,allMenus);

module.exports = router;