const express = require('express');
const router = express.Router();
const UserController = require("../controller/UserController");
const authentication = require('../middlewares/authentication');
router.get("/",  (req, res, next) => {
    if (req.session.isLogin){
        res.redirect("/");
    }
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = {message: alertMessage, status: alertStatus};
    res.render('layout/backend/login', {
        title: 'Dashboard - Login',
        alert
    });
});

router.post("/auth", UserController.login);




module.exports = router;
