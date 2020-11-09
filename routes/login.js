var express = require('express');
var router = express.Router();


router.get("/",(req, res, next) =>{
    res.render('layout/login', {
        title: 'Dashboard - Login',
        // pages: "pages/dashboard"
    });
});

module.exports = router;
