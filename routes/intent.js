const express = require('express'); 
const router = express.Router();
const authorization = require("../middlewares/authorization"); 
router.use(authorization);
router.get('/', function(req,res, next){
    res.status(200).json({status:"success",messages:"Hello From Intent"});
});

router.post('/create', function(req, res, next){

});

router.put("/update", function(req, res, next){

});

router.delete("/delete", function(req, res, next){

});