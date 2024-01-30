const express = require("express");
const router = express.Router();
const { signup, signin, logout, userProfile,creditMoney } = require ('../controllers/authController')
const { isAuthenticated,isAdmin } = require('../middleware/auth')


router.post('/signup',signup);

router.post('/signin',signin);

router.get('/logout',logout);

router.get('/me',isAuthenticated,userProfile);

router.post('/credit',isAuthenticated,creditMoney);


module.exports = router;