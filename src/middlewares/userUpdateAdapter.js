const { hashPassword } = require('../services/encryptPassword');
const { UserController } = require('../controllers/UserController');

async function userUpdateAdapter(req, res, next) {
    const { id } = req.params;
    const { firstName, lastName, password } = req.body;
    console.log("firstName:",firstName);
    console.log("lastName:",lastName);
    console.log("Password:",password);
    user = await UserController.findById(id);
    
    if(user===null){
        req.updatedUser = null;
    }else{        
        if(password===undefined){
            req.updatedUser={"firstName":firstName,
             "lastName":lastName,
             "password":user.dataValues.password};
        }else{
            req.updatedUser={"firstName":user.dataValues.firstName,
             "lastName":user.dataValues.lastName,
             "password":await hashPassword(password)};             
        }                                               
    }    
    
    next();
}

module.exports = { userUpdateAdapter }
