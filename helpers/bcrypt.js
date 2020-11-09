const bcrypt = require("bcrypt");

const encrypt = (password) =>{
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt)
}


const decrypt = (password,hash) =>{
    return bcrypt.compareSync(password, hash)
}

module.exports = {encrypt,decrypt}