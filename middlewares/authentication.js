const {verifyToken} = require("../helpers/jwt");
const users = require("../models").users;

module.exports = async (req, res, next) => {
    try{
        if (!req.session.isLogin){
            res.redirect("/login");
        }
        req.auth = await verifyToken(req.session.token);
    }catch (e) {
        res.redirect("/login");
        throw new Error(e);
    }
    next();
}
