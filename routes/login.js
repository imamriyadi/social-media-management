var express = require('express');
var router = express.Router();


router.get("/",(req, res, next) =>{
    res.render('layout/login', {
        title: 'Dashboard - Login',
        // pages: "pages/dashboard"
    });
});

router.post("/auth",(req,res) =>{  
    const {email,password} = req.body;  
    res.send('respond with a resource:'+email+"psw:"+password);
});

module.exports = router;
