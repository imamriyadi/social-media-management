const express = require('express');
const router = express.Router();
const authentication = require('../middlewares/authentication');
const UserController = require("../controller/UserController");
const AdminController = require("../controller/AdminController");
/* GET home page. */
router.get('/',authentication,AdminController.dashboard);
router.get("/logout",UserController.logout);

module.exports = router;
