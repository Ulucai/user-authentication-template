const { hashPassword } = require("../services/encryptPassword");


async function userCreationAdapter(req, res, next) {
    const { user } = req.body;    
    
    if(!user)
        return res.status(400).end();

    const encryptedUser ={
        ...user,
        password: await hashPassword(user.password)
    }

    req.encryptedUser = encryptedUser;
    
    next();
}

module.exports = { userCreationAdapter }
