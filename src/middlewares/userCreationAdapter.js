const { hashPassword } = require("../services/encryptPassword");


async function userCreationAdapter(req, res, next) {
    const { user } = req.body;    
    
    user.password = await hashPassword(user.password);
    const encryptedUser = true;

    req.encryptedUser = encryptedUser;
    
    next();
}

module.exports = { userCreationAdapter }
