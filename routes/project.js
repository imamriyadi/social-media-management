const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/whatsapp', function(req, res, next) {
    res.render('layout',
        {
            title: 'WhatsApp',
            pages:"pages/whatsapp"
        });
});

module.exports = router;
