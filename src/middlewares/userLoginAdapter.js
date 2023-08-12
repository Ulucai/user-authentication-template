const { UserController } = require("../controllers/UserController");
const { comparePassword } = require("../services/encryptPassword");

async function userLoginAdapter(req, res, next) {
    const { email } = req.params;
    const { password } = req.body;
    if(!email || !password)
        return res.status(400).end();
    
    user = await UserController.findByEmail(email);

    if(!user)
        return res.status(404).end();
    
    if(await comparePassword(password, user.dataValues.password)){
        req.user = user;
    }else
        return res.status(403).end();            
    next();
};

module.exports = { userLoginAdapter };
