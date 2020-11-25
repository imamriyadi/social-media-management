const express = require('express');
const router = express.Router();
const authorization = require("../middlewares/authorization");
const messagesController = require('../controller/MessagesController');

router.use(authorization);
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });
router.post('/create',messagesController.createMessages);

module.exports = router;