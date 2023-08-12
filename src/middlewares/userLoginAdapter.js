const { UserController } = require("../controllers/UserController");
const { comparePassword } = require("../services/encryptPassword");

async function userLoginAdapter(req, res, next) {
    const { email } = req.params;
    const { password } = req.body;
    
    user = await UserController.findByEmail(email);
    //console.log(user);
    req.user = null;
    if(await comparePassword(password, user.dataValues.password)){
        req.user = user;
    }                
    next();
};

module.exports = { userLoginAdapter };
