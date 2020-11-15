const express = require('express');
const ProjectController = require("../controller/ProjectController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const router = express.Router();

// router.use(authentication);
// router.use(authorization);
router.post('/new',authorization,ProjectController.create);
router.get("/:id",authentication,ProjectController.viewDetails);

module.exports = router;
