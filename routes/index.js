var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('layout', {
        title: 'Dashboard',
        pages: "pages/dashboard"
    });
});

module.exports = router;
