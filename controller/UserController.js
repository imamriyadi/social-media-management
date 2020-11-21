const Users = require("../models").users;
const {generateToken} = require('../helpers/jwt');
const {decrypt} = require("../helpers/bcrypt");

class UserController {
    static async login(req, res, next) {
        const {email, password} = req.body;
        const User = await Users.findOne({
            where: {
                email: email
            }
        });

        if (User) {
            const payload = {
                id: User.id,
                username:User.username,
                email: User.email
            };
            const token = generateToken(payload)
            const verifiedUser = decrypt(password, User.password);
            if (verifiedUser) {
                req.session.token = token;
                req.session.isLogin = true;
                req.session.payload = payload;
                res.redirect('/');
            } else {
                req.flash('alertMessage', 'Password Yang Anda Gunakan Salah!');
                req.flash('alertStatus', 'danger');
                res.redirect('/login')
            }
        } else {
            req.flash('alertMessage', 'Email Tidak Di Temukan!');
            req.flash('alertStatus', 'danger');
            res.redirect('/login')
        }
    }

    static logout(req, res, next) {
        req.session.destroy((err) => {
            res.redirect('/');
        });
    }
}

module.exports = UserController;
