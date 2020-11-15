const {verifyToken} = require("../helpers/jwt");

module.exports = async (req, res, next) => {
    try{
        if (!req.headers.token) {
            res.sendStatus(403).json({error: "token not definition"});
        }
        const verifier = await verifyToken(req.headers.token);
    }catch (e) {
        res.sendStatus(403).json({error: e.message});
    }
    next();
}
